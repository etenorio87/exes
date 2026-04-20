import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { AuthService } from './auth.service';
import { SupabaseService } from './supabase.service';
import { Database } from '../../types/supabase';

export type Budget = Database['public']['Tables']['budgets']['Row'];
export type BudgetPeriod = Database['public']['Enums']['budget_period'];

export interface BudgetInput {
  category_id: string;
  amount: number;
  period: BudgetPeriod;
}

export interface BudgetWithSpending extends Budget {
  spent: number;
  percentage: number;
}

@Injectable({ providedIn: 'root' })
export class BudgetsService {
  private readonly supabase = inject(SupabaseService);
  private readonly auth = inject(AuthService);

  private readonly _all = signal<Budget[]>([]);
  private readonly _loading = signal(false);

  readonly all = this._all.asReadonly();
  readonly loading = this._loading.asReadonly();

  /** Map category_id → budget for quick lookup. */
  readonly byCategory = computed(() => {
    const map = new Map<string, Budget>();
    for (const b of this._all()) map.set(b.category_id, b);
    return map;
  });

  constructor() {
    effect(() => {
      const user = this.auth.user();
      if (user) void this.refresh();
      else this._all.set([]);
    });
  }

  async refresh(): Promise<void> {
    this._loading.set(true);
    try {
      const { data, error } = await this.supabase.client
        .from('budgets')
        .select('*')
        .order('created_at', { ascending: true });
      if (error) throw error;
      this._all.set(data ?? []);
    } finally {
      this._loading.set(false);
    }
  }

  async create(input: BudgetInput): Promise<Budget> {
    const user = this.auth.user();
    if (!user) throw new Error('not authenticated');
    const { data, error } = await this.supabase.client
      .from('budgets')
      .insert({ ...input, user_id: user.id })
      .select()
      .single();
    if (error) throw error;
    await this.refresh();
    return data;
  }

  async update(id: string, input: BudgetInput): Promise<Budget> {
    const { data, error } = await this.supabase.client
      .from('budgets')
      .update({ amount: input.amount, period: input.period, category_id: input.category_id })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    await this.refresh();
    return data;
  }

  async remove(id: string): Promise<void> {
    const { error } = await this.supabase.client.from('budgets').delete().eq('id', id);
    if (error) throw error;
    await this.refresh();
  }

  /**
   * Calculate the date range for a budget's period relative to a reference date.
   * Returns [startDate, endDate] as YYYY-MM-DD strings.
   */
  periodRange(period: BudgetPeriod, referenceDate: Date): { start: string; end: string } {
    const year = referenceDate.getFullYear();
    const month = referenceDate.getMonth(); // 0-indexed

    let startMonth: number;
    let endMonth: number;

    switch (period) {
      case 'monthly':
        startMonth = month;
        endMonth = month;
        break;
      case 'quarterly': {
        const q = Math.floor(month / 3);
        startMonth = q * 3;
        endMonth = startMonth + 2;
        break;
      }
      case 'semiannual': {
        const h = Math.floor(month / 6);
        startMonth = h * 6;
        endMonth = startMonth + 5;
        break;
      }
      case 'annual':
        startMonth = 0;
        endMonth = 11;
        break;
    }

    const startDate = new Date(year, startMonth, 1);
    const endDate = new Date(year, endMonth + 1, 0); // last day of endMonth

    return {
      start: this.dateStr(startDate),
      end: this.dateStr(endDate),
    };
  }

  private dateStr(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }
}
