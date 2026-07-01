"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, MessageCircle, Calendar } from "lucide-react";
import type { Departure } from "@/content/types";
import { SITE } from "@/content/site";
import { formatPriceUSD, cn } from "@/lib/utils";

function formatDate(iso: string) {
  // Deterministic, locale-stable formatting to avoid hydration mismatches.
  const [y, m, d] = iso.split("-").map(Number);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[(m ?? 1) - 1]} ${d}, ${y}`;
}

const STATUS_LABEL: Record<Departure["status"], string> = {
  available: "Available",
  limited: "Limited spots",
  guaranteed: "Guaranteed departure",
};

interface Props {
  tripName: string;
  fromPriceUSD: number;
  departures: Departure[];
  durationLabel: string;
}

/**
 * Shared booking state for a trip detail page: renders the sticky desktop
 * inquiry card and a fixed mobile action bar, both driven by the selected
 * departure.
 */
export function TripBooking({ tripName, fromPriceUSD, departures, durationLabel }: Props) {
  const [selected, setSelected] = useState<string>(departures[0]?.date ?? "");
  const current = departures.find((d) => d.date === selected) ?? departures[0];
  const price = current?.priceUSD ?? fromPriceUSD;
  const planHref = `/plan-my-trip?trip=${encodeURIComponent(tripName)}`;

  return (
    <>
      {/* Desktop sticky card */}
      <div className="hidden lg:block">
        <div className="sticky top-24 rounded-card border border-soft-gray bg-paper p-6 shadow-card">
          <div className="flex items-end justify-between">
            <div>
              <span className="block text-xs text-muted-text">From</span>
              <span className="font-display text-3xl font-bold">{formatPriceUSD(price)}</span>
              <span className="text-sm text-muted-text"> / person</span>
            </div>
            <span className="text-sm text-muted-text">{durationLabel}</span>
          </div>

          <div className="mt-5">
            <label htmlFor="departure-select" className="mb-2 flex items-center gap-1.5 text-sm font-semibold">
              <Calendar className="h-4 w-4" aria-hidden="true" /> Choose a departure
            </label>
            <div id="departure-select" className="flex flex-col gap-2">
              {departures.map((dep) => (
                <button
                  key={dep.date}
                  type="button"
                  onClick={() => setSelected(dep.date)}
                  aria-pressed={selected === dep.date}
                  className={cn(
                    "flex items-center justify-between rounded-card border px-4 py-2.5 text-left text-sm transition-colors",
                    selected === dep.date ? "border-ink bg-ivory" : "border-soft-gray hover:border-ink",
                  )}
                >
                  <span className="font-medium">{formatDate(dep.date)}</span>
                  <span className={cn("text-xs", dep.status === "limited" ? "text-gogo-red" : "text-jade")}>
                    {STATUS_LABEL[dep.status]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <Link href={planHref} className="btn-primary mt-5 w-full text-base">
            Request this trip
          </Link>
          <Link href="/contact" className="btn-secondary mt-2 w-full">
            <MessageCircle className="h-4 w-4" aria-hidden="true" /> Ask a question
          </Link>

          <ul className="mt-5 flex flex-col gap-2 text-sm text-muted-text">
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-jade" aria-hidden="true" /> No payment to enquire</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-jade" aria-hidden="true" /> Free date changes before deposit</li>
            <li className="flex items-center gap-2"><Check className="h-4 w-4 text-jade" aria-hidden="true" /> Reply within one business day</li>
          </ul>
        </div>
      </div>

      {/* Mobile fixed action bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-soft-gray bg-paper/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="container-site flex items-center justify-between gap-3 px-0">
          <div>
            <span className="block text-xs text-muted-text">From</span>
            <span className="font-display text-xl font-bold">{formatPriceUSD(price)}</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={SITE.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact us on WhatsApp"
              className="btn-secondary px-4 py-2.5"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link href={planHref} className="btn-primary px-6 py-2.5">
              Request trip
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
