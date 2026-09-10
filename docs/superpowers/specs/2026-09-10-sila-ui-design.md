# sila-ui — Design Spec

**Date:** 2026-09-10
**Status:** Approved for planning
**Author:** it@jdgroup.net (via Claude Code)

## Problem

JD Group's intended shared design system, `portal-kit/packages/portal-ui` (npm name `jdgroup-portal-ui`), is not actually used by either of its two consumer apps:

- `aam-dashboard` and `duties-dashboard` each forked their own `components/ui/` and `components/layout/` instead of importing from `jdgroup-portal-ui`.
- `duties-dashboard`'s fork went further, adding `Dialog`, `AlertDialog`, `ConfirmDialog`, `PromptDialog`, `Card`, and `Badge` — none of which exist in `portal-ui`.
- `portal-kit` itself has no git repository, so it cannot be cloned or shared with the team as-is, unlike `aam-dashboard`/`duties-dashboard` which are each hosted at `github.com/it-jd-group/*`.
- There is no mechanism today for Claude Design (the visual canvas tool) to work from the same tokens/components as the code.

Decision (made in brainstorming): rather than reconciling into `portal-ui` in place, start a new package, `sila-ui`, that fully replaces `portal-kit`/`jdgroup-portal-ui` once built. This is treated as a real `1.0.0` release rather than an in-place patch, since neither current app actually depends on `portal-ui`'s existing component API today — this is the one moment to fix the API surface without a live migration cost.

## Goals

1. One design system package, `sila-ui`, that becomes the single source of truth for JD Group internal apps — visual tokens, components, layout shells, and the app-shell plumbing (auth/date/lang stores, API client) that `portal-ui` already provides today.
2. The existing look (the one aam-dashboard/duties-dashboard "loved" version) ships as `sila-ui`'s baseline theme, built from a reconciled harvest of both dashboards' component forks plus the current `portal-ui`.
3. A second, purely visual "refresh" theme — same components, same structure, different spacing/typography/shadow/button-state tokens — so baseline and refresh can be compared before deciding which one apps adopt.
4. Claude Code, when asked to build UI against `sila-ui`, must use the exact same components, colors, fonts, shadows, and interactive states as the package defines — no improvisation.
5. The same tokens and components are also usable inside Claude Design, as an editable canvas, so design work can happen there without drifting from the code.
6. Shareable with the team: `sila-ui` is its own git repo, structured like the existing `aam-dashboard`/`duties-dashboard` repos.

## Non-goals

- Migrating `aam-dashboard` or `duties-dashboard` to actually consume `sila-ui` (retiring their forks and `portal-kit`) — deferred to a follow-up project once baseline vs. refresh is decided.
- Redesigning the visual language structurally (new layout paradigms, new information architecture). The refresh theme is explicitly "same bones" — polish only (spacing, typography, shadow, button/focus states).
- Publishing to a public or private npm registry. Consumption stays via npm workspace `file:` links, matching current `portal-kit` convention, unless a future project decides otherwise.
- Pushing the new repo to GitHub as part of this project — repo creation/push happens only on the user's explicit go-ahead, handled outside this spec.

## Repo & package structure

New standalone directory, own git repo (not nested inside `portal-kit`):

```
clients/jdgroup/sila-ui/
├── package.json                 # npm workspaces root
├── packages/
│   ├── sila-ui/                 # npm name: "sila-ui"
│   │   ├── package.json
│   │   ├── theme.css            # baseline tokens
│   │   ├── theme-refresh.css    # refresh tokens (spacing/type/shadow/focus-ring only)
│   │   ├── preset.cjs           # Tailwind preset, theme-agnostic (consumes CSS vars)
│   │   ├── CHANGELOG.md
│   │   └── src/
│   │       ├── primitives/      # Button, Input, Tabs, Label, Tooltip, Dialog, AlertDialog,
│   │       │                    # ConfirmDialog, PromptDialog, Badge
│   │       ├── cards/           # KpiCard, ChartCard, Card, DataBanner, SectionLabel, Skeletons
│   │       ├── layout/          # AppShell, Sidebar, TopBar, LoginShell
│   │       ├── filters/         # DateRangeSelector, EntitySelector
│   │       ├── stores/          # createAuthStore, createDateStore, createLangStore, createT
│   │       ├── api/             # createApiClient, createRequireAuth
│   │       └── index.ts
│   └── sila-plugin/             # Claude Code plugin
│       ├── .claude-plugin/plugin.json
│       └── skills/
│           ├── sila-ui-scaffold/       # ported from jdgroup-portal-scaffold, retargeted
│           └── sila-ui-reference/      # NEW — full token + component reference doc
└── apps/
    └── starter/                 # sample consumer app, ported from portal-kit/apps/starter
```

## Content migration (the harvest)

For each component present in `aam-dashboard/src/components/ui`, `duties-dashboard/src/components/ui`, and `portal-kit/packages/portal-ui/src/primitives|cards`:

1. Diff the implementations.
2. Pick one canonical version (default heuristic: the most feature-complete one — e.g. duties-dashboard's `Dialog`/`AlertDialog`/`ConfirmDialog`/`PromptDialog`/`Card`/`Badge`, since portal-ui and aam-dashboard don't have equivalents at all — but check case-by-case for regressions, e.g. aam-dashboard's `Skeleton`/`SearchButton` may be more refined).
3. Port the chosen version into `sila-ui/src/primitives` or `/cards`, adjusting only what's needed to drop app-specific coupling (hardcoded strings, app-specific types).
4. Record the choice and rationale in `CHANGELOG.md` under a `1.0.0` heading.
5. Layout shells (`AppShell`, `Sidebar`, `TopBar`), filters, stores, and API client are ported from `portal-ui` as-is (no dashboard fork currently diverges from these in ways that matter), adjusted only for the new package name.

Output of this phase is `sila-ui@1.0.0`, published to its own `dist/` via the package's build script — no dashboard is touched yet (non-goal).

## Baseline vs. refresh theme

Both themes ship in the same package and target the same component code — only the CSS custom properties differ. `theme.css` carries the current brand values (from `jdgroup-brandbook.md` / current Tailwind configs: `--primary: 224 93% 60%` i.e. brand blue `#3A6FF9`, existing radius/shadow/spacing). `theme-refresh.css` redefines only:

- Spacing scale (if the app uses non-default Tailwind spacing tokens)
- Type scale (font sizes/line-heights/weights for headings and body)
- Shadow scale (card/dropdown/modal elevation)
- Interactive states (hover/active/focus-ring treatment on buttons and inputs)

Brand hue values (brand/teal/navy palettes) stay identical in both — this is a polish pass, not a rebrand. A consuming app switches themes by importing `sila-ui/theme.css` or `sila-ui/theme-refresh.css`, not by installing anything different.

## Claude Code plugin (`sila-plugin`)

- **`sila-ui-scaffold`**: functionally identical to today's `jdgroup-portal-scaffold` skill, retargeted at `sila-ui` (package name, file paths, localStorage key prefixes).
- **`sila-ui-reference`** (new skill): loads a `DESIGN_SYSTEM.md` reference doc enumerating every token (name, value, purpose) and every component (props, variants, a usage snippet) from `sila-ui`. Triggers whenever a user asks Claude Code to build or modify UI in a project that consumes `sila-ui`, so generated code always uses the package's real components and token values rather than inventing new ones. This is the mechanism satisfying "same exact components, colors, fonts, shadows, active button color."

## Visual deliverables

1. **Comparison artifact** (Claude Artifact, HTML): baseline-theme and refresh-theme rendered side by side — token swatches and each component's variants — plus one assembled sample screen per theme, so the two can be compared directly before choosing.
2. **Claude Design canvas** (built via the `design` skill): a design-system canvas seeded from the same tokens/components — color/type/spacing/shadow swatches, every component shown in its variants, plus 1-2 assembled sample screens (mirroring `DashboardPage`). Intended as a living, hand-editable reference in Claude Design, kept in sync with `sila-ui` manually (no automated sync in this phase).

## Testing

- `tsc --noEmit` on `packages/sila-ui` and `packages/sila-plugin` as a build gate.
- Manual visual check: `apps/starter` boots against both `theme.css` and `theme-refresh.css` and is screenshotted for the comparison artifact.
- No automated visual regression tooling introduced in this phase (deferred — see Non-goals).

## Open decisions deferred to implementation plan

- Exact per-component "canonical version" choices from the harvest (step 2 above) — enumerated during implementation, not pre-decided here, since it requires reading each file.
- Whether `sila-plugin` is distributed to teammates via a marketplace entry or manual `.claude` config once the repo exists on GitHub.
