# Changelog

## 1.0.0

Initial release. Replaces `jdgroup-portal-ui`. Every component below was
reconciled from up to three sources: `aam-dashboard`, `duties-dashboard`,
and the retired `jdgroup-portal-ui`. Decisions are recorded as each
component is ported (see the entries added in later tasks of the sila-ui
implementation plan).

### Button, Input, Label, Tooltip

Identical across `aam-dashboard`, `duties-dashboard`, and `jdgroup-portal-ui`
(only import-path/semicolon differences). Ported from `jdgroup-portal-ui`
verbatim.

### Tabs

`aam-dashboard` and `duties-dashboard` ship an identical branded Tabs
(slate list, bold `#093B49` active state) that neither app sourced from
`jdgroup-portal-ui` — whose own Tabs used unbranded shadcn defaults that no
app actually uses. Ported the branded version. Follow-up: `#093B49` is close
to but not identical to the `teal-800` token (`#073b49`) — audit whether
this should become a named token in a future release.

### Dialog, AlertDialog, ConfirmDialog, PromptDialog, Badge, Card

New to the design system — only existed in `duties-dashboard`, with no
equivalent in `aam-dashboard` or `jdgroup-portal-ui`. Ported verbatim
(focus-trap, portal rendering, and all accessibility behavior preserved),
only correcting import paths.

### ChartCard, DataBanner, KpiCard, SectionLabel

Only existed in `jdgroup-portal-ui` — ported as-is.

### Skeletons (Sk, KpiCardSkeleton, ChartCardSkeleton, PresentationChartCardSkeleton, TableRowsSkeleton)

`aam-dashboard`/`duties-dashboard` use an animated shimmer sweep;
`jdgroup-portal-ui` used a plain `animate-pulse` block. Ported the shimmer
version and added the missing `shimmer` keyframe/animation to `preset.cjs`
(previously only defined in each app's own `tailwind.config.js`, never in
the shared preset — so `jdgroup-portal-ui`'s `Sk` never actually had the
apps' polish available to it). Also ported `TableRowsSkeleton`
(`duties-dashboard`-only, no prior equivalent).

### AppShell, TopBar

Only `jdgroup-portal-ui` had a generic, slot/prop-driven version of these —
the apps' own `AppShell`/`TopBar` hardcode app-specific nav, auth, and i18n
directly and are not design-system material. Ported `jdgroup-portal-ui`'s
versions unchanged.

### Sidebar

Ported `jdgroup-portal-ui`'s prop-driven structure (nav groups/items as
config, mobile overlay, collapse toggle, tooltip-based collapsed labels),
but replaced the expanded-row active-state styling with the quiet
tinted-background treatment (`bg-[#E8F1F4]`, split icon/label color) that
`aam-dashboard` and `duties-dashboard` actually ship — `jdgroup-portal-ui`'s
own expanded rows used a solid brand-color fill that neither app uses. The
collapsed icon rail keeps its existing solid-fill treatment (unchanged,
matches all three sources). Also adopted the apps' cyan focus-ring
(`#0E7490`) on nav links, which `jdgroup-portal-ui`'s Sidebar previously
lacked entirely. Follow-up: `#0E7490` isn't a named token in the brand/teal
scale — audit in a future release.

### LoginShell

No app equivalent — ported from `jdgroup-portal-ui` as-is.

### DateRangeSelector, EntitySelector

`jdgroup-portal-ui`'s versions were already the correct base: generic
(`EntitySelector<T>` vs. the apps' hardcoded `ClientSelector`), with
strings passed as props instead of each app's own `useT()` import, and
already using `teal-*` token classes rather than the raw hex some app code
used elsewhere. Added the one real gap versus the apps: `focus-visible`
ring styling and `aria-label`s on the trigger buttons, present in
`aam-dashboard`'s forks but missing from `jdgroup-portal-ui` entirely.
