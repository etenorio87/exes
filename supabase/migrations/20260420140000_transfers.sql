-- =============================================================================
-- EXES — Transfers between accounts
--
-- A transfer moves money from one account to another. It creates two linked
-- transactions (expense in source, income in destination) so that accumulated
-- balances and reports remain consistent.
-- =============================================================================

create table public.transfers (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users(id) on delete cascade,
  from_account_id  uuid not null references public.accounts(id) on delete restrict,
  to_account_id    uuid not null references public.accounts(id) on delete restrict,
  amount           numeric(12,2) not null check (amount > 0),
  transfer_date    date not null default current_date,
  description      text,
  -- Links to the two generated transactions
  from_transaction_id uuid references public.transactions(id) on delete set null,
  to_transaction_id   uuid references public.transactions(id) on delete set null,
  created_at       timestamptz not null default now(),

  -- Cannot transfer to the same account
  check (from_account_id <> to_account_id)
);

create index transfers_user_id_idx on public.transfers (user_id);
create index transfers_date_idx on public.transfers (transfer_date);

-- RLS
alter table public.transfers enable row level security;

create policy "Users can view own transfers"
  on public.transfers for select
  using (auth.uid() = user_id);

create policy "Users can insert own transfers"
  on public.transfers for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own transfers"
  on public.transfers for delete
  using (auth.uid() = user_id);

-- Add a predefined "Transfer" category (type=both) for internal transactions
insert into public.categories (id, user_id, is_predefined, name, type, i18n_key, color, icon)
values (
  '00000000-0000-0000-0000-000000000099',
  null,
  true,
  'Transferencia',
  'both',
  'categories.predefined.transfer',
  '#6366f1',
  'pi-arrows-h'
)
on conflict do nothing;
