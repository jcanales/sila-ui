import * as React from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { PanelLeftClose, PanelLeft, X } from "lucide-react";
import { cn } from "../lib/cn";
import { Tooltip, TooltipContent, TooltipTrigger } from "../primitives/Tooltip";

export interface SidebarNavItem {
  path: string;
  hash?: string;
  icon: React.ReactNode;
  label: string;
}

export interface SidebarNavGroup {
  key: string;
  label: string;
  icon: React.ReactNode;
  items: SidebarNavItem[];
  defaultOpen?: boolean;
}

export interface SidebarProps {
  brand: React.ReactNode;
  topItem?: SidebarNavItem;
  groups: SidebarNavGroup[];
  bottomItems?: SidebarNavItem[];
  footer?: React.ReactNode;
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
  widthExpanded?: string;
  widthCollapsed?: string;
}

const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E7490] focus-visible:ring-offset-2";

export function Sidebar({
  brand,
  topItem,
  groups,
  bottomItems = [],
  footer,
  collapsed,
  onToggle,
  mobileOpen,
  onMobileClose,
  widthExpanded = "md:w-64",
  widthCollapsed = "md:w-14",
}: SidebarProps) {
  const location = useLocation();
  const [openGroups, setOpenGroups] = React.useState<Record<string, boolean>>(
    () =>
      Object.fromEntries(
        groups.map((g) => [g.key, g.defaultOpen ?? true])
      )
  );

  const toggleGroup = (key: string) =>
    setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));

  // Expanded rows use a quiet tinted-background active state (matching what
  // aam-dashboard/duties-dashboard actually ship) rather than a solid brand
  // fill, so there's one clear focal point rather than a saturated block
  // competing with the page heading. The collapsed icon rail keeps the
  // solid-fill treatment since there's no label to carry the active state.
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "group flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition-colors",
      FOCUS_RING,
      isActive
        ? "bg-[#E8F1F4] text-[#093B49] font-semibold"
        : "text-teal-100 hover:bg-teal-700 hover:text-white"
    );

  const iconLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "flex justify-center p-2 rounded-md my-0.5 transition-colors",
      isActive
        ? "bg-brand-500 text-white"
        : "text-teal-200 hover:bg-teal-700 hover:text-white"
    );

  const hashActive = (path: string, hash?: string) =>
    hash !== undefined &&
    location.pathname === path.split("#")[0] &&
    location.hash === hash;

  const hashLinkClass = (active: boolean) =>
    cn(
      "group flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition-colors",
      FOCUS_RING,
      active
        ? "bg-[#E8F1F4] text-[#093B49] font-semibold"
        : "text-teal-100 hover:bg-teal-700 hover:text-white"
    );

  const hashIconClass = (active: boolean) =>
    cn(
      "flex justify-center p-2 rounded-md my-0.5 transition-colors",
      active
        ? "bg-brand-500 text-white"
        : "text-teal-200 hover:bg-teal-700 hover:text-white"
    );

  const renderItem = (item: SidebarNavItem) => {
    if (collapsed) {
      return (
        <Tooltip key={item.path}>
          <TooltipTrigger asChild>
            {item.hash !== undefined ? (
              <Link
                to={item.path}
                className={hashIconClass(hashActive(item.path, item.hash))}
              >
                {item.icon}
              </Link>
            ) : (
              <NavLink to={item.path} end className={iconLinkClass}>
                {item.icon}
              </NavLink>
            )}
          </TooltipTrigger>
          <TooltipContent side="right">{item.label}</TooltipContent>
        </Tooltip>
      );
    }
    return item.hash !== undefined ? (
      <Link
        key={item.path}
        to={item.path}
        className={hashLinkClass(hashActive(item.path, item.hash))}
      >
        <span className="shrink-0">{item.icon}</span>
        <span className="truncate">{item.label}</span>
      </Link>
    ) : (
      <NavLink key={item.path} to={item.path} end className={navLinkClass}>
        <span className="shrink-0">{item.icon}</span>
        <span className="truncate">{item.label}</span>
      </NavLink>
    );
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onMobileClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          "flex flex-col bg-teal-800 text-white flex-shrink-0",
          "fixed inset-y-0 left-0 z-50 w-72 transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          "md:relative md:inset-auto md:z-auto md:translate-x-0 md:transition-all md:duration-300",
          collapsed ? widthCollapsed : widthExpanded
        )}
      >
        <div className="flex items-center justify-between h-14 px-3 border-b border-teal-700">
          {!collapsed && <div className="flex items-center gap-2">{brand}</div>}
          <button
            onClick={onToggle}
            className="hidden md:flex p-1.5 rounded hover:bg-teal-700 transition-colors ml-auto"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <PanelLeft className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={onMobileClose}
            className="md:hidden p-1.5 rounded hover:bg-teal-700 transition-colors ml-auto"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {topItem && (
          <div className="px-2 pt-3 pb-1">{renderItem(topItem)}</div>
        )}

        <nav className="flex-1 overflow-y-auto px-2 pb-4 space-y-1">
          {groups.map((group) => (
            <div
              key={group.key}
              className={cn(
                collapsed
                  ? "py-1 border-t border-teal-700 mt-1"
                  : "mt-2 border-t border-teal-700 pt-2"
              )}
            >
              {collapsed ? (
                <>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex justify-center text-teal-300 py-1.5">
                        {group.icon}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">{group.label}</TooltipContent>
                  </Tooltip>
                  {group.items.map(renderItem)}
                </>
              ) : (
                <>
                  <button
                    onClick={() => toggleGroup(group.key)}
                    className="w-full flex items-center justify-between px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-300 hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      {group.icon}
                      <span>{group.label}</span>
                    </div>
                    <span className="text-teal-400 text-[10px]">
                      {openGroups[group.key] ? "▾" : "▸"}
                    </span>
                  </button>
                  {openGroups[group.key] && (
                    <div className="ml-2 space-y-0.5 mt-0.5">
                      {group.items.map(renderItem)}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}

          {bottomItems.length > 0 && (
            <div className="border-t border-teal-700 pt-2 mt-1">
              {bottomItems.map(renderItem)}
            </div>
          )}
        </nav>

        {!collapsed && footer && (
          <div className="px-3 py-2 border-t border-teal-700">{footer}</div>
        )}
      </aside>
    </>
  );
}
