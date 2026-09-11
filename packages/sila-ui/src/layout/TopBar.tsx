import * as React from "react";
import { LogOut, Bell, Menu } from "lucide-react";
import { Button } from "../primitives/Button";

export interface TopBarUser {
  name: string;
  role?: string;
}

export interface TopBarProps {
  portalName: React.ReactNode;
  user?: TopBarUser | null;
  onLogout?: () => void;
  onMobileMenuToggle?: () => void;
  centerSlot?: React.ReactNode;
  startSlot?: React.ReactNode;
  endSlot?: React.ReactNode;
  showNotifications?: boolean;
  onNotificationsClick?: () => void;
  notificationsLabel?: string;
  logoutLabel?: string;
}

export function TopBar({
  portalName,
  user,
  onLogout,
  onMobileMenuToggle,
  centerSlot,
  startSlot,
  endSlot,
  showNotifications = true,
  onNotificationsClick,
  notificationsLabel = "Notifications",
  logoutLabel = "Logout",
}: TopBarProps) {
  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 flex-shrink-0 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          className="md:hidden p-1.5 rounded hover:bg-slate-100 transition-colors"
          onClick={onMobileMenuToggle}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5 text-slate-600" />
        </button>
        <span className="text-xs font-semibold text-teal-800 uppercase tracking-widest">
          {portalName}
        </span>
        {startSlot}
      </div>

      {centerSlot && (
        <div className="hidden md:flex items-center gap-2">{centerSlot}</div>
      )}

      <div className="flex items-center gap-3">
        {endSlot}
        {showNotifications && (
          <button
            className="flex items-center justify-center h-9 w-9 rounded hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E7490] focus-visible:ring-offset-2"
            aria-label={notificationsLabel}
            onClick={onNotificationsClick}
          >
            <Bell className="h-4 w-4 text-slate-500" />
          </button>
        )}
        {user && (
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold text-slate-800 leading-tight">
                {user.name}
              </p>
              {user.role && (
                <p className="text-xs text-slate-500 leading-tight capitalize">
                  {user.role}
                </p>
              )}
            </div>
            <div className="h-7 w-7 rounded-full bg-teal-800 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")}
            </div>
            {onLogout && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="text-slate-600 hover:text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline ml-1">{logoutLabel}</span>
              </Button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
