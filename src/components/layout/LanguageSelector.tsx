"use client";

import { useState } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { LANGUAGES } from "@/content/site";
import { cn } from "@/lib/utils";

/** Prototype language selector — tracks selection locally. */
export function LanguageSelector({ className }: { className?: string }) {
  const [value, setValue] = useState<(typeof LANGUAGES)[number]>("English");

  return (
    <label className={cn("relative inline-flex items-center", className)}>
      <span className="sr-only">Select language</span>
      <Globe className="pointer-events-none absolute left-3 h-4 w-4 text-muted-text" aria-hidden="true" />
      <select
        value={value}
        onChange={(e) => setValue(e.target.value as (typeof LANGUAGES)[number])}
        className="appearance-none rounded-pill border border-soft-gray bg-paper py-2 pl-9 pr-8 text-sm font-medium text-ink hover:border-ink focus:outline-none"
      >
        {LANGUAGES.map((l) => (
          <option key={l} value={l}>
            {l}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 h-4 w-4 text-muted-text" aria-hidden="true" />
    </label>
  );
}
