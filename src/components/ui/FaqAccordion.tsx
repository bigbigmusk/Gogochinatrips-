"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import type { TripFaq } from "@/content/types";

/**
 * Accessible FAQ accordion using native <button> disclosure semantics.
 * Smooth height/opacity transition; respects reduced motion via CSS.
 */
export function FaqAccordion({ faqs }: { faqs: TripFaq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-soft-gray rounded-card border border-soft-gray bg-paper">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={faq.question}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="font-semibold text-ink">{faq.question}</span>
                {isOpen ? (
                  <Minus className="h-5 w-5 shrink-0 text-gogo-red" aria-hidden="true" />
                ) : (
                  <Plus className="h-5 w-5 shrink-0 text-muted-text" aria-hidden="true" />
                )}
              </button>
            </h3>
            <div
              className="grid overflow-hidden px-5 transition-all duration-300 ease-editorial"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="pb-5 text-sm leading-relaxed text-muted-text">{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
