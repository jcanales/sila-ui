import * as React from "react";
import { ChevronDown, Building2 } from "lucide-react";

export interface EntitySelectorStrings {
  allEntities: string;
  searchPlaceholder: string;
  noResults: string;
  loading?: string;
}

export interface EntitySelectorProps<T> {
  items: T[];
  loading?: boolean;
  error?: string | null;
  selected: T | null;
  onSelect: (item: T | null) => void;
  getKey: (item: T) => string;
  getLabel: (item: T) => string;
  getSubtitle?: (item: T) => string | undefined;
  getBadge?: (item: T) => string | undefined;
  filter?: (item: T, search: string) => boolean;
  strings: EntitySelectorStrings;
  icon?: React.ReactNode;
  width?: string;
}

export function EntitySelector<T>({
  items,
  loading,
  error,
  selected,
  onSelect,
  getKey,
  getLabel,
  getSubtitle,
  getBadge,
  filter,
  strings,
  icon = <Building2 className="h-3.5 w-3.5 flex-shrink-0" />,
  width = "w-96",
}: EntitySelectorProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const defaultFilter = (item: T, q: string) =>
    getLabel(item).toLowerCase().includes(q.toLowerCase()) ||
    (getSubtitle?.(item) ?? "").toLowerCase().includes(q.toLowerCase());

  const filtered = search
    ? items.filter((it) => (filter ?? defaultFilter)(it, search))
    : items;

  const initials = (name: string) => name.slice(0, 2).toUpperCase();

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Select entity"
        className={`
          flex items-center gap-2 min-h-[36px] px-3 rounded-lg border text-[13px] font-medium
          transition-all max-w-[260px]
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2
          ${
            selected
              ? "bg-teal-50 border-teal-200 text-teal-800 hover:bg-teal-100"
              : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
          }
        `}
      >
        {icon}
        <span className="truncate">
          {selected ? getLabel(selected) : strings.allEntities}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 flex-shrink-0 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          className={`absolute left-0 top-full mt-1 ${width} bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden`}
        >
          <div className="px-3 pt-2 pb-1 border-b border-slate-100">
            <input
              type="text"
              placeholder={strings.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
              className="w-full text-xs px-2.5 py-1.5 border border-slate-200 rounded-md outline-none focus:border-teal-400"
            />
          </div>

          <button
            onClick={() => {
              onSelect(null);
              setOpen(false);
              setSearch("");
            }}
            className={`
              w-full flex items-center gap-2.5 px-3 py-2 text-left text-xs hover:bg-slate-50 transition-colors border-b border-slate-100
              ${
                !selected
                  ? "bg-teal-50 text-teal-800 font-semibold"
                  : "text-slate-600"
              }
            `}
          >
            {icon}
            <span>{strings.allEntities}</span>
          </button>

          <div className="max-h-64 overflow-y-auto">
            {loading && strings.loading && (
              <p className="text-xs text-slate-400 px-3 py-3 text-center">
                {strings.loading}
              </p>
            )}
            {error && (
              <p className="text-xs text-red-500 px-3 py-3 text-center">
                {error}
              </p>
            )}
            {!loading && !error && filtered.length === 0 && (
              <p className="text-xs text-slate-400 px-3 py-3 text-center">
                {strings.noResults}
              </p>
            )}
            {!loading &&
              !error &&
              filtered.map((item) => {
                const key = getKey(item);
                const label = getLabel(item);
                const subtitle = getSubtitle?.(item);
                const badge = getBadge?.(item);
                const isSelected =
                  selected !== null && getKey(selected) === key;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      onSelect(item);
                      setOpen(false);
                      setSearch("");
                    }}
                    className={`
                      w-full flex items-start gap-2.5 px-3 py-2 text-left hover:bg-slate-50 transition-colors
                      ${isSelected ? "bg-teal-50" : ""}
                    `}
                  >
                    <div className="mt-0.5 h-5 w-5 rounded flex items-center justify-center bg-teal-100 text-teal-700 text-[9px] font-bold flex-shrink-0">
                      {initials(label)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-xs font-medium leading-snug ${
                          isSelected ? "text-teal-800" : "text-slate-700"
                        }`}
                      >
                        {label}
                      </p>
                      {subtitle && (
                        <p className="text-[10px] text-slate-400 leading-tight">
                          {subtitle}
                        </p>
                      )}
                    </div>
                    {badge && (
                      <span className="mt-0.5 flex-shrink-0 text-[9px] font-bold px-1 py-0.5 rounded bg-blue-100 text-blue-600 leading-none">
                        {badge}
                      </span>
                    )}
                  </button>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
