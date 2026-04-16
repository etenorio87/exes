import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Database } from '../../types/supabase';

/**
 * Thin wrapper around the Supabase JS client, fully typed against the
 * generated `Database` schema (see `src/types/supabase.ts`). Regenerate
 * those types after every migration:
 *
 *   supabase gen types typescript --linked > src/types/supabase.ts
 */
@Injectable({ providedIn: 'root' })
export class SupabaseService {
  readonly client: SupabaseClient<Database> = createClient<Database>(
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
