import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAllTravelStyles } from "@/content/travel-styles";
import { getTripsByTravelStyle } from "@/content/trips";
import { getImage } from "@/lib/images";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { JsonLd } from "@/components/ui/JsonLd";

export const metadata: Metadata = buildMetadata({
  title: "China Travel Styles",
  description:
    "However you like to travel — first-timer, foodie, hiker, culture-seeker, city-lover or slow explorer — there's a China trip style for you.",
  path: "/travel-styles",
});

export default function TravelStylesPage() {
  const styles = getAllTravelStyles();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Travel Styles", path: "/travel-styles" },
        ])}
      />
      <PageHeader
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Travel Styles", path: "/travel-styles" },
        ]}
        eyebrow="How you travel"
        title="Travel styles"
        intro="Start from the kind of trip you want, and we'll point you to the right itineraries."
      />
      <section className="container-site py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {styles.map((s, i) => {
            const img = getImage(s.image);
            const count = getTripsByTravelStyle(s.slug).length;
            return (
              <Link
                key={s.slug}
                href={`/travel-styles/${s.slug}`}
                className="group relative block aspect-[4/3] overflow-hidden rounded-card"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  priority={i < 2}
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                  className="object-cover transition-transform duration-500 ease-editorial group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-5 text-paper">
                  <div className="flex items-start justify-between gap-2">
                    <h2 className="font-display text-2xl font-bold">{s.name}</h2>
                    <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
                  </div>
                  <p className="mt-1 text-sm text-paper/90">{s.tagline}</p>
                  <span className="mt-3 text-xs font-semibold uppercase tracking-wide text-paper/80">
                    {count} {count === 1 ? "trip" : "trips"}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
