export const chartPalette = {
  TEAL: "#054d60",
  LIME: "#65a30d",
  BRAND_BLUE: "#3A6FF9",
  SLATE: "#94a3b8",
  GREEN: "#22c55e",
  RED: "#ef4444",
  ORANGE: "#f97316",
  PURPLE: "#a855f7",
  VA_COLOR: "#ef4444",
  VM_COLOR: "#3b82f6",
} as const;

export const tooltipStyle = {
  contentStyle: {
    fontSize: 11,
    borderRadius: 8,
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
  },
} as const;

export const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;
