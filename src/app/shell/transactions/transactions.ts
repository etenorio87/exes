import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectModule } from 'primeng/select';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TooltipModule } from 'primeng/tooltip';
import { AccountsService } from '../../core/accounts.service';
import { CategoriesService } from '../../core/categories.service';
import { CsvImportRow, CsvService } from '../../core/csv.service';
import { LanguageService } from '../../core/language.service';
import { RecurrenceFrequency, RecurrencesService } from '../../core/recurrences.service';
import {
  PaymentMethod,
  TransactionInput,
  TransactionRow,
  TransactionsService,
  TransactionType,
} from '../../core/transactions.service';
import { UserPreferencesService } from '../../core/user-preferences.service';

const PAGE_SIZE_OPTIONS: number[] = [10, 25, 50];
const PAYMENT_METHODS: PaymentMethod[] = ['cash', 'card', 'transfer'];

function startOfMonth(d = new Date()): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function endOfMonth(d = new Date()): Date {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}

function dateOnly(d: Date | null): string | null {
  if (!d) return null;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

type ScopeAction = 'edit' | 'delete';
type ScopeChoice = 'one' | 'future' | 'all';

@Component({
  selector: 'app-transactions',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    ButtonModule,
    CheckboxModule,
    DatePickerModule,
    DialogModule,
    IconFieldModule,
    InputIconModule,
    InputNumberModule,
    InputTextModule,
    MultiSelectModule,
    RadioButtonModule,
    SelectModule,
    SelectButtonModule,
    TableModule,
    TagModule,
    ToggleSwitchModule,
    TooltipModule,
  ],
  templateUrl: './transactions.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Transactions {
  private readonly fb = inject(FormBuilder);
  private readonly txService = inject(TransactionsService);
  private readonly recurrences = inject(RecurrencesService);
  private readonly categories = inject(CategoriesService);
  private readonly prefs = inject(UserPreferencesService);
  private readonly translate = inject(TranslateService);
  private readonly lang = inject(LanguageService);
  private readonly accountsService = inject(AccountsService);
  private readonly csv = inject(CsvService);
  private readonly confirm = inject(ConfirmationService);
  private readonly message = inject(MessageService);

  readonly pageSizeOptions = PAGE_SIZE_OPTIONS;
  readonly prefsCurrency = this.prefs.currency;

  // ─── Filter state ────────────────────────────────────────────────────
  readonly dateFrom = signal<Date | null>(startOfMonth());
  readonly dateTo = signal<Date | null>(endOfMonth());
  readonly typeFilter = signal<TransactionType | null>(null);
  readonly categoryFilter = signal<string[]>([]);
  readonly searchQuery = signal('');
  readonly includeDeleted = signal(false);

  // ─── Data (client-side pagination) ───────────────────────────────────
  readonly allRows = signal<TransactionRow[]>([]);
  readonly loading = signal(false);
  private fetchToken = 0;

  readonly filteredRows = computed(() => {
    let rows = this.allRows();
    const t = this.typeFilter();
    const cats = this.categoryFilter();
    const q = this.searchQuery().toLowerCase().trim();
    if (t) rows = rows.filter((r) => r.type === t);
    if (cats.length) rows = rows.filter((r) => cats.includes(r.category_id));
    if (q) rows = rows.filter((r) => (r.description ?? '').toLowerCase().includes(q));
    return rows;
  });

  // ─── Computed labels (reactive to lang) ──────────────────────────────
  readonly typeFilterOptions = computed(() => {
    this.lang.current();
    return [
      { label: this.translate.instant('common.all'), value: null },
      {
        label: this.translate.instant('categories.types.income'),
        value: 'income' as TransactionType,
      },
      {
        label: this.translate.instant('categories.types.expense'),
        value: 'expense' as TransactionType,
      },
    ];
  });

  readonly typeFormOptions = computed(() => {
    this.lang.current();
    return [
      {
        label: this.translate.instant('categories.types.income'),
        value: 'income' as TransactionType,
      },
      {
        label: this.translate.instant('categories.types.expense'),
        value: 'expense' as TransactionType,
      },
    ];
  });

  readonly paymentMethodOptions = computed(() => {
    this.lang.current();
    return PAYMENT_METHODS.map((pm) => ({
      label: this.translate.instant(`transactions.paymentMethods.${pm}`),
      value: pm,
    }));
  });

  readonly frequencyOptions = computed(() => {
    this.lang.current();
    return this.recurrences.frequencies.map((f) => ({
      label: this.translate.instant(`recurrences.frequencies.${f}`),
      value: f,
    }));
  });

  readonly allCategoryOptions = computed(() => {
    this.lang.current();
    return this.categories.all().map((c) => ({
      label: this.categories.displayName(c),
      value: c.id,
      color: c.color ?? '#64748b',
      icon: c.icon ?? 'pi-tag',
    }));
  });

  // ─── Dialog & form ───────────────────────────────────────────────────
  readonly dialogOpen = signal(false);
  readonly editing = signal<TransactionRow | null>(null);
  readonly saving = signal(false);

  readonly form = this.fb.nonNullable.group({
    type: ['expense' as TransactionType, [Validators.required]],
    amount: [0, [Validators.required, Validators.min(0.01)]],
    category_id: ['', [Validators.required]],
    account_id: ['', [Validators.required]],
    transaction_date: [new Date(), [Validators.required]],
    description: [''],
    payment_method: ['card' as PaymentMethod, [Validators.required]],
  });

  readonly isRecurrent = signal(false);
  readonly frequency = signal<RecurrenceFrequency>('monthly');
  readonly endDate = signal<Date | null>(null);

  private readonly formType = toSignal(this.form.controls.type.valueChanges, {
    initialValue: this.form.controls.type.value,
  });

  readonly formCategoryOptions = computed(() => {
    this.lang.current();
    const t = this.formType() as TransactionType;
    return this.categories
      .all()
      .filter((c) => c.type === t || c.type === 'both')
      .map((c) => ({
        label: this.categories.displayName(c),
        value: c.id,
        color: c.color ?? '#64748b',
        icon: c.icon ?? 'pi-tag',
      }));
  });

  readonly accountOptions = computed(() =>
    this.accountsService.all().map((a) => ({
      label: a.name,
      value: a.id,
    })),
  );

  // ─── Scope dialog (Google Calendar pattern) ──────────────────────────
  readonly scopeDialogOpen = signal(false);
  readonly scopeAction = signal<ScopeAction>('edit');
  readonly scopeChoice = signal<ScopeChoice>('one');
  private scopeRow: TransactionRow | null = null;

  constructor() {
    const pageTitle = inject(Title);
    effect(() => {
      this.lang.current();
      pageTitle.setTitle(`EXES — ${this.translate.instant('transactions.title')}`);
    });

    // Refetch whenever date range or deleted toggle changes.
    effect(() => {
      this.dateFrom();
      this.dateTo();
      this.includeDeleted();
      void this.fetch();
    });

    this.form.controls.type.valueChanges.subscribe(() => {
      const catId = this.form.controls.category_id.value;
      if (!catId) return;
      const cat = this.txService.categoriesById().get(catId);
      if (cat && cat.type !== 'both' && cat.type !== this.form.controls.type.value) {
        this.form.controls.category_id.reset('');
      }
    });
  }

  private async fetch(): Promise<void> {
    const from = dateOnly(this.dateFrom());
    const to = dateOnly(this.dateTo());
    if (!from || !to) return;
    const myToken = ++this.fetchToken;
    this.loading.set(true);
    try {
      const rows = this.includeDeleted()
        ? await this.txService.loadDeleted(from, to)
        : await this.txService.loadAll(from, to);
      if (myToken !== this.fetchToken) return;
      this.allRows.set(rows);
    } finally {
      if (myToken === this.fetchToken) this.loading.set(false);
    }
  }

  toggleDeleted(value: boolean): void {
    this.includeDeleted.set(value);
  }

  // ─── Helpers ──────────────────────────────────────────────────────────
  category(id: string) {
    return this.txService.categoriesById().get(id);
  }
  categoryName(id: string): string {
    const c = this.category(id);
    return c ? this.categories.displayName(c) : '';
  }
  paymentLabel(pm: PaymentMethod): string {
    this.lang.current();
    return this.translate.instant(`transactions.paymentMethods.${pm}`);
  }
  formatAmount(value: number): string {
    return this.prefs.formatCurrency(value);
  }
  formatDate(value: string): string {
    return this.prefs.formatDate(value);
  }
  amountClass(type: TransactionType): string {
    return type === 'income' ? 'text-emerald-600 font-semibold' : 'text-red-600 font-semibold';
  }

  // ─── CRUD ─────────────────────────────────────────────────────────────
  async openCreate(): Promise<void> {
    const defaultAccountId = await this.txService.getDefaultAccountId();
    this.editing.set(null);
    this.isRecurrent.set(false);
    this.frequency.set('monthly');
    const today = dateOnly(new Date())!;
    this.endDate.set(new Date(this.recurrences.defaultEndDate(today)));
    this.form.reset({
      type: 'expense',
      amount: 0,
      category_id: '',
      account_id: defaultAccountId,
      transaction_date: new Date(),
      description: '',
      payment_method: 'card',
    });
    this.dialogOpen.set(true);
  }

  openEditDirect(tx: TransactionRow): void {
    this.editing.set(tx);
    this.isRecurrent.set(false); // hide recurrence fields in edit mode
    this.form.reset({
      type: tx.type,
      amount: Number(tx.amount),
      category_id: tx.category_id,
      account_id: tx.account_id,
      transaction_date: new Date(tx.transaction_date),
      description: tx.description ?? '',
      payment_method: tx.payment_method,
    });
    this.dialogOpen.set(true);
  }

  /** Called when clicking edit on a row. Routes to scope dialog if virtual. */
  openEdit(tx: TransactionRow): void {
    if (tx.is_virtual) {
      this.scopeRow = tx;
      this.scopeAction.set('edit');
      this.scopeChoice.set('one');
      this.scopeDialogOpen.set(true);
    } else {
      this.openEditDirect(tx);
    }
  }

  closeDialog(): void {
    this.dialogOpen.set(false);
  }

  async save(): Promise<void> {
    if (this.form.invalid || this.saving()) return;
    this.saving.set(true);
    const v = this.form.getRawValue();
    const txDate = dateOnly(v.transaction_date)!;
    try {
      const editing = this.editing();

      if (!editing && this.isRecurrent()) {
        // Create recurrence
        await this.recurrences.create({
          type: v.type as TransactionType,
          amount: v.amount,
          category_id: v.category_id,
          account_id: v.account_id,
          payment_method: v.payment_method as PaymentMethod,
          description: v.description.trim() || null,
          frequency: this.frequency(),
          start_date: txDate,
          end_date: dateOnly(this.endDate())!,
        });
      } else if (editing && editing.is_virtual && editing.recurrence_id) {
        // Editing a virtual occurrence — scope was chosen earlier
        const input: TransactionInput = {
          type: v.type as TransactionType,
          amount: v.amount,
          category_id: v.category_id,
          account_id: v.account_id,
          payment_method: v.payment_method as PaymentMethod,
          transaction_date: txDate,
          description: v.description.trim() || null,
        };
        const scope = this.scopeChoice();
        // RecurrenceInput shares most fields with TransactionInput but does NOT
        // have `transaction_date` (recurrences use start_date/end_date). We must
        // destructure to avoid passing an unknown column to the recurrences table.
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { transaction_date: _, ...recurrenceFields } = input;
        if (scope === 'one') {
          await this.recurrences.editOne(editing.recurrence_id, editing.transaction_date, input);
        } else if (scope === 'future') {
          await this.recurrences.editThisAndFuture(
            editing.recurrence_id,
            editing.transaction_date, // cut original at the ORIGINAL date
            {
              ...recurrenceFields,
              frequency: this.frequency(),
              start_date: txDate, // new series starts at the form's date
              end_date: dateOnly(this.endDate()) ?? this.recurrences.defaultEndDate(txDate),
            },
          );
        } else {
          await this.recurrences.editAll(editing.recurrence_id, {
            ...recurrenceFields,
            frequency: this.frequency(),
            start_date: txDate, // use the form's date
            end_date: dateOnly(this.endDate()) ?? this.recurrences.defaultEndDate(txDate),
          });
        }
      } else {
        // Normal transaction create/edit
        const input: TransactionInput = {
          type: v.type as TransactionType,
          amount: v.amount,
          category_id: v.category_id,
          account_id: v.account_id,
          payment_method: v.payment_method as PaymentMethod,
          transaction_date: txDate,
          description: v.description.trim() || null,
        };
        if (editing) {
          await this.txService.update(editing.id, input);
        } else {
          await this.txService.create(input);
        }
      }
      this.message.add({
        severity: 'success',
        summary: this.translate.instant('transactions.savedToast'),
      });
      this.dialogOpen.set(false);
      await this.fetch();
    } catch {
      this.message.add({
        severity: 'error',
        summary: this.translate.instant('transactions.errors.generic'),
        life: 6000,
      });
    } finally {
      this.saving.set(false);
    }
  }

  // ─── Delete ───────────────────────────────────────────────────────────
  confirmDelete(tx: TransactionRow): void {
    if (tx.is_virtual) {
      this.scopeRow = tx;
      this.scopeAction.set('delete');
      this.scopeChoice.set('one');
      this.scopeDialogOpen.set(true);
    } else {
      this.confirm.confirm({
        message: this.translate.instant('transactions.deleteConfirm'),
        header: this.translate.instant('common.confirm'),
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: this.translate.instant('common.delete'),
        rejectLabel: this.translate.instant('common.cancel'),
        acceptButtonProps: { severity: 'danger' },
        accept: () => void this.doDeleteReal(tx.id),
      });
    }
  }

  private async doDeleteReal(id: string): Promise<void> {
    try {
      await this.txService.softDelete(id);
      this.message.add({
        severity: 'success',
        summary: this.translate.instant('transactions.deletedToast'),
      });
      await this.fetch();
    } catch {
      this.message.add({
        severity: 'error',
        summary: this.translate.instant('transactions.errors.generic'),
      });
    }
  }

  async restore(tx: TransactionRow): Promise<void> {
    try {
      await this.txService.restore(tx.id);
      this.message.add({
        severity: 'success',
        summary: this.translate.instant('transactions.restoredToast'),
      });
      await this.fetch();
    } catch {
      this.message.add({
        severity: 'error',
        summary: this.translate.instant('transactions.errors.generic'),
      });
    }
  }

  // ─── Scope dialog (Google Calendar) ───────────────────────────────────
  closeScopeDialog(): void {
    this.scopeDialogOpen.set(false);
    this.scopeRow = null;
  }

  async confirmScope(): Promise<void> {
    const row = this.scopeRow;
    if (!row) return;
    this.scopeDialogOpen.set(false);
    const action = this.scopeAction();
    const scope = this.scopeChoice();

    if (action === 'edit') {
      this.openEditDirect(row);
      // scopeChoice is preserved so save() knows the scope.
    } else {
      // Delete with chosen scope
      try {
        if (!row.recurrence_id) return;
        if (scope === 'one') {
          await this.recurrences.deleteOne(row.recurrence_id, row.transaction_date);
        } else if (scope === 'future') {
          await this.recurrences.deleteThisAndFuture(row.recurrence_id, row.transaction_date);
        } else {
          await this.recurrences.deleteAll(row.recurrence_id);
        }
        this.message.add({
          severity: 'success',
          summary: this.translate.instant('transactions.deletedToast'),
        });
        await this.fetch();
      } catch {
        this.message.add({
          severity: 'error',
          summary: this.translate.instant('transactions.errors.generic'),
        });
      }
    }
    this.scopeRow = null;
  }

  // ─── CSV Import/Export ────────────────────────────────────────────────
  readonly importDialogOpen = signal(false);
  readonly importRows = signal<CsvImportRow[]>([]);
  readonly importing = signal(false);

  readonly importValid = () => this.importRows().filter((r) => !r.error);
  readonly importErrors = () => this.importRows().filter((r) => !!r.error);

  exportCsv(): void {
    const rows = this.filteredRows();
    if (rows.length === 0) return;
    const content = this.csv.exportToCsv(rows, (id) => this.categoryName(id));
    const d = this.dateFrom();
    const label = d ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}` : 'all';
    this.csv.downloadCsv(content, `exes-transacciones-${label}.csv`);
  }

  openImportDialog(): void {
    this.importRows.set([]);
    this.importDialogOpen.set(true);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      this.importRows.set(this.csv.parseImport(text));
    };
    reader.readAsText(file);
  }

  async confirmImport(): Promise<void> {
    const valid = this.importValid();
    if (valid.length === 0) return;
    this.importing.set(true);
    try {
      const accountId = await this.txService.getDefaultAccountId();
      for (const row of valid) {
        await this.txService.create({
          type: row.type,
          amount: row.amount,
          category_id: row.categoryId!,
          account_id: accountId,
          payment_method: row.paymentMethod,
          transaction_date: row.date,
          description: row.description || null,
        });
      }
      this.message.add({
        severity: 'success',
        summary: this.translate.instant('transactions.csv.importedToast', {
          count: valid.length,
        }),
      });
      this.importDialogOpen.set(false);
      await this.fetch();
    } catch {
      this.message.add({
        severity: 'error',
        summary: this.translate.instant('transactions.errors.generic'),
      });
    } finally {
      this.importing.set(false);
    }
  }
}
