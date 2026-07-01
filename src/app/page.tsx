import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Spotlight } from "@/components/sections/Spotlight";
import { EditorialCategoryGrid } from "@/components/sections/EditorialCategoryGrid";
import { TripCarousel } from "@/components/sections/TripCarousel";
import { TripMatcher } from "@/components/sections/TripMatcher";
import { WhyGoGo } from "@/components/sections/WhyGoGo";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { FinalCta } from "@/components/sections/FinalCta";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { DestinationCard } from "@/components/cards/DestinationCard";
import { HostCard } from "@/components/cards/HostCard";
import { ReviewCard } from "@/components/cards/ReviewCard";
import { ArticleCard } from "@/components/cards/ArticleCard";
import { getBestSellerTrips, getAllTrips } from "@/content/trips";
import { getAllDestinations } from "@/content/destinations";
import { getAllHosts } from "@/content/hosts";
import { getAllReviews } from "@/content/reviews";
import { getAllArticles } from "@/content/articles";

export default function HomePage() {
  const bestSellers = getBestSellerTrips();
  // Fall back to all trips if fewer than four are flagged as best sellers.
  const carouselTrips = bestSellers.length >= 4 ? bestSellers : getAllTrips();
  const destinations = getAllDestinations().slice(0, 8);
  const hosts = getAllHosts();
  const reviews = getAllReviews().slice(0, 3);
  const articles = getAllArticles().slice(0, 4);

  return (
    <>
      <Hero />
      <TrustStrip />
      <Spotlight />
      <EditorialCategoryGrid />

      {/* Best-selling trips */}
      <section className="container-site py-16 md:py-24">
        <SectionHeading
          eyebrow="Best sellers"
          title="Start with a trip travelers love"
          intro="Hand-built itineraries that consistently earn the best reviews."
          link={{ label: "All trips", href: "/trips" }}
        />
        <div className="mt-10">
          <TripCarousel trips={carouselTrips} />
        </div>
      </section>

      <TripMatcher />

      {/* Destination grid */}
      <section className="container-site py-16 md:py-24">
        <SectionHeading
          eyebrow="Where to"
          title="China, city by city"
          intro="Pick a base — or string several together by high-speed rail."
          link={{ label: "All destinations", href: "/destinations" }}
        />
        <div className="mt-10 grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-4">
          {destinations.map((d, i) => (
            <DestinationCard
              key={d.slug}
              destination={d}
              priority={i === 0}
              className={i === 0 ? "col-span-2 row-span-2" : ""}
            />
          ))}
        </div>
      </section>

      <WhyGoGo />
      <HowItWorks />

      {/* Local hosts */}
      <section id="hosts" className="bg-ivory">
        <div className="container-site py-16 md:py-24">
          <SectionHeading
            eyebrow="Local hosts"
            title="Meet the people who make the trip"
            intro="Real guides and trip designers who live where you're going."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {hosts.map((h) => (
              <Reveal key={h.slug}>
                <HostCard host={h} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Traveler stories */}
      <section className="container-site py-16 md:py-24">
        <SectionHeading
          eyebrow="Traveler stories"
          title="Seen, eaten and loved by travelers"
          intro="Real moments from recent trips. (Sample content during prototyping.)"
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      </section>

      {/* China travel essentials */}
      <section className="bg-ivory">
        <div className="container-site py-16 md:py-24">
          <SectionHeading
            eyebrow="China, explained"
            title="The practical stuff, sorted"
            intro="Payments, apps, trains, visas — the answers you need before you go."
            link={{ label: "China Guide", href: "/china-guide" }}
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {articles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
          <div className="mt-8">
            <Link href="/china-guide" className="group inline-flex items-center gap-2 font-semibold text-ink hover:text-gogo-red">
              Read all guides
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
