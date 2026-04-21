import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { SupabaseService } from './supabase.service';

export interface BackupData {
  categories: BackupCategory[];
  accounts: BackupAccount[];
  transactions: BackupTransaction[];
  budgets: BackupBudget[];
  transfers: BackupTransfer[];
}

export interface BackupCategory {
  id: string;
  name: string;
  type: string;
  color: string | null;
  icon: string | null;
  is_predefined: boolean;
  i18n_key: string | null;
}

export interface BackupAccount {
  id: string;
  name: string;
  is_default: boolean;
}

export interface BackupTransaction {
  id: string;
  type: string;
  amount: number;
  category_id: string;
  account_id: string;
  payment_method: string;
  transaction_date: string;
  description: string | null;
  recurrence_id: string | null;
  deleted_at?: string | null;
}

export interface BackupBudget {
  id: string;
  category_id: string;
  amount: number;
  period: string;
}

export interface BackupTransfer {
  id: string;
  from_account_id: string;
  to_account_id: string;
  amount: number;
  transfer_date: string;
  description: string | null;
  from_transaction_id: string | null;
  to_transaction_id: string | null;
}

export interface RestoreOptions {
  categories: boolean;
  accounts: boolean;
  transactions: boolean;
  budgets: boolean;
  transfers: boolean;
}

export interface RestoreResult {
  categories: number;
  accounts: number;
  transactions: number;
  budgets: number;
  transfers: number;
  skipped: {
    noCategory: number;
    recurrenceLinked: number;
    txError: number;
    transferNoAccount: number;
  };
}

@Injectable({ providedIn: 'root' })
export class RestoreService {
  private readonly supabase = inject(SupabaseService);
  private readonly auth = inject(AuthService);

  /**
   * Parse and validate a backup JSON file.
   * Returns null if the file is invalid.
   */
  parseBackup(json: string): BackupData | null {
    try {
      const data = JSON.parse(json);
      return {
        categories: Array.isArray(data.categories) ? data.categories : [],
        accounts: Array.isArray(data.accounts) ? data.accounts : [],
        transactions: Array.isArray(data.transactions) ? data.transactions : [],
        budgets: Array.isArray(data.budgets) ? data.budgets : [],
        transfers: Array.isArray(data.transfers) ? data.transfers : [],
      };
    } catch {
      return null;
    }
  }

  /**
   * Restore selected data from a backup.
   * Handles ID mapping between old and new records.
   */
  async restore(backup: BackupData, options: RestoreOptions): Promise<RestoreResult> {
    const user = this.auth.user();
    if (!user) throw new Error('not authenticated');

    const result: RestoreResult = {
      categories: 0,
      accounts: 0,
      transactions: 0,
      budgets: 0,
      transfers: 0,
      skipped: { noCategory: 0, recurrenceLinked: 0, txError: 0, transferNoAccount: 0 },
    };

    // Maps: old ID → new ID
    const categoryMap = new Map<string, string>();
    const accountMap = new Map<string, string>();
    const transactionMap = new Map<string, string>();

    // 1. Map predefined categories (they are global rows shared across all users)
    const { data: existingCategories } = await this.supabase.client
      .from('categories')
      .select('id, i18n_key, name, is_predefined')
      .is('deleted_at', null);

    const existingCatSet = new Set((existingCategories ?? []).map((c) => c.id));

    for (const bc of backup.categories) {
      if (bc.is_predefined) {
        // Predefined categories are global rows — same ID across all users.
        // If the ID exists in the DB, map directly.
        if (existingCatSet.has(bc.id)) {
          categoryMap.set(bc.id, bc.id);
        } else {
          // Fallback: match by i18n_key in case IDs differ
          const match = (existingCategories ?? []).find(
            (e) => e.i18n_key && e.i18n_key === bc.i18n_key,
          );
          if (match) categoryMap.set(bc.id, match.id);
        }
      }
    }

    // 2. Map custom categories (always match existing by name) + import new ones if enabled
    const customCategories = backup.categories.filter((c) => !c.is_predefined);
    for (const cat of customCategories) {
      const existing = (existingCategories ?? []).find(
        (e) => e.name.toLowerCase() === cat.name.toLowerCase(),
      );
      if (existing) {
        categoryMap.set(cat.id, existing.id);
        continue;
      }
      // Only create new categories if option is enabled
      if (!options.categories) continue;
      const { data, error } = await this.supabase.client
        .from('categories')
        .insert({
          user_id: user.id,
          is_predefined: false,
          i18n_key: null,
          name: cat.name,
          type: cat.type as 'income' | 'expense' | 'both',
          color: cat.color,
          icon: cat.icon,
        })
        .select('id')
        .single();
      if (!error && data) {
        categoryMap.set(cat.id, data.id);
        result.categories++;
      }
    }

    // 3. Build account map (always) + optionally import new accounts
    const { data: existingAccounts } = await this.supabase.client
      .from('accounts')
      .select('id, name')
      .is('deleted_at', null);

    // First, map existing accounts by name
    for (const acc of backup.accounts) {
      const existing = (existingAccounts ?? []).find(
        (e) => e.name.toLowerCase() === acc.name.toLowerCase(),
      );
      if (existing) {
        accountMap.set(acc.id, existing.id);
      }
    }

    // Then create missing accounts if option is enabled
    if (options.accounts) {
      for (const acc of backup.accounts) {
        if (accountMap.has(acc.id)) continue; // Already mapped
        const { data, error } = await this.supabase.client
          .from('accounts')
          .insert({
            user_id: user.id,
            name: acc.name,
            is_default: false,
          })
          .select('id')
          .single();
        if (!error && data) {
          accountMap.set(acc.id, data.id);
          result.accounts++;
        }
      }
    }

    // 4. Import transactions
    if (options.transactions) {
      // Need a fallback account for unmapped account_ids
      const { data: defaultAccount } = await this.supabase.client
        .from('accounts')
        .select('id')
        .eq('user_id', user.id)
        .eq('is_default', true)
        .is('deleted_at', null)
        .single();

      const fallbackAccountId = defaultAccount?.id ?? '';

      for (const tx of backup.transactions) {
        // Skip recurrence-linked transactions (virtual occurrences)
        if (tx.recurrence_id) {
          result.skipped.recurrenceLinked++;
          continue;
        }

        // Resolve category: check map first, then check if it exists directly in DB
        let categoryId = categoryMap.get(tx.category_id);
        if (!categoryId && existingCatSet.has(tx.category_id)) {
          // Predefined category exists in DB with same ID (not in backup array)
          categoryId = tx.category_id;
          categoryMap.set(tx.category_id, tx.category_id);
        }
        const accountId = accountMap.get(tx.account_id) ?? fallbackAccountId;

        if (!categoryId) {
          result.skipped.noCategory++;
          continue;
        }

        const { data, error } = await this.supabase.client
          .from('transactions')
          .insert({
            user_id: user.id,
            type: tx.type as 'income' | 'expense',
            amount: tx.amount,
            category_id: categoryId,
            account_id: accountId,
            payment_method: tx.payment_method as 'cash' | 'card' | 'transfer',
            transaction_date: tx.transaction_date,
            description: tx.description,
          })
          .select('id')
          .single();
        if (!error && data) {
          transactionMap.set(tx.id, data.id);
          result.transactions++;
        } else {
          result.skipped.txError++;
        }
      }
    }

    // 5. Import budgets
    if (options.budgets) {
      for (const budget of backup.budgets) {
        let categoryId = categoryMap.get(budget.category_id);
        if (!categoryId && existingCatSet.has(budget.category_id)) {
          categoryId = budget.category_id;
          categoryMap.set(budget.category_id, budget.category_id);
        }
        if (!categoryId) continue;

        const { error } = await this.supabase.client.from('budgets').insert({
          user_id: user.id,
          category_id: categoryId,
          amount: budget.amount,
          period: budget.period as 'monthly' | 'quarterly' | 'semiannual' | 'annual',
        });
        if (!error) result.budgets++;
      }
    }

    // 6. Import transfers
    if (options.transfers) {
      for (const transfer of backup.transfers) {
        const fromAccountId = accountMap.get(transfer.from_account_id);
        const toAccountId = accountMap.get(transfer.to_account_id);
        if (!fromAccountId || !toAccountId) {
          result.skipped.transferNoAccount++;
          continue;
        }

        // Map linked transactions if they were imported
        const fromTxId = transfer.from_transaction_id
          ? (transactionMap.get(transfer.from_transaction_id) ?? null)
          : null;
        const toTxId = transfer.to_transaction_id
          ? (transactionMap.get(transfer.to_transaction_id) ?? null)
          : null;

        const { error } = await this.supabase.client.from('transfers').insert({
          user_id: user.id,
          from_account_id: fromAccountId,
          to_account_id: toAccountId,
          amount: transfer.amount,
          transfer_date: transfer.transfer_date,
          description: transfer.description,
          from_transaction_id: fromTxId,
          to_transaction_id: toTxId,
        });
        if (!error) result.transfers++;
      }
    }

    return result;
  }
}
