import * as React from "react";

export interface DataBannerProps {
  error: string | null;
  onRetry?: () => void;
  retryLabel?: string;
  connectionFallback?: string;
}

export function DataBanner({
  error,
  onRetry,
  retryLabel = "Retry",
  connectionFallback = "Could not reach the database. Press Search to retry.",
}: DataBannerProps) {
  if (!error) return null;

  const lower = error.toLowerCase();
  const isDbConnection =
    lower.includes("database") ||
    lower.includes("session") ||
    lower.includes("connection");
  const message = isDbConnection ? connectionFallback : error;

  return (
    <div className="flex items-center gap-3 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2">
      <span>{message}</span>
      {onRetry && (
        <button
          onClick={onRetry}
          className="ml-auto px-2.5 py-1 rounded bg-amber-100 hover:bg-amber-200 font-semibold transition-colors whitespace-nowrap"
        >
          {retryLabel}
        </button>
      )}
    </div>
  );
}
