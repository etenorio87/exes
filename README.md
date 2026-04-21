# EXES

Aplicación web para gestión de finanzas personales.

## Stack

- **Frontend** — Angular 21 (standalone components, signals, control flow `@if`/`@for`)
- **UI** — PrimeNG 21 (tema Aura) + TailwindCSS 4 con preset oficial `tailwindcss-primeui`
- **Gráficos** — Chart.js
- **Backend** — Supabase (Auth + PostgreSQL + RLS)
- **i18n** — ngx-translate (ES + EN)
- **Hosting** — Cloudflare Pages
- **CI/CD** — GitHub Actions

## Estructura

```text
exes-monorepo/
├── src/
│   ├── app/
│   │   ├── core/             # SupabaseService y servicios transversales
│   │   └── ...
│   └── environments/         # SUPABASE_URL + anon key (públicas, protege RLS)
├── supabase/
│   ├── config.toml           # Configuración del CLI
│   └── migrations/           # Esquema versionado
├── angular.json
├── .postcssrc.json           # PostCSS para Tailwind v4
└── package.json
```

## Modelo de datos

| Tabla                   | Propósito                                                              |
| ----------------------- | ---------------------------------------------------------------------- |
| `profiles`              | Preferencias de usuario (moneda, formato de fecha, idioma, tema)       |
| `accounts`              | Cuentas/wallets (cuenta `Principal` creada por trigger al registrarse) |
| `categories`            | Categorías globales (predefinidas, inmutables) y propias del usuario   |
| `recurrences`           | Plantillas de transacciones recurrentes                                |
| `recurrence_exceptions` | Excepciones a la serie (estilo Google Calendar)                        |
| `transactions`          | Movimientos puntuales y modificaciones de ocurrencias                  |

Las recurrencias **no se materializan** en BD: la función `get_transactions(start, end)` expande las ocurrencias virtualmente al consultar y aplica las excepciones.

## Prerequisitos

- Node 20+ (probado con 24.x)
- npm 10+
- [Supabase CLI](https://supabase.com/docs/guides/local-development/cli/getting-started): `brew install supabase/tap/supabase`

## Desarrollo local

```bash
npm install
npm start
# → http://localhost:4200
```

## Base de datos

Las migraciones viven en `supabase/migrations/`. Para aplicarlas a un proyecto remoto:

```bash
supabase login
supabase link --project-ref <PROJECT_REF>
supabase db push
```

Crear una nueva migración:

```bash
supabase migration new <nombre_descriptivo>
```

## Build

```bash
npm run build
# Salida: dist/exes-monorepo/browser
```

## Roadmap

Desarrollo organizado por fases:

- **Fase 0 — Infraestructura** ✅
  Esquema de BD + RLS + función de expansión de recurrencias. Setup de Angular, PrimeNG, Tailwind, Supabase y CI/CD.

- **Fase 1 — MVP usable** ✅
  Autenticación, CRUD de categorías y transacciones con filtros y paginación, dashboard con gráficos Chart.js, i18n ES/EN, selector de idioma con banderas, papelera con restaurar, preferencias de usuario (moneda, formato de fecha).

- **Fase 2 — Productividad** ✅
  Transacciones recurrentes con patrón Google Calendar para edición. Reportes (mes vs anterior, evolución temporal, top categorías). Búsqueda, preferencias de usuario, modo oscuro.

- **Fase 3 — Power user** ✅
  Cuentas/wallets con UI y saldo acumulado. Presupuestos por categoría. Import/export CSV. Transferencias entre cuentas. Backup/restore selectivo + borrado de cuenta (GDPR). Adjuntar justificantes (Supabase Storage). PWA instalable. Login con Google OAuth.

- **Fase 4 — Diseño profesional** *(en progreso)*
  Icono y paleta de color con identidad visual propia (estilo fintech, símbolo €).
