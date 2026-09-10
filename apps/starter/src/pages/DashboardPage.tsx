import React from "react";
import { Package, Truck, DollarSign } from "lucide-react";
import {
  KpiCard,
  ChartCard,
  PresentationChartCard,
  SectionLabel,
} from "sila-ui";

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <SectionLabel>Key Metrics</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KpiCard
          label="Shipments"
          value="1,248"
          subLabel="vs prior period"
          trend="up"
          trendValue="+12%"
          icon={<Truck className="h-5 w-5" />}
        />
        <KpiCard
          label="Inspections"
          value="87"
          subLabel="vs prior period"
          trend="down"
          trendValue="-3%"
          icon={<Package className="h-5 w-5" />}
        />
        <KpiCard
          label="Revenue"
          value="$1.4M"
          subLabel="MXN"
          trend="up"
          trendValue="+8%"
          icon={<DollarSign className="h-5 w-5" />}
        />
      </div>

      <SectionLabel>Trends</SectionLabel>
      <PresentationChartCard
        title="Monthly Operations"
        subtitle="Last 12 months"
        action={
          <span className="text-xs font-semibold text-teal-700 bg-teal-50 rounded px-2 py-0.5">
            +12%
          </span>
        }
      >
        <div className="h-56 flex items-center justify-center text-slate-400 text-xs">
          Chart goes here (recharts &lt;ResponsiveContainer&gt;)
        </div>
      </PresentationChartCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <ChartCard title="Imports">
          <div className="h-40 flex items-center justify-center text-slate-400 text-xs">
            Chart placeholder
          </div>
        </ChartCard>
        <ChartCard title="Exports">
          <div className="h-40 flex items-center justify-center text-slate-400 text-xs">
            Chart placeholder
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
