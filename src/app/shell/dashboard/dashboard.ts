import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { DatePickerModule } from 'primeng/datepicker';
import { AuthService } from '../../core/auth.service';
import { BudgetsService, BudgetPeriod } from '../../core/budgets.service';
import { CategoriesService } from '../../core/categories.service';
import { DashboardData, DashboardService } from '../../core/dashboard.service';
import { LanguageService } from '../../core/language.service';
import { TransactionType } from '../../core/transactions.service';
import { UserPreferencesService } from '../../core/user-preferences.service';

export interface BudgetProgress {
  categoryId: string;
  amount: number;
  spent: number;
  percentage: number;
  period: BudgetPeriod;
}

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, RouterLink, TranslateModule, ButtonModule, ChartModule, DatePickerModule],
  templateUrl: './dashboard.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  private readonly auth = inject(AuthService);
  private readonly dashboardService = inject(DashboardService);
  private readonly budgetsService = inject(BudgetsService);
  private readonly categories = inject(CategoriesService);
  private readonly prefs = inject(UserPreferencesService);
  private readonly lang = inject(LanguageService);
  private readonly translate = inject(TranslateService);

  readonly selectedMonth = signal(new Date());

  readonly monthLabel = computed(() => {
    this.lang.current();
    const d = this.selectedMonth();
    return new Intl.DateTimeFormat(this.lang.current(), {
      month: 'long',
      year: 'numeric',
    }).format(d);
  });

  readonly loading = signal(true);
  readonly data = signal<DashboardData>({
    current: { income: 0, expenses: 0, balance: 0 },
    previous: { income: 0, expenses: 0, balance: 0 },
    expensesByCategory: [],
    recent: [],
    evolution: { labels: [], income: [], expenses: [], balance: [] },
  });

  readonly doughnutData = signal<object | null>(null);
  readonly doughnutOptions = signal<object>({
    plugins: { legend: { position: 'bottom' as const, labels: { padding: 16 } } },
    responsive: true,
    maintainAspectRatio: false,
  });

  readonly budgetProgress = signal<BudgetProgress[]>([]);

  readonly evolutionData = signal<object | null>(null);
  readonly evolutionOptions = signal<object>({
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index' as const, intersect: false },
    plugins: { legend: { position: 'bottom' as const } },
    scales: { y: { beginAtZero: true } },
  });

  constructor() {
    const pageTitle = inject(Title);
    effect(() => {
      this.lang.current();
      pageTitle.setTitle(`EXES — ${this.translate.instant('dashboard.title')}`);
    });

    effect(() => {
      const user = this.auth.user();
      const month = this.selectedMonth();
      if (user) void this.refresh(month);
    });
  }

  // ─── Month navigation ──────────────────────────────────────────────────
  prevMonth(): void {
    const d = this.selectedMonth();
    this.selectedMonth.set(new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }

  nextMonth(): void {
    const d = this.selectedMonth();
    this.selectedMonth.set(new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }

  onMonthSelect(date: Date): void {
    this.selectedMonth.set(new Date(date.getFullYear(), date.getMonth(), 1));
  }

  // ─── Data loading ────────────────────────────────────────────────────
  private async refresh(month: Date): Promise<void> {
    this.loading.set(true);
    try {
      const result = await this.dashboardService.load(month);
      this.data.set(result);
      this.buildDoughnut(result);
      this.buildEvolution(result);
      this.buildBudgetProgress(result);
    } finally {
      this.loading.set(false);
    }
  }

  private buildBudgetProgress(d: DashboardData): void {
    const budgets = this.budgetsService.all();
    if (budgets.length === 0) {
      this.budgetProgress.set([]);
      return;
    }

    const progress: BudgetProgress[] = [];
    for (const budget of budgets) {
      // Dashboard shows current-month spending against the budget amount.
      // The full budgets page handles multi-period calculation properly.
      const spent =
        d.expensesByCategory.find((e) => e.categoryId === budget.category_id)?.total ?? 0;
      const amount = Number(budget.amount);
      const percentage = amount > 0 ? (spent / amount) * 100 : 0;
      progress.push({
        categoryId: budget.category_id,
        amount,
        spent,
        percentage,
        period: budget.period,
      });
    }
    this.budgetProgress.set(progress.sort((a, b) => b.percentage - a.percentage));
  }

  private buildDoughnut(d: DashboardData): void {
    if (d.expensesByCategory.length === 0) {
      this.doughnutData.set(null);
      return;
    }
    const labels: string[] = [];
    const values: number[] = [];
    const bgColors: string[] = [];
    for (const entry of d.expensesByCategory) {
      const cat = this.categories.all().find((c) => c.id === entry.categoryId);
      labels.push(cat ? this.categories.displayName(cat) : '?');
      values.push(entry.total);
      bgColors.push(cat?.color ?? '#64748b');
    }
    this.doughnutData.set({
      labels,
      datasets: [{ data: values, backgroundColor: bgColors, hoverOffset: 8 }],
    });
  }

  private buildEvolution(d: DashboardData): void {
    const hasData =
      d.evolution.income.some((v) => v > 0) || d.evolution.expenses.some((v) => v > 0);
    if (!hasData) {
      this.evolutionData.set(null);
      return;
    }
    const locale = this.lang.current();
    const labels = d.evolution.labels.map((ym) => {
      const [y, m] = ym.split('-');
      const date = new Date(+y, +m - 1, 1);
      return new Intl.DateTimeFormat(locale, { month: 'short' }).format(date);
    });
    this.evolutionData.set({
      labels,
      datasets: [
        {
          label: this.translate.instant('dashboard.income'),
          data: d.evolution.income,
          borderColor: '#10b981',
          backgroundColor: '#10b98133',
          fill: false,
          tension: 0.3,
        },
        {
          label: this.translate.instant('dashboard.expenses'),
          data: d.evolution.expenses,
          borderColor: '#ef4444',
          backgroundColor: '#ef444433',
          fill: false,
          tension: 0.3,
        },
        {
          label: this.translate.instant('dashboard.balance'),
          data: d.evolution.balance,
          borderColor: '#3b82f6',
          backgroundColor: '#3b82f633',
          fill: false,
          tension: 0.3,
        },
      ],
    });
  }

  // ─── Comparison helpers ──────────────────────────────────────────────
  delta(current: number, previous: number): string {
    if (previous === 0) return current > 0 ? '+100%' : '—';
    const pct = ((current - previous) / previous) * 100;
    const sign = pct >= 0 ? '+' : '';
    return `${sign}${pct.toFixed(0)}%`;
  }

  deltaIcon(current: number, previous: number): string {
    if (current > previous) return 'pi pi-arrow-up';
    if (current < previous) return 'pi pi-arrow-down';
    return 'pi pi-minus';
  }

  deltaColor(current: number, previous: number, invert = false): string {
    const up = current >= previous;
    if (invert) return up ? 'text-red-500' : 'text-emerald-500';
    return up ? 'text-emerald-500' : 'text-red-500';
  }

  // ─── Template helpers ────────────────────────────────────────────────
  formatCurrency(amount: number): string {
    return this.prefs.formatCurrency(amount);
  }
  formatDate(date: string): string {
    return this.prefs.formatDate(date);
  }
  categoryName(id: string): string {
    const cat = this.categories.all().find((c) => c.id === id);
    return cat ? this.categories.displayName(cat) : '';
  }
  categoryColor(id: string): string {
    return this.categories.all().find((c) => c.id === id)?.color ?? '#64748b';
  }
  categoryIcon(id: string): string {
    return this.categories.all().find((c) => c.id === id)?.icon ?? 'pi-tag';
  }
  amountClass(type: TransactionType): string {
    return type === 'income' ? 'text-emerald-600 font-semibold' : 'text-red-600 font-semibold';
  }
  amountPrefix(type: TransactionType): string {
    return type === 'income' ? '+' : '−';
  }

  // Budget helpers
  readonly Math = Math;

  budgetProgressColor(percentage: number): string {
    if (percentage > 100) return 'bg-red-500';
    if (percentage > 80) return 'bg-yellow-500';
    return 'bg-emerald-500';
  }
}
