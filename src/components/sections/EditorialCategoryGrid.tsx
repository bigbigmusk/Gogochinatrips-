import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { editorialCategories } from "@/content/travel-styles";
import { getImage } from "@/lib/images";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

// Asymmetric span classes keyed to each category's editorial weight.
const SPAN: Record<string, string> = {
  large: "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto",
  tall: "md:row-span-2 aspect-[3/4] md:aspect-auto",
  wide: "md:col-span-2 aspect-[16/10] md:aspect-auto",
  small: "aspect-[4/3] md:aspect-auto",
};

/** "Pick Your China" — an asymmetric editorial grid of trip categories. */
export function EditorialCategoryGrid() {
  return (
    <section className="container-site py-16 md:py-24">
      <SectionHeading
        eyebrow="Find your angle"
        title="Pick Your China"
        intro="There's no single China. Start from the version of the trip you actually want."
      />
      <div className="mt-10 grid auto-rows-[180px] grid-cols-2 gap-4 md:grid-cols-4 md:auto-rows-[200px]">
        {editorialCategories.map((cat, i) => {
          const img = getImage(cat.image);
          return (
            <Link
              key={cat.slug}
              href={`/travel-styles/${cat.slug}`}
              className={cn(
                "group relative overflow-hidden rounded-card",
                SPAN[cat.span],
              )}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority={i === 0}
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 ease-editorial group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-4 text-paper">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-xl font-bold leading-tight md:text-2xl">{cat.title}</h3>
                  <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
                </div>
                <p className="mt-1 text-sm text-paper/90">{cat.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
