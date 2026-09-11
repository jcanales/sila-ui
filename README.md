# sila-ui

The shared JD Group design system: a Tailwind preset, theme tokens
(baseline + refresh), React primitives/cards/layout shells/filters, and
Zustand store factories — plus a Claude Code plugin that helps scaffold new
portals and reference the design system while writing UI code.

## Package layout

- `packages/sila-ui/` — the design system package itself (published as the
  `sila-ui` npm package name, though not currently published to a
  registry — consumed via `file:` links). See
  `packages/sila-ui/DESIGN_SYSTEM.md` for the full token/component
  reference and `packages/sila-ui/CHANGELOG.md` for release history.
- `packages/sila-plugin/` — a Claude Code plugin (`sila-ui-kit`) with
  skills for scaffolding a new app against `sila-ui`
  (`sila-ui-scaffold`) and for referencing its components/tokens while
  writing UI code (`sila-ui-reference`).
- `apps/starter/` — a minimal reference consumer app (Vite + React + TS)
  that imports `sila-ui` via a `file:` link. Mirror its conventions when
  scaffolding a new app by hand.

## Two themes, one component set

`packages/sila-ui/theme.css` (baseline) and `theme-refresh.css` (refresh)
target the exact same components — only spacing/radius/shadow/interactive-state
tokens differ; brand colors are identical in both. A consuming app picks a
theme by importing one stylesheet or the other:

```css
@import "sila-ui/theme.css";        /* or */
@import "sila-ui/theme-refresh.css";
```

See `docs/comparison.html` for a side-by-side (open it directly in a
browser — no build step) and `packages/sila-ui/DESIGN_SYSTEM.md` for the
full token/component reference.

## Status

v1.0.0. Replaces `portal-kit`/`jdgroup-portal-ui`, reconciled from
`aam-dashboard`, `duties-dashboard`, and the old `portal-ui` (see
`packages/sila-ui/CHANGELOG.md` for per-component provenance). Neither
`aam-dashboard`/`duties-dashboard` nor `portal-kit` itself have been
migrated to consume this package yet — that's follow-up work, not done
here. This repo is local-only for now: no git remote configured, not
published to any npm registry.

## Getting started

```bash
npm install          # installs workspace deps; also builds sila-ui (see below)
npm run dev:starter   # boots apps/starter at http://localhost:5173
```

`sila-ui` ships compiled from `packages/sila-ui/dist/`, which is
gitignored and not built automatically by `npm install` alone — the root
`prepare` script (`npm run build:ui`) runs after install to produce it, so
a fresh clone works out of the box. If you ever see a "module not found"
error for `sila-ui` after skipping `npm install` (e.g. restoring
`node_modules` from a cache), run `npm run build:ui` manually.

Other root scripts:

```bash
npm run build:ui     # tsc -p packages/sila-ui/tsconfig.json
npm run dev:starter   # runs apps/starter's Vite dev server
```
