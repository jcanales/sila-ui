# sila-ui Design System Reference

Machine- and human-readable reference for every token and component in
`sila-ui@1.0.0`. Import everything from the package root: `import { Button, KpiCard, ... } from "sila-ui"`.

## Tailwind setup

Every visual class used by `sila-ui`'s components lives in this package's
own source, not the consumer's. A consumer's `tailwind.config.js` must
extend `sila-ui/preset` **and** include a `content` glob that scans the
installed package's compiled output, or those classes get purged:
```js
content: ["./index.html", "./src/**/*.{ts,tsx}", "./node_modules/sila-ui/dist/**/*.js"]
```
See the `sila-ui-scaffold` skill's "Wiring rules" for the full rationale.

## Tokens (baseline theme, `sila-ui/theme.css`)

| Token | Value | Notes |
|---|---|---|
| `--background` | `210 17% 97%` (HSL) | page background |
| `--foreground` | `0 0% 13%` | default text |
| `--card` | `0 0% 100%` | card surface |
| `--primary` | `224 93% 60%` | brand blue, `#3A6FF9` equivalent |
| `--primary-foreground` | `0 0% 100%` | text on primary |
| `--secondary` | `210 17% 95%` | |
| `--muted` | `210 17% 95%` | |
| `--muted-foreground` | `215 16% 47%` | |
| `--accent` | `210 17% 92%` | |
| `--destructive` | `0 72% 51%` | error red |
| `--border` / `--input` | `214 20% 88%` | |
| `--ring` | `224 93% 60%` | focus ring (brand blue) |
| `--radius` | `0.5rem` | base corner radius |
| `--primary-active` | `224 93% 52%` | `Button`'s `default` variant active/pressed state, one step darker than `--primary` |

Refresh theme (`sila-ui/theme-refresh.css`) keeps every value above
identical except `--primary-active` (which uses the refresh's own
one-step-darker value, `224 80% 52%`), and additionally changes: `--radius`
to `0.75rem`, widens/softens focus rings, loosens body `line-height` to
`1.6`, and gives `shadow-sm`/`shadow-lg` a real 3-step elevation feel. See
`CHANGELOG.md`'s `theme.css, theme-refresh.css` entry for the full
rationale.

## Brand color scale (both themes, from `preset.cjs`)

| Scale | DEFAULT | 500 | Full range |
|---|---|---|---|
| `brand` | `#3A6FF9` | `#3A6FF9` | 50–900, `brand-50` lightest to `brand-900` darkest |
| `teal` | `#073b49` (= `teal-800`) | `#077a96` | 50–900; DEFAULT and 500 differ — `bg-teal`/`text-teal` resolve to `#073b49`, not `#077a96` |
| `navy` | `#073b49` (= `teal-800`) | — (no 500 key) | only `DEFAULT`/`800`/`700` are defined |

Use Tailwind classes (`bg-brand-500`, `text-teal-700`, `border-teal-800`)
— never hardcode these hex values in new code.

## Components

### Button (`primitives/Button.tsx`)
Props: `variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"`, `size?: "default" | "sm" | "lg" | "icon"`, `asChild?: boolean`, plus all native `<button>` attributes.
```tsx
<Button variant="destructive" size="sm" onClick={onDelete}>Delete</Button>
```

### Input (`primitives/Input.tsx`)
All native `<input>` attributes. No variants.
```tsx
<Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Search…" />
```

### Label (`primitives/Label.tsx`)
Wraps Radix `Label.Root`. Use with `htmlFor`.

### Tabs / TabsList / TabsTrigger / TabsContent (`primitives/Tabs.tsx`)
Branded active state: `data-[state=active]` renders `bg-[#093B49] text-white`. Do not restyle — this is the production look both dashboards ship.
```tsx
<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="details">Details</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">...</TabsContent>
</Tabs>
```

### Tooltip / TooltipProvider / TooltipTrigger / TooltipContent (`primitives/Tooltip.tsx`)
`AppShell` already wraps its subtree in `TooltipProvider` — don't nest another one inside a page.

### Dialog (`primitives/Dialog.tsx`)
Low-level modal shell. Props: `{ open, onClose, title, children, footer, className? }`. Prefer the higher-level `AlertDialog`/`ConfirmDialog`/`PromptDialog` unless you need a fully custom body.

### AlertDialog (`primitives/AlertDialog.tsx`)
Props: `{ open, title, message, onClose }`. Single "OK" button.

### ConfirmDialog (`primitives/ConfirmDialog.tsx`)
Props: `{ open, title, message, confirmLabel?, cancelLabel?, destructive?, onConfirm, onCancel }`. Set `destructive` for delete-type confirmations (renders the confirm button in the `destructive` Button variant).

### PromptDialog (`primitives/PromptDialog.tsx`)
Props: `{ open, title, label?, defaultValue?, confirmLabel?, onSubmit, onCancel }`. Single-field text input dialog.

### Badge (`primitives/Badge.tsx`)
Props: `variant?: "brand" | "success" | "warning" | "danger" | "neutral"` (default `neutral`).
```tsx
<Badge variant="success">Active</Badge>
```

### Card / CardHeader / CardContent (`primitives/Card.tsx`)
Generic bordered surface — use for anything that isn't a `KpiCard`/`ChartCard` (which are more opinionated dashboard-specific cards).

### KpiCard (`cards/KpiCard.tsx`)
Props: `{ label, value, subLabel?, icon?, trend?: "up"|"down"|"neutral", trendValue?, iconClassName?, tooltip? }`.

### ChartCard / PresentationChartCard (`cards/ChartCard.tsx`)
`ChartCard` is a simple bordered container with title/subtitle/action header. `PresentationChartCard` adds an optional `footer` slot below a divider — use for charts with a legend or summary row underneath.

### DataBanner (`cards/DataBanner.tsx`)
Props: `{ error: string | null, onRetry?, retryLabel?, connectionFallback? }`. Renders nothing when `error` is null. Automatically swaps DB/session/connection-flavored errors for a friendlier `connectionFallback` message.

### SectionLabel (`cards/SectionLabel.tsx`)
Plain uppercase section heading — no props but `children`.

### Sk, KpiCardSkeleton, ChartCardSkeleton, PresentationChartCardSkeleton, TableRowsSkeleton (`cards/Skeletons.tsx`)
Loading placeholders matching each card's real layout. `Sk` is the base shimmer block — compose custom skeletons from it if no pre-built skeleton fits.

### AppShell (`layout/AppShell.tsx`)
Props: `{ sidebar: ReactNode, topbar: ReactNode, children: ReactNode, tooltipDelay?: number }`. The consuming app owns `collapsed`/`mobileOpen` state and passes fully-configured `<Sidebar>`/`<TopBar>` elements as the `sidebar`/`topbar` props — see `apps/starter/src/App.tsx` for the canonical pattern.

### Sidebar (`layout/Sidebar.tsx`)
Props: `{ brand, topItem?, groups: SidebarNavGroup[], bottomItems?, footer?, collapsed, onToggle, mobileOpen?, onMobileClose?, widthExpanded?, widthCollapsed? }`. `SidebarNavGroup` is `{ key, label, icon, items: SidebarNavItem[], defaultOpen? }`; `SidebarNavItem` is `{ path, hash?, icon, label }`. Expanded active rows render with a tinted `bg-[#E8F1F4]` background, not a solid fill — do not override this.

### TopBar (`layout/TopBar.tsx`)
Props: `{ portalName, user?: { name, role? } | null, onLogout?, onMobileMenuToggle?, centerSlot?, startSlot?, endSlot?, showNotifications?, onNotificationsClick?, notificationsLabel?, logoutLabel? }`. Use `startSlot`/`centerSlot`/`endSlot` for app-specific additions (e.g. a language toggle) — do not fork the component to add one.

### LoginShell (`layout/LoginShell.tsx`)
Props: `{ brandPanel?, mobileHeader?, strings: LoginShellStrings, onSubmit, onSuccess, initialUsername?, initialPassword?, brandColor?, buttonColor? }`. `strings` must supply every key in `LoginShellStrings` (see `DESIGN_SYSTEM.md`'s type reference or the type itself) — this is one of the few components with no baked-in English fallback, by design (it's meant to be fully localized per app).

### DateRangeSelector (`filters/DateRangeSelector.tsx`)
Props: `{ preset, dateFrom, dateTo, onPresetChange, onCustomChange, strings: DateRangeStrings }`. Pair with a `createDateStore()` instance — `preset`/`dateFrom`/`dateTo` and the two change callbacks map directly onto that store's fields/actions.

### EntitySelector<T> (`filters/EntitySelector.tsx`)
Generic — pass `items: T[]`, `getKey`/`getLabel`/`getSubtitle?`/`getBadge?` accessor functions, and `strings: EntitySelectorStrings`. Use for any "pick one of N named things" dropdown (clients, facilities, warehouses), not just clients.

### Store factories (`stores/`)
`createAuthStore(options)`, `createDateStore(options)`, `createLangStore(options)`, `createT(useLangStore, translations)` — each returns a Zustand store hook (or, for `createT`, a `useT()` hook). Call once per app to produce a concrete store instance; never call the factory more than once for the same concern.

### API client (`api/`)
`createApiClient(options): ApiClient` — returns `{ get, post, request }`, all `Promise`-based, auto-attaches a bearer token from `localStorage`, and calls `onUnauthorized` on a 401. `createRequireAuth(useAuthStore, loginPath?)` returns a `RequireAuth` route-guard component.
