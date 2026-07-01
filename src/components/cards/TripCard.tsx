"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Clock, Users, MapPin, Sparkles } from "lucide-react";
import type { Trip } from "@/content/types";
import { getImage } from "@/lib/images";
import { formatPriceUSD, formatDuration, cn } from "@/lib/utils";
import { Rating } from "@/components/ui/Rating";

/**
 * Product card for a trip. Shows image, category, name, duration, route,
 * price, rating, group size, style, a favorite toggle and a customization hint.
 */
export function TripCard({
  trip,
  className,
  onOpen,
}: {
  trip: Trip;
  className?: string;
  /** Optional analytics hook fired when the card's link is opened. */
  onOpen?: () => void;
}) {
  const [saved, setSaved] = useState(false);
  const img = getImage(trip.image);
  const hasReviews = trip.reviewCount > 0;

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-card border border-soft-gray bg-paper shadow-card transition-shadow hover:shadow-lift",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
          className="object-cover transition-transform duration-500 ease-editorial group-hover:scale-[1.04]"
        />
        {/* Category tag */}
        <span className="absolute left-3 top-3 rounded-pill bg-paper/95 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink">
          {trip.category}
        </span>
        {/* Favorite toggle */}
        <button
          type="button"
          onClick={() => setSaved((s) => !s)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${trip.name} from saved` : `Save ${trip.name}`}
          className="absolute right-3 top-3 rounded-full bg-paper/95 p-2 text-ink transition-colors hover:text-gogo-red"
        >
          <Heart className={cn("h-4 w-4", saved && "fill-gogo-red text-gogo-red")} aria-hidden="true" />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold leading-snug">
            <Link href={`/trips/${trip.slug}`} onClick={onOpen} className="after:absolute after:inset-0 hover:text-gogo-red">
              {trip.name}
            </Link>
          </h3>
        </div>

        {/* Honest social proof: real rating only when reviews exist. */}
        {hasReviews ? (
          <Rating value={trip.rating} reviewCount={trip.reviewCount} />
        ) : (
          <span className="inline-flex w-fit items-center gap-1.5 rounded-pill bg-jade/10 px-2.5 py-0.5 text-xs font-semibold text-jade">
            New trip
          </span>
        )}

        <ul className="flex flex-col gap-1.5 text-sm text-muted-text">
          <li className="flex items-center gap-2">
            <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
            {formatDuration(trip.durationValue, trip.durationUnit)} · {trip.style}
          </li>
          <li className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="line-clamp-1">{trip.route.join(" – ")}</span>
          </li>
          <li className="flex items-center gap-2">
            <Users className="h-4 w-4 shrink-0" aria-hidden="true" />
            Up to {trip.maxGroupSize} travelers
          </li>
        </ul>

        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div>
            <span className="block text-xs text-muted-text">From</span>
            <span className="text-xl font-bold text-ink">{formatPriceUSD(trip.fromPriceUSD)}</span>
            <span className="text-xs text-muted-text"> / person</span>
          </div>
          {trip.customizable && (
            <span className="relative z-10 inline-flex items-center gap-1 text-xs font-medium text-electric-blue">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Customizable
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
