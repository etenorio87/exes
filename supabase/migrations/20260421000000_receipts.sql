-- =============================================================================
-- Sub-fase 3.7: Receipts (adjuntar justificantes a transacciones)
-- =============================================================================

-- 1. Add receipt_url column to transactions
alter table public.transactions
  add column if not exists receipt_url text default null;

-- 2. Create receipts storage bucket (private)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'receipts',
  'receipts',
  false,
  10485760, -- 10 MB
  array['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
)
on conflict (id) do nothing;

-- 3. RLS policies for receipts bucket
-- Users can only access files under their own user_id prefix
create policy "receipts: owner select"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'receipts' and
    (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "receipts: owner insert"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'receipts' and
    (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "receipts: owner delete"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'receipts' and
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- 4. Update expand_recurrences to include receipt_url (always NULL for virtual rows)
-- Must drop first because PostgreSQL disallows changing return type via CREATE OR REPLACE
-- Ensure uuid-ossp is available (needed for uuid_generate_v5 in expand_recurrences)
create extension if not exists "uuid-ossp" schema extensions;

drop function if exists public.get_transactions(date, date);
drop function if exists public.expand_recurrences(date, date);

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
  is_virtual       boolean,
  receipt_url      text
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
    -- Deterministic UUID from recurrence+date using md5 (no extension dependency)
    md5(s.recurrence_id::text || '|' || s.occurrence_date::text)::uuid as id,
    s.user_id,
    s.type,
    s.amount,
    s.category_id,
    s.account_id,
    s.payment_method,
    s.occurrence_date       as transaction_date,
    s.description,
    s.recurrence_id,
    true                    as is_virtual,
    null::text              as receipt_url
  from steps s
  where s.occurrence_date between p_start and p_end
    and not exists (
      select 1
      from public.recurrence_exceptions e
      where e.recurrence_id = s.recurrence_id
        and e.original_date = s.occurrence_date
    );
$$;

-- 5. Update get_transactions to include receipt_url
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
  is_virtual       boolean,
  receipt_url      text
)
language sql
stable
security invoker
as $$
  select
    t.id, t.user_id, t.type, t.amount, t.category_id, t.account_id,
    t.payment_method, t.transaction_date, t.description, t.recurrence_id,
    false as is_virtual,
    t.receipt_url
  from public.transactions t
  where t.user_id          = auth.uid()
    and t.deleted_at      is null
    and t.transaction_date between p_start and p_end

  union all

  select * from public.expand_recurrences(p_start, p_end);
$$;
