import type { TravelStyle, EditorialCategory } from "./types";

export const travelStyles: TravelStyle[] = [
  {
    slug: "first-time",
    name: "First Time in China",
    tagline: "The icons, minus the predictable itinerary.",
    description:
      "Built for travelers who want the headline sights — the Wall, the Warriors, the skylines — without the rushed coach-tour feel. Smart routing, local guides and the street-level moments in between.",
    image: "tripEssentials",
    forWho: ["First-time visitors", "Travelers short on time who still want depth", "Anyone overwhelmed by planning China from scratch"],
  },
  {
    slug: "food-nightlife",
    name: "Food & Nightlife",
    tagline: "Breakfast stalls, hotpot steam and cities after dark.",
    description:
      "China is one of the world's great eating destinations. These trips and experiences put food and after-dark culture front and center, led by hosts who actually eat where they take you.",
    image: "tripChengduNight",
    forWho: ["Food-led travelers", "Night owls", "Curious eaters who want to order like a local"],
  },
  {
    slug: "mountains-nature",
    name: "Mountains & Nature",
    tagline: "Karst peaks, high plateaus, deserts and wild trails.",
    description:
      "From the sandstone pillars of Zhangjiajie to the meadows of Shangri-La, these trips trade city pace for big landscapes, walking days and clean mountain air.",
    image: "tripWildYunnan",
    forWho: ["Active travelers and hikers", "Photographers", "Anyone craving China's wild side"],
  },
  {
    slug: "ancient-culture",
    name: "Ancient Culture",
    tagline: "Old capitals, living traditions and stories beneath the surface.",
    description:
      "Go deep on the history — imperial capitals, Buddhist cave art, Silk Road oases — with specialist guides who turn ruins and relics into real stories.",
    image: "tripSilkRoad",
    forWho: ["History and culture travelers", "Repeat visitors", "Slow, curious explorers"],
  },
  {
    slug: "big-city",
    name: "Big City Energy",
    tagline: "Future-facing skylines, creative neighborhoods and midnight noodles.",
    description:
      "China's cities are some of the most dynamic on earth. These trips dive into the skylines, design districts and after-hours energy of places like Shanghai and Chongqing.",
    image: "tripChongqing",
    forWho: ["City lovers", "Design and architecture fans", "Travelers who come alive after dark"],
  },
  {
    slug: "slow-local",
    name: "Slow & Local",
    tagline: "Fewer stops. Longer conversations. Better stories.",
    description:
      "The antidote to checklist travel: fewer destinations, more time in each, and space for the unplanned moments that make a trip memorable.",
    image: "yunnan" as TravelStyle["image"],
    forWho: ["Repeat visitors", "Couples and solo travelers", "Anyone tired of rushing"],
  },
  {
    slug: "small-group",
    name: "Small Group Tours",
    tagline: "Real travelers, local hosts, a maximum of twelve.",
    description:
      "Capped, friendly group departures with a single local guide — the social ease of a group without the megabus crowds.",
    image: "tripEssentials",
    forWho: ["Solo travelers", "First-timers who want company", "Value-minded travelers"],
  },
  {
    slug: "private",
    name: "Private Trips",
    tagline: "Your pace, your people, your plan.",
    description:
      "Private guides, private vehicles and an itinerary shaped entirely around you — ideal for families, special occasions or travelers who want full flexibility.",
    image: "tripBeijingStopover",
    forWho: ["Families", "Couples and special occasions", "Travelers who want control over the pace"],
  },
  {
    slug: "city-experience",
    name: "City Experiences",
    tagline: "Short, sharp, unforgettable — hours, not days.",
    description:
      "Half-day and evening experiences for stopovers and city breaks — food crawls, neighborhood walks and after-dark adventures.",
    image: "chengdu" as TravelStyle["image"],
    forWho: ["Stopover travelers", "City-break visitors", "Anyone with a free evening"],
  },
];

export function getAllTravelStyles(): TravelStyle[] {
  return travelStyles;
}

export function getTravelStyleBySlug(slug: string): TravelStyle | undefined {
  return travelStyles.find((s) => s.slug === slug);
}

/**
 * Editorial "Pick Your China" categories with asymmetric grid weights.
 * These map to travel-style detail pages where one exists.
 */
export const editorialCategories: EditorialCategory[] = [
  { slug: "first-time", title: "First Time in China", description: "The icons, minus the predictable itinerary.", image: "tripEssentials", span: "large" },
  { slug: "food-nightlife", title: "Food & Nightlife", description: "Breakfast stalls, hotpot steam and cities after dark.", image: "tripChengduNight", span: "tall" },
  { slug: "mountains-nature", title: "Mountains & Nature", description: "Karst peaks, high plateaus, deserts and wild trails.", image: "tripWildYunnan", span: "small" },
  { slug: "ancient-culture", title: "Ancient Culture", description: "Old capitals, living traditions and stories beneath the surface.", image: "xian", span: "wide" },
  { slug: "big-city", title: "Big City Energy", description: "Future-facing skylines, creative neighborhoods and midnight noodles.", image: "tripChongqing", span: "small" },
  { slug: "slow-local", title: "Slow & Local", description: "Fewer stops. Longer conversations. Better stories.", image: "yunnan", span: "small" },
];
