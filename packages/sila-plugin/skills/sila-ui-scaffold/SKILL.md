---
name: sila-ui-scaffold
description: Use when the user wants to start a new JD Group internal portal/dashboard app, or wire an existing app to consume the sila-ui design system. Activate for "new portal", "scaffold dashboard", "set up a new app with the design system", "use sila-ui". Produces a Vite + React + TS project pre-wired with the Tailwind preset, theme.css, AppShell, store factories, and a sample dashboard page.
---

# sila-ui Portal Scaffold

This skill bootstraps a new internal portal app that consumes `sila-ui`
(the shared design system in `sila-ui/packages/sila-ui`). The reference
consumer is `apps/starter` in the `sila-ui` repo — when in doubt, mirror
its conventions.

## Inputs to confirm with the user before scaffolding

1. **App name** (kebab-case, e.g. `wms-dashboard`).
2. **Target directory** — usually `/sinergya-projects/clients/jdgroup/<app-name>/`.
3. **Backend?** Skip / new Express+TS / connect to existing API (need base URL).
4. **Languages?** Default `en` + `es`. Confirm or change.
5. **Brand panel content** for the login screen (title, subtitle, feature list — bilingual).
6. **Theme?** `theme.css` (baseline, current production look) or `theme-refresh.css` (polish variant) — default to baseline unless the user says otherwise.

If the user just says "scaffold a portal" without specifics, default to:
`en+es`, no backend, empty translations stub, baseline theme.

## Project structure to produce

```
<app-name>/
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── index.html
├── .gitignore
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css                 # imports sila-ui/theme.css (or theme-refresh.css) then app overrides
    ├── i18n/
    │   ├── translations.ts       # stub with en + es objects
    │   └── useT.ts               # createT(useLangStore, translations)
    ├── store/
    │   ├── authStore.ts          # createAuthStore(...) instance
    │   ├── dateStore.ts          # createDateStore(...) instance
    │   └── langStore.ts          # createLangStore(...) instance
    ├── lib/
    │   └── api.ts                # createApiClient(...) instance
    ├── components/layout/
    │   └── AppShell.tsx          # consumer wrapper around <Sidebar/> + <TopBar/> with app's nav config
    ├── pages/
    │   ├── LoginPage.tsx         # uses <LoginShell/>
    │   └── DashboardPage.tsx     # sample page using KpiCard + ChartCard
    └── vite-env.d.ts
```

## Wiring rules (must follow)

- `tailwind.config.js` MUST extend `require('sila-ui/preset')` (or the ESM
  `import preset from "sila-ui/preset"` form, matching `apps/starter`) and
  add only the consumer's `content` paths.
- `src/index.css` MUST start with `@import 'sila-ui/theme.css';` (or
  `sila-ui/theme-refresh.css` if the user picked the refresh theme) before
  anything else.
- The package is consumed via a **file: link** (no registry). In
  `package.json`:
  ```json
  "dependencies": {
    "sila-ui": "file:../sila-ui/packages/sila-ui"
  }
  ```
  Adjust the relative path based on where the new app sits relative to
  `sila-ui/`.
- All `localStorage` keys MUST be namespaced to the app: `<app-name>-auth`,
  `<app-name>-auth-token`, `<app-name>-dates`, `<app-name>-lang`.
- The auth store's `transformUsername` defaults to appending
  `@jdgroup.net` if no `@` is present.

## Translation keys the package needs

These are the only strings the package itself reads. Consumer must provide
them in their `translations.ts`:

- `dateRange.{ thisMonth, lastMonth, last3Months, last6Months, ytd, lastYear, custom, customRange, selectRange, apply }`
- `clientSelector.{ allEntities, searchPlaceholder, noResults, loading? }` (only if the app uses `EntitySelector`)
- `login.{ formTitle, formSubtitle?, usernameLabel, usernamePlaceholder?, passwordLabel, passwordPlaceholder?, signIn, signingIn, invalidCredentials, demoNote? }`

Everything else (sidebar labels, page titles, KPI labels) belongs to the
app.

## After scaffolding

1. Run `npm install` in the new app directory.
2. Run `npm install` in `sila-ui/` (root) so workspaces link.
3. Run `npm -w sila-ui run build` to emit the package's `dist/`.
4. Run `npm run dev` in the new app — it should boot at
   http://localhost:5173 and show the login page.

If `LoginPage` shows but the form errors with "Network error", that's
expected when no backend is wired — the demo credentials (if configured)
should still log in.

## What this skill does NOT do

- Does not create the backend. If the user wants one, run a separate
  scaffold for an Express+TS+mssql backend and wire `VITE_API_URL`
  accordingly.
- Does not write domain pages beyond the sample `DashboardPage.tsx`. Domain
  pages are the user's job — but follow the conventions in
  `sila-ui/apps/starter/src/pages/DashboardPage.tsx` (KPI grid →
  presentation charts → small chart grid).
- Does not modify `aam-dashboard`, `duties-dashboard`, `portal-kit`, or any
  other existing app. New app only.
