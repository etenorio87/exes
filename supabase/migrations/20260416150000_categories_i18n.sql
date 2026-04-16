-- =============================================================================
-- categories.i18n_key
--
-- Predefined categories need to be displayed in the user's chosen UI language.
-- Storing the raw Spanish name in `name` is fine as a fallback, but the UI
-- needs a stable key to look up translations from i18n JSON.
--
--   - is_predefined = true  → i18n_key set, UI uses translate(i18n_key)
--   - is_predefined = false → i18n_key NULL, UI uses name as-is
--
-- A partial CHECK enforces the convention so future seeds don't forget it.
-- =============================================================================

alter table public.categories
  add column i18n_key text;

-- Backfill the existing predefined categories
update public.categories set i18n_key = 'categories.predefined.food'         where is_predefined and lower(name) = 'alimentación';
update public.categories set i18n_key = 'categories.predefined.transport'    where is_predefined and lower(name) = 'transporte';
update public.categories set i18n_key = 'categories.predefined.leisure'      where is_predefined and lower(name) = 'ocio';
update public.categories set i18n_key = 'categories.predefined.health'       where is_predefined and lower(name) = 'salud';
update public.categories set i18n_key = 'categories.predefined.education'    where is_predefined and lower(name) = 'educación';
update public.categories set i18n_key = 'categories.predefined.housing'      where is_predefined and lower(name) = 'vivienda';
update public.categories set i18n_key = 'categories.predefined.services'     where is_predefined and lower(name) = 'servicios';
update public.categories set i18n_key = 'categories.predefined.clothing'     where is_predefined and lower(name) = 'ropa';
update public.categories set i18n_key = 'categories.predefined.savings'      where is_predefined and lower(name) = 'ahorros';
update public.categories set i18n_key = 'categories.predefined.income'       where is_predefined and lower(name) = 'ingresos';
update public.categories set i18n_key = 'categories.predefined.salary'       where is_predefined and lower(name) = 'salario';
update public.categories set i18n_key = 'categories.predefined.other_income' where is_predefined and lower(name) = 'otros ingresos';

-- Enforce the convention going forward: predefined => i18n_key required, user => i18n_key forbidden
alter table public.categories
  add constraint categories_i18n_key_for_predefined
  check (
    (is_predefined = true and i18n_key is not null) or
    (is_predefined = false and i18n_key is null)
  );

-- Unique per language space — prevents accidental duplicate keys in future seeds
create unique index categories_i18n_key_unique
  on public.categories (i18n_key)
  where i18n_key is not null;
