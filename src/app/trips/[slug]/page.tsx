import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, X, Clock, MapPin, Users, Mountain, Sparkles, ArrowRight } from "lucide-react";
import { getAllTrips, getTripBySlug, getRelatedTrips } from "@/content/trips";
import { getReviewsForTrip } from "@/content/reviews";
import { getHostBySlug } from "@/content/hosts";
import { getImage } from "@/lib/images";
import { formatDuration, formatPriceUSD } from "@/lib/utils";
import { buildMetadata, breadcrumbSchema, tripSchema, faqSchema } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Rating } from "@/components/ui/Rating";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { HeroGallery } from "@/components/trips/HeroGallery";
import { DayByDayItinerary } from "@/components/trips/DayByDayItinerary";
import { TripBooking } from "@/components/trips/TripBooking";
import { HostCard } from "@/components/cards/HostCard";
import { ReviewCard } from "@/components/cards/ReviewCard";
import { TripCard } from "@/components/cards/TripCard";

export function generateStaticParams() {
  return getAllTrips().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const trip = getTripBySlug(slug);
  if (!trip) return {};
  return buildMetadata({
    title: trip.name,
    description: trip.tagline,
    path: `/trips/${trip.slug}`,
    image: getImage(trip.image).src,
  });
}

// Small labelled section wrapper for consistent spacing + anchors.
function Block({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="border-t border-soft-gray pt-8">
      <h2 className="font-display text-2xl font-bold">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default async function TripDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trip = getTripBySlug(slug);
  if (!trip) notFound();

  const reviews = getReviewsForTrip(trip.slug);
  const host = getHostBySlug(trip.hostSlug);
  const related = getRelatedTrips(trip);
  const durationLabel = formatDuration(trip.durationValue, trip.durationUnit);
  const path = `/trips/${trip.slug}`;

  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Trips", path: "/trips" },
    { name: trip.name, path },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          tripSchema({
            name: trip.name,
            description: trip.tagline,
            path,
            image: getImage(trip.image).src,
            priceUSD: trip.fromPriceUSD,
            rating: trip.rating,
            reviewCount: trip.reviewCount,
          }),
          faqSchema(trip.faqs),
        ]}
      />

      <div className="container-site pt-6">
        <Breadcrumbs items={crumbs} />
      </div>

      {/* 1. Hero gallery */}
      <div className="container-site pt-5">
        <HeroGallery images={trip.gallery} title={trip.name} />
      </div>

      <div className="container-site grid gap-10 pb-28 pt-8 lg:grid-cols-[1fr_360px] lg:pb-16">
        {/* Main column */}
        <div className="min-w-0">
          {/* 3-11 Title block */}
          <span className="label-eyebrow text-gogo-red">{trip.category}</span>
          <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">{trip.name}</h1>
          <p className="mt-3 max-w-2xl text-lg text-muted-text">{trip.tagline}</p>

          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <Rating value={trip.rating} reviewCount={trip.reviewCount} />
            <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-muted-text" aria-hidden="true" /> {durationLabel}</span>
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-muted-text" aria-hidden="true" /> {trip.route.join(" – ")}</span>
            <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-muted-text" aria-hidden="true" /> Up to {trip.maxGroupSize}</span>
            <span className="flex items-center gap-1.5"><Mountain className="h-4 w-4 text-muted-text" aria-hidden="true" /> {trip.activityLevel}</span>
            <span className="rounded-pill bg-ivory px-3 py-1 text-xs font-semibold">{trip.style}</span>
            {trip.customizable && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-electric-blue">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Customizable
              </span>
            )}
          </div>

          <div className="mt-10 flex flex-col gap-10">
            {/* 14. Highlights */}
            <Block id="highlights" title="Trip highlights">
              <ul className="grid gap-3 sm:grid-cols-2">
                {trip.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-jade" aria-hidden="true" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </Block>

            {/* 15. Who this trip is for */}
            <Block title="Who this trip is for">
              <ul className="flex flex-col gap-2.5">
                {trip.whoFor.map((w) => (
                  <li key={w} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gogo-red" aria-hidden="true" />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </Block>

            {/* 16. Itinerary */}
            <Block id="itinerary" title="Day by day">
              <DayByDayItinerary days={trip.itinerary} />
            </Block>

            {/* 17 & 18. Accommodation + transport */}
            <Block title="Accommodation & transport">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-card border border-soft-gray bg-paper p-5">
                  <h3 className="font-semibold">Where you&apos;ll stay</h3>
                  <p className="mt-2 text-sm text-muted-text">{trip.accommodation}</p>
                </div>
                <div className="rounded-card border border-soft-gray bg-paper p-5">
                  <h3 className="font-semibold">How you&apos;ll travel</h3>
                  <p className="mt-2 text-sm text-muted-text">{trip.transport}</p>
                </div>
              </div>
            </Block>

            {/* 19 & 20. Included / not included */}
            <Block title="What's included">
              <div className="grid gap-6 sm:grid-cols-2">
                <ul className="flex flex-col gap-2.5">
                  {trip.included.map((i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-jade" aria-hidden="true" /> {i}
                    </li>
                  ))}
                </ul>
                <ul className="flex flex-col gap-2.5">
                  {trip.notIncluded.map((i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-muted-text">
                      <X className="mt-0.5 h-5 w-5 shrink-0 text-gogo-red" aria-hidden="true" /> {i}
                    </li>
                  ))}
                </ul>
              </div>
            </Block>

            {/* 21. Host */}
            {host && (
              <Block title="Your local host">
                <div className="max-w-sm">
                  <HostCard host={host} />
                </div>
              </Block>
            )}

            {/* 22. Route map placeholder */}
            <Block title="Route map">
              <div className="flex min-h-[220px] flex-col items-center justify-center gap-2 rounded-card border border-dashed border-soft-gray bg-paper text-center text-muted-text">
                <MapPin className="h-7 w-7" aria-hidden="true" />
                <p className="text-sm">Interactive map placeholder — {trip.route.join(" → ")}</p>
                <p className="text-xs">Replace with a real map embed before launch.</p>
              </div>
            </Block>

            {/* 23. Departure dates */}
            <Block id="departures" title="Departure dates">
              <ul className="divide-y divide-soft-gray rounded-card border border-soft-gray bg-paper">
                {trip.departures.map((dep) => (
                  <li key={dep.date} className="flex items-center justify-between px-5 py-3 text-sm">
                    <span className="font-medium">
                      {(() => {
                        const [y, m, d] = dep.date.split("-").map(Number);
                        const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
                        return `${months[(m ?? 1) - 1]} ${d}, ${y}`;
                      })()}
                    </span>
                    <span className="flex items-center gap-4">
                      <span className={dep.status === "limited" ? "text-gogo-red" : "text-jade"}>
                        {dep.status === "limited" ? "Limited spots" : dep.status === "guaranteed" ? "Guaranteed" : "Available"}
                      </span>
                      <span className="font-semibold">{formatPriceUSD(dep.priceUSD)}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Block>

            {/* 24. Reviews */}
            {reviews.length > 0 && (
              <Block id="reviews" title="Traveler reviews">
                <div className="grid gap-4 sm:grid-cols-2">
                  {reviews.map((r) => (
                    <ReviewCard key={r.id} review={r} />
                  ))}
                </div>
              </Block>
            )}

            {/* 25. FAQ */}
            {trip.faqs.length > 0 && (
              <Block id="faq" title="Frequently asked questions">
                <FaqAccordion faqs={trip.faqs} />
              </Block>
            )}

            {/* 26. Cancellation */}
            <Block title="Cancellation & flexibility">
              <p className="text-sm text-muted-text">{trip.cancellation}</p>
            </Block>
          </div>
        </div>

        {/* 13. Sticky booking column */}
        <aside className="lg:min-w-0">
          <TripBooking
            tripName={trip.name}
            fromPriceUSD={trip.fromPriceUSD}
            departures={trip.departures}
            durationLabel={durationLabel}
          />
        </aside>
      </div>

      {/* 27. Related trips */}
      {related.length > 0 && (
        <section className="bg-ivory">
          <div className="container-site py-16">
            <h2 className="font-display text-section">You might also like</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((t) => (
                <TripCard key={t.slug} trip={t} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 28. Final consultation CTA */}
      <section className="bg-ink text-paper">
        <div className="container-site flex flex-col items-start gap-4 py-14 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold md:text-3xl">Want this trip, tweaked to you?</h2>
            <p className="mt-2 text-paper/80">Tell us your dates and we&apos;ll tailor the route. Replies within one business day.</p>
          </div>
          <div className="flex gap-3">
            <Link href={`/plan-my-trip?trip=${encodeURIComponent(trip.name)}`} className="btn-primary group">
              Plan this trip
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link href="/contact" className="btn-secondary border-paper text-paper hover:bg-paper hover:text-ink">
              Talk to an expert
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
