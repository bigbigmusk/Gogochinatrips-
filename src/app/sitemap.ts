import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";
import { getAllTrips } from "@/content/trips";
import { getAllDestinations } from "@/content/destinations";
import { getAllTravelStyles } from "@/content/travel-styles";
import { getAllArticles } from "@/content/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const staticRoutes = ["", "/trips", "/destinations", "/travel-styles", "/china-guide", "/plan-my-trip", "/about", "/contact"];

  const routes: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${base}${r}`,
    changeFrequency: "weekly",
    priority: r === "" ? 1 : 0.8,
  }));

  for (const t of getAllTrips()) routes.push({ url: `${base}/trips/${t.slug}`, changeFrequency: "weekly", priority: 0.7 });
  for (const d of getAllDestinations()) routes.push({ url: `${base}/destinations/${d.slug}`, changeFrequency: "monthly", priority: 0.6 });
  for (const s of getAllTravelStyles()) routes.push({ url: `${base}/travel-styles/${s.slug}`, changeFrequency: "monthly", priority: 0.5 });
  for (const a of getAllArticles()) routes.push({ url: `${base}/china-guide/${a.slug}`, changeFrequency: "monthly", priority: 0.5 });

  return routes;
}
