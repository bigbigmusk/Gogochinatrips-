import Image from "next/image";
import { getImage } from "@/lib/images";
import type { ImageKey } from "@/lib/images";

/**
 * Trip hero gallery: a large lead image with a supporting grid on desktop.
 * Server component — no client JS needed for the static layout.
 */
export function HeroGallery({ images, title }: { images: ImageKey[]; title: string }) {
  const [lead, ...rest] = images;
  const leadImg = getImage(lead ?? images[0]!);
  const thumbs = rest.slice(0, 3);

  return (
    <div className="grid gap-2 overflow-hidden rounded-card md:grid-cols-3 md:grid-rows-2">
      <div className="relative aspect-[16/10] md:col-span-2 md:row-span-2 md:aspect-auto">
        <Image
          src={leadImg.src}
          alt={leadImg.alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 66vw"
          className="object-cover"
        />
      </div>
      {thumbs.map((key, i) => {
        const img = getImage(key);
        return (
          <div key={`${key}-${i}`} className="relative hidden aspect-[4/3] md:block">
            <Image
              src={img.src}
              alt={`${title} — ${img.alt}`}
              fill
              sizes="33vw"
              className="object-cover"
            />
          </div>
        );
      })}
    </div>
  );
}
