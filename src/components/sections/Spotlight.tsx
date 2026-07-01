import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { getImage, type ImageKey } from "@/lib/images";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getTripsByDestination } from "@/content/trips";

interface SpotlightItem {
  destinationSlug: string;
  image: ImageKey;
  title: string;
  kicker: string;
  description: string;
  tags: string[];
}

// Tibet and Chengdu are the site's headline highlights.
const ITEMS: SpotlightItem[] = [
  {
    destinationSlug: "tibet",
    image: "spotlightTibet",
    title: "Tibet",
    kicker: "The roof of the world",
    description:
      "Lhasa's great palaces, monastery debates and a sacred turquoise lake — the Himalayan plateau, with every permit and altitude detail handled for you.",
    tags: ["Potala Palace", "Sacred lakes", "Licensed guides"],
  },
  {
    destinationSlug: "chengdu",
    image: "spotlightChengdu",
    title: "Chengdu",
    kicker: "Pandas, tea houses & hotpot",
    description:
      "Giant pandas at dawn, slow tea-house afternoons and the birthplace of mala hotpot — the most relaxed, food-led way into China.",
    tags: ["Giant pandas", "Sichuan food", "Family-friendly"],
  },
];

/** "Our biggest highlights" — a bold two-up feature for Tibet and Chengdu. */
export function Spotlight() {
  return (
    <section className="bg-ink text-paper">
      <div className="container-site py-16 md:py-24">
        <SectionHeading
          eyebrow="Our biggest highlights"
          title="Two trips worth crossing the world for"
          intro="Of everywhere we travel in China, these two leave the deepest mark. Start here."
          className="[&_h2]:text-paper [&_p]:text-paper/80"
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {ITEMS.map((item, i) => {
            const img = getImage(item.image);
            const tripCount = getTripsByDestination(item.destinationSlug).length;
            return (
              <Link
                key={item.destinationSlug}
                href={`/destinations/${item.destinationSlug}`}
                className="group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-card"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 ease-editorial group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <div className="relative p-7">
                  <span className="label-eyebrow text-paper/90">
                    <Star className="h-3.5 w-3.5 fill-gogo-red text-gogo-red" aria-hidden="true" />
                    {item.kicker}
                  </span>
                  <h3 className="mt-2 font-display text-4xl font-bold md:text-5xl">{item.title}</h3>
                  <p className="mt-2 max-w-md text-paper/90">{item.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((t) => (
                      <span key={t} className="rounded-pill bg-white/15 px-3 py-1 text-xs font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-paper">
                    Explore {item.title} · {tripCount} {tripCount === 1 ? "trip" : "trips"}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
