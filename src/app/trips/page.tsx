import type { Metadata } from "next";
import { getAllTrips } from "@/content/trips";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { JsonLd } from "@/components/ui/JsonLd";
import { TripsExplorer } from "@/components/trips/TripsExplorer";

export const metadata: Metadata = buildMetadata({
  title: "All China Trips",
  description:
    "Browse curated small-group tours, private journeys and city experiences across China. Filter by destination, duration, budget and travel style.",
  path: "/trips",
});

export default async function TripsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const trips = getAllTrips();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Trips", path: "/trips" },
        ])}
      />
      <PageHeader
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Trips", path: "/trips" },
        ]}
        eyebrow="Browse"
        title="All China Trips"
        intro="From four-hour food crawls to three-week grand tours — find the trip that fits how you travel."
      />
      <section className="container-site py-10">
        <TripsExplorer trips={trips} initialQuery={q ?? ""} />
      </section>
    </>
  );
}
