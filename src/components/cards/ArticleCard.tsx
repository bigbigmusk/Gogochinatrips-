import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import type { Article } from "@/content/types";
import { getImage } from "@/lib/images";

/** China Guide article card: category, title, reading time, image, description. */
export function ArticleCard({ article }: { article: Article }) {
  const img = getImage(article.image);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-card border border-soft-gray bg-paper shadow-card transition-shadow hover:shadow-lift">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
          className="object-cover transition-transform duration-500 ease-editorial group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold uppercase tracking-wide text-electric-blue">{article.category}</span>
          <span className="flex items-center gap-1 text-muted-text">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {article.readingTime}
          </span>
        </div>
        <h3 className="text-lg font-semibold leading-snug">
          <Link href={`/china-guide/${article.slug}`} className="after:absolute after:inset-0 hover:text-gogo-red">
            {article.title}
          </Link>
        </h3>
        <p className="text-sm text-muted-text">{article.description}</p>
      </div>
    </article>
  );
}
