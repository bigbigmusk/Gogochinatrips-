"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { CURRENCIES } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Lightweight currency selector. Prototype-only: it tracks selection in local
 * state. Wire to a real pricing/currency context when connecting a backend.
 */
export function CurrencySelector({ className }: { className?: string }) {
  const [value, setValue] = useState<(typeof CURRENCIES)[number]>("USD");

  return (
    <label className={cn("relative inline-flex items-center", className)}>
      <span className="sr-only">Select currency</span>
      <select
        value={value}
        onChange={(e) => setValue(e.target.value as (typeof CURRENCIES)[number])}
        className="appearance-none rounded-pill border border-soft-gray bg-paper py-2 pl-3 pr-8 text-sm font-medium text-ink hover:border-ink focus:outline-none"
      >
        {CURRENCIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-2.5 h-4 w-4 text-muted-text"
        aria-hidden="true"
      />
    </label>
  );
}
