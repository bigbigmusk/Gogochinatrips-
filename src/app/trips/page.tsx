import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllTrips } from "@/content/trips";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { TripsExplorer } from "@/components/trips/TripsExplorer";

/**
 * Search-driven trips listing. Because results are filtered client-side from
 * the URL query, arbitrary `?q=` combinations are not distinct indexable pages
 * — the canonical points at /trips, and stable destination landing pages
 * (/destinations/*) carry long-term SEO.
 */
export const metadata: Metadata = buildMetadata({
  title: "All China Trips",
  description:
    "Browse curated small-group tours, private journeys and city experiences across China — including Chengdu and Tibet. Filter by destination, duration, budget and travel style.",
  path: "/trips",
});

export default function TripsPage() {
  const trips = getAllTrips();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Trips", path: "/trips" },
        ])}
      />
      <div className="container-site pt-8">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Trips", path: "/trips" },
          ]}
        />
      </div>
      <section className="container-site py-8">
        <Suspense fallback={<div className="py-20 text-center text-muted-text">Loading trips…</div>}>
          <TripsExplorer trips={trips} />
        </Suspense>
      </section>
    </>
  );
}
