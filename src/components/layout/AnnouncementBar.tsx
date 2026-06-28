"use client";

import { useState } from "react";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";
import { ANNOUNCEMENT } from "@/content/site";

/**
 * Editable announcement bar above the header. Dismissible for the session.
 * Copy lives in src/content/site.ts so it can be updated without code changes.
 */
export function AnnouncementBar() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div className="relative bg-ink text-paper">
      <div className="container-site flex items-center justify-center gap-3 py-2 text-center text-sm">
        <Link
          href={ANNOUNCEMENT.href}
          className="group inline-flex flex-wrap items-center justify-center gap-2 hover:underline"
        >
          <span>{ANNOUNCEMENT.message}</span>
          <span className="inline-flex items-center gap-1 font-semibold text-paper">
            {ANNOUNCEMENT.linkLabel}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </Link>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Dismiss announcement"
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-paper/80 hover:bg-white/10 hover:text-paper"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
