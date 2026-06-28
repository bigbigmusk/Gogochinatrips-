import type { Host } from "./types";

export const hosts: Host[] = [
  {
    slug: "lina",
    name: "Lina",
    city: "Chengdu",
    languages: ["English", "Mandarin", "Sichuanese"],
    specialty: "Food Host",
    quote: "If you leave Chengdu still hungry, I haven't done my job.",
    image: "hostLina",
    tripSlugs: ["chengdu-after-dark", "chongqing-city-rush"],
  },
  {
    slug: "eric",
    name: "Eric",
    city: "Beijing",
    languages: ["English", "Mandarin"],
    specialty: "History Guide",
    quote: "Beijing makes sense once you understand the walls — let me show you where they were.",
    image: "hostEric",
    tripSlugs: ["china-essentials", "beijing-stopover", "china-by-high-speed-rail"],
  },
  {
    slug: "mia",
    name: "Mia",
    city: "Yunnan",
    languages: ["English", "Mandarin", "Bai"],
    specialty: "Trip Designer",
    quote: "Yunnan rewards travelers who slow down. The best moments are never on the schedule.",
    image: "hostMia",
    tripSlugs: ["wild-yunnan", "zhangjiajie-and-beyond"],
  },
  {
    slug: "tashi",
    name: "Tashi",
    city: "Tibetan Plateau",
    languages: ["English", "Mandarin", "Tibetan"],
    specialty: "Plateau Specialist",
    quote: "Up here, altitude teaches patience. Go slow and the mountains open up.",
    image: "hostTashi",
    tripSlugs: ["silk-road-west"],
  },
];

export function getAllHosts(): Host[] {
  return hosts;
}

export function getHostBySlug(slug?: string): Host | undefined {
  if (!slug) return undefined;
  return hosts.find((h) => h.slug === slug);
}
