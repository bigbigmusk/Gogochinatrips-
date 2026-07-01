/**
 * Global, editable site content: brand strings, navigation, announcement bar,
 * trust signals and the static homepage editorial blocks. Centralized so copy
 * can be updated (or moved to a CMS) without touching components.
 */

export const SITE = {
  name: "GoGoChinaTrips",
  shortName: "GoGo",
  tagline: "China, without the guesswork.",
  supportingLine:
    "Small-group trips, private journeys and local experiences designed by people who actually live here.",
  url: "https://www.gogochinatrips.com",
  email: "hello@gogochinatrips.com",
  // Display number and the corresponding wa.me link (digits only, no + or spaces).
  whatsapp: "+86 185 7554 9201",
  whatsappUrl: "https://wa.me/8618575549201",
  description:
    "Curated small-group tours, private journeys and local experiences across China for international travelers. China, without the guesswork.",
} as const;

export const ANNOUNCEMENT = {
  message: "Planning China in 2026? Start with our practical arrival guide.",
  href: "/china-guide/what-to-know-visa-free-transit",
  linkLabel: "Read the guide",
};

export const PRIMARY_NAV = [
  { label: "Trips", href: "/trips" },
  { label: "Destinations", href: "/destinations" },
  { label: "Travel Styles", href: "/travel-styles" },
  { label: "China Guide", href: "/china-guide" },
  { label: "About", href: "/about" },
] as const;

export const CURRENCIES = ["USD", "GBP", "EUR", "AUD", "CAD"] as const;
export const LANGUAGES = ["English", "Deutsch", "Français", "Español"] as const;

export const TRUST_SIGNALS = [
  { icon: "MapPin", label: "Local China Team" },
  { icon: "MessageCircle", label: "English-Speaking Support" },
  { icon: "ShieldCheck", label: "No Forced Shopping" },
  { icon: "Lock", label: "Secure International Payments" },
  { icon: "Clock", label: "24/7 In-Trip Assistance" },
] as const;

export const HERO_SUGGESTIONS = [
  "Beijing",
  "Shanghai",
  "Xi'an",
  "Chengdu",
  "Chongqing",
  "Zhangjiajie",
  "Yunnan",
  "Tibet",
  "Xinjiang",
] as const;

export const QUICK_SEARCH_CHIPS = [
  { label: "First Time in China", href: "/travel-styles/first-time" },
  { label: "Food Trips", href: "/travel-styles/food-nightlife" },
  { label: "Panda Trips", href: "/destinations/chengdu" },
  { label: "Visa-Free Stopovers", href: "/trips/beijing-stopover" },
  { label: "Small Group Tours", href: "/travel-styles/small-group" },
  { label: "Private Trips", href: "/travel-styles/private" },
] as const;

export const WHY_BLOCKS = [
  {
    title: "Made by people who live here",
    body: "We design routes with local guides and destination teams across China.",
    icon: "Users",
  },
  {
    title: "No shopping detours",
    body: "Our trips are designed around travelers, not commission stops.",
    icon: "Ban",
  },
  {
    title: "Help with the hard parts",
    body: "Payments, transport, apps, tickets and arrival details are explained before you go.",
    icon: "LifeBuoy",
  },
  {
    title: "Support while you travel",
    body: "Reach an English-speaking team when you need help during your trip.",
    icon: "Headphones",
  },
] as const;

export const HOW_IT_WORKS = {
  "ready-made": {
    label: "Ready-Made Trips",
    steps: [
      { title: "Choose", body: "Browse curated trips and pick the one that fits." },
      { title: "Book", body: "Reserve a departure with a simple, secure deposit." },
      { title: "Prepare", body: "Get a pre-trip pack covering visas, apps and arrival." },
      { title: "Go", body: "Meet your local host and travel with support on call." },
    ],
  },
  custom: {
    label: "Custom Trips",
    steps: [
      { title: "Tell Us", body: "Share where, when and how you like to travel." },
      { title: "Get a Plan", body: "Receive a tailored draft itinerary and quote." },
      { title: "Refine It", body: "Tweak the route, pace and budget until it's right." },
      { title: "Confirm", body: "Lock it in and we handle every detail." },
    ],
  },
} as const;

export const FOOTER_NAV = {
  Explore: [
    { label: "Trips", href: "/trips" },
    { label: "Destinations", href: "/destinations" },
    { label: "Travel Styles", href: "/travel-styles" },
    { label: "China Guide", href: "/china-guide" },
  ],
  Support: [
    { label: "Contact", href: "/contact" },
    { label: "Booking Conditions", href: "/china-guide" },
    { label: "Cancellation Policy", href: "/china-guide" },
    { label: "Payment Security", href: "/china-guide" },
    { label: "Travel Insurance", href: "/china-guide" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/about" },
    { label: "Local Hosts", href: "/about#hosts" },
    { label: "Responsible Travel", href: "/about" },
  ],
  Partners: [
    { label: "Travel Agents", href: "/contact" },
    { label: "Student Groups", href: "/contact" },
    { label: "Corporate & MICE", href: "/contact" },
    { label: "Become a Supplier", href: "/contact" },
  ],
} as const;
