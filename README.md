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
