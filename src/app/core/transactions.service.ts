import { computed, inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CategoriesService } from './categories.service';
import { SupabaseService } from './supabase.service';
import { Database } from '../../types/supabase';

export type Transaction = Database['public']['Tables']['transactions']['Row'];
export type TransactionType = Database['public']['Enums']['transaction_type'];
export type PaymentMethod = Database['public']['Enums']['payment_method'];

/** Row returned by get_transactions() RPC — covers real + virtual rows. */
export type TransactionRow = Database['public']['Functions']['get_transactions']['Returns'][number];

export interface TransactionInput {
  type: TransactionType;
  amount: number;
  category_id: string;
  account_id: string;
  payment_method: PaymentMethod;
  transaction_date: string; // YYYY-MM-DD
  description: string | null;
}

/**
 * Load + mutate transactions for the authenticated user.
 *
 * Phase 2: listing uses the `get_transactions(start, end)` SQL function so
 * virtual recurrence occurrences are merged in. Pagination and type/category
 * filtering are handled client-side (a single month rarely exceeds 100 rows).
 *
 * Trash view still queries the table directly (deleted rows are excluded from
 * the RPC function by design).
 */
@Injectable({ providedIn: 'root' })
export class TransactionsService {
  private readonly supabase = inject(SupabaseService);
  private readonly auth = inject(AuthService);
  private readonly categories = inject(CategoriesService);

  readonly categoriesById = computed(() => {
    const map = new Map<string, ReturnType<typeof this.categories.all>[number]>();
    for (const c of this.categories.all()) map.set(c.id, c);
    return map;
  });

  private _defaultAccountId: string | null = null;

  async getDefaultAccountId(): Promise<string> {
    if (this._defaultAccountId) return this._defaultAccountId;
    const user = this.auth.user();
    if (!user) throw new Error('not authenticated');
    const { data, error } = await this.supabase.client
      .from('accounts')
      .select('id')
      .eq('user_id', user.id)
      .eq('is_default', true)
      .is('deleted_at', null)
      .single();
    if (error || !data) throw error ?? new Error('default account not found');
    this._defaultAccountId = data.id;
    return data.id;
  }

  /**
   * Load all transactions (real + virtual recurrence occurrences) for a date
   * range using the `get_transactions` RPC. Results are sorted by date desc.
   */
  async loadAll(dateFrom: string, dateTo: string): Promise<TransactionRow[]> {
    const { data, error } = await this.supabase.client.rpc('get_transactions', {
      p_start: dateFrom,
      p_end: dateTo,
    });
    if (error) throw error;
    return (data ?? []).sort((a, b) => b.transaction_date.localeCompare(a.transaction_date));
  }

  /** Load only soft-deleted transactions (trash view). */
  async loadDeleted(dateFrom: string, dateTo: string): Promise<TransactionRow[]> {
    const { data, error } = await this.supabase.client
      .from('transactions')
      .select('*')
      .not('deleted_at', 'is', null)
      .gte('transaction_date', dateFrom)
      .lte('transaction_date', dateTo)
      .order('transaction_date', { ascending: false });
    if (error) throw error;
    return (data ?? []).map((tx) => ({
      id: tx.id,
      user_id: tx.user_id,
      type: tx.type,
      amount: Number(tx.amount),
      category_id: tx.category_id,
      account_id: tx.account_id,
      payment_method: tx.payment_method,
      transaction_date: tx.transaction_date,
      description: tx.description ?? '',
      recurrence_id: tx.recurrence_id ?? '',
      is_virtual: false,
      receipt_url: tx.receipt_url ?? null,
    }));
  }

  async create(input: TransactionInput): Promise<Transaction> {
    const user = this.auth.user();
    if (!user) throw new Error('not authenticated');
    const { data, error } = await this.supabase.client
      .from('transactions')
      .insert({ ...input, user_id: user.id })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async update(id: string, input: TransactionInput): Promise<Transaction> {
    const { data, error } = await this.supabase.client
      .from('transactions')
      .update(input)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async softDelete(id: string): Promise<void> {
    const { error } = await this.supabase.client
      .from('transactions')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);
    if (error) throw error;
  }

  async restore(id: string): Promise<void> {
    const { error } = await this.supabase.client
      .from('transactions')
      .update({ deleted_at: null })
      .eq('id', id);
    if (error) throw error;
  }
}
