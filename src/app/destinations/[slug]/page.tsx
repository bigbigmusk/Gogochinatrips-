import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Check } from "lucide-react";
import { getAllDestinations, getDestinationBySlug } from "@/content/destinations";
import { getTripsByDestination } from "@/content/trips";
import { getAllArticles } from "@/content/articles";
import { getImage } from "@/lib/images";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { TripCard } from "@/components/cards/TripCard";
import { ArticleCard } from "@/components/cards/ArticleCard";

export function generateStaticParams() {
  return getAllDestinations().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dest = getDestinationBySlug(slug);
  if (!dest) return {};
  return buildMetadata({
    title: `${dest.name} Travel Guide & Trips`,
    description: dest.intro,
    path: `/destinations/${dest.slug}`,
    image: getImage(dest.image).src,
  });
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-soft-gray pt-8">
      <h2 className="font-display text-2xl font-bold">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dest = getDestinationBySlug(slug);
  if (!dest) notFound();

  const trips = getTripsByDestination(dest.slug);
  const articles = getAllArticles().slice(0, 3);
  const img = getImage(dest.image);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/destinations" },
    { name: dest.name, path: `/destinations/${dest.slug}` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs)} />

      {/* Hero */}
      <div className="relative min-h-[56vh] w-full overflow-hidden">
        <Image src={img.src} alt={img.alt} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-ink/40" />
        <div className="container-site relative flex min-h-[56vh] flex-col justify-end pb-10 pt-20 text-paper">
          <Breadcrumbs items={crumbs} />
          <span className="label-eyebrow mt-4 text-paper/90">{dest.region}</span>
          <h1 className="mt-2 text-hero text-paper">{dest.name}</h1>
          <p className="mt-3 max-w-2xl text-lg text-paper/90">{dest.personality}</p>
        </div>
      </div>

      <div className="container-site grid gap-10 py-12 lg:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-10">
          <p className="text-lg text-muted-text">{dest.intro}</p>

          <Block title="Best reasons to visit">
            <ul className="grid gap-3 sm:grid-cols-2">
              {dest.reasonsToVisit.map((r) => (
                <li key={r} className="flex items-start gap-2.5 text-sm">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-jade" aria-hidden="true" /> {r}
                </li>
              ))}
            </ul>
          </Block>

          <Block title="Top experiences">
            <div className="grid gap-4 sm:grid-cols-3">
              {dest.topExperiences.map((e) => (
                <div key={e.title} className="rounded-card border border-soft-gray bg-paper p-5">
                  <h3 className="font-semibold">{e.title}</h3>
                  <p className="mt-2 text-sm text-muted-text">{e.description}</p>
                </div>
              ))}
            </div>
          </Block>

          <Block title="Neighborhoods & areas">
            <ul className="flex flex-col gap-3">
              {dest.neighborhoods.map((n) => (
                <li key={n.name} className="flex flex-col gap-1 rounded-card border border-soft-gray bg-paper p-4 sm:flex-row sm:items-baseline sm:gap-3">
                  <span className="font-semibold">{n.name}</span>
                  <span className="text-sm text-muted-text">{n.description}</span>
                </li>
              ))}
            </ul>
          </Block>

          <Block title="Local food to try">
            <div className="flex flex-wrap gap-2">
              {dest.localFood.map((f) => (
                <span key={f} className="rounded-pill bg-ivory px-4 py-2 text-sm">{f}</span>
              ))}
            </div>
          </Block>

          <Block title="Practical information">
            <ul className="divide-y divide-soft-gray rounded-card border border-soft-gray bg-paper">
              {dest.practical.map((p) => (
                <li key={p.label} className="flex flex-col gap-1 px-5 py-3 sm:flex-row sm:gap-4">
                  <span className="w-32 shrink-0 text-sm font-semibold">{p.label}</span>
                  <span className="text-sm text-muted-text">{p.value}</span>
                </li>
              ))}
            </ul>
          </Block>
        </div>

        {/* Sidebar quick facts + CTA */}
        <aside>
          <div className="sticky top-24 flex flex-col gap-4">
            <div className="rounded-card border border-soft-gray bg-paper p-5">
              <h2 className="font-display text-lg font-bold">Quick facts</h2>
              <ul className="mt-4 flex flex-col gap-3 text-sm">
                <li className="flex items-center gap-2.5">
                  <Calendar className="h-4 w-4 text-gogo-red" aria-hidden="true" />
                  <span><span className="font-medium">Best time:</span> {dest.bestTime}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Clock className="h-4 w-4 text-gogo-red" aria-hidden="true" />
                  <span><span className="font-medium">Recommended:</span> {dest.recommendedDays}</span>
                </li>
              </ul>
              <Link href={`/plan-my-trip?destination=${encodeURIComponent(dest.name)}`} className="btn-primary mt-5 w-full">
                Plan {dest.name}
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {/* Available trips */}
      {trips.length > 0 && (
        <section className="bg-ivory">
          <div className="container-site py-16">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-section">Trips that visit {dest.name}</h2>
              <Link href="/trips" className="group hidden items-center gap-2 text-sm font-semibold sm:inline-flex hover:text-gogo-red">
                All trips <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {trips.map((t) => (
                <TripCard key={t.slug} trip={t} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related guides */}
      <section className="container-site py-16">
        <h2 className="font-display text-section">Plan your trip</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </section>
    </>
  );
}
