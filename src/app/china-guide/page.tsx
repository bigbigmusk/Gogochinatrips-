import type { Metadata } from "next";
import { getAllArticles } from "@/content/articles";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { JsonLd } from "@/components/ui/JsonLd";
import { ArticleCard } from "@/components/cards/ArticleCard";

export const metadata: Metadata = buildMetadata({
  title: "China Travel Guide",
  description:
    "Practical China travel advice for international visitors — payments, apps, high-speed trains, eSIMs, visa-free transit, safety and more.",
  path: "/china-guide",
});

export default function ChinaGuidePage() {
  const articles = getAllArticles();
  const [featured, ...rest] = articles;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "China Guide", path: "/china-guide" },
        ])}
      />
      <PageHeader
        crumbs={[
          { name: "Home", path: "/" },
          { name: "China Guide", path: "/china-guide" },
        ]}
        eyebrow="China, explained"
        title="The practical China travel guide"
        intro="The answers first-time visitors actually need — written by the team that runs the trips."
      />
      <section className="container-site py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured && <ArticleCard article={featured} />}
          {rest.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      </section>
    </>
  );
}
