import * as React from "react";
import { CalendarDays, ChevronDown } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { format, parseISO } from "date-fns";
import {
  computePresetRange,
  type DatePreset,
  type DatePresetExcludingCustom,
} from "../stores/createDateStore";
import "react-day-picker/dist/style.css";

const PRESETS: DatePresetExcludingCustom[] = [
  "this-month",
  "last-month",
  "last-3-months",
  "last-6-months",
  "ytd",
  "last-year",
];

export interface DateRangeStrings {
  thisMonth: string;
  lastMonth: string;
  last3Months: string;
  last6Months: string;
  ytd: string;
  lastYear: string;
  custom: string;
  customRange: string;
  selectRange: string;
  apply: string;
}

export interface DateRangeSelectorProps {
  preset: DatePreset;
  dateFrom: string;
  dateTo: string;
  onPresetChange: (preset: DatePresetExcludingCustom) => void;
  onCustomChange: (from: Date, to: Date) => void;
  strings: DateRangeStrings;
}

export function DateRangeSelector({
  preset,
  dateFrom,
  dateTo,
  onPresetChange,
  onCustomChange,
  strings,
}: DateRangeSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [range, setRange] = React.useState<{ from?: Date; to?: Date }>({});
  const ref = React.useRef<HTMLDivElement>(null);

  const presetLabels: Record<DatePresetExcludingCustom, string> = {
    "this-month": strings.thisMonth,
    "last-month": strings.lastMonth,
    "last-3-months": strings.last3Months,
    "last-6-months": strings.last6Months,
    ytd: strings.ytd,
    "last-year": strings.lastYear,
  };

  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    try {
      if (preset === "custom" && dateFrom && dateTo) {
        setRange({ from: parseISO(dateFrom), to: parseISO(dateTo) });
      } else if (preset !== "custom") {
        const { from, to } = computePresetRange(preset);
        setRange({ from, to });
      }
    } catch {
      /* ignore */
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  function applyCustom() {
    if (range.from && range.to) {
      onCustomChange(range.from, range.to);
      setOpen(false);
    }
  }

  const buttonLabel = (() => {
    try {
      if (preset === "custom" && dateFrom && dateTo) {
        return `${format(parseISO(dateFrom), "MMM d, yyyy")} – ${format(
          parseISO(dateTo),
          "MMM d, yyyy"
        )}`;
      }
    } catch {
      /* fall through */
    }
    return preset === "custom"
      ? strings.custom
      : presetLabels[preset as DatePresetExcludingCustom];
  })();

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Select date range"
        className="flex items-center gap-1.5 min-h-[36px] px-3 rounded-lg border text-[13px] font-medium bg-white border-slate-200 text-slate-600 hover:bg-slate-50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E7490] focus-visible:ring-offset-2"
      >
        <CalendarDays className="h-3.5 w-3.5 flex-shrink-0 text-slate-400" />
        <span>{buttonLabel}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 flex-shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden w-auto">
          <div className="flex flex-wrap gap-1.5 p-3 border-b border-slate-100">
            {PRESETS.map((p) => (
              <button
                key={p}
                onClick={() => {
                  onPresetChange(p);
                  setOpen(false);
                }}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                  preset === p
                    ? "bg-teal-700 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {presetLabels[p]}
              </button>
            ))}
          </div>

          <div className="p-3">
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mb-2">
              {strings.customRange}
            </p>
            <DayPicker
              mode="range"
              selected={{ from: range.from, to: range.to }}
              onSelect={(sel) => setRange(sel ?? {})}
              numberOfMonths={2}
              toDate={new Date()}
              classNames={{
                months: "flex gap-4",
                caption_label: "text-xs font-semibold text-slate-700",
                nav_button: "text-slate-500 hover:text-slate-800",
                day_selected: "bg-teal-700 text-white rounded",
                day_range_middle: "bg-teal-50 text-teal-800 rounded-none",
                day_range_start: "bg-teal-700 text-white rounded-l",
                day_range_end: "bg-teal-700 text-white rounded-r",
                day: "text-xs h-7 w-7 rounded hover:bg-slate-100",
                head_cell: "text-[10px] text-slate-400 font-normal",
                table: "border-collapse",
              }}
            />
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
              <span className="text-[10px] text-slate-400">
                {range.from && range.to
                  ? `${format(range.from, "MMM d")} – ${format(
                      range.to,
                      "MMM d, yyyy"
                    )}`
                  : strings.selectRange}
              </span>
              <button
                onClick={applyCustom}
                disabled={!range.from || !range.to}
                className="px-3 py-1 bg-teal-700 text-white text-xs rounded-lg disabled:opacity-40 hover:bg-teal-800 transition-colors"
              >
                {strings.apply}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
