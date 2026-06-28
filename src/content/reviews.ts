import type { Review } from "./types";

/**
 * Mock traveler reviews for prototyping. This is clearly placeholder content —
 * do NOT present as real reviews at launch. Replace with verified traveler
 * submissions, and only then apply review structured data.
 */
export const reviews: Review[] = [
  {
    id: "r1",
    name: "Hannah B.",
    country: "United States",
    tripName: "China Essentials",
    tripSlug: "china-essentials",
    travelMonth: "October 2025",
    rating: 5,
    text: "The quiet Great Wall morning alone was worth it. Our guide knew exactly when to be at each place to dodge the crowds, and the hutong breakfast crawl was the highlight of the whole trip.",
    photos: ["reviewMountain"],
    verified: true,
  },
  {
    id: "r2",
    name: "Tom & Priya",
    country: "United Kingdom",
    tripName: "Chengdu After Dark",
    tripSlug: "chengdu-after-dark",
    travelMonth: "September 2025",
    rating: 5,
    text: "We'd never have found half these stalls on our own. Lina walked us through the spice levels so we actually enjoyed the hotpot instead of suffering through it. Easily the best four hours in Chengdu.",
    photos: ["reviewMarket"],
    verified: true,
  },
  {
    id: "r3",
    name: "Sofie M.",
    country: "Australia",
    tripName: "Wild Yunnan",
    tripSlug: "wild-yunnan",
    travelMonth: "May 2025",
    rating: 5,
    text: "Shaxi was the surprise of the trip — a tiny old town with almost no other foreign travelers. The pace was perfect: enough walking to feel like we earned the views, never rushed.",
    photos: ["reviewMountain"],
    verified: true,
  },
  {
    id: "r4",
    name: "Daniel K.",
    country: "Canada",
    tripName: "Beijing Stopover",
    tripSlug: "beijing-stopover",
    travelMonth: "August 2025",
    rating: 5,
    text: "I had a 60-hour layover and got a real taste of Beijing instead of sitting in the airport. Private guide, totally flexible, and they planned everything around my flight times.",
    photos: ["reviewPanda"],
    verified: true,
  },
  {
    id: "r5",
    name: "Elena R.",
    country: "Germany",
    tripName: "China by High-Speed Rail",
    tripSlug: "china-by-high-speed-rail",
    travelMonth: "April 2025",
    rating: 5,
    text: "Five cities and not a single internal flight — the trains were spotless and fast, and we actually saw the countryside between stops. The pandas in Chengdu were my daughter's favorite day.",
    photos: ["reviewPanda"],
    verified: true,
  },
  {
    id: "r6",
    name: "Marcus T.",
    country: "United States",
    tripName: "Silk Road West",
    tripSlug: "silk-road-west",
    travelMonth: "September 2025",
    rating: 5,
    text: "The Mogao caves left me speechless and Kashgar's market felt like stepping into another world. This is a serious journey — long days, but every one of them paid off.",
    photos: ["reviewMountain"],
    verified: true,
  },
];

export function getAllReviews(): Review[] {
  return reviews;
}

export function getReviewsForTrip(slug: string): Review[] {
  return reviews.filter((r) => r.tripSlug === slug);
}
