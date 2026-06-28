import type { ImageKey } from "@/lib/images";

/**
 * Typed content model for GoGoChinaTrips.
 *
 * This mock content layer is intentionally framework-agnostic so it can later
 * be swapped for a headless CMS (Sanity, Payload, Contentful) without touching
 * presentation components. Components consume the typed accessors in
 * `src/content/*` rather than importing raw arrays.
 */

export type TripStyle =
  | "Small Group"
  | "Private"
  | "Food & Nightlife"
  | "City Experience";

export type ActivityLevel = "Easy" | "Moderate" | "Active";

export type DurationUnit = "days" | "hours";

export interface ItineraryDay {
  day: number;
  title: string;
  summary: string;
  highlights: string[];
  meals?: string;
  accommodation?: string;
}

export interface TripFaq {
  question: string;
  answer: string;
}

export interface Departure {
  /** ISO date (YYYY-MM-DD) of departure. */
  date: string;
  status: "available" | "limited" | "guaranteed";
  priceUSD: number;
}

export interface Trip {
  slug: string;
  name: string;
  category: string;
  style: TripStyle;
  /** Short value proposition shown near the title. */
  tagline: string;
  durationValue: number;
  durationUnit: DurationUnit;
  /** Ordered list of cities / stops. */
  route: string[];
  destinationSlugs: string[];
  travelStyleSlugs: string[];
  fromPriceUSD: number;
  rating: number;
  reviewCount: number;
  maxGroupSize: number;
  activityLevel: ActivityLevel;
  soloFriendly: boolean;
  familyFriendly: boolean;
  /** Best matching departure months (1-12). */
  departureMonths: number[];
  image: ImageKey;
  gallery: ImageKey[];
  bestSeller?: boolean;
  customizable: boolean;
  highlights: string[];
  whoFor: string[];
  itinerary: ItineraryDay[];
  included: string[];
  notIncluded: string[];
  accommodation: string;
  transport: string;
  cancellation: string;
  hostSlug?: string;
  departures: Departure[];
  faqs: TripFaq[];
}

export interface Destination {
  slug: string;
  name: string;
  region: string;
  personality: string;
  intro: string;
  image: ImageKey;
  reasonsToVisit: string[];
  bestTime: string;
  recommendedDays: string;
  topExperiences: { title: string; description: string }[];
  neighborhoods: { name: string; description: string }[];
  localFood: string[];
  practical: { label: string; value: string }[];
}

export interface TravelStyle {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: ImageKey;
  forWho: string[];
}

export interface Host {
  slug: string;
  name: string;
  city: string;
  languages: string[];
  specialty: string;
  quote: string;
  image: ImageKey;
  tripSlugs: string[];
}

export interface Review {
  id: string;
  name: string;
  country: string;
  tripName: string;
  tripSlug: string;
  travelMonth: string;
  rating: number;
  text: string;
  photos: ImageKey[];
  verified: boolean;
}

export interface Article {
  slug: string;
  title: string;
  category: string;
  readingTime: string;
  image: ImageKey;
  description: string;
  /** Simple structured body — paragraphs and section headings. */
  body: { type: "heading" | "paragraph" | "list"; text?: string; items?: string[] }[];
  publishedISO: string;
}

export interface EditorialCategory {
  slug: string;
  title: string;
  description: string;
  image: ImageKey;
  /** Relative grid weight for the asymmetric layout. */
  span: "large" | "tall" | "wide" | "small";
}
