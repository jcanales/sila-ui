import * as React from "react";
import { cn } from "../lib/cn";

export interface ChartCardProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function ChartCard({
  title,
  subtitle,
  action,
  children,
  className,
}: ChartCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-slate-200 shadow-sm p-5",
        className
      )}
    >
      <div className="flex items-start justify-between mb-3 gap-2">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-slate-700 truncate">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
          )}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

export interface PresentationChartCardProps extends ChartCardProps {
  footer?: React.ReactNode;
}

export function PresentationChartCard({
  title,
  subtitle,
  action,
  children,
  footer,
  className,
}: PresentationChartCardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden",
        className
      )}
    >
      <div className="px-5 pt-4 pb-3 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-slate-700 truncate">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
          )}
        </div>
        {action}
      </div>
      <div className="px-3 pb-2">{children}</div>
      {footer && (
        <div className="border-t border-slate-100 p-3">{footer}</div>
      )}
    </div>
  );
}
