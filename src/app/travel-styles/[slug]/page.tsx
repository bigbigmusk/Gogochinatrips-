import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { getAllTravelStyles, getTravelStyleBySlug } from "@/content/travel-styles";
import { getTripsByTravelStyle } from "@/content/trips";
import { getImage } from "@/lib/images";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { TripCard } from "@/components/cards/TripCard";

export function generateStaticParams() {
  return getAllTravelStyles().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const style = getTravelStyleBySlug(slug);
  if (!style) return {};
  return buildMetadata({
    title: `${style.name} in China`,
    description: style.description,
    path: `/travel-styles/${style.slug}`,
    image: getImage(style.image).src,
  });
}

export default async function TravelStyleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const style = getTravelStyleBySlug(slug);
  if (!style) notFound();

  const trips = getTripsByTravelStyle(style.slug);
  const img = getImage(style.image);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Travel Styles", path: "/travel-styles" },
    { name: style.name, path: `/travel-styles/${style.slug}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      <div className="relative min-h-[48vh] w-full overflow-hidden">
        <Image src={img.src} alt={img.alt} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/40" />
        <div className="container-site relative flex min-h-[48vh] flex-col justify-end pb-10 pt-20 text-paper">
          <Breadcrumbs items={crumbs} />
          <span className="label-eyebrow mt-4 text-paper/90">Travel style</span>
          <h1 className="mt-2 text-hero text-paper">{style.name}</h1>
          <p className="mt-3 max-w-2xl text-lg text-paper/90">{style.tagline}</p>
        </div>
      </div>

      <section className="container-site py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <p className="text-lg text-muted-text">{style.description}</p>
          <div className="rounded-card border border-soft-gray bg-paper p-5">
            <h2 className="font-display text-lg font-bold">Best for</h2>
            <ul className="mt-3 flex flex-col gap-2.5">
              {style.forWho.map((w) => (
                <li key={w} className="flex items-start gap-2.5 text-sm">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-jade" aria-hidden="true" /> {w}
                </li>
              ))}
            </ul>
            <Link href="/plan-my-trip" className="btn-primary mt-5 w-full">Plan a trip</Link>
          </div>
        </div>
      </section>

      <section className="bg-ivory">
        <div className="container-site py-16">
          <h2 className="font-display text-section">{style.name} trips</h2>
          {trips.length > 0 ? (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {trips.map((t) => (
                <TripCard key={t.slug} trip={t} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-card border border-dashed border-soft-gray bg-paper p-10 text-center">
              <p className="text-muted-text">New trips in this style are on the way.</p>
              <Link href="/plan-my-trip" className="btn-secondary mt-4">Request a custom trip</Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
