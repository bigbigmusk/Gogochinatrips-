"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { SlidersHorizontal, X, LayoutGrid, List } from "lucide-react";
import type { Trip } from "@/content/types";
import { TripCard } from "@/components/cards/TripCard";
import { FilterBar } from "./FilterBar";
import { MobileFilterSheet } from "./MobileFilterSheet";
import { TripsSearchInput } from "./TripsSearchInput";
import { DestinationSearchIntro } from "./DestinationSearchIntro";
import { getDestinationBySlug } from "@/content/destinations";
import { getTravelStyleBySlug } from "@/content/travel-styles";
import { destinationIntros } from "@/content/discovery";
import { track } from "@/lib/analytics";
import { cn, formatPriceUSD } from "@/lib/utils";
import {
  type Filters,
  type SortKey,
  EMPTY_FILTERS,
  PRICE_CEILING,
  SORT_LABELS,
  parseTripQuery,
  buildTripQuery,
  searchAndRank,
  activeDestinationSlug,
  countActiveFilters,
} from "@/lib/trip-search";

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DURATION_LABELS: Record<string, string> = { short: "Up to 4 days", mid: "5–9 days", long: "10+ days" };

interface Chip {
  key: string;
  label: string;
  remove: () => void;
}

/** URL-driven trips listing: search, filters, sort, chips, empty state. */
export function TripsExplorer({ trips }: { trips: Trip[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL is the single source of truth for searchable/shareable state.
  const { filters, q, sort } = useMemo(
    () => parseTripQuery(new URLSearchParams(searchParams.toString())),
    [searchParams],
  );

  const [view, setView] = useState<"grid" | "list">("grid");
  const [sheetOpen, setSheetOpen] = useState(false);

  // Push merged state into the URL (shallow, no scroll jump). `push` so browser
  // back/forward step through search + filter states.
  const commit = useCallback(
    (next: { filters?: Filters; q?: string; sort?: SortKey }) => {
      const query = buildTripQuery({
        filters: next.filters ?? filters,
        q: next.q ?? q,
        sort: next.sort ?? sort,
      });
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [router, pathname, filters, q, sort],
  );

  const ranked = useMemo(() => searchAndRank(trips, filters, q, sort), [trips, filters, q, sort]);
  const results = ranked.map((r) => r.trip);

  const activeDest = activeDestinationSlug(filters, q);
  const activeDestName = activeDest ? getDestinationBySlug(activeDest)?.name : undefined;
  const activeFilterCount = countActiveFilters(filters);
  const hasIntro = activeDest ? Boolean(destinationIntros[activeDest]) : false;

  // Dynamic heading + supporting text.
  const heading = activeDestName ? `${activeDestName} Trips` : q ? `Trips matching “${q}”` : "All China Trips";
  const supporting = activeDest
    ? destinationIntros[activeDest]?.description
    : q
      ? undefined
      : "From four-hour food crawls to twelve-day grand tours — find the trip that fits how you travel.";

  // Result-count label (never shows total inventory when filtered).
  const n = results.length;
  const countLabel = activeDestName
    ? `${n} ${activeDestName} ${n === 1 ? "trip" : "trips"}`
    : q
      ? `${n} ${n === 1 ? "trip" : "trips"} matching “${q}”`
      : `${n} ${n === 1 ? "trip" : "trips"}`;

  // Active chips (search + each filter), all individually removable.
  const chips: Chip[] = [];
  if (q) chips.push({ key: "q", label: `Search: ${q}`, remove: () => { track("search_cleared"); commit({ q: "" }); } });
  for (const slug of filters.destinations) {
    const name = getDestinationBySlug(slug)?.name ?? slug;
    chips.push({ key: `d-${slug}`, label: name, remove: () => removeFrom("destinations", slug) });
  }
  for (const slug of filters.styles) {
    const name = getTravelStyleBySlug(slug)?.name ?? slug;
    chips.push({ key: `s-${slug}`, label: name, remove: () => removeFrom("styles", slug) });
  }
  if (filters.tripType !== "any") {
    chips.push({ key: "tt", label: filters.tripType === "private" ? "Private" : "Small group", remove: () => commit({ filters: { ...filters, tripType: "any" } }) });
  }
  for (const b of filters.durationBuckets) {
    chips.push({ key: `dur-${b}`, label: DURATION_LABELS[b] ?? b, remove: () => removeFrom("durationBuckets", b) });
  }
  for (const m of filters.months) {
    chips.push({ key: `m-${m}`, label: MONTH_NAMES[m - 1] ?? String(m), remove: () => removeFrom("months", m) });
  }
  for (const a of filters.activity) {
    chips.push({ key: `a-${a}`, label: a, remove: () => removeFrom("activity", a) });
  }
  if (filters.soloFriendly) chips.push({ key: "solo", label: "Solo-friendly", remove: () => commit({ filters: { ...filters, soloFriendly: false } }) });
  if (filters.familyFriendly) chips.push({ key: "fam", label: "Family-friendly", remove: () => commit({ filters: { ...filters, familyFriendly: false } }) });
  if (filters.priceMax < PRICE_CEILING) chips.push({ key: "price", label: `Under ${formatPriceUSD(filters.priceMax)}`, remove: () => commit({ filters: { ...filters, priceMax: PRICE_CEILING } }) });

  function removeFrom(field: "destinations" | "styles" | "durationBuckets" | "activity", value: string): void;
  function removeFrom(field: "months", value: number): void;
  function removeFrom(field: keyof Filters, value: string | number) {
    track("filter_removed", { field, value });
    const arr = filters[field] as (string | number)[];
    commit({ filters: { ...filters, [field]: arr.filter((v) => v !== value) } });
  }

  function clearAll() {
    commit({ filters: EMPTY_FILTERS, q: "" });
  }

  // Suggested trips for the empty state: strategic featured products.
  const suggestions = [...trips]
    .filter((t) => t.featured)
    .sort((a, b) => (b.strategicPriority ?? 0) - (a.strategicPriority ?? 0))
    .slice(0, 3);

  return (
    <div>
      {/* Header: heading + editable search */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <h1 className="text-section">{heading}</h1>
          {supporting && <p className="mt-2 text-muted-text">{supporting}</p>}
        </div>
        <TripsSearchInput
          value={q}
          onSubmit={(newQ) => {
            track("search_submitted", { q: newQ });
            commit({ q: newQ });
          }}
          onClear={() => {
            track("search_cleared");
            commit({ q: "" });
          }}
        />
      </div>

      {/* Strategic destination intro (Tibet / Chengdu) */}
      {hasIntro && activeDest && <DestinationSearchIntro slug={activeDest} />}

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* Desktop sidebar filters */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <FilterBar filters={filters} onChange={(f) => commit({ filters: f })} />
          </div>
        </aside>

        <div>
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted-text" aria-live="polite" role="status">
              <span className="font-semibold text-ink">{n}</span>
              {" "}
              {countLabel.replace(/^\d+\s/, "")}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSheetOpen(true)}
                className="inline-flex items-center gap-2 rounded-pill border border-soft-gray bg-paper px-4 py-2 text-sm font-medium lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
              </button>

              <label className="inline-flex items-center gap-2 text-sm">
                <span className="sr-only">Sort by</span>
                <select
                  value={sort}
                  onChange={(e) => {
                    track("sort_changed", { sort: e.target.value });
                    commit({ sort: e.target.value as SortKey });
                  }}
                  className="rounded-pill border border-soft-gray bg-paper px-4 py-2 text-sm font-medium focus:outline-none"
                >
                  {Object.entries(SORT_LABELS).map(([k, label]) => (
                    <option key={k} value={k}>{label}</option>
                  ))}
                </select>
              </label>

              <div className="hidden items-center rounded-pill border border-soft-gray bg-paper p-1 sm:flex" role="group" aria-label="View mode">
                <button type="button" onClick={() => setView("grid")} aria-pressed={view === "grid"} aria-label="Grid view" className={cn("rounded-pill p-1.5", view === "grid" ? "bg-ink text-paper" : "text-ink")}>
                  <LayoutGrid className="h-4 w-4" aria-hidden="true" />
                </button>
                <button type="button" onClick={() => setView("list")} aria-pressed={view === "list"} aria-label="List view" className={cn("rounded-pill p-1.5", view === "list" ? "bg-ink text-paper" : "text-ink")}>
                  <List className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          {/* Active chips */}
          {chips.length > 0 && (
            <div className="no-scrollbar mt-4 flex items-center gap-2 overflow-x-auto pb-1">
              {chips.map((c) => (
                <button key={c.key} onClick={c.remove} className="chip shrink-0 gap-1.5" aria-label={`Remove filter ${c.label}`}>
                  {c.label}
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              ))}
              <button onClick={clearAll} className="shrink-0 text-sm font-medium text-gogo-red hover:underline">
                Clear all
              </button>
            </div>
          )}

          {/* Results / empty state */}
          {n === 0 ? (
            <div className="mt-10 rounded-card border border-dashed border-soft-gray bg-paper p-8 text-center md:p-12">
              <h2 className="font-display text-xl font-bold">
                No exact trips found{q ? ` for “${q}”` : ""}
              </h2>
              <p className="mx-auto mt-2 max-w-md text-muted-text">
                We may still be able to build this route as a private journey — tell us what you have in mind.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link href="/plan-my-trip" onClick={() => track("zero_results_custom_trip_clicked", { q })} className="btn-primary">
                  Plan a Custom Trip
                </Link>
                <button onClick={clearAll} className="btn-secondary">Clear search</button>
                <Link href="/trips?destination=chengdu" className="btn-secondary">Browse Chengdu Trips</Link>
                <Link href="/trips?destination=tibet" className="btn-secondary">Browse Tibet Trips</Link>
              </div>

              {suggestions.length > 0 && (
                <div className="mt-10 text-left">
                  <h3 className="mb-4 text-center font-display text-lg font-bold">You might like these</h3>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {suggestions.map((t) => (
                      <TripCard key={t.slug} trip={t} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className={cn("mt-6 gap-4", view === "grid" ? "grid sm:grid-cols-2 xl:grid-cols-3" : "flex flex-col")}>
              {results.map((trip) => (
                <TripCard key={trip.slug} trip={trip} className={view === "list" ? "sm:flex-row" : ""} onOpen={() => track("trip_card_opened", { slug: trip.slug })} />
              ))}
            </div>
          )}
        </div>
      </div>

      <MobileFilterSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        filters={filters}
        onChange={(f) => commit({ filters: f })}
        resultCount={n}
      />
    </div>
  );
}
