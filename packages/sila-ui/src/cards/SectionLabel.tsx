import * as React from "react";

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
      {children}
    </p>
  );
}
