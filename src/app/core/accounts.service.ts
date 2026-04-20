import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { AuthService } from './auth.service';
import { SupabaseService } from './supabase.service';
import { Database } from '../../types/supabase';

export type Account = Database['public']['Tables']['accounts']['Row'];

export interface AccountInput {
  name: string;
}

@Injectable({ providedIn: 'root' })
export class AccountsService {
  private readonly supabase = inject(SupabaseService);
  private readonly auth = inject(AuthService);

  private readonly _all = signal<Account[]>([]);
  private readonly _loading = signal(false);

  readonly all = this._all.asReadonly();
  readonly loading = this._loading.asReadonly();

  readonly defaultAccount = computed(() => this._all().find((a) => a.is_default) ?? null);

  constructor() {
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
        .from('accounts')
        .select('*')
        .is('deleted_at', null)
        .order('is_default', { ascending: false })
        .order('name', { ascending: true });
      if (error) throw error;
      this._all.set(data ?? []);
    } finally {
      this._loading.set(false);
    }
  }

  async create(input: AccountInput): Promise<Account> {
    const user = this.auth.user();
    if (!user) throw new Error('not authenticated');
    const { data, error } = await this.supabase.client
      .from('accounts')
      .insert({
        user_id: user.id,
        name: input.name.trim(),
        is_default: false,
      })
      .select()
      .single();
    if (error) throw error;
    await this.refresh();
    return data;
  }

  async rename(id: string, name: string): Promise<void> {
    const { error } = await this.supabase.client
      .from('accounts')
      .update({ name: name.trim() })
      .eq('id', id);
    if (error) throw error;
    await this.refresh();
  }

  async setDefault(id: string): Promise<void> {
    // Remove current default, set new one — RLS ensures user scope
    const current = this.defaultAccount();
    if (current && current.id !== id) {
      await this.supabase.client
        .from('accounts')
        .update({ is_default: false })
        .eq('id', current.id);
    }
    const { error } = await this.supabase.client
      .from('accounts')
      .update({ is_default: true })
      .eq('id', id);
    if (error) throw error;
    await this.refresh();
  }

  async softDelete(id: string): Promise<void> {
    const { error } = await this.supabase.client
      .from('accounts')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);
    if (error) throw error;
    await this.refresh();
  }
}
