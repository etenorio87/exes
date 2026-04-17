import { inject, Injectable } from '@angular/core';
import { CategoriesService } from './categories.service';
import { SupabaseService } from './supabase.service';
import { TransactionRow } from './transactions.service';

export interface MonthTotals {
  income: number;
  expenses: number;
  balance: number;
}

export interface DashboardData {
  current: MonthTotals;
  previous: MonthTotals;
  expensesByCategory: { categoryId: string; total: number }[];
  recent: TransactionRow[];
  evolution: {
    labels: string[]; // YYYY-MM
    income: number[];
    expenses: number[];
    balance: number[];
  };
}

function monthKey(dateStr: string): string {
  return dateStr.slice(0, 7); // YYYY-MM
}

function aggregateMonth(rows: TransactionRow[]): MonthTotals {
  let income = 0;
  let expenses = 0;
  for (const tx of rows) {
    const amount = Number(tx.amount);
    if (tx.type === 'income') income += amount;
    else expenses += amount;
  }
  return { income, expenses, balance: income - expenses };
}

/**
 * Loads dashboard data in ONE RPC call covering 12 months so we get:
 *   - current month totals + category breakdown + recent transactions
 *   - previous month totals (for comparison deltas)
 *   - 12-month evolution (for the line chart)
 */
@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly supabase = inject(SupabaseService);
  private readonly categories = inject(CategoriesService);

  async load(selectedMonth: Date): Promise<DashboardData> {
    // 12-month range ending at the selected month
    const rangeEnd = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0);
    const rangeStart = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 11, 1);

    const startStr = this.dateStr(rangeStart);
    const endStr = this.dateStr(rangeEnd);

    const { data, error } = await this.supabase.client.rpc('get_transactions', {
      p_start: startStr,
      p_end: endStr,
    });
    if (error) throw error;
    const allRows = data ?? [];

    // Group by month
    const byMonth = new Map<string, TransactionRow[]>();
    for (const tx of allRows) {
      const key = monthKey(tx.transaction_date);
      const arr = byMonth.get(key) ?? [];
      arr.push(tx);
      byMonth.set(key, arr);
    }

    // Current & previous month keys
    const curKey = this.monthKeyFromDate(selectedMonth);
    const prevDate = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - 1, 1);
    const prevKey = this.monthKeyFromDate(prevDate);

    const curRows = byMonth.get(curKey) ?? [];
    const prevRows = byMonth.get(prevKey) ?? [];

    const current = aggregateMonth(curRows);
    const previous = aggregateMonth(prevRows);

    // Expenses by category (current month only)
    const byCategory = new Map<string, number>();
    for (const tx of curRows) {
      if (tx.type === 'expense') {
        const amount = Number(tx.amount);
        byCategory.set(tx.category_id, (byCategory.get(tx.category_id) ?? 0) + amount);
      }
    }
    const expensesByCategory = Array.from(byCategory.entries())
      .map(([categoryId, total]) => ({ categoryId, total }))
      .sort((a, b) => b.total - a.total);

    // Recent (current month, sorted desc)
    const recent = [...curRows]
      .sort((a, b) => b.transaction_date.localeCompare(a.transaction_date))
      .slice(0, 5);

    // Evolution: 12 months ordered chronologically
    const labels: string[] = [];
    const incomeArr: number[] = [];
    const expensesArr: number[] = [];
    const balanceArr: number[] = [];

    for (let i = 11; i >= 0; i--) {
      const d = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() - i, 1);
      const key = this.monthKeyFromDate(d);
      labels.push(key);
      const totals = aggregateMonth(byMonth.get(key) ?? []);
      incomeArr.push(totals.income);
      expensesArr.push(totals.expenses);
      balanceArr.push(totals.balance);
    }

    return {
      current,
      previous,
      expensesByCategory,
      recent,
      evolution: { labels, income: incomeArr, expenses: expensesArr, balance: balanceArr },
    };
  }

  private dateStr(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  private monthKeyFromDate(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    return `${y}-${m}`;
  }
}
