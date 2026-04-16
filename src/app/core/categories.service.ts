import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './auth.service';
import { LanguageService } from './language.service';
import { SupabaseService } from './supabase.service';
import { Database } from '../../types/supabase';

export type Category = Database['public']['Tables']['categories']['Row'];
export type CategoryType = Database['public']['Enums']['category_type'];

export interface CategoryInput {
  name: string;
  type: CategoryType;
  color: string | null;
  icon: string | null;
}

/**
 * Loads + manages categories for the current user.
 *
 * RLS already restricts SELECT to predefined (user_id IS NULL) + own
 * (user_id = auth.uid()), so we just query the table — no extra filter.
 *
 * Predefined categories carry an `i18n_key` and their `name` is the Spanish
 * fallback. Use `displayName()` to get the localized label.
 */
@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private readonly supabase = inject(SupabaseService);
  private readonly auth = inject(AuthService);
  private readonly translate = inject(TranslateService);
  private readonly lang = inject(LanguageService);

  private readonly _all = signal<Category[]>([]);
  private readonly _loading = signal(false);

  readonly all = this._all.asReadonly();
  readonly loading = this._loading.asReadonly();

  readonly predefined = computed(() => this._all().filter((c) => c.is_predefined));
  readonly own = computed(() => this._all().filter((c) => !c.is_predefined));

  constructor() {
    // Refetch whenever the authenticated user changes (login / logout).
    // On logout we just clear; RLS would block the query anyway.
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
        .from('categories')
        .select('*')
        .is('deleted_at', null)
        .order('is_predefined', { ascending: false })
        .order('name', { ascending: true });
      if (error) throw error;
      this._all.set(data ?? []);
    } finally {
      this._loading.set(false);
    }
  }

  async create(input: CategoryInput): Promise<Category> {
    const user = this.auth.user();
    if (!user) throw new Error('not authenticated');
    const { data, error } = await this.supabase.client
      .from('categories')
      .insert({
        user_id: user.id,
        is_predefined: false,
        i18n_key: null,
        name: input.name.trim(),
        type: input.type,
        color: input.color,
        icon: input.icon,
      })
      .select()
      .single();
    if (error) throw error;
    await this.refresh();
    return data;
  }

  async update(id: string, input: CategoryInput): Promise<Category> {
    const { data, error } = await this.supabase.client
      .from('categories')
      .update({
        name: input.name.trim(),
        type: input.type,
        color: input.color,
        icon: input.icon,
      })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    await this.refresh();
    return data;
  }

  /** Soft-delete by stamping deleted_at. */
  async softDelete(id: string): Promise<void> {
    const { error } = await this.supabase.client
      .from('categories')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);
    if (error) throw error;
    await this.refresh();
  }

  /**
   * Localized name for display.
   * Predefined categories resolve via translate(i18n_key); user categories
   * use their literal `name`. Reading `lang.current()` makes calls reactive
   * to language switches without ngOnChanges/templates.
   */
  displayName(cat: Category): string {
    this.lang.current(); // dependency
    if (cat.i18n_key) return this.translate.instant(cat.i18n_key);
    return cat.name;
  }

  /** Localized type label (Ingreso / Gasto / Ambos). */
  typeLabel(type: CategoryType): string {
    this.lang.current(); // dependency
    return this.translate.instant(`categories.types.${type}`);
  }
}
