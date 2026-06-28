import type { Metadata } from "next";
import { SITE } from "@/content/site";

/**
 * SEO helpers: build consistent route-level metadata (title, description,
 * canonical, Open Graph, Twitter cards) and JSON-LD structured data.
 */

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  image?: string;
}

export function buildMetadata({ title, description, path, image }: PageMetaInput): Metadata {
  const url = `${SITE.url}${path}`;
  const ogImage = image ?? `${SITE.url}/opengraph-image`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      type: "website",
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

/** Organization + TravelAgency schema for the root layout. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    email: SITE.email,
    areaServed: "China",
    knowsLanguage: ["en", "zh"],
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE.url}${c.path}`,
    })),
  };
}

export function tripSchema(input: {
  name: string;
  description: string;
  path: string;
  image: string;
  priceUSD: number;
  rating?: number;
  reviewCount?: number;
}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: input.name,
    description: input.description,
    url: `${SITE.url}${input.path}`,
    image: input.image,
    offers: {
      "@type": "Offer",
      price: input.priceUSD,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    provider: { "@type": "TravelAgency", name: SITE.name, url: SITE.url },
  };
  // Only attach aggregateRating when we have (mock-but-structured) review data.
  if (input.rating && input.reviewCount) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: input.rating,
      reviewCount: input.reviewCount,
      bestRating: 5,
    };
  }
  return schema;
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  image: string;
  publishedISO: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    image: input.image,
    datePublished: input.publishedISO,
    url: `${SITE.url}${input.path}`,
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
  };
}
