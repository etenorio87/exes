import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { SupabaseService } from './supabase.service';
import { Database } from '../../types/supabase';

export type Transfer = Database['public']['Tables']['transfers']['Row'];

const TRANSFER_CATEGORY_ID = '00000000-0000-0000-0000-000000000099';

export interface TransferInput {
  from_account_id: string;
  to_account_id: string;
  amount: number;
  transfer_date: string; // YYYY-MM-DD
  description: string | null;
}

@Injectable({ providedIn: 'root' })
export class TransfersService {
  private readonly supabase = inject(SupabaseService);
  private readonly auth = inject(AuthService);

  /**
   * Create a transfer: inserts expense in source account, income in destination,
   * and links both in the transfers table.
   */
  async create(input: TransferInput): Promise<Transfer> {
    const user = this.auth.user();
    if (!user) throw new Error('not authenticated');

    // 1. Create expense transaction (source account)
    const { data: fromTx, error: fromErr } = await this.supabase.client
      .from('transactions')
      .insert({
        user_id: user.id,
        type: 'expense',
        amount: input.amount,
        category_id: TRANSFER_CATEGORY_ID,
        account_id: input.from_account_id,
        payment_method: 'transfer',
        transaction_date: input.transfer_date,
        description: input.description,
      })
      .select()
      .single();
    if (fromErr) throw fromErr;

    // 2. Create income transaction (destination account)
    const { data: toTx, error: toErr } = await this.supabase.client
      .from('transactions')
      .insert({
        user_id: user.id,
        type: 'income',
        amount: input.amount,
        category_id: TRANSFER_CATEGORY_ID,
        account_id: input.to_account_id,
        payment_method: 'transfer',
        transaction_date: input.transfer_date,
        description: input.description,
      })
      .select()
      .single();
    if (toErr) throw toErr;

    // 3. Create the transfer record linking both transactions
    const { data: transfer, error: transferErr } = await this.supabase.client
      .from('transfers')
      .insert({
        user_id: user.id,
        from_account_id: input.from_account_id,
        to_account_id: input.to_account_id,
        amount: input.amount,
        transfer_date: input.transfer_date,
        description: input.description,
        from_transaction_id: fromTx.id,
        to_transaction_id: toTx.id,
      })
      .select()
      .single();
    if (transferErr) throw transferErr;
    return transfer;
  }

  /** Load transfers for a date range. */
  async loadAll(dateFrom: string, dateTo: string): Promise<Transfer[]> {
    const { data, error } = await this.supabase.client
      .from('transfers')
      .select('*')
      .gte('transfer_date', dateFrom)
      .lte('transfer_date', dateTo)
      .order('transfer_date', { ascending: false });
    if (error) throw error;
    return data ?? [];
  }

  /** Delete a transfer and its linked transactions. */
  async remove(transfer: Transfer): Promise<void> {
    // Soft-delete the linked transactions
    const txIds = [transfer.from_transaction_id, transfer.to_transaction_id].filter(
      (id): id is string => id != null,
    );
    if (txIds.length > 0) {
      await this.supabase.client
        .from('transactions')
        .update({ deleted_at: new Date().toISOString() })
        .in('id', txIds);
    }
    // Delete the transfer record
    const { error } = await this.supabase.client.from('transfers').delete().eq('id', transfer.id);
    if (error) throw error;
  }
}
