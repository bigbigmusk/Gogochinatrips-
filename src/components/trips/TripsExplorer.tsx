"use client";

import { useEffect, useMemo, useState } from "react";
import { SlidersHorizontal, X, LayoutGrid, List } from "lucide-react";
import type { Trip } from "@/content/types";
import { TripCard } from "@/components/cards/TripCard";
import { FilterBar, type Filters, EMPTY_FILTERS } from "./FilterBar";
import { MobileFilterSheet } from "./MobileFilterSheet";
import { cn } from "@/lib/utils";

type SortKey = "recommended" | "price-asc" | "price-desc" | "rating" | "duration";

const SORT_LABELS: Record<SortKey, string> = {
  recommended: "Recommended",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
  rating: "Top rated",
  duration: "Duration",
};

function durationInDays(t: Trip) {
  return t.durationUnit === "hours" ? t.durationValue / 24 : t.durationValue;
}

function matches(trip: Trip, f: Filters, query: string): boolean {
  if (query) {
    const q = query.toLowerCase();
    const hay = `${trip.name} ${trip.category} ${trip.route.join(" ")}`.toLowerCase();
    if (!hay.includes(q)) return false;
  }
  if (f.destinations.length && !f.destinations.some((d) => trip.destinationSlugs.includes(d))) return false;
  if (f.styles.length && !f.styles.some((s) => trip.travelStyleSlugs.includes(s))) return false;
  if (f.tripType !== "any") {
    if (f.tripType === "small-group" && trip.style !== "Small Group") return false;
    if (f.tripType === "private" && trip.style !== "Private") return false;
  }
  if (f.months.length && !f.months.some((m) => trip.departureMonths.includes(m))) return false;
  if (f.activity.length && !f.activity.includes(trip.activityLevel)) return false;
  if (f.soloFriendly && !trip.soloFriendly) return false;
  if (f.familyFriendly && !trip.familyFriendly) return false;
  if (trip.fromPriceUSD < f.priceMin || trip.fromPriceUSD > f.priceMax) return false;
  if (f.durationBuckets.length) {
    const d = durationInDays(trip);
    const inBucket = f.durationBuckets.some((b) => {
      if (b === "short") return d <= 4;
      if (b === "mid") return d > 4 && d <= 9;
      return d > 9;
    });
    if (!inBucket) return false;
  }
  return true;
}

function countActive(f: Filters): number {
  return (
    f.destinations.length +
    f.styles.length +
    f.months.length +
    f.activity.length +
    f.durationBuckets.length +
    (f.tripType !== "any" ? 1 : 0) +
    (f.soloFriendly ? 1 : 0) +
    (f.familyFriendly ? 1 : 0) +
    (f.priceMin > 0 || f.priceMax < 5000 ? 1 : 0)
  );
}

/** Full trips listing experience: filters, sort, view toggle, empty state. */
export function TripsExplorer({ trips, initialQuery = "" }: { trips: Trip[]; initialQuery?: string }) {
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);
  const [query, setQuery] = useState(initialQuery);

  // Read the ?q= search term from the URL on mount. Done client-side so the
  // page stays statically exportable (no server-side searchParams).
  useEffect(() => {
    if (initialQuery) return;
    const q = new URLSearchParams(window.location.search).get("q");
    if (q) setQuery(q);
  }, [initialQuery]);
  const [sort, setSort] = useState<SortKey>("recommended");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sheetOpen, setSheetOpen] = useState(false);

  const results = useMemo(() => {
    const filtered = trips.filter((t) => matches(t, filters, query));
    const sorted = [...filtered].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.fromPriceUSD - b.fromPriceUSD;
        case "price-desc":
          return b.fromPriceUSD - a.fromPriceUSD;
        case "rating":
          return b.rating - a.rating;
        case "duration":
          return durationInDays(a) - durationInDays(b);
        default:
          return Number(b.bestSeller) - Number(a.bestSeller) || b.rating - a.rating;
      }
    });
    return sorted;
  }, [trips, filters, query, sort]);

  const activeCount = countActive(filters);

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      {/* Desktop sidebar filters */}
      <aside className="hidden lg:block">
        <div className="sticky top-24">
          <FilterBar filters={filters} onChange={setFilters} />
        </div>
      </aside>

      <div>
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-text" aria-live="polite">
            <span className="font-semibold text-ink">{results.length}</span> {results.length === 1 ? "trip" : "trips"}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              className="inline-flex items-center gap-2 rounded-pill border border-soft-gray bg-paper px-4 py-2 text-sm font-medium lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
              Filters{activeCount > 0 ? ` (${activeCount})` : ""}
            </button>

            <label className="inline-flex items-center gap-2 text-sm">
              <span className="sr-only">Sort by</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="rounded-pill border border-soft-gray bg-paper px-4 py-2 text-sm font-medium focus:outline-none"
              >
                {Object.entries(SORT_LABELS).map(([k, label]) => (
                  <option key={k} value={k}>
                    {label}
                  </option>
                ))}
              </select>
            </label>

            <div className="hidden items-center rounded-pill border border-soft-gray bg-paper p-1 sm:flex" role="group" aria-label="View mode">
              <button
                type="button"
                onClick={() => setView("grid")}
                aria-pressed={view === "grid"}
                aria-label="Grid view"
                className={cn("rounded-pill p-1.5", view === "grid" ? "bg-ink text-paper" : "text-ink")}
              >
                <LayoutGrid className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setView("list")}
                aria-pressed={view === "list"}
                aria-label="List view"
                className={cn("rounded-pill p-1.5", view === "list" ? "bg-ink text-paper" : "text-ink")}
              >
                <List className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Active filter chips */}
        {(activeCount > 0 || query) && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {query && (
              <button onClick={() => setQuery("")} className="chip gap-1.5">
                “{query}” <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            )}
            {activeCount > 0 && (
              <button
                onClick={() => setFilters(EMPTY_FILTERS)}
                className="text-sm font-medium text-gogo-red hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}

        {/* Results */}
        {results.length === 0 ? (
          <div className="mt-12 rounded-card border border-dashed border-soft-gray bg-paper p-12 text-center">
            <h2 className="font-display text-xl font-bold">No trips match those filters</h2>
            <p className="mt-2 text-muted-text">Try widening your dates, budget or destinations.</p>
            <button
              onClick={() => {
                setFilters(EMPTY_FILTERS);
                setQuery("");
              }}
              className="btn-secondary mt-5"
            >
              Reset everything
            </button>
          </div>
        ) : (
          <div
            className={cn(
              "mt-6 gap-4",
              view === "grid" ? "grid sm:grid-cols-2 xl:grid-cols-3" : "flex flex-col",
            )}
          >
            {results.map((trip) => (
              <TripCard key={trip.slug} trip={trip} className={view === "list" ? "sm:flex-row" : ""} />
            ))}
          </div>
        )}
      </div>

      <MobileFilterSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        filters={filters}
        onChange={setFilters}
        resultCount={results.length}
      />
    </div>
  );
}
