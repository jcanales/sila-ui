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
