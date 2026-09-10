import * as React from "react";
import { TooltipProvider } from "../primitives/Tooltip";

export interface AppShellProps {
  sidebar: React.ReactNode;
  topbar: React.ReactNode;
  children: React.ReactNode;
  tooltipDelay?: number;
}

export function AppShell({
  sidebar,
  topbar,
  children,
  tooltipDelay = 300,
}: AppShellProps) {
  return (
    <TooltipProvider delayDuration={tooltipDelay}>
      <div className="flex h-screen overflow-hidden bg-background">
        {sidebar}
        <div className="flex-1 flex flex-col min-w-0">
          {topbar}
          <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
        </div>
      </div>
    </TooltipProvider>
  );
}
