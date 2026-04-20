import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { SupabaseService } from './supabase.service';

const BUCKET = 'receipts';
const SIGNED_URL_EXPIRY = 60 * 60; // 1 hour

@Injectable({ providedIn: 'root' })
export class ReceiptsService {
  private readonly supabase = inject(SupabaseService);
  private readonly auth = inject(AuthService);

  /**
   * Upload a receipt file for a transaction.
   * Stores it at `{userId}/{transactionId}/{filename}` in the receipts bucket,
   * then updates `receipt_url` on the transaction row.
   * Returns the storage path.
   */
  async upload(transactionId: string, file: File): Promise<string> {
    const user = this.auth.user();
    if (!user) throw new Error('not authenticated');

    const ext = file.name.split('.').pop() ?? 'jpg';
    const path = `${user.id}/${transactionId}/${Date.now()}.${ext}`;

    const { error: uploadError } = await this.supabase.client.storage
      .from(BUCKET)
      .upload(path, file, { upsert: true });

    if (uploadError) throw uploadError;

    const { error: updateError } = await this.supabase.client
      .from('transactions')
      .update({ receipt_url: path })
      .eq('id', transactionId);

    if (updateError) throw updateError;

    return path;
  }

  /**
   * Remove the receipt for a transaction.
   * Deletes the file from storage and clears `receipt_url` on the transaction.
   */
  async remove(transactionId: string, storagePath: string): Promise<void> {
    const { error: deleteError } = await this.supabase.client.storage
      .from(BUCKET)
      .remove([storagePath]);

    if (deleteError) throw deleteError;

    const { error: updateError } = await this.supabase.client
      .from('transactions')
      .update({ receipt_url: null })
      .eq('id', transactionId);

    if (updateError) throw updateError;
  }

  /**
   * Get a short-lived signed URL to view a receipt.
   */
  async getSignedUrl(storagePath: string): Promise<string> {
    const { data, error } = await this.supabase.client.storage
      .from(BUCKET)
      .createSignedUrl(storagePath, SIGNED_URL_EXPIRY);

    if (error || !data) throw error ?? new Error('could not create signed URL');
    return data.signedUrl;
  }
}
