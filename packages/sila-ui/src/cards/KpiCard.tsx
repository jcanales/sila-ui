import * as React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "../lib/cn";

export interface KpiCardProps {
  label: string;
  value: string | number;
  subLabel?: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  iconClassName?: string;
  tooltip?: React.ReactNode;
}

export function KpiCard({
  label,
  value,
  subLabel,
  icon,
  trend,
  trendValue,
  iconClassName,
  tooltip,
}: KpiCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 flex items-start gap-4">
      {icon && (
        <div
          className={cn(
            "h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-teal-50 text-teal-700",
            iconClassName
          )}
        >
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider truncate">
            {label}
          </p>
          {tooltip}
        </div>
        <p className="text-2xl font-bold text-slate-800 mt-1 leading-tight">
          {value}
        </p>
        {(subLabel || trendValue) && (
          <div className="flex items-center gap-2 mt-1">
            {trend === "up" && <TrendingUp className="h-3 w-3 text-emerald-600" />}
            {trend === "down" && <TrendingDown className="h-3 w-3 text-red-600" />}
            {trendValue && (
              <span
                className={cn(
                  "text-xs font-semibold",
                  trend === "up" && "text-emerald-600",
                  trend === "down" && "text-red-600",
                  trend === "neutral" && "text-slate-500"
                )}
              >
                {trendValue}
              </span>
            )}
            {subLabel && (
              <span className="text-xs text-slate-500 truncate">{subLabel}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
