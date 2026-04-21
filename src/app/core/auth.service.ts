import { computed, effect, inject, Injectable, signal } from '@angular/core';
import type { Session, User } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';

/**
 * Auth wrapper around Supabase Auth.
 *
 * `user` is a signal that reflects the current authenticated user. It is
 * initialized lazily from the persisted session and kept in sync via
 * `onAuthStateChange`. Components can `inject(AuthService)` and read
 * `user()` / `isAuthenticated()` reactively.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly supabase = inject(SupabaseService);

  private readonly _user = signal<User | null>(null);
  private readonly _ready = signal(false);

  readonly user = this._user.asReadonly();
  readonly ready = this._ready.asReadonly();
  readonly isAuthenticated = computed(() => this._user() !== null);

  constructor() {
    void this.bootstrap();

    this.supabase.client.auth.onAuthStateChange((_event, session: Session | null) => {
      this._user.set(session?.user ?? null);
    });

    // Cheap dev signal: log auth state transitions during development.
    effect(() => {
      if (!this._ready()) return;
      const u = this._user();
      console.debug('[auth] state =', u ? `signed in as ${u.email}` : 'signed out');
    });
  }

  private async bootstrap(): Promise<void> {
    const { data } = await this.supabase.client.auth.getSession();
    this._user.set(data.session?.user ?? null);
    this._ready.set(true);
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.client.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  }

  async signUp(email: string, password: string) {
    const { data, error } = await this.supabase.client.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  }

  async signInWithGoogle(): Promise<void> {
    const { error } = await this.supabase.client.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/app/home`,
      },
    });
    if (error) throw error;
  }

  async signOut() {
    const { error } = await this.supabase.client.auth.signOut();
    if (error) throw error;
  }

  /**
   * Sends a password reset email. The user is taken to `redirectTo` on click,
   * where they can call `updatePassword` with the new value (Supabase exchanges
   * the URL token for a session automatically when `detectSessionInUrl` is on).
   */
  async sendPasswordReset(email: string, redirectTo: string) {
    const { error } = await this.supabase.client.auth.resetPasswordForEmail(email, {
      redirectTo,
    });
    if (error) throw error;
  }

  async updatePassword(newPassword: string) {
    const { error } = await this.supabase.client.auth.updateUser({ password: newPassword });
    if (error) throw error;
  }
}
