import { effect, inject, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './auth.service';
import { SupabaseService } from './supabase.service';

const SUPPORTED_LANGS = ['es', 'en'] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

const STORAGE_KEY = 'lang';

/**
 * Centralizes language selection.
 *
 * Sources of truth (in priority order):
 *   1. explicit user choice persisted in `profiles.language` (Supabase)
 *   2. `localStorage.lang` (offline fallback / unauthenticated state)
 *   3. browser language (navigator.language) — handled at app boot in
 *      `app.config.ts:resolveInitialLang`
 *   4. `'es'` default
 *
 * - When the user logs in we sync down from the profile (if present).
 * - When `setLanguage()` is called we apply, persist to localStorage, and
 *   push to the profile if authenticated.
 */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly translate = inject(TranslateService);
  private readonly auth = inject(AuthService);
  private readonly supabase = inject(SupabaseService);

  /**
   * Currently active UI language. Updated reactively on translate.onLangChange.
   * `equal: () => false` so consumers re-evaluate even when the lang value
   * doesn't change (e.g. translations finished loading for the same lang),
   * which lets `translate.instant()` callers pick up the now-loaded strings.
   */
  readonly current = signal<string>(this.translate.currentLang ?? 'es', {
    equal: () => false,
  });

  readonly supported = SUPPORTED_LANGS;

  constructor() {
    this.translate.onLangChange.subscribe((e) => this.current.set(e.lang));

    // When the authenticated user changes, pull their preferred language
    // from `profiles.language` and apply it.
    effect(() => {
      const user = this.auth.user();
      if (user) void this.syncFromProfile(user.id);
    });
  }

  async setLanguage(lang: SupportedLang): Promise<void> {
    if (lang === this.translate.currentLang) return;
    this.translate.use(lang);
    if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_KEY, lang);

    const user = this.auth.user();
    if (!user) return;
    const { error } = await this.supabase.client
      .from('profiles')
      .update({ language: lang })
      .eq('id', user.id);
    if (error) console.warn('[language] failed to persist to profile', error.message);
  }

  private async syncFromProfile(userId: string): Promise<void> {
    const { data, error } = await this.supabase.client
      .from('profiles')
      .select('language')
      .eq('id', userId)
      .single();
    if (error || !data?.language) return;
    if (data.language === this.translate.currentLang) return;
    if (!(SUPPORTED_LANGS as readonly string[]).includes(data.language)) return;
    this.translate.use(data.language);
    if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_KEY, data.language);
  }
}
