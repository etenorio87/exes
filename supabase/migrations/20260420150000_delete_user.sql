-- =============================================================================
-- EXES — Delete user account (GDPR right to erasure)
--
-- This function deletes the authenticated user's auth record.
-- Because all tables reference auth.users(id) with ON DELETE CASCADE,
-- all user data (profiles, accounts, categories, transactions, etc.)
-- will be automatically removed.
-- =============================================================================

create or replace function public.delete_user_account()
returns void
language sql
security definer
set search_path = public
as $$
  delete from auth.users where id = auth.uid();
$$;

-- Only authenticated users can call this
revoke execute on function public.delete_user_account() from anon;
grant execute on function public.delete_user_account() to authenticated;
