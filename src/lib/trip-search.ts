import type { Trip } from "@/content/types";
import { getAllDestinations } from "@/content/destinations";

/**
 * Centralized search + filter engine for the trips listing.
 *
 * The URL query string is the single source of truth for shareable filter
 * state; this module converts between URLSearchParams and a typed `Filters`
 * object, and provides deterministic relevance scoring for free-text search.
 */

// ---------------------------------------------------------------------------
// Filters model
// ---------------------------------------------------------------------------
export interface Filters {
  destinations: string[];
  styles: string[];
  tripType: "any" | "small-group" | "private";
  months: number[];
  activity: string[];
  durationBuckets: string[];
  soloFriendly: boolean;
  familyFriendly: boolean;
  priceMax: number;
}

export const PRICE_CEILING = 5000;

export const EMPTY_FILTERS: Filters = {
  destinations: [],
  styles: [],
  tripType: "any",
  months: [],
  activity: [],
  durationBuckets: [],
  soloFriendly: false,
  familyFriendly: false,
  priceMax: PRICE_CEILING,
};

export type SortKey =
  | "recommended"
  | "price-asc"
  | "price-desc"
  | "rating"
  | "duration-asc"
  | "duration-desc";

export const SORT_LABELS: Record<SortKey, string> = {
  recommended: "Recommended",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
  rating: "Top rated",
  "duration-asc": "Duration: shortest",
  "duration-desc": "Duration: longest",
};

// ---------------------------------------------------------------------------
// Destination alias map — keyed by destination slug. Free-text queries resolve
// to structured destination IDs through this map (not scattered in components).
// ---------------------------------------------------------------------------
export const destinationAliases: Record<string, string[]> = {
  chengdu: ["chengdu", "sichuan", "panda", "pandas", "hotpot", "hot pot", "tea house", "teahouse", "mala"],
  tibet: [
    "tibet",
    "tibetan",
    "tibetan plateau",
    "plateau",
    "lhasa",
    "shigatse",
    "gyantse",
    "everest",
    "everest base camp",
    "ebc",
    "rongbuk",
    "yamdrok",
    "namtso",
    "sakya",
    "tingri",
    "himalaya",
    "himalayas",
    "potala",
    "nyingchi",
    "linzhi",
    "bomi",
    "ranwu",
    "rawok",
    "basum",
    "basum tso",
    "draksum",
    "midui",
    "midui glacier",
    "lulang",
  ],
  beijing: ["beijing", "peking", "great wall", "forbidden city", "hutong"],
  shanghai: ["shanghai", "the bund", "pudong"],
  xian: ["xian", "xi'an", "terracotta", "terracotta warriors", "silk road"],
  chongqing: ["chongqing", "yangtze"],
  zhangjiajie: ["zhangjiajie", "avatar", "fenghuang", "furong"],
  yunnan: ["yunnan", "dali", "lijiang", "shangri-la", "shangrila", "kunming", "shaxi"],
  xinjiang: ["xinjiang", "kashgar", "silk road", "turpan", "urumqi"],
  guilin: ["guilin", "yangshuo", "li river", "karst"],
};

// ---------------------------------------------------------------------------
// Normalization
// ---------------------------------------------------------------------------
export function normalize(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[’']/g, "'")
    .replace(/[^\p{L}\p{N}'\s-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Slugs of destinations whose aliases (or name) match the normalized query. */
export function destinationsMatchingQuery(qNorm: string): Set<string> {
  const out = new Set<string>();
  if (!qNorm) return out;
  for (const [slug, aliases] of Object.entries(destinationAliases)) {
    const hit = aliases.some((a) => {
      const an = normalize(a);
      return an === qNorm || qNorm.includes(an) || (an.length >= 4 && an.includes(qNorm) && qNorm.length >= 3);
    });
    if (hit) out.add(slug);
  }
  // Also match by destination display name.
  for (const d of getAllDestinations()) {
    if (normalize(d.name).includes(qNorm) && qNorm.length >= 3) out.add(d.slug);
  }
  return out;
}

/** If the query maps to exactly one destination, return its slug. */
export function resolveSingleDestination(qNorm: string): string | null {
  const set = destinationsMatchingQuery(qNorm);
  return set.size === 1 ? [...set][0]! : null;
}

// Cache destination regions by slug for region matching.
const regionBySlug = new Map(getAllDestinations().map((d) => [d.slug, d.region]));

// ---------------------------------------------------------------------------
// Relevance scoring (deterministic). Returns 0 when nothing matches.
// ---------------------------------------------------------------------------
export function scoreTrip(trip: Trip, qNorm: string): number {
  if (!qNorm) return 1; // no query → neutral pass
  let score = 0;
  const matchedDests = destinationsMatchingQuery(qNorm);

  if (matchedDests.size && trip.destinationSlugs.some((s) => matchedDests.has(s))) score += 100;

  const name = normalize(trip.name);
  if (name === qNorm) score += 95;
  else if (name.includes(qNorm)) score += 90;

  const aliases = (trip.searchAliases ?? []).map(normalize);
  if (aliases.some((a) => a === qNorm)) score += 80;
  else if (aliases.some((a) => a.includes(qNorm))) score += 60;

  if (trip.route.some((c) => normalize(c).includes(qNorm))) score += 70;

  const regions = trip.destinationSlugs.map((s) => regionBySlug.get(s) ?? "");
  if (regions.some((r) => normalize(r).includes(qNorm))) score += 60;

  if ((trip.tags ?? []).some((t) => normalize(t).includes(qNorm))) score += 50;
  if (trip.travelStyleSlugs.some((s) => s.replace(/-/g, " ").includes(qNorm))) score += 30;
  if (normalize(trip.tagline).includes(qNorm)) score += 20;
  if (normalize(trip.category).includes(qNorm)) score += 20;

  return score;
}

// ---------------------------------------------------------------------------
// Filtering + sorting pipeline: filter FIRST, then sort.
// ---------------------------------------------------------------------------
function durationInDays(t: Trip): number {
  return t.durationUnit === "hours" ? t.durationValue / 24 : t.durationValue;
}

function passesFilters(trip: Trip, f: Filters): boolean {
  if (f.destinations.length && !f.destinations.some((d) => trip.destinationSlugs.includes(d))) return false;
  if (f.styles.length && !f.styles.some((s) => trip.travelStyleSlugs.includes(s))) return false;
  if (f.tripType === "small-group" && trip.style !== "Small Group") return false;
  if (f.tripType === "private" && trip.style !== "Private") return false;
  if (f.months.length && !f.months.some((m) => trip.departureMonths.includes(m))) return false;
  if (f.activity.length && !f.activity.includes(trip.activityLevel)) return false;
  if (f.soloFriendly && !trip.soloFriendly) return false;
  if (f.familyFriendly && !trip.familyFriendly) return false;
  if (trip.fromPriceUSD > f.priceMax) return false;
  if (f.durationBuckets.length) {
    const d = durationInDays(trip);
    const inBucket = f.durationBuckets.some((b) =>
      b === "short" ? d <= 4 : b === "mid" ? d > 4 && d <= 9 : d > 9,
    );
    if (!inBucket) return false;
  }
  return true;
}

export interface RankedTrip {
  trip: Trip;
  score: number;
}

/**
 * Run the full pipeline: filter, (optionally) relevance-score against `q`, then
 * sort. When `q` is present and sort is "recommended", relevance ranks first.
 */
export function searchAndRank(trips: Trip[], filters: Filters, q: string, sort: SortKey): RankedTrip[] {
  const qNorm = normalize(q);

  const ranked: RankedTrip[] = [];
  for (const trip of trips) {
    if (!passesFilters(trip, filters)) continue;
    const score = scoreTrip(trip, qNorm);
    if (qNorm && score === 0) continue; // no silent fallback
    ranked.push({ trip, score });
  }

  const strategic = (t: Trip) => t.strategicPriority ?? 0;

  ranked.sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.trip.fromPriceUSD - b.trip.fromPriceUSD;
      case "price-desc":
        return b.trip.fromPriceUSD - a.trip.fromPriceUSD;
      case "rating":
        return b.trip.rating - a.trip.rating;
      case "duration-asc":
        return durationInDays(a.trip) - durationInDays(b.trip);
      case "duration-desc":
        return durationInDays(b.trip) - durationInDays(a.trip);
      default:
        // Recommended: relevance (when searching) → strategic priority →
        // featured → best-seller → rating.
        if (qNorm && b.score !== a.score) return b.score - a.score;
        return (
          strategic(b.trip) - strategic(a.trip) ||
          Number(!!b.trip.featured) - Number(!!a.trip.featured) ||
          Number(!!b.trip.bestSeller) - Number(!!a.trip.bestSeller) ||
          b.trip.rating - a.trip.rating
        );
    }
  });

  return ranked;
}

// ---------------------------------------------------------------------------
// URL <-> Filters serialization (URL is the source of truth)
// ---------------------------------------------------------------------------
export interface TripQueryState {
  filters: Filters;
  q: string;
  sort: SortKey;
}

const list = (v: string | null) => (v ? v.split(",").map((s) => s.trim()).filter(Boolean) : []);

export function parseTripQuery(params: URLSearchParams): TripQueryState {
  const priceMaxRaw = Number(params.get("maxPrice"));
  const sortRaw = params.get("sort") as SortKey | null;
  return {
    q: params.get("q") ?? "",
    sort: sortRaw && sortRaw in SORT_LABELS ? sortRaw : "recommended",
    filters: {
      destinations: list(params.get("destination")),
      styles: list(params.get("travelStyle")),
      tripType: (params.get("tripType") as Filters["tripType"]) || "any",
      months: list(params.get("month")).map(Number).filter((n) => n >= 1 && n <= 12),
      activity: list(params.get("activity")),
      durationBuckets: list(params.get("duration")),
      soloFriendly: params.get("soloFriendly") === "1",
      familyFriendly: params.get("familyFriendly") === "1",
      priceMax: priceMaxRaw > 0 ? priceMaxRaw : PRICE_CEILING,
    },
  };
}

export function buildTripQuery({ filters: f, q, sort }: TripQueryState): string {
  const p = new URLSearchParams();
  if (q.trim()) p.set("q", q.trim());
  if (f.destinations.length) p.set("destination", f.destinations.join(","));
  if (f.styles.length) p.set("travelStyle", f.styles.join(","));
  if (f.tripType !== "any") p.set("tripType", f.tripType);
  if (f.months.length) p.set("month", f.months.join(","));
  if (f.activity.length) p.set("activity", f.activity.join(","));
  if (f.durationBuckets.length) p.set("duration", f.durationBuckets.join(","));
  if (f.soloFriendly) p.set("soloFriendly", "1");
  if (f.familyFriendly) p.set("familyFriendly", "1");
  if (f.priceMax < PRICE_CEILING) p.set("maxPrice", String(f.priceMax));
  if (sort !== "recommended") p.set("sort", sort);
  return p.toString();
}

export function countActiveFilters(f: Filters): number {
  return (
    f.destinations.length +
    f.styles.length +
    f.months.length +
    f.activity.length +
    f.durationBuckets.length +
    (f.tripType !== "any" ? 1 : 0) +
    (f.soloFriendly ? 1 : 0) +
    (f.familyFriendly ? 1 : 0) +
    (f.priceMax < PRICE_CEILING ? 1 : 0)
  );
}

/** The single destination in context, from a 1-destination filter or the query. */
export function activeDestinationSlug(filters: Filters, q: string): string | null {
  if (filters.destinations.length === 1) return filters.destinations[0]!;
  const qNorm = normalize(q);
  if (qNorm) return resolveSingleDestination(qNorm);
  return null;
}
