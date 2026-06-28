import { Breadcrumbs } from "./Breadcrumbs";
import type { Crumb } from "@/lib/seo";

/** Standard inner-page header with breadcrumbs, title and intro. */
export function PageHeader({
  crumbs,
  eyebrow,
  title,
  intro,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="container-site pt-8">
      <Breadcrumbs items={crumbs} />
      <div className="mt-5 max-w-3xl">
        {eyebrow && <span className="label-eyebrow text-gogo-red">{eyebrow}</span>}
        <h1 className="mt-2 text-section">{title}</h1>
        {intro && <p className="mt-3 text-lg text-muted-text">{intro}</p>}
      </div>
    </div>
  );
}
