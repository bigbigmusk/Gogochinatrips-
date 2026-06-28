import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getImage } from "@/lib/images";
import { HeroSearch } from "@/components/search/HeroSearch";

/**
 * Full-width editorial homepage hero with an integrated destination search.
 * The image carries descriptive alt text and uses priority loading as the LCP.
 */
export function Hero() {
  const img = getImage("heroHome");

  return (
    <section className="relative">
      <div className="relative min-h-[88vh] w-full overflow-hidden md:min-h-[92vh]">
        <Image
          src={img.src}
          alt={img.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Readability scrim — meaning is never carried by color/gradient alone. */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/25 to-ink/70" />

        <div className="container-site relative flex min-h-[88vh] flex-col justify-center pb-44 pt-12 text-paper md:min-h-[92vh] md:pb-52">
          <div className="max-w-3xl animate-fade-up">
            <span className="label-eyebrow text-paper/90">Trips made in China, for the curious</span>
            <h1 className="mt-4 text-hero text-paper">China, without the guesswork.</h1>
            <p className="mt-5 max-w-xl text-lg text-paper/90 md:text-xl">
              Small-group trips, private journeys and local experiences designed by people who
              actually live here.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/trips" className="btn-primary group text-base">
                Explore China Trips
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
              <Link href="/plan-my-trip" className="btn-blue text-base">
                Build My Trip
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Search component anchored to the lower hero, overlapping into the page. */}
      <div className="container-site relative z-10 -mt-32 pb-4 md:-mt-36">
        <div className="mx-auto max-w-3xl">
          <HeroSearch />
        </div>
      </div>
    </section>
  );
}
