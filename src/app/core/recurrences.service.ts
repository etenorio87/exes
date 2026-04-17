import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { SupabaseService } from './supabase.service';
import { Database } from '../../types/supabase';
import { TransactionInput } from './transactions.service';

export type Recurrence = Database['public']['Tables']['recurrences']['Row'];
export type RecurrenceFrequency = Database['public']['Enums']['recurrence_frequency'];

export interface RecurrenceInput {
  type: Database['public']['Enums']['transaction_type'];
  amount: number;
  category_id: string;
  account_id: string;
  payment_method: Database['public']['Enums']['payment_method'];
  description: string | null;
  frequency: RecurrenceFrequency;
  start_date: string; // YYYY-MM-DD
  end_date: string; // YYYY-MM-DD
}

const FREQUENCIES: RecurrenceFrequency[] = ['monthly', 'quarterly', 'semiannual', 'annual'];

/**
 * Manages recurrence templates and the Google Calendar edit/delete pattern.
 *
 * - "Solo esta" → exception row (deleted or modified)
 * - "Esta y futuras" → cut original series (end_date = day before), create new
 * - "Todas" → edit/soft-delete the template itself
 */
@Injectable({ providedIn: 'root' })
export class RecurrencesService {
  private readonly supabase = inject(SupabaseService);
  private readonly auth = inject(AuthService);

  readonly frequencies = FREQUENCIES;

  /** Default end_date: 24 months from start. */
  defaultEndDate(startDate: string): string {
    const d = new Date(startDate);
    d.setMonth(d.getMonth() + 24);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  // ─── Create ───────────────────────────────────────────────────────────
  async create(input: RecurrenceInput): Promise<Recurrence> {
    const user = this.auth.user();
    if (!user) throw new Error('not authenticated');
    const { data, error } = await this.supabase.client
      .from('recurrences')
      .insert({ ...input, user_id: user.id })
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  // ─── Edit patterns ────────────────────────────────────────────────────

  /** Edit ALL occurrences: update the template. */
  async editAll(recurrenceId: string, input: RecurrenceInput): Promise<void> {
    const { error } = await this.supabase.client
      .from('recurrences')
      .update(input)
      .eq('id', recurrenceId);
    if (error) throw error;
  }

  /** Edit a SINGLE occurrence: create exception + modified transaction. */
  async editOne(
    recurrenceId: string,
    originalDate: string,
    txInput: TransactionInput,
  ): Promise<void> {
    const user = this.auth.user();
    if (!user) throw new Error('not authenticated');

    // Create the modified transaction
    const { data: tx, error: txErr } = await this.supabase.client
      .from('transactions')
      .insert({
        ...txInput,
        user_id: user.id,
        recurrence_id: recurrenceId,
        recurrence_original_date: originalDate,
      })
      .select()
      .single();
    if (txErr) throw txErr;

    // Create the exception
    const { error: exErr } = await this.supabase.client.from('recurrence_exceptions').insert({
      recurrence_id: recurrenceId,
      original_date: originalDate,
      action: 'modified' as const,
      transaction_id: tx.id,
    });
    if (exErr) throw exErr;
  }

  /** Edit THIS and FUTURE: close original series, create new one. */
  async editThisAndFuture(
    recurrenceId: string,
    fromDate: string,
    input: RecurrenceInput,
  ): Promise<void> {
    // Close original series the day before
    const dayBefore = this.dayBefore(fromDate);
    const { error: closeErr } = await this.supabase.client
      .from('recurrences')
      .update({ end_date: dayBefore })
      .eq('id', recurrenceId);
    if (closeErr) throw closeErr;

    // Create new series starting from fromDate
    await this.create({ ...input, start_date: fromDate });
  }

  // ─── Delete patterns ─────────────────────────────────────────────────

  /** Delete ALL occurrences: soft-delete the template. */
  async deleteAll(recurrenceId: string): Promise<void> {
    const { error } = await this.supabase.client
      .from('recurrences')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', recurrenceId);
    if (error) throw error;
  }

  /** Delete a SINGLE occurrence: add 'deleted' exception. */
  async deleteOne(recurrenceId: string, date: string): Promise<void> {
    const { error } = await this.supabase.client.from('recurrence_exceptions').insert({
      recurrence_id: recurrenceId,
      original_date: date,
      action: 'deleted' as const,
    });
    if (error) throw error;
  }

  /** Delete THIS and FUTURE: set end_date to the day before. */
  async deleteThisAndFuture(recurrenceId: string, fromDate: string): Promise<void> {
    const dayBefore = this.dayBefore(fromDate);
    const { error } = await this.supabase.client
      .from('recurrences')
      .update({ end_date: dayBefore })
      .eq('id', recurrenceId);
    if (error) throw error;
  }

  // ─── Helpers ──────────────────────────────────────────────────────────
  private dayBefore(dateStr: string): string {
    const d = new Date(dateStr);
    d.setDate(d.getDate() - 1);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }
}
