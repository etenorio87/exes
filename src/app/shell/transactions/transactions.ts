import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { CategoriesService } from '../../core/categories.service';
import { LanguageService } from '../../core/language.service';
import {
  PaymentMethod,
  Transaction,
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

@Component({
  selector: 'app-transactions',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    ButtonModule,
    DatePickerModule,
    DialogModule,
    InputNumberModule,
    InputTextModule,
    MultiSelectModule,
    SelectModule,
    SelectButtonModule,
    TableModule,
    TagModule,
    ToggleSwitchModule,
  ],
  templateUrl: './transactions.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Transactions {
  private readonly fb = inject(FormBuilder);
  private readonly txService = inject(TransactionsService);
  private readonly categories = inject(CategoriesService);
  private readonly prefs = inject(UserPreferencesService);
  private readonly translate = inject(TranslateService);
  private readonly lang = inject(LanguageService);
  private readonly confirm = inject(ConfirmationService);
  private readonly message = inject(MessageService);

  readonly pageSizeOptions = PAGE_SIZE_OPTIONS;
  readonly prefsCurrency = this.prefs.currency;

  // ─── Filter state (signals) ───────────────────────────────────────────────
  readonly dateFrom = signal<Date | null>(startOfMonth());
  readonly dateTo = signal<Date | null>(endOfMonth());
  readonly typeFilter = signal<TransactionType | null>(null);
  readonly categoryFilter = signal<string[]>([]);
  readonly includeDeleted = signal(false);
  readonly page = signal(0);
  readonly pageSize = signal<number>(25);

  // ─── Data ────────────────────────────────────────────────────────────────
  readonly rows = signal<Transaction[]>([]);
  readonly total = signal(0);
  readonly loading = signal(false);
  private fetchToken = 0;

  // ─── Computed labels (reactive to lang) ──────────────────────────────────
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

  /**
   * Categories for the multi-select filter (all of them).
   * For the form's category dropdown we filter by the form's current type so
   * "expense" transactions can't be assigned an "income"-only category.
   */
  readonly allCategoryOptions = computed(() => {
    this.lang.current();
    return this.categories.all().map((c) => ({
      label: this.categories.displayName(c),
      value: c.id,
    }));
  });

  readonly formCategoryOptions = computed(() => {
    this.lang.current();
    const t = this.form.controls.type.value as TransactionType;
    return this.categories
      .all()
      .filter((c) => c.type === t || c.type === 'both')
      .map((c) => ({ label: this.categories.displayName(c), value: c.id }));
  });

  // ─── Dialog & form ───────────────────────────────────────────────────────
  readonly dialogOpen = signal(false);
  readonly editing = signal<Transaction | null>(null);
  readonly saving = signal(false);
  private dialogAccountId: string | null = null;

  readonly form = this.fb.nonNullable.group({
    type: ['expense' as TransactionType, [Validators.required]],
    amount: [0, [Validators.required, Validators.min(0.01)]],
    category_id: ['', [Validators.required]],
    transaction_date: [new Date(), [Validators.required]],
    description: [''],
    payment_method: ['card' as PaymentMethod, [Validators.required]],
  });

  constructor() {
    // Refetch whenever any filter or pagination signal changes.
    effect(() => {
      this.dateFrom();
      this.dateTo();
      this.typeFilter();
      this.categoryFilter();
      this.includeDeleted();
      this.page();
      this.pageSize();
      void this.fetch();
    });
  }

  private async fetch(): Promise<void> {
    const myToken = ++this.fetchToken;
    this.loading.set(true);
    try {
      const result = await this.txService.load(
        {
          dateFrom: dateOnly(this.dateFrom()),
          dateTo: dateOnly(this.dateTo()),
          type: this.typeFilter(),
          categoryIds: this.categoryFilter().length ? this.categoryFilter() : null,
          includeDeleted: this.includeDeleted(),
        },
        { page: this.page(), pageSize: this.pageSize() },
      );
      // Bail if a newer fetch started while we were awaiting.
      if (myToken !== this.fetchToken) return;
      this.rows.set(result.rows);
      this.total.set(result.total);
    } finally {
      if (myToken === this.fetchToken) this.loading.set(false);
    }
  }

  onPage(event: { first: number; rows: number }): void {
    this.pageSize.set(event.rows);
    this.page.set(Math.floor(event.first / event.rows));
  }

  resetFiltersToCurrentMonth(): void {
    this.dateFrom.set(startOfMonth());
    this.dateTo.set(endOfMonth());
    this.typeFilter.set(null);
    this.categoryFilter.set([]);
    this.page.set(0);
  }

  toggleDeleted(value: boolean): void {
    this.includeDeleted.set(value);
    this.page.set(0);
  }

  // ─── Helpers used from template ──────────────────────────────────────────
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

  // ─── CRUD actions ────────────────────────────────────────────────────────
  async openCreate(): Promise<void> {
    this.dialogAccountId = await this.txService.getDefaultAccountId();
    this.editing.set(null);
    this.form.reset({
      type: 'expense',
      amount: 0,
      category_id: '',
      transaction_date: new Date(),
      description: '',
      payment_method: 'card',
    });
    this.dialogOpen.set(true);
  }

  async openEdit(tx: Transaction): Promise<void> {
    this.dialogAccountId = tx.account_id;
    this.editing.set(tx);
    this.form.reset({
      type: tx.type,
      amount: Number(tx.amount),
      category_id: tx.category_id,
      transaction_date: new Date(tx.transaction_date),
      description: tx.description ?? '',
      payment_method: tx.payment_method,
    });
    this.dialogOpen.set(true);
  }

  closeDialog(): void {
    this.dialogOpen.set(false);
  }

  async save(): Promise<void> {
    if (this.form.invalid || this.saving()) return;
    if (!this.dialogAccountId) return;
    this.saving.set(true);
    const v = this.form.getRawValue();
    const input = {
      type: v.type as TransactionType,
      amount: v.amount,
      category_id: v.category_id,
      account_id: this.dialogAccountId,
      payment_method: v.payment_method as PaymentMethod,
      transaction_date: dateOnly(v.transaction_date)!,
      description: v.description.trim() || null,
    };
    try {
      const editing = this.editing();
      if (editing) {
        await this.txService.update(editing.id, input);
      } else {
        await this.txService.create(input);
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

  confirmDelete(tx: Transaction): void {
    this.confirm.confirm({
      message: this.translate.instant('transactions.deleteConfirm'),
      header: this.translate.instant('common.confirm'),
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: this.translate.instant('common.delete'),
      rejectLabel: this.translate.instant('common.cancel'),
      acceptButtonProps: { severity: 'danger' },
      accept: () => void this.doDelete(tx.id),
    });
  }

  private async doDelete(id: string): Promise<void> {
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

  async restore(tx: Transaction): Promise<void> {
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
}
