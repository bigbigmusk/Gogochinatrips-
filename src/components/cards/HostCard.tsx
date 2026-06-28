import Image from "next/image";
import Link from "next/link";
import { MapPin, Languages, ArrowRight } from "lucide-react";
import type { Host } from "@/content/types";
import { getImage } from "@/lib/images";

/** Profile card for a local host or guide. */
export function HostCard({ host }: { host: Host }) {
  const img = getImage(host.image);
  const firstTrip = host.tripSlugs[0];

  return (
    <article className="flex flex-col overflow-hidden rounded-card border border-soft-gray bg-paper shadow-card">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes="(max-width: 640px) 90vw, 25vw"
          className="object-cover"
        />
        <span className="absolute left-3 top-3 rounded-pill bg-paper/95 px-3 py-1 text-xs font-semibold text-ink">
          {host.specialty}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-display text-xl font-bold">{host.name}</h3>
        <p className="flex items-center gap-1.5 text-sm text-muted-text">
          <MapPin className="h-4 w-4" aria-hidden="true" /> {host.city}
        </p>
        <p className="flex items-center gap-1.5 text-sm text-muted-text">
          <Languages className="h-4 w-4" aria-hidden="true" /> {host.languages.join(", ")}
        </p>
        <blockquote className="mt-1 text-sm italic text-ink">“{host.quote}”</blockquote>
        {firstTrip && (
          <Link
            href={`/trips/${firstTrip}`}
            className="group mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-gogo-red"
          >
            See related trips
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        )}
      </div>
    </article>
  );
}
