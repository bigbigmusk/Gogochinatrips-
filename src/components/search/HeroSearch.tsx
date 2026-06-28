"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";
import { HERO_SUGGESTIONS, QUICK_SEARCH_CHIPS } from "@/content/site";
import { getAllDestinations } from "@/content/destinations";
import { cn } from "@/lib/utils";

interface HeroSearchProps {
  variant?: "hero" | "compact";
  showChips?: boolean;
  autoFocus?: boolean;
  onNavigate?: () => void;
}

/**
 * Destination & experience search with type-ahead suggestions and quick chips.
 * Submitting routes to the trips listing with a query; picking a known
 * destination routes straight to that destination page.
 */
export function HeroSearch({
  variant = "hero",
  showChips = true,
  autoFocus = false,
  onNavigate,
}: HeroSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const destinations = getAllDestinations();

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = HERO_SUGGESTIONS.filter((s) => (q ? s.toLowerCase().includes(q) : true));
    return base.slice(0, 6);
  }, [query]);

  function go(term: string) {
    const match = destinations.find(
      (d) => d.name.toLowerCase().includes(term.toLowerCase()) || d.slug === term.toLowerCase(),
    );
    onNavigate?.();
    if (match) {
      router.push(`/destinations/${match.slug}`);
    } else {
      router.push(`/trips?q=${encodeURIComponent(term)}`);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) go(query.trim());
  }

  return (
    <div className={cn("w-full", variant === "hero" && "rounded-card bg-paper p-3 shadow-lift sm:p-4")}>
      <form onSubmit={onSubmit} role="search" className="relative">
        <label htmlFor="hero-search" className="sr-only">
          Where do you want to go in China?
        </label>
        <div className="flex items-center gap-2 rounded-pill border border-soft-gray bg-white px-4 py-2 focus-within:border-ink">
          <Search className="h-5 w-5 shrink-0 text-muted-text" aria-hidden="true" />
          <input
            id="hero-search"
            ref={inputRef}
            type="text"
            autoFocus={autoFocus}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            placeholder="Where do you want to go in China?"
            className="w-full bg-transparent py-1.5 text-base text-ink placeholder:text-muted-text focus:outline-none"
            autoComplete="off"
            role="combobox"
            aria-expanded={open}
            aria-controls="hero-search-suggestions"
            aria-autocomplete="list"
          />
          <button type="submit" className="btn-primary shrink-0 px-5 py-2">
            Search
          </button>
        </div>

        {open && suggestions.length > 0 && (
          <ul
            id="hero-search-suggestions"
            className="absolute z-30 mt-2 w-full overflow-hidden rounded-card border border-soft-gray bg-white py-2 shadow-lift"
          >
            {suggestions.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  // onMouseDown fires before input blur, so navigation isn't cancelled.
                  onMouseDown={() => go(s)}
                  className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm hover:bg-ivory"
                >
                  <Search className="h-4 w-4 text-muted-text" aria-hidden="true" />
                  {s}
                </button>
              </li>
            ))}
          </ul>
        )}
      </form>

      {showChips && (
        <div className="mt-3 flex flex-wrap gap-2">
          {QUICK_SEARCH_CHIPS.map((chip) => (
            <Link key={chip.label} href={chip.href} className="chip" onClick={onNavigate}>
              {chip.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
