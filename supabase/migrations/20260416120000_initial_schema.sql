-- =============================================================================
-- EXES — Initial schema
--
-- Tables:
--   profiles, accounts, categories, recurrences, recurrence_exceptions,
--   transactions
--
-- Approach for recurring transactions ("Google Calendar" pattern):
--   - A `recurrences` row is the template (rule + default values).
--   - Occurrences are NOT materialized in DB. They are expanded virtually
--     by the `expand_recurrences(start, end)` function.
--   - Edits to a single occurrence are recorded in `recurrence_exceptions`
--     and (for "modified") as a real `transactions` row that carries
--     `recurrence_id` + `recurrence_original_date`.
--
-- Soft-delete: all user-owned tables carry `deleted_at`.
--   - Foreign keys to categories/accounts use ON DELETE RESTRICT, so the
--     UI must filter out deleted_at rows in dropdowns. Hard delete is
--     blocked while children exist; this preserves historical integrity.
-- =============================================================================

create extension if not exists "uuid-ossp";

-- -----------------------------------------------------------------------------
-- Helper trigger function: keep updated_at in sync
-- -----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- -----------------------------------------------------------------------------
-- Enums
-- -----------------------------------------------------------------------------
create type public.category_type              as enum ('income', 'expense', 'both');
create type public.transaction_type           as enum ('income', 'expense');
create type public.payment_method             as enum ('cash', 'card', 'transfer');
create type public.recurrence_frequency       as enum ('monthly', 'quarterly', 'semiannual', 'annual');
create type public.recurrence_exception_action as enum ('deleted', 'modified');

-- =============================================================================
-- profiles
-- =============================================================================
create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  currency    text not null default 'EUR'        check (currency in ('EUR', 'USD', 'GBP')),
  date_format text not null default 'DD/MM/YYYY' check (date_format in ('DD/MM/YYYY', 'MM/DD/YYYY')),
  language    text not null default 'es'         check (language in ('es', 'en')),
  theme       text not null default 'light'      check (theme in ('light', 'dark')),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- =============================================================================
-- accounts
-- =============================================================================
create table public.accounts (
  id         uuid primary key default uuid_generate_v4(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  name       text not null,
  is_default boolean not null default false,
  deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index accounts_user_id_idx
  on public.accounts (user_id)
  where deleted_at is null;

-- One name per user (active rows only)
create unique index accounts_user_unique_name
  on public.accounts (user_id, lower(name))
  where deleted_at is null;

-- Exactly one default account per user (active rows only)
create unique index accounts_one_default_per_user
  on public.accounts (user_id)
  where is_default = true and deleted_at is null;

create trigger accounts_set_updated_at
  before update on public.accounts
  for each row execute function public.set_updated_at();

-- =============================================================================
-- categories
--   user_id IS NULL  → global predefined (immutable, is_predefined = true)
--   user_id NOT NULL → owned by a user (is_predefined = false)
-- =============================================================================
create table public.categories (
  id            uuid primary key default uuid_generate_v4(),
  user_id       uuid references auth.users(id) on delete cascade,
  name          text not null,
  type          public.category_type not null,
  color         text,
  icon          text,
  is_predefined boolean not null default false,
  deleted_at    timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  constraint categories_predefined_no_user check (
    (is_predefined = true  and user_id is null) or
    (is_predefined = false and user_id is not null)
  )
);

create index categories_user_id_idx
  on public.categories (user_id)
  where deleted_at is null;

-- Unique active name per user
create unique index categories_user_unique_name
  on public.categories (user_id, lower(name))
  where deleted_at is null and user_id is not null;

-- Unique predefined name globally
create unique index categories_predefined_unique_name
  on public.categories (lower(name))
  where is_predefined = true;

create trigger categories_set_updated_at
  before update on public.categories
  for each row execute function public.set_updated_at();

-- =============================================================================
-- recurrences (templates)
-- =============================================================================
create table public.recurrences (
  id             uuid primary key default uuid_generate_v4(),
  user_id        uuid not null references auth.users(id) on delete cascade,
  type           public.transaction_type not null,
  amount         numeric(12, 2) not null check (amount > 0),
  category_id    uuid not null references public.categories(id) on delete restrict,
  account_id     uuid not null references public.accounts(id)   on delete restrict,
  payment_method public.payment_method not null,
  description    text,
  frequency      public.recurrence_frequency not null,
  start_date     date not null,
  end_date       date not null,
  deleted_at     timestamptz,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now(),
  constraint recurrences_dates_ok check (end_date >= start_date)
);

create index recurrences_user_id_idx
  on public.recurrences (user_id)
  where deleted_at is null;

create index recurrences_user_range_idx
  on public.recurrences (user_id, start_date, end_date)
  where deleted_at is null;

create trigger recurrences_set_updated_at
  before update on public.recurrences
  for each row execute function public.set_updated_at();

-- =============================================================================
-- recurrence_exceptions
--   action = 'deleted'  → that occurrence is skipped in expansion
--   action = 'modified' → that occurrence is replaced by transaction_id
--                         (a real `transactions` row carrying recurrence_id)
-- =============================================================================
create table public.recurrence_exceptions (
  id             uuid primary key default uuid_generate_v4(),
  recurrence_id  uuid not null references public.recurrences(id) on delete cascade,
  original_date  date not null,
  action         public.recurrence_exception_action not null,
  transaction_id uuid, -- FK added after `transactions` is created
  created_at     timestamptz not null default now(),
  unique (recurrence_id, original_date)
);

create index recurrence_exceptions_recurrence_idx
  on public.recurrence_exceptions (recurrence_id);

-- =============================================================================
-- transactions
--   - One-off transactions: recurrence_id IS NULL
--   - Modified occurrence of a recurrence:
--       recurrence_id NOT NULL AND recurrence_original_date NOT NULL
--     (and a matching `recurrence_exceptions` row with action='modified')
-- =============================================================================
create table public.transactions (
  id                       uuid primary key default uuid_generate_v4(),
  user_id                  uuid not null references auth.users(id) on delete cascade,
  type                     public.transaction_type not null,
  amount                   numeric(12, 2) not null check (amount > 0),
  category_id              uuid not null references public.categories(id) on delete restrict,
  account_id               uuid not null references public.accounts(id)   on delete restrict,
  payment_method           public.payment_method not null,
  transaction_date         date not null,
  description              text,
  recurrence_id            uuid references public.recurrences(id) on delete set null,
  recurrence_original_date date,
  deleted_at               timestamptz,
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now(),
  constraint transactions_recurrence_consistency check (
    (recurrence_id is null     and recurrence_original_date is null) or
    (recurrence_id is not null and recurrence_original_date is not null)
  )
);

create index transactions_user_date_idx
  on public.transactions (user_id, transaction_date desc)
  where deleted_at is null;

create index transactions_user_category_idx
  on public.transactions (user_id, category_id)
  where deleted_at is null;

create index transactions_recurrence_idx
  on public.transactions (recurrence_id, recurrence_original_date)
  where recurrence_id is not null;

create trigger transactions_set_updated_at
  before update on public.transactions
  for each row execute function public.set_updated_at();

-- Now that `transactions` exists, wire the FK from recurrence_exceptions
alter table public.recurrence_exceptions
  add constraint recurrence_exceptions_transaction_fk
  foreign key (transaction_id) references public.transactions(id) on delete set null;

-- =============================================================================
-- Function: expand_recurrences(p_start, p_end)
--   Returns virtual occurrences in [p_start, p_end], excluding any date that
--   has a `recurrence_exceptions` row (deleted OR modified). Modified ones
--   come back through the real `transactions` table.
--
--   `id` is a deterministic UUID v5 derived from (recurrence_id, date) so the
--   client can use it as a stable key.
-- =============================================================================
create or replace function public.expand_recurrences(p_start date, p_end date)
returns table (
  id               uuid,
  user_id          uuid,
  type             public.transaction_type,
  amount           numeric,
  category_id      uuid,
  account_id       uuid,
  payment_method   public.payment_method,
  transaction_date date,
  description      text,
  recurrence_id    uuid,
  is_virtual       boolean
)
language sql
stable
security invoker
as $$
  with steps as (
    select
      r.id            as recurrence_id,
      r.user_id,
      r.type,
      r.amount,
      r.category_id,
      r.account_id,
      r.payment_method,
      r.description,
      generate_series(
        r.start_date,
        least(r.end_date, p_end),
        case r.frequency
          when 'monthly'    then interval '1 month'
          when 'quarterly'  then interval '3 months'
          when 'semiannual' then interval '6 months'
          when 'annual'     then interval '1 year'
        end
      )::date as occurrence_date
    from public.recurrences r
    where r.deleted_at is null
      and r.user_id    = auth.uid()
      and r.start_date <= p_end
      and r.end_date   >= p_start
  )
  select
    uuid_generate_v5(
      '00000000-0000-0000-0000-000000000000'::uuid,
      s.recurrence_id::text || '|' || s.occurrence_date::text
    )                       as id,
    s.user_id,
    s.type,
    s.amount,
    s.category_id,
    s.account_id,
    s.payment_method,
    s.occurrence_date       as transaction_date,
    s.description,
    s.recurrence_id,
    true                    as is_virtual
  from steps s
  where s.occurrence_date between p_start and p_end
    and not exists (
      select 1
      from public.recurrence_exceptions e
      where e.recurrence_id = s.recurrence_id
        and e.original_date = s.occurrence_date
    );
$$;

-- =============================================================================
-- Function: get_transactions(p_start, p_end)
--   Real transactions UNION virtual recurring occurrences.
--   This is what the app should query for listing/reports.
-- =============================================================================
create or replace function public.get_transactions(p_start date, p_end date)
returns table (
  id               uuid,
  user_id          uuid,
  type             public.transaction_type,
  amount           numeric,
  category_id      uuid,
  account_id       uuid,
  payment_method   public.payment_method,
  transaction_date date,
  description      text,
  recurrence_id    uuid,
  is_virtual       boolean
)
language sql
stable
security invoker
as $$
  select
    t.id, t.user_id, t.type, t.amount, t.category_id, t.account_id,
    t.payment_method, t.transaction_date, t.description, t.recurrence_id,
    false as is_virtual
  from public.transactions t
  where t.user_id          = auth.uid()
    and t.deleted_at      is null
    and t.transaction_date between p_start and p_end

  union all

  select * from public.expand_recurrences(p_start, p_end);
$$;

-- =============================================================================
-- Trigger: on auth.users INSERT → create profile + default account "Principal"
-- =============================================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id) values (new.id);

  insert into public.accounts (user_id, name, is_default)
  values (new.id, 'Principal', true);

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =============================================================================
-- Row Level Security
-- =============================================================================
alter table public.profiles              enable row level security;
alter table public.accounts              enable row level security;
alter table public.categories            enable row level security;
alter table public.recurrences           enable row level security;
alter table public.recurrence_exceptions enable row level security;
alter table public.transactions          enable row level security;

-- profiles: only the owner reads/updates. Insert is done by the trigger
-- (security definer), so no INSERT policy is exposed to clients.
create policy profiles_select on public.profiles
  for select using (id = auth.uid());

create policy profiles_update on public.profiles
  for update using (id = auth.uid())
  with check    (id = auth.uid());

-- accounts
create policy accounts_select on public.accounts
  for select using (user_id = auth.uid());
create policy accounts_insert on public.accounts
  for insert with check (user_id = auth.uid());
create policy accounts_update on public.accounts
  for update using (user_id = auth.uid())
  with check    (user_id = auth.uid());
create policy accounts_delete on public.accounts
  for delete using (user_id = auth.uid());

-- categories: predefined visible to everyone; user CRUD on their own only
create policy categories_select on public.categories
  for select using (is_predefined = true or user_id = auth.uid());
create policy categories_insert on public.categories
  for insert with check (user_id = auth.uid() and is_predefined = false);
create policy categories_update on public.categories
  for update using   (user_id = auth.uid() and is_predefined = false)
  with check         (user_id = auth.uid() and is_predefined = false);
create policy categories_delete on public.categories
  for delete using   (user_id = auth.uid() and is_predefined = false);

-- recurrences
create policy recurrences_select on public.recurrences
  for select using (user_id = auth.uid());
create policy recurrences_insert on public.recurrences
  for insert with check (user_id = auth.uid());
create policy recurrences_update on public.recurrences
  for update using (user_id = auth.uid())
  with check    (user_id = auth.uid());
create policy recurrences_delete on public.recurrences
  for delete using (user_id = auth.uid());

-- recurrence_exceptions: ownership inferred via parent recurrence
create policy rex_select on public.recurrence_exceptions
  for select using (exists (
    select 1 from public.recurrences r
    where r.id = recurrence_id and r.user_id = auth.uid()
  ));
create policy rex_insert on public.recurrence_exceptions
  for insert with check (exists (
    select 1 from public.recurrences r
    where r.id = recurrence_id and r.user_id = auth.uid()
  ));
create policy rex_update on public.recurrence_exceptions
  for update using (exists (
    select 1 from public.recurrences r
    where r.id = recurrence_id and r.user_id = auth.uid()
  ));
create policy rex_delete on public.recurrence_exceptions
  for delete using (exists (
    select 1 from public.recurrences r
    where r.id = recurrence_id and r.user_id = auth.uid()
  ));

-- transactions
create policy transactions_select on public.transactions
  for select using (user_id = auth.uid());
create policy transactions_insert on public.transactions
  for insert with check (user_id = auth.uid());
create policy transactions_update on public.transactions
  for update using (user_id = auth.uid())
  with check    (user_id = auth.uid());
create policy transactions_delete on public.transactions
  for delete using (user_id = auth.uid());

-- =============================================================================
-- Seed: predefined categories (global, immutable)
-- =============================================================================
insert into public.categories (user_id, name, type, color, icon, is_predefined) values
  (null, 'Alimentación',   'expense', '#22c55e', 'pi-shopping-cart', true),
  (null, 'Transporte',     'expense', '#3b82f6', 'pi-car',           true),
  (null, 'Ocio',           'expense', '#f59e0b', 'pi-ticket',        true),
  (null, 'Salud',          'expense', '#ef4444', 'pi-heart',         true),
  (null, 'Educación',      'expense', '#8b5cf6', 'pi-book',          true),
  (null, 'Vivienda',       'expense', '#06b6d4', 'pi-home',          true),
  (null, 'Servicios',      'expense', '#a855f7', 'pi-bolt',          true),
  (null, 'Ropa',           'expense', '#ec4899', 'pi-tag',           true),
  (null, 'Ahorros',        'expense', '#14b8a6', 'pi-wallet',        true),
  (null, 'Ingresos',       'income',  '#16a34a', 'pi-arrow-down',    true),
  (null, 'Salario',        'income',  '#10b981', 'pi-money-bill',    true),
  (null, 'Otros ingresos', 'income',  '#84cc16', 'pi-plus-circle',   true);
