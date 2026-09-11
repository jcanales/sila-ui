# sila-ui — Project Notes

**Stack:** npm workspaces monorepo — `packages/sila-ui` (React + TS design-system package: Tailwind preset, theme CSS, Radix-based primitives, Zustand store factories), `packages/sila-plugin` (Claude Code plugin), `apps/starter` (Vite + React reference consumer). No test suite by design — the build gate is `tsc --noEmit` + `npm run build`.

**Status (as of 2026-09-10):** v1.0.0 shipped on `main`. Local-only — no git remote configured, never pushed. Not published to any npm registry; every consumer uses a `file:` link.

---

## Why this exists

Replaces `portal-kit`/`jdgroup-portal-ui`, which neither `aam-dashboard` nor `duties-dashboard` actually consumed — each had forked its own local `components/ui/`. `sila-ui@1.0.0` reconciles all three sources (`aam-dashboard`, `duties-dashboard`, the old `portal-ui`) into one package. Per-component provenance and the reasoning behind each reconciliation choice is recorded in `packages/sila-ui/CHANGELOG.md` — read it before assuming a component's current shape is arbitrary.

**Migration status:** `aam-dashboard`, `duties-dashboard`, and `portal-kit` itself have **not** been migrated to consume this package yet — that was an explicit non-goal of the v1.0.0 project, deferred to a follow-up. Don't assume those apps import from here; check before touching their UI code on the assumption that it now flows through `sila-ui`.

## Baseline vs. refresh theme

Two theme stylesheets (`packages/sila-ui/theme.css`, `theme-refresh.css`) target the *same* component code — only CSS custom properties differ (spacing/radius/shadow/interactive-state; brand hues are identical by design). A consuming app picks one by choosing which stylesheet it imports. If you add a new component, don't hardcode a color/shadow/radius value that should vary by theme — route it through a token so both themes pick it up.

`preset.cjs` is shared unchanged by both themes (see its own top comment) — if a token needs different *values* per theme, it goes in the theme CSS files' `:root`/`@layer utilities`, not the preset. This was a deliberate trade-off (reviewed and kept as-is once already): the alternative — diverging `preset.cjs` per theme — was rejected because it would break the "one preset, swap the stylesheet" consumption model.

## Known follow-ups (parked, not bugs to silently fix)

- **`#093B49` (Tabs/Sidebar active state) is not byte-identical to the `teal-800` token (`#073b49`)** — close but distinct, flagged since the harvest for a future token audit. Don't "fix" this by silently snapping it to `teal-800` without checking against the live apps first — the value was deliberately kept literal because it's what's actually shipped.
- **Date parsing in `stores/createDateStore.ts`** has a UTC-offset quirk inherited from the old `portal-ui` (`new Date("YYYY-MM-DD")` parses as UTC midnight, which is the previous day in UTC-behind zones like Tijuana/San Diego). Real, unfixed, out of scope for the harvest project.
- **`sila-ui-scaffold` skill's prescribed app structure** (i18n/store/lib/LoginPage) doesn't match what `apps/starter` actually contains (a bare KPI/chart demo, no auth wiring) — the skill's own inputs-gathering step compensates in practice, but the mismatch hasn't been resolved.

## Comparison artifact

`docs/comparison.html` is a static, dependency-free HTML file (no build step) comparing baseline vs. refresh — token swatches, all component variants, and a sample screen wrapped in an actual `Sidebar`+`TopBar` chrome mockup (verified byte-for-byte against `duties-dashboard`'s live source, not invented). If you change `Sidebar.tsx`/`TopBar.tsx`/either theme file, re-check this file's mockup CSS (`.mini-sidebar`, `.mini-topbar`, etc.) for drift — it's hand-maintained, not generated from the components.

It has not been published as a separate Claude Artifact (the spec asked for one; that publish decision was deferred to the user rather than done autonomously — see `packages/sila-ui/CHANGELOG.md`'s Deliverables section for the published Claude Design canvas URL, which *was* published).

## Before changing tokens or components

Read `packages/sila-ui/DESIGN_SYSTEM.md` first — it's the file the `sila-ui-reference` Claude Code skill loads to answer "what components/tokens exist" for anyone building UI against this package. If you add, rename, or restyle anything in `packages/sila-ui/src/`, update `DESIGN_SYSTEM.md` and `CHANGELOG.md` in the same change — a design system whose docs drift from its code defeats its own purpose.
