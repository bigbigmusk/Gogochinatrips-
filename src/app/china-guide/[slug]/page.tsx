import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { getAllArticles, getArticleBySlug } from "@/content/articles";
import { getImage } from "@/lib/images";
import { buildMetadata, breadcrumbSchema, articleSchema } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ArticleCard } from "@/components/cards/ArticleCard";

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return buildMetadata({
    title: article.title,
    description: article.description,
    path: `/china-guide/${article.slug}`,
    image: getImage(article.image).src,
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const img = getImage(article.image);
  const related = getAllArticles().filter((a) => a.slug !== article.slug).slice(0, 3);
  const path = `/china-guide/${article.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "China Guide", path: "/china-guide" },
    { name: article.title, path },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(crumbs),
          articleSchema({
            title: article.title,
            description: article.description,
            path,
            image: img.src,
            publishedISO: article.publishedISO,
          }),
        ]}
      />

      <article>
        <div className="container-site pt-8">
          <Breadcrumbs items={crumbs} />
          <div className="mt-6 max-w-3xl">
            <span className="label-eyebrow text-electric-blue">{article.category}</span>
            <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">{article.title}</h1>
            <p className="mt-4 text-lg text-muted-text">{article.description}</p>
            <p className="mt-4 flex items-center gap-1.5 text-sm text-muted-text">
              <Clock className="h-4 w-4" aria-hidden="true" /> {article.readingTime}
            </p>
          </div>
        </div>

        <div className="container-site mt-8">
          <div className="relative aspect-[16/9] max-w-4xl overflow-hidden rounded-card">
            <Image src={img.src} alt={img.alt} fill priority sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
          </div>
        </div>

        {/* Body */}
        <div className="container-site mt-10">
          <div className="prose-editorial max-w-2xl">
            {article.body.map((block, i) => {
              if (block.type === "heading") {
                return (
                  <h2 key={i} className="mt-8 font-display text-2xl font-bold first:mt-0">
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "list") {
                return (
                  <ul key={i} className="mt-4 flex flex-col gap-2">
                    {block.items?.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-base text-ink">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gogo-red" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={i} className="mt-4 text-lg leading-relaxed text-ink/90">
                  {block.text}
                </p>
              );
            })}
          </div>

          {/* Disclaimer for time-sensitive content */}
          <p className="mt-10 max-w-2xl rounded-card border border-soft-gray bg-paper p-4 text-sm text-muted-text">
            Travel rules and details change frequently. Always confirm current requirements before you
            travel — and as a GoGoChinaTrips traveler, your pre-trip pack includes up-to-date guidance.
          </p>
        </div>
      </article>

      {/* CTA */}
      <section className="container-site mt-14">
        <div className="flex flex-col items-start justify-between gap-4 rounded-card bg-ink p-8 text-paper md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold">Ready to plan the trip itself?</h2>
            <p className="mt-2 text-paper/80">We&apos;ll handle the logistics so you can focus on the good bits.</p>
          </div>
          <Link href="/plan-my-trip" className="btn-primary group shrink-0">
            Plan My Trip
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Related */}
      <section className="container-site py-16">
        <h2 className="font-display text-section">Keep reading</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </section>
    </>
  );
}
