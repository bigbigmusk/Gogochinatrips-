"use client";

import { useState } from "react";
import { HOW_IT_WORKS } from "@/content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

type TabKey = keyof typeof HOW_IT_WORKS;

/** Tabbed "How it works" with Ready-Made vs Custom trip flows. */
export function HowItWorks() {
  const [tab, setTab] = useState<TabKey>("ready-made");
  const tabs = Object.keys(HOW_IT_WORKS) as TabKey[];
  const active = HOW_IT_WORKS[tab];

  return (
    <section className="container-site py-16 md:py-24">
      <SectionHeading eyebrow="How it works" title="Two ways to travel with us" />

      <div role="tablist" aria-label="Trip types" className="mt-8 inline-flex rounded-pill border border-soft-gray bg-paper p-1">
        {tabs.map((key) => (
          <button
            key={key}
            role="tab"
            id={`tab-${key}`}
            aria-selected={tab === key}
            aria-controls={`panel-${key}`}
            onClick={() => setTab(key)}
            className={cn(
              "rounded-pill px-5 py-2 text-sm font-semibold transition-colors",
              tab === key ? "bg-ink text-paper" : "text-ink hover:text-gogo-red",
            )}
          >
            {HOW_IT_WORKS[key].label}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="mt-10">
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {active.steps.map((step, i) => (
            <li key={step.title} className="relative rounded-card border border-soft-gray bg-paper p-6">
              <span className="font-display text-4xl font-bold text-gogo-red/30">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 font-display text-lg font-bold">{step.title}</h3>
              <p className="mt-1 text-sm text-muted-text">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
