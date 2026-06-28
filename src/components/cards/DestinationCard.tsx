import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Destination } from "@/content/types";
import { getImage } from "@/lib/images";
import { getTripCountForDestination } from "@/content/destinations";
import { cn } from "@/lib/utils";

/**
 * Bold image-led destination card with a one-line personality description and
 * trip count. Sizes adapt to the asymmetric grid via the className prop.
 */
export function DestinationCard({
  destination,
  className,
  priority = false,
}: {
  destination: Destination;
  className?: string;
  priority?: boolean;
}) {
  const img = getImage(destination.image);
  const tripCount = getTripCountForDestination(destination.slug);

  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className={cn(
        "group relative block overflow-hidden rounded-card",
        className,
      )}
    >
      <Image
        src={img.src}
        alt={img.alt}
        fill
        priority={priority}
        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
        className="object-cover transition-transform duration-500 ease-editorial group-hover:scale-[1.05]"
      />
      {/* Legibility gradient — not the sole carrier of meaning. */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-5 text-paper">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display text-2xl font-bold">{destination.name}</h3>
          <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
        </div>
        <p className="mt-1 max-w-sm text-sm text-paper/90">{destination.personality}</p>
        <span className="mt-3 text-xs font-semibold uppercase tracking-wide text-paper/80">
          {tripCount} {tripCount === 1 ? "trip" : "trips"}
        </span>
      </div>
    </Link>
  );
}
