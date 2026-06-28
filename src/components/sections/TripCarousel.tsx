"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Trip } from "@/content/types";
import { TripCard } from "@/components/cards/TripCard";

/**
 * Horizontal, scroll-snapping carousel of trip cards. Keyboard users can tab
 * through cards naturally; the prev/next buttons are an enhancement and are
 * hidden from assistive tech.
 */
export function TripCarousel({ trips }: { trips: Trip[] }) {
  const scroller = useRef<HTMLUListElement>(null);

  function scrollBy(dir: 1 | -1) {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  }

  return (
    <div className="relative">
      <ul
        ref={scroller}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
      >
        {trips.map((trip) => (
          <li
            key={trip.slug}
            className="w-[80%] shrink-0 snap-start sm:w-[45%] lg:w-[31%] xl:w-[23.5%]"
          >
            <TripCard trip={trip} className="h-full" />
          </li>
        ))}
      </ul>

      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Scroll trips left"
          className="rounded-full border border-soft-gray bg-paper p-2.5 text-ink transition-colors hover:border-ink"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Scroll trips right"
          className="rounded-full border border-soft-gray bg-paper p-2.5 text-ink transition-colors hover:border-ink"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
