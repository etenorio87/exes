-- =============================================================================
-- EXES — Budgets per category
--
-- A budget defines a spending limit for a category within a recurring period.
-- Period options: monthly, quarterly, semiannual, annual.
-- =============================================================================

create type public.budget_period as enum ('monthly', 'quarterly', 'semiannual', 'annual');

create table public.budgets (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  category_id uuid not null references public.categories(id) on delete restrict,
  amount      numeric(12,2) not null check (amount > 0),
  period      public.budget_period not null default 'monthly',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),

  -- One budget per category per user
  unique (user_id, category_id)
);

-- updated_at trigger
create trigger budgets_updated_at
  before update on public.budgets
  for each row execute function public.set_updated_at();

-- RLS
alter table public.budgets enable row level security;

create policy "Users can view own budgets"
  on public.budgets for select
  using (auth.uid() = user_id);

create policy "Users can insert own budgets"
  on public.budgets for insert
  with check (auth.uid() = user_id);

create policy "Users can update own budgets"
  on public.budgets for update
  using (auth.uid() = user_id);

create policy "Users can delete own budgets"
  on public.budgets for delete
  using (auth.uid() = user_id);
