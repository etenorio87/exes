import { effect, inject, Injectable, signal } from '@angular/core';
import { AuthService } from './auth.service';
import { LanguageService } from './language.service';
import { SupabaseService } from './supabase.service';

export type Currency = 'EUR' | 'USD' | 'GBP';
export type DateFormat = 'DD/MM/YYYY' | 'MM/DD/YYYY';

const CURRENCY_VALUES: readonly Currency[] = ['EUR', 'USD', 'GBP'];
const DATE_FORMAT_VALUES: readonly DateFormat[] = ['DD/MM/YYYY', 'MM/DD/YYYY'];

/**
 * Reads & exposes the user's display preferences from `profiles`:
 *   - currency for amount formatting
 *   - date_format for date display (independent of UI language)
 *
 * Settings UI to mutate these lives in Fase 3; for MVP we only consume them.
 *
 * `formatCurrency` uses the active UI language locale (so 1.234,56 € in es
 * vs €1,234.56 in en) but the currency itself is what the user picked.
 */
@Injectable({ providedIn: 'root' })
export class UserPreferencesService {
  private readonly auth = inject(AuthService);
  private readonly supabase = inject(SupabaseService);
  private readonly lang = inject(LanguageService);

  private readonly _currency = signal<Currency>('EUR');
  private readonly _dateFormat = signal<DateFormat>('DD/MM/YYYY');

  readonly currency = this._currency.asReadonly();
  readonly dateFormat = this._dateFormat.asReadonly();

  constructor() {
    effect(() => {
      const user = this.auth.user();
      if (user) void this.syncFromProfile(user.id);
    });
  }

  private async syncFromProfile(userId: string): Promise<void> {
    const { data, error } = await this.supabase.client
      .from('profiles')
      .select('currency, date_format')
      .eq('id', userId)
      .single();
    if (error || !data) return;
    if (data.currency && (CURRENCY_VALUES as readonly string[]).includes(data.currency)) {
      this._currency.set(data.currency as Currency);
    }
    if (data.date_format && (DATE_FORMAT_VALUES as readonly string[]).includes(data.date_format)) {
      this._dateFormat.set(data.date_format as DateFormat);
    }
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat(this.lang.current(), {
      style: 'currency',
      currency: this._currency(),
    }).format(amount);
  }

  /**
   * Format a `YYYY-MM-DD` date string (Postgres `date` column) or a `Date`
   * object into the user's preferred `DD/MM/YYYY` or `MM/DD/YYYY` format.
   * Avoids `new Date(string)` for date-only strings to dodge UTC drift.
   */
  formatDate(input: string | Date): string {
    let day: string, month: string, year: string;
    if (typeof input === 'string' && /^\d{4}-\d{2}-\d{2}/.test(input)) {
      const [y, m, d] = input.slice(0, 10).split('-');
      year = y;
      month = m;
      day = d;
    } else {
      const d = typeof input === 'string' ? new Date(input) : input;
      year = String(d.getFullYear());
      month = String(d.getMonth() + 1).padStart(2, '0');
      day = String(d.getDate()).padStart(2, '0');
    }
    return this._dateFormat() === 'DD/MM/YYYY'
      ? `${day}/${month}/${year}`
      : `${month}/${day}/${year}`;
  }
}
