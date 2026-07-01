"use client";

import Image from "next/image";
import Link from "next/link";
import { Info, ArrowRight } from "lucide-react";
import { destinationIntros, TIBET_NOTICE } from "@/content/discovery";
import { getImage } from "@/lib/images";
import { track } from "@/lib/analytics";

/**
 * Compact editorial destination-intro shown above filtered results when a
 * search resolves to a strategic destination (Tibet, Chengdu). Deliberately not
 * a full hero. For Tibet it also renders the operational (permit) notice.
 */
export function DestinationSearchIntro({ slug }: { slug: string }) {
  const intro = destinationIntros[slug];
  if (!intro) return null;
  const img = getImage(intro.image);
  const isTibet = slug === "tibet";

  return (
    <section aria-label={`${intro.heading} overview`} className="mb-8 overflow-hidden rounded-card border border-soft-gray bg-paper">
      <div className="grid md:grid-cols-[1.4fr_1fr]">
        <div className="p-6 md:p-8">
          <span className="label-eyebrow text-gogo-red">{intro.eyebrow}</span>
          <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">{intro.heading}</h2>
          <p className="mt-2 max-w-lg text-muted-text">{intro.description}</p>

          <ul className="mt-4 flex flex-wrap gap-2">
            {intro.utilityPoints.map((p) => (
              <li key={p} className="rounded-pill bg-ivory px-3 py-1 text-xs font-medium text-ink">
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href={intro.primaryCta.href}
              onClick={() => track(isTibet ? "tibet_planning_cta_clicked" : "chengdu_planning_cta_clicked", { slug })}
              className="btn-primary group"
            >
              {intro.primaryCta.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link href={intro.secondaryLink.href} className="text-sm font-semibold text-ink hover:text-gogo-red">
              {intro.secondaryLink.label}
            </Link>
          </div>
        </div>

        <div className="relative min-h-[180px] md:min-h-full">
          <Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
        </div>
      </div>

      {isTibet && (
        <p className="flex items-start gap-2.5 border-t border-soft-gray bg-ivory px-6 py-4 text-sm text-muted-text md:px-8">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-electric-blue" aria-hidden="true" />
          {TIBET_NOTICE}
        </p>
      )}
    </section>
  );
}
