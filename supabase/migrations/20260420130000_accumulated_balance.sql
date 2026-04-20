-- =============================================================================
-- EXES — Accumulated balance RPC
--
-- Returns the running balance per account up to a given date.
-- Considers both real transactions and virtual recurrence occurrences.
-- =============================================================================

create or replace function public.get_accumulated_balances(p_end date)
returns table (
  account_id uuid,
  income     numeric,
  expenses   numeric,
  balance    numeric
)
language sql
stable
security invoker
as $$
  with all_tx as (
    -- Real transactions up to p_end
    select t.account_id, t.type, t.amount
    from public.transactions t
    where t.user_id = auth.uid()
      and t.deleted_at is null
      and t.transaction_date <= p_end

    union all

    -- Virtual recurrences up to p_end (from earliest possible date)
    select v.account_id, v.type, v.amount
    from public.expand_recurrences('1970-01-01'::date, p_end) v
  )
  select
    a.id as account_id,
    coalesce(sum(case when tx.type = 'income' then tx.amount end), 0) as income,
    coalesce(sum(case when tx.type = 'expense' then tx.amount end), 0) as expenses,
    coalesce(sum(case when tx.type = 'income' then tx.amount else -tx.amount end), 0) as balance
  from public.accounts a
  left join all_tx tx on tx.account_id = a.id
  where a.user_id = auth.uid()
    and a.deleted_at is null
  group by a.id;
$$;
