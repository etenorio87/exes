import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { Budget, BudgetInput, BudgetPeriod, BudgetsService } from '../../core/budgets.service';
import { CategoriesService } from '../../core/categories.service';
import { LanguageService } from '../../core/language.service';
import { UserPreferencesService } from '../../core/user-preferences.service';
import { TransactionsService, TransactionRow } from '../../core/transactions.service';

interface BudgetItem {
  budget: Budget;
  spent: number;
  percentage: number;
}

@Component({
  selector: 'app-budgets',
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    SelectModule,
  ],
  templateUrl: './budgets.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Budgets {
  private readonly fb = inject(FormBuilder);
  readonly budgets = inject(BudgetsService);
  private readonly categories = inject(CategoriesService);
  private readonly transactions = inject(TransactionsService);
  private readonly translate = inject(TranslateService);
  private readonly lang = inject(LanguageService);
  private readonly prefs = inject(UserPreferencesService);
  private readonly confirm = inject(ConfirmationService);
  private readonly message = inject(MessageService);

  readonly Math = Math;

  // Transaction data for calculating spending
  private readonly _transactionRows = signal<TransactionRow[]>([]);

  constructor() {
    const pageTitle = inject(Title);
    effect(() => {
      this.lang.current();
      pageTitle.setTitle(`EXES — ${this.translate.instant('transactions.budgets.title')}`);
    });

    // Load transactions for current period whenever budgets change
    effect(() => {
      const all = this.budgets.all();
      if (all.length > 0) void this.loadSpending();
    });
  }

  /** Calculate spending for all budgets based on their periods. */
  private async loadSpending(): Promise<void> {
    const allBudgets = this.budgets.all();
    if (allBudgets.length === 0) return;

    // Find the widest date range needed across all budget periods
    const now = new Date();
    let earliest = now;
    let latest = now;

    for (const b of allBudgets) {
      const range = this.budgets.periodRange(b.period, now);
      const start = new Date(range.start);
      const end = new Date(range.end);
      if (start < earliest) earliest = start;
      if (end > latest) latest = end;
    }

    const startStr = earliest.toISOString().slice(0, 10);
    const endStr = latest.toISOString().slice(0, 10);

    try {
      const rows = await this.transactions.loadAll(startStr, endStr);
      this._transactionRows.set(rows);
    } catch {
      // Silently fail — progress will show 0
    }
  }

  readonly budgetItems = computed<BudgetItem[]>(() => {
    const allBudgets = this.budgets.all();
    const rows = this._transactionRows();
    const now = new Date();

    return allBudgets.map((budget) => {
      const range = this.budgets.periodRange(budget.period, now);
      const spent = rows
        .filter(
          (tx) =>
            tx.type === 'expense' &&
            tx.category_id === budget.category_id &&
            tx.transaction_date >= range.start &&
            tx.transaction_date <= range.end,
        )
        .reduce((sum, tx) => sum + Number(tx.amount), 0);

      const percentage = budget.amount > 0 ? (spent / Number(budget.amount)) * 100 : 0;
      return { budget, spent, percentage };
    });
  });

  // Category helpers
  readonly categoryOptions = computed(() => {
    this.lang.current();
    const existingCategoryIds = new Set(this.budgets.all().map((b) => b.category_id));
    const editingId = this.editing()?.category_id;

    return this.categories
      .all()
      .filter((c) => {
        // Only expense/both categories make sense for budgets
        if (c.type === 'income') return false;
        // Exclude categories that already have a budget (unless editing that budget)
        if (existingCategoryIds.has(c.id) && c.id !== editingId) return false;
        return true;
      })
      .map((c) => ({
        label: this.categories.displayName(c),
        value: c.id,
      }));
  });

  readonly periodOptions = computed(() => {
    this.lang.current();
    const periods: BudgetPeriod[] = ['monthly', 'quarterly', 'semiannual', 'annual'];
    return periods.map((p) => ({
      label: this.translate.instant(`transactions.budgets.periods.${p}`),
      value: p,
    }));
  });

  categoryName(id: string): string {
    const cat = this.categories.all().find((c) => c.id === id);
    return cat ? this.categories.displayName(cat) : '';
  }

  categoryIcon(id: string): string | null {
    return this.categories.all().find((c) => c.id === id)?.icon ?? null;
  }

  categoryColor(id: string): string | null {
    return this.categories.all().find((c) => c.id === id)?.color ?? null;
  }

  formatCurrency(amount: number): string {
    return this.prefs.formatCurrency(amount);
  }

  progressColor(percentage: number): string {
    if (percentage > 100) return 'bg-red-500';
    if (percentage > 80) return 'bg-yellow-500';
    return 'bg-green-500';
  }

  percentageTextColor(percentage: number): string {
    if (percentage > 100) return 'text-red-600 dark:text-red-400 font-semibold';
    if (percentage > 80) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-muted-color';
  }

  // ─── Dialog state ─────────────────────────────────────────────────────────
  readonly dialogOpen = signal(false);
  readonly editing = signal<Budget | null>(null);
  readonly saving = signal(false);

  readonly form = this.fb.nonNullable.group({
    category_id: ['', [Validators.required]],
    amount: [0, [Validators.required, Validators.min(0.01)]],
    period: ['monthly' as BudgetPeriod, [Validators.required]],
  });

  openCreate(): void {
    this.editing.set(null);
    this.form.reset({ category_id: '', amount: 0, period: 'monthly' });
    this.dialogOpen.set(true);
  }

  openEdit(budget: Budget): void {
    this.editing.set(budget);
    this.form.reset({
      category_id: budget.category_id,
      amount: Number(budget.amount),
      period: budget.period,
    });
    this.dialogOpen.set(true);
  }

  closeDialog(): void {
    this.dialogOpen.set(false);
  }

  async save(): Promise<void> {
    if (this.form.invalid || this.saving()) return;
    this.saving.set(true);
    const input: BudgetInput = this.form.getRawValue();
    try {
      const editing = this.editing();
      if (editing) {
        await this.budgets.update(editing.id, input);
      } else {
        await this.budgets.create(input);
      }
      this.message.add({
        severity: 'success',
        summary: this.translate.instant('transactions.budgets.savedToast'),
      });
      this.dialogOpen.set(false);
      await this.loadSpending();
    } catch (err) {
      const code = (err as { code?: string } | null)?.code;
      const detail =
        code === '23505'
          ? this.translate.instant('transactions.budgets.errors.duplicateCategory')
          : this.translate.instant('transactions.budgets.errors.generic');
      this.message.add({ severity: 'error', summary: detail, life: 6000 });
    } finally {
      this.saving.set(false);
    }
  }

  confirmDelete(budget: Budget): void {
    this.confirm.confirm({
      message: this.translate.instant('transactions.budgets.deleteConfirm'),
      header: this.translate.instant('common.confirm'),
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: this.translate.instant('common.delete'),
      rejectLabel: this.translate.instant('common.cancel'),
      acceptButtonProps: { severity: 'danger' },
      accept: () => void this.doDelete(budget),
    });
  }

  private async doDelete(budget: Budget): Promise<void> {
    try {
      await this.budgets.remove(budget.id);
      this.message.add({
        severity: 'success',
        summary: this.translate.instant('transactions.budgets.deletedToast'),
      });
    } catch {
      this.message.add({
        severity: 'error',
        summary: this.translate.instant('transactions.budgets.errors.generic'),
        life: 6000,
      });
    }
  }
}
