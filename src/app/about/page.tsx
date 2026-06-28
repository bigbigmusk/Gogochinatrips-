import type { Metadata } from "next";
import Link from "next/link";
import { Users, Ban, LifeBuoy, Heart, Leaf, Globe2 } from "lucide-react";
import { getAllHosts } from "@/content/hosts";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { JsonLd } from "@/components/ui/JsonLd";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HostCard } from "@/components/cards/HostCard";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "GoGoChinaTrips is a China-based travel team helping international visitors explore China without the guesswork — with local guides, honest trips and real support.",
  path: "/about",
});

const VALUES = [
  { icon: Users, title: "Local by design", body: "Our routes are built with guides and destination teams who live across China." },
  { icon: Ban, title: "No commission stops", body: "We don't do forced-shopping detours. Your time is spent on the trip, not in jade showrooms." },
  { icon: LifeBuoy, title: "Support that shows up", body: "An English-speaking team is reachable before and during every trip." },
  { icon: Heart, title: "Travelers first", body: "We'd rather lose a booking than over-promise. Honest advice, every time." },
  { icon: Leaf, title: "Responsible travel", body: "We favor local businesses, smaller groups and lower-impact transport like rail." },
  { icon: Globe2, title: "Built for the world", body: "Designed for English-speaking travelers, with the practical details handled." },
];

export default function AboutPage() {
  const hosts = getAllHosts();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <PageHeader
        crumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
        eyebrow="About us"
        title="China, without the guesswork"
        intro="We're a China-based travel team that designs trips for curious international travelers. We live here — so you don't have to figure it out alone."
      />

      <section className="container-site py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v) => (
            <div key={v.title} className="rounded-card border border-soft-gray bg-paper p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ivory text-gogo-red">
                <v.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="mt-4 font-display text-lg font-bold">{v.title}</h2>
              <p className="mt-2 text-sm text-muted-text">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="hosts" className="bg-ivory">
        <div className="container-site py-16">
          <SectionHeading
            eyebrow="Local hosts"
            title="The people who make the trip"
            intro="Guides and trip designers across China who turn an itinerary into a real experience."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {hosts.map((h) => (
              <HostCard key={h.slug} host={h} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-site py-16">
        <div className="flex flex-col items-start justify-between gap-4 rounded-card bg-ink p-8 text-paper md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold">Let&apos;s plan something good.</h2>
            <p className="mt-2 text-paper/80">Tell us how you like to travel — we&apos;ll take it from there.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/plan-my-trip" className="btn-primary">Plan My Trip</Link>
            <Link href="/contact" className="btn-secondary border-paper text-paper hover:bg-paper hover:text-ink">Contact us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
