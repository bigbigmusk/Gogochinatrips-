import type { Metadata } from "next";
import { getAllDestinations } from "@/content/destinations";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { JsonLd } from "@/components/ui/JsonLd";
import { DestinationCard } from "@/components/cards/DestinationCard";

export const metadata: Metadata = buildMetadata({
  title: "China Destinations",
  description:
    "Explore China city by city — Beijing, Shanghai, Xi'an, Chengdu, Chongqing, Zhangjiajie, Yunnan and Xinjiang. Find the trips that go there.",
  path: "/destinations",
});

export default function DestinationsPage() {
  const destinations = getAllDestinations();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Destinations", path: "/destinations" },
        ])}
      />
      <PageHeader
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Destinations", path: "/destinations" },
        ]}
        eyebrow="Where to"
        title="China, city by city"
        intro="Each place has its own personality. Start where you're curious — we'll handle how they connect."
      />
      <section className="container-site py-10">
        <div className="grid auto-rows-[240px] grid-cols-2 gap-4 md:grid-cols-3">
          {destinations.map((d, i) => (
            <DestinationCard
              key={d.slug}
              destination={d}
              priority={i < 2}
              className={i % 5 === 0 ? "col-span-2 row-span-2" : ""}
            />
          ))}
        </div>
      </section>
    </>
  );
}
