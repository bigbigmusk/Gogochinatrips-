"use client";

import { useEffect, useState } from "react";
import { getDestinationFilterOptions } from "@/content/destinations";
import { getAllTravelStyles } from "@/content/travel-styles";
import { formatPriceUSD, cn } from "@/lib/utils";
import { type Filters, EMPTY_FILTERS, PRICE_CEILING } from "@/lib/trip-search";

// Re-export so existing imports from "./FilterBar" keep working.
export { EMPTY_FILTERS };
export type { Filters };

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const DURATION_BUCKETS = [
  { key: "short", label: "Up to 4 days" },
  { key: "mid", label: "5–9 days" },
  { key: "long", label: "10+ days" },
];

const ACTIVITY = ["Easy", "Moderate", "Active"];

function toggle<T>(arr: T[], value: T): T[] {
  return arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
}

function FilterGroup({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-t border-soft-gray py-5 first:border-t-0 first:pt-0">
      <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-text">{legend}</legend>
      {children}
    </fieldset>
  );
}

function Toggle({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill border px-3 py-1.5 text-sm transition-colors",
        active ? "border-ink bg-ink text-paper" : "border-soft-gray bg-paper text-ink hover:border-ink",
      )}
    >
      {children}
    </button>
  );
}

/** Reusable filter controls, used in the desktop sidebar and the mobile sheet. */
export function FilterBar({ filters, onChange }: { filters: Filters; onChange: (f: Filters) => void }) {
  const destinationOptions = getDestinationFilterOptions();
  const styles = getAllTravelStyles();
  const set = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });

  // Live label while dragging the price slider; only commit (a URL history
  // entry) once the user releases, so back/forward history stays clean.
  const [priceDraft, setPriceDraft] = useState(filters.priceMax);
  useEffect(() => setPriceDraft(filters.priceMax), [filters.priceMax]);
  const commitPrice = () => {
    if (priceDraft !== filters.priceMax) set({ priceMax: priceDraft });
  };

  return (
    <div className="rounded-card border border-soft-gray bg-paper p-5">
      <h2 className="mb-4 font-display text-lg font-bold">Filters</h2>

      <FilterGroup legend="Destination">
        <div className="flex flex-wrap gap-2">
          {destinationOptions.map((d) => {
            const active = filters.destinations.includes(d.slug);
            return (
              <Toggle key={d.slug} active={active} onClick={() => set({ destinations: toggle(filters.destinations, d.slug) })}>
                {d.name}
                {d.featured && (
                  <span
                    className={cn(
                      "rounded-pill px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                      active ? "bg-paper/20 text-paper" : "bg-gogo-red/10 text-gogo-red",
                    )}
                  >
                    Core
                  </span>
                )}
              </Toggle>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup legend="Duration">
        <div className="flex flex-wrap gap-2">
          {DURATION_BUCKETS.map((b) => (
            <Toggle key={b.key} active={filters.durationBuckets.includes(b.key)} onClick={() => set({ durationBuckets: toggle(filters.durationBuckets, b.key) })}>
              {b.label}
            </Toggle>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup legend="Departure month">
        <div className="grid grid-cols-6 gap-1.5">
          {MONTHS.map((m, i) => (
            <Toggle key={m} active={filters.months.includes(i + 1)} onClick={() => set({ months: toggle(filters.months, i + 1) })}>
              {m}
            </Toggle>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup legend={`Max price — ${formatPriceUSD(priceDraft)}`}>
        <input
          type="range"
          min={0}
          max={PRICE_CEILING}
          step={100}
          value={priceDraft}
          onChange={(e) => setPriceDraft(Number(e.target.value))}
          onPointerUp={commitPrice}
          onKeyUp={commitPrice}
          onBlur={commitPrice}
          className="w-full accent-gogo-red"
          aria-label="Maximum price"
        />
        <div className="mt-1 flex justify-between text-xs text-muted-text">
          <span>$0</span>
          <span>${PRICE_CEILING.toLocaleString()}+</span>
        </div>
      </FilterGroup>

      <FilterGroup legend="Trip type">
        <div className="flex flex-wrap gap-2">
          {(["any", "small-group", "private"] as const).map((t) => (
            <Toggle key={t} active={filters.tripType === t} onClick={() => set({ tripType: t })}>
              {t === "any" ? "Any" : t === "small-group" ? "Small group" : "Private"}
            </Toggle>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup legend="Travel style">
        <div className="flex flex-wrap gap-2">
          {styles.map((s) => (
            <Toggle key={s.slug} active={filters.styles.includes(s.slug)} onClick={() => set({ styles: toggle(filters.styles, s.slug) })}>
              {s.name}
            </Toggle>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup legend="Activity level">
        <div className="flex flex-wrap gap-2">
          {ACTIVITY.map((a) => (
            <Toggle key={a} active={filters.activity.includes(a)} onClick={() => set({ activity: toggle(filters.activity, a) })}>
              {a}
            </Toggle>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup legend="Good for">
        <div className="flex flex-col gap-2.5">
          <label className="flex items-center gap-2.5 text-sm">
            <input type="checkbox" checked={filters.soloFriendly} onChange={(e) => set({ soloFriendly: e.target.checked })} className="h-4 w-4 accent-gogo-red" />
            Solo-friendly
          </label>
          <label className="flex items-center gap-2.5 text-sm">
            <input type="checkbox" checked={filters.familyFriendly} onChange={(e) => set({ familyFriendly: e.target.checked })} className="h-4 w-4 accent-gogo-red" />
            Family-friendly
          </label>
        </div>
      </FilterGroup>
    </div>
  );
}
