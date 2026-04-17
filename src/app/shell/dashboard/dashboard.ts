import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ChartModule } from 'primeng/chart';
import { AuthService } from '../../core/auth.service';
import { CategoriesService } from '../../core/categories.service';
import { DashboardData, DashboardService } from '../../core/dashboard.service';
import { LanguageService } from '../../core/language.service';
import { TransactionType } from '../../core/transactions.service';
import { UserPreferencesService } from '../../core/user-preferences.service';

function startOfMonth(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  return `${y}-${m}-01`;
}

function endOfMonth(d = new Date()): string {
  const end = new Date(d.getFullYear(), d.getMonth() + 1, 0);
  const y = end.getFullYear();
  const m = String(end.getMonth() + 1).padStart(2, '0');
  const day = String(end.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, TranslateModule, ChartModule],
  templateUrl: './dashboard.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  private readonly auth = inject(AuthService);
  private readonly dashboardService = inject(DashboardService);
  private readonly categories = inject(CategoriesService);
  private readonly prefs = inject(UserPreferencesService);
  private readonly lang = inject(LanguageService);
  private readonly translate = inject(TranslateService);

  readonly loading = signal(true);
  readonly data = signal<DashboardData>({
    income: 0,
    expenses: 0,
    balance: 0,
    expensesByCategory: [],
    recent: [],
  });

  readonly chartData = signal<object | null>(null);
  readonly chartOptions = signal<object>({
    plugins: { legend: { position: 'bottom' as const, labels: { padding: 16 } } },
    responsive: true,
    maintainAspectRatio: false,
  });

  constructor() {
    const pageTitle = inject(Title);
    effect(() => {
      this.lang.current();
      pageTitle.setTitle(`EXES — ${this.translate.instant('dashboard.title')}`);
    });

    effect(() => {
      const user = this.auth.user();
      if (user) void this.refresh();
    });
  }

  private async refresh(): Promise<void> {
    this.loading.set(true);
    try {
      const result = await this.dashboardService.load(startOfMonth(), endOfMonth());
      this.data.set(result);
      this.buildChart(result);
    } finally {
      this.loading.set(false);
    }
  }

  private buildChart(d: DashboardData): void {
    if (d.expensesByCategory.length === 0) {
      this.chartData.set(null);
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

    this.chartData.set({
      labels,
      datasets: [{ data: values, backgroundColor: bgColors, hoverOffset: 8 }],
    });
  }

  // Template helpers
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
}
