import Image from "next/image";
import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import type { Review } from "@/content/types";
import { getImage } from "@/lib/images";
import { Rating } from "@/components/ui/Rating";

/** Traveler review with photo(s), trip context and an optional verified label. */
export function ReviewCard({ review }: { review: Review }) {
  const photo = review.photos[0] ? getImage(review.photos[0]) : null;

  return (
    <article className="flex flex-col overflow-hidden rounded-card border border-soft-gray bg-paper shadow-card">
      {photo && (
        <div className="relative aspect-[5/4] overflow-hidden">
          <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 640px) 90vw, 30vw" className="object-cover" />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <Rating value={review.rating} showCount={false} />
        <blockquote className="text-sm leading-relaxed text-ink">“{review.text}”</blockquote>
        <div className="mt-auto pt-2">
          <p className="flex items-center gap-1.5 text-sm font-semibold text-ink">
            {review.name}
            {review.verified && (
              <span className="inline-flex items-center gap-1 text-xs font-medium text-jade">
                <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                Verified trip
              </span>
            )}
          </p>
          <p className="text-xs text-muted-text">
            {review.country} ·{" "}
            <Link href={`/trips/${review.tripSlug}`} className="hover:text-gogo-red">
              {review.tripName}
            </Link>{" "}
            · {review.travelMonth}
          </p>
        </div>
      </div>
    </article>
  );
}
