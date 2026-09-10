// utilities
export { cn } from "./lib/cn";
export { chartPalette, tooltipStyle, MONTHS } from "./lib/palette";

// primitives
export { Button, buttonVariants, type ButtonProps } from "./primitives/Button";
export { Input, type InputProps } from "./primitives/Input";
export { Label } from "./primitives/Label";
export { Tabs, TabsList, TabsTrigger, TabsContent } from "./primitives/Tabs";
export {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "./primitives/Tooltip";
export { Dialog } from "./primitives/Dialog";
export { AlertDialog } from "./primitives/AlertDialog";
export { ConfirmDialog } from "./primitives/ConfirmDialog";
export { PromptDialog } from "./primitives/PromptDialog";
export { Badge, badgeVariants, type BadgeProps } from "./primitives/Badge";
export { Card, CardHeader, CardContent } from "./primitives/Card";

// cards
export { SectionLabel } from "./cards/SectionLabel";
export { KpiCard, type KpiCardProps } from "./cards/KpiCard";
export {
  ChartCard,
  PresentationChartCard,
  type ChartCardProps,
  type PresentationChartCardProps,
} from "./cards/ChartCard";
export { DataBanner, type DataBannerProps } from "./cards/DataBanner";
export {
  Sk,
  KpiCardSkeleton,
  ChartCardSkeleton,
  PresentationChartCardSkeleton,
  TableRowsSkeleton,
} from "./cards/Skeletons";

// layout
export { AppShell, type AppShellProps } from "./layout/AppShell";
export {
  Sidebar,
  type SidebarProps,
  type SidebarNavGroup,
  type SidebarNavItem,
} from "./layout/Sidebar";
export { TopBar, type TopBarProps, type TopBarUser } from "./layout/TopBar";
export {
  LoginShell,
  type LoginShellProps,
  type LoginShellStrings,
} from "./layout/LoginShell";

// filters
export {
  DateRangeSelector,
  type DateRangeSelectorProps,
  type DateRangeStrings,
} from "./filters/DateRangeSelector";
export {
  EntitySelector,
  type EntitySelectorProps,
  type EntitySelectorStrings,
} from "./filters/EntitySelector";

// stores
export {
  createDateStore,
  computePresetRange,
  PRESET_LABELS,
  type DatePreset,
  type DatePresetExcludingCustom,
  type DateState,
  type CreateDateStoreOptions,
} from "./stores/createDateStore";
export {
  createAuthStore,
  type AuthState,
  type AuthUser,
  type CreateAuthStoreOptions,
} from "./stores/createAuthStore";
export {
  createLangStore,
  type LangState,
  type CreateLangStoreOptions,
} from "./stores/createLangStore";
export { createT } from "./stores/createT";

// api
export {
  createApiClient,
  type ApiClient,
  type CreateApiClientOptions,
} from "./api/createApiClient";
export { createRequireAuth } from "./api/createRequireAuth";
