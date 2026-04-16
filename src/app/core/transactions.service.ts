import { computed, inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CategoriesService } from './categories.service';
import { SupabaseService } from './supabase.service';
import { Database } from '../../types/supabase';

export type Transaction = Database['public']['Tables']['transactions']['Row'];
export type TransactionType = Database['public']['Enums']['transaction_type'];
export type PaymentMethod = Database['public']['Enums']['payment_method'];

export interface TransactionInput {
  type: TransactionType;
  amount: number;
  category_id: string;
  account_id: string;
  payment_method: PaymentMethod;
  transaction_date: string; // YYYY-MM-DD
  description: string | null;
}

export interface TransactionFilters {
  dateFrom: string | null; // YYYY-MM-DD
  dateTo: string | null; // YYYY-MM-DD
  type: TransactionType | null;
  categoryIds: string[] | null;
  includeDeleted: boolean;
}

export interface PageOptions {
  page: number; // 0-indexed
  pageSize: number;
}

export interface TransactionsPage {
  rows: Transaction[];
  total: number;
}

/**
 * Load + mutate transactions for the authenticated user.
 *
 * Phase 1 only deals with one-off transactions (no recurrences). When we
 * add recurrences in Phase 2, the listing will switch to using the
 * `get_transactions(start, end)` SQL function instead of querying the
 * table directly, so virtual occurrences come merged in.
 *
 * `defaultAccountId` resolves the user's "Principal" account once on demand
 * so the create dialog can omit the account selector for MVP (wallet UI in
 * Phase 3).
 */
@Injectable({ providedIn: 'root' })
export class TransactionsService {
  private readonly supabase = inject(SupabaseService);
  private readonly auth = inject(AuthService);
  private readonly categories = inject(CategoriesService);

  /** Indexed lookup so the table can render category data without re-fetching. */
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

  async load(filters: TransactionFilters, page: PageOptions): Promise<TransactionsPage> {
    let query = this.supabase.client.from('transactions').select('*', { count: 'exact' });

    if (filters.includeDeleted) {
      query = query.not('deleted_at', 'is', null);
    } else {
      query = query.is('deleted_at', null);
    }
    if (filters.dateFrom) query = query.gte('transaction_date', filters.dateFrom);
    if (filters.dateTo) query = query.lte('transaction_date', filters.dateTo);
    if (filters.type) query = query.eq('type', filters.type);
    if (filters.categoryIds && filters.categoryIds.length > 0) {
      query = query.in('category_id', filters.categoryIds);
    }

    const from = page.page * page.pageSize;
    const to = from + page.pageSize - 1;
    query = query.order('transaction_date', { ascending: false }).range(from, to);

    const { data, error, count } = await query;
    if (error) throw error;
    return { rows: data ?? [], total: count ?? 0 };
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
