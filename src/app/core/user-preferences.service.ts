import { effect, inject, Injectable, signal } from '@angular/core';
import { AuthService } from './auth.service';
import { LanguageService } from './language.service';
import { SupabaseService } from './supabase.service';

export type Currency = 'EUR' | 'USD' | 'GBP';
export type DateFormat = 'DD/MM/YYYY' | 'MM/DD/YYYY';
export type Theme = 'light' | 'dark';

const CURRENCY_VALUES: readonly Currency[] = ['EUR', 'USD', 'GBP'];
const DATE_FORMAT_VALUES: readonly DateFormat[] = ['DD/MM/YYYY', 'MM/DD/YYYY'];
const THEME_KEY = 'theme';

@Injectable({ providedIn: 'root' })
export class UserPreferencesService {
  private readonly auth = inject(AuthService);
  private readonly supabase = inject(SupabaseService);
  private readonly lang = inject(LanguageService);

  private readonly _currency = signal<Currency>('EUR');
  private readonly _dateFormat = signal<DateFormat>('DD/MM/YYYY');
  private readonly _theme = signal<Theme>(this.resolveInitialTheme());

  readonly currency = this._currency.asReadonly();
  readonly dateFormat = this._dateFormat.asReadonly();
  readonly theme = this._theme.asReadonly();
  readonly isDark = () => this._theme() === 'dark';

  constructor() {
    // Sync preferences from profile on login.
    effect(() => {
      const user = this.auth.user();
      if (user) void this.syncFromProfile(user.id);
    });

    // Apply/remove .app-dark on <html> whenever theme changes.
    effect(() => {
      const dark = this._theme() === 'dark';
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('app-dark', dark);
      }
    });
  }

  private resolveInitialTheme(): Theme {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored === 'dark' || stored === 'light') return stored;
    }
    // Respect OS preference
    if (
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ) {
      return 'dark';
    }
    return 'light';
  }

  private async syncFromProfile(userId: string): Promise<void> {
    const { data, error } = await this.supabase.client
      .from('profiles')
      .select('currency, date_format, theme')
      .eq('id', userId)
      .single();
    if (error || !data) return;
    if (data.currency && (CURRENCY_VALUES as readonly string[]).includes(data.currency)) {
      this._currency.set(data.currency as Currency);
    }
    if (data.date_format && (DATE_FORMAT_VALUES as readonly string[]).includes(data.date_format)) {
      this._dateFormat.set(data.date_format as DateFormat);
    }
    if (data.theme === 'dark' || data.theme === 'light') {
      this._theme.set(data.theme as Theme);
      if (typeof localStorage !== 'undefined') localStorage.setItem(THEME_KEY, data.theme);
    }
  }

  async setTheme(theme: Theme): Promise<void> {
    this._theme.set(theme);
    if (typeof localStorage !== 'undefined') localStorage.setItem(THEME_KEY, theme);
    const user = this.auth.user();
    if (!user) return;
    await this.supabase.client.from('profiles').update({ theme }).eq('id', user.id);
  }

  toggleTheme(): void {
    void this.setTheme(this._theme() === 'dark' ? 'light' : 'dark');
  }

  async update(prefs: { currency?: Currency; date_format?: DateFormat }): Promise<void> {
    const user = this.auth.user();
    if (!user) return;
    const { error } = await this.supabase.client.from('profiles').update(prefs).eq('id', user.id);
    if (error) throw error;
    if (prefs.currency) this._currency.set(prefs.currency);
    if (prefs.date_format) this._dateFormat.set(prefs.date_format);
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat(this.lang.current(), {
      style: 'currency',
      currency: this._currency(),
      currencyDisplay: 'narrowSymbol',
    }).format(amount);
  }

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
