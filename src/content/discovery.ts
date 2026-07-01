import type { ImageKey } from "@/lib/images";

/**
 * Editable content for search/discovery: the compact destination-intro blocks
 * shown above filtered results, and operational notices. Kept in the content
 * layer so copy can change without touching components.
 */

export interface DestinationIntro {
  slug: string;
  eyebrow: string;
  heading: string;
  description: string;
  utilityPoints: string[];
  image: ImageKey;
  primaryCta: { label: string; href: string };
  secondaryLink: { label: string; href: string };
}

export const destinationIntros: Record<string, DestinationIntro> = {
  tibet: {
    slug: "tibet",
    eyebrow: "Tibetan Plateau",
    heading: "Tibet trips",
    description:
      "High-altitude landscapes, monastery towns, sacred lakes and overland journeys designed with the practical details handled.",
    utilityPoints: [
      "Private journeys",
      "Local guide arrangements",
      "Permit coordination",
      "Altitude-aware pacing",
      "English-speaking support",
    ],
    image: "spotlightTibet",
    primaryCta: { label: "Plan a Custom Tibet Trip", href: "/plan-my-trip?destination=Tibet" },
    secondaryLink: { label: "Read the Tibet Travel Guide", href: "/destinations/tibet" },
  },
  chengdu: {
    slug: "chengdu",
    eyebrow: "Sichuan",
    heading: "Chengdu trips",
    description:
      "Pandas, food, tea houses, local neighborhoods and gateways to western China — the most relaxed way into the country.",
    utilityPoints: [
      "Panda experiences",
      "Food & tea-house culture",
      "Private or small group",
      "Family-friendly",
      "English-speaking support",
    ],
    image: "spotlightChengdu",
    primaryCta: { label: "Plan a Custom Chengdu Trip", href: "/plan-my-trip?destination=Chengdu" },
    secondaryLink: { label: "Read the Chengdu Travel Guide", href: "/destinations/chengdu" },
  },
};

/**
 * Operational notice for Tibet. Intentionally non-absolute: it describes that
 * additional arrangements are coordinated, without promising permits or
 * presenting a permit as a visa. Edit here.
 */
export const TIBET_NOTICE =
  "Travel to Tibet involves additional permits and operating arrangements. Our team coordinates the required travel documentation and local arrangements after booking eligibility is confirmed.";
