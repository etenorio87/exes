import { inject, Injectable } from '@angular/core';
import { CategoriesService } from './categories.service';
import { SupabaseService } from './supabase.service';
import { Transaction } from './transactions.service';

export interface DashboardData {
  income: number;
  expenses: number;
  balance: number;
  expensesByCategory: { categoryId: string; total: number }[];
  recent: Transaction[];
}

/**
 * Aggregation queries for the dashboard. All computations are client-side
 * for MVP (dataset is small — a single month of transactions).
 */
@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly supabase = inject(SupabaseService);
  private readonly categories = inject(CategoriesService);

  async load(startDate: string, endDate: string): Promise<DashboardData> {
    const { data, error } = await this.supabase.client
      .from('transactions')
      .select('*')
      .is('deleted_at', null)
      .gte('transaction_date', startDate)
      .lte('transaction_date', endDate)
      .order('transaction_date', { ascending: false });

    if (error) throw error;
    const rows = data ?? [];

    let income = 0;
    let expenses = 0;
    const byCategory = new Map<string, number>();

    for (const tx of rows) {
      const amount = Number(tx.amount);
      if (tx.type === 'income') {
        income += amount;
      } else {
        expenses += amount;
        byCategory.set(tx.category_id, (byCategory.get(tx.category_id) ?? 0) + amount);
      }
    }

    const expensesByCategory = Array.from(byCategory.entries())
      .map(([categoryId, total]) => ({ categoryId, total }))
      .sort((a, b) => b.total - a.total);

    return {
      income,
      expenses,
      balance: income - expenses,
      expensesByCategory,
      recent: rows.slice(0, 5),
    };
  }
}
