import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

/**
 * Thin wrapper around the Supabase JS client.
 * Use `client` to access the typed Supabase API directly from features.
 *
 * Note: when we generate DB types (Phase 1) replace `SupabaseClient` with
 * `SupabaseClient<Database>` to get end-to-end type safety on queries.
 */
@Injectable({ providedIn: 'root' })
export class SupabaseService {
  readonly client: SupabaseClient = createClient(
    environment.supabase.url,
    environment.supabase.anonKey,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    },
  );
}
