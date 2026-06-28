"use client";

import { useState } from "react";
import { ChevronDown, MapPin, Utensils, BedDouble } from "lucide-react";
import type { ItineraryDay } from "@/content/types";
import { cn } from "@/lib/utils";

/** Interactive day-by-day itinerary with expand/collapse and expand-all. */
export function DayByDayItinerary({ days }: { days: ItineraryDay[] }) {
  const [open, setOpen] = useState<Set<number>>(new Set([days[0]?.day ?? 1]));

  const allOpen = open.size === days.length;
  function toggle(day: number) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(day)) next.delete(day);
      else next.add(day);
      return next;
    });
  }
  function toggleAll() {
    setOpen(allOpen ? new Set() : new Set(days.map((d) => d.day)));
  }

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button onClick={toggleAll} className="text-sm font-semibold text-gogo-red hover:underline">
          {allOpen ? "Collapse all" : "Expand all"}
        </button>
      </div>
      <ol className="relative border-l border-soft-gray">
        {days.map((d) => {
          const isOpen = open.has(d.day);
          return (
            <li key={d.day} className="relative pl-8 pb-3 last:pb-0">
              <span className="absolute -left-[9px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-gogo-red bg-paper" aria-hidden="true" />
              <div className="overflow-hidden rounded-card border border-soft-gray bg-paper">
                <button
                  type="button"
                  onClick={() => toggle(d.day)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted-text">
                      {d.day === 0 ? "Tonight" : `Day ${d.day}`}
                    </span>
                    <span className="font-semibold text-ink">{d.title}</span>
                  </span>
                  <ChevronDown className={cn("h-5 w-5 shrink-0 text-muted-text transition-transform", isOpen && "rotate-180")} aria-hidden="true" />
                </button>
                <div className="grid overflow-hidden transition-all duration-300 ease-editorial" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                  <div className="overflow-hidden">
                    <div className="border-t border-soft-gray px-4 py-4">
                      <p className="text-sm text-muted-text">{d.summary}</p>
                      {d.highlights.length > 0 && (
                        <ul className="mt-3 flex flex-wrap gap-2">
                          {d.highlights.map((h) => (
                            <li key={h} className="inline-flex items-center gap-1.5 rounded-pill bg-ivory px-3 py-1 text-xs">
                              <MapPin className="h-3.5 w-3.5 text-gogo-red" aria-hidden="true" /> {h}
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-text">
                        {d.meals && (
                          <span className="inline-flex items-center gap-1.5">
                            <Utensils className="h-3.5 w-3.5" aria-hidden="true" /> {d.meals}
                          </span>
                        )}
                        {d.accommodation && (
                          <span className="inline-flex items-center gap-1.5">
                            <BedDouble className="h-3.5 w-3.5" aria-hidden="true" /> {d.accommodation}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
