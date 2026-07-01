"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { getAllDestinations } from "@/content/destinations";
import { cn } from "@/lib/utils";

/**
 * Accessible search combobox for the trips page. Controlled by the URL `q`
 * (passed as `value`); submitting on Enter or picking a suggestion calls
 * `onSubmit`. Architecture is ready for recent searches (feed extra items into
 * the suggestions list).
 */
export function TripsSearchInput({
  value,
  onSubmit,
  onClear,
}: {
  value: string;
  onSubmit: (q: string) => void;
  onClear: () => void;
}) {
  const [text, setText] = useState(value);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Keep the field in sync when the URL query changes elsewhere (chips, back).
  useEffect(() => setText(value), [value]);

  // Base suggestion pool: destinations + a few curated keyword suggestions.
  const pool = useMemo(() => {
    const dests = getAllDestinations().map((d) => d.name);
    const keywords = ["Lhasa", "Mount Everest", "Yamdrok Lake", "Chengdu to Tibet", "Tibet private trips", "Pandas", "Hotpot"];
    return Array.from(new Set([...dests, ...keywords]));
  }, []);

  const suggestions = useMemo(() => {
    const q = text.trim().toLowerCase();
    const list = q ? pool.filter((s) => s.toLowerCase().includes(q)) : pool;
    return list.slice(0, 6);
  }, [text, pool]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function submit(q: string) {
    setOpen(false);
    setActiveIndex(-1);
    onSubmit(q.trim());
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setOpen(true);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && suggestions[activeIndex]) submit(suggestions[activeIndex]!);
      else submit(text);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={wrapRef} className="relative w-full max-w-xl">
      <div className="flex items-center gap-2 rounded-pill border border-soft-gray bg-paper px-4 py-2 focus-within:border-ink">
        <Search className="h-5 w-5 shrink-0 text-muted-text" aria-hidden="true" />
        <label htmlFor="trips-search" className="sr-only">
          Search China trips
        </label>
        <input
          id="trips-search"
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setOpen(true);
            setActiveIndex(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder="Search destinations, e.g. Tibet, Lhasa, pandas…"
          className="w-full bg-transparent py-1 text-base text-ink placeholder:text-muted-text focus:outline-none"
          autoComplete="off"
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          aria-controls="trips-search-listbox"
          aria-activedescendant={activeIndex >= 0 ? `trips-search-opt-${activeIndex}` : undefined}
        />
        {text && (
          <button
            type="button"
            onClick={() => {
              setText("");
              onClear();
            }}
            aria-label="Clear search"
            className="rounded-full p-1 text-muted-text hover:bg-ivory hover:text-ink"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
        <button type="button" onClick={() => submit(text)} className="btn-primary shrink-0 px-4 py-1.5">
          Search
        </button>
      </div>

      {open && suggestions.length > 0 && (
        <ul
          id="trips-search-listbox"
          role="listbox"
          className="absolute z-30 mt-2 w-full overflow-hidden rounded-card border border-soft-gray bg-paper py-2 shadow-lift"
        >
          {suggestions.map((s, i) => (
            <li
              key={s}
              id={`trips-search-opt-${i}`}
              role="option"
              aria-selected={i === activeIndex}
            >
              <button
                type="button"
                onMouseDown={() => submit(s)}
                onMouseEnter={() => setActiveIndex(i)}
                className={cn(
                  "flex w-full items-center gap-3 px-4 py-2 text-left text-sm",
                  i === activeIndex ? "bg-ivory" : "hover:bg-ivory",
                )}
              >
                <Search className="h-4 w-4 text-muted-text" aria-hidden="true" />
                {s}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
