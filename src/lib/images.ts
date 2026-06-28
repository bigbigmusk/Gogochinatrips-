/**
 * Centralized, replaceable image configuration.
 *
 * All imagery on the site is temporary editorial photography sourced from
 * Unsplash for prototyping only. Replace these URLs with owned, licensed
 * photography before launch — every consumer references this map by key so a
 * single edit here updates the whole site.
 *
 * Each entry includes intrinsic dimensions to prevent layout shift with
 * next/image, plus descriptive alt text for accessibility.
 */
export type SiteImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=70`;

export const IMAGES = {
  heroHome: {
    src: u("1547981609-4b6bfe67ca0b", 2000),
    alt: "Travelers walking through a lantern-lit lane in a contemporary Chinese city at dusk",
    width: 2000,
    height: 1333,
  },
  ctaFinal: {
    src: u("1474181487882-5abf3f0ba6c2", 2000),
    alt: "A high-speed train crossing a bridge through green countryside in southern China",
    width: 2000,
    height: 1333,
  },
  // Destination imagery
  beijing: { src: u("1508804185872-d7badad00f7d"), alt: "The Temple of Heaven framed by autumn trees in Beijing", width: 1600, height: 1067 },
  shanghai: { src: u("1545893835-abaa50cbe628"), alt: "Shanghai's Pudong skyline glowing over the Huangpu River at night", width: 1600, height: 1067 },
  xian: { src: u("1591018533299-2c1a1f5f5f5b"), alt: "Lanterns lining the ancient city wall of Xi'an at twilight", width: 1600, height: 1067 },
  chengdu: { src: u("1545048702-79362596cdc9"), alt: "A traditional tea house courtyard in Chengdu", width: 1600, height: 1067 },
  chongqing: { src: u("1623834876526-7c0e64f5d8f6"), alt: "Stacked neon buildings on the hillsides of Chongqing at night", width: 1600, height: 1067 },
  zhangjiajie: { src: u("1513415277900-a62401e19be4"), alt: "Mist drifting between the sandstone pillars of Zhangjiajie", width: 1600, height: 1067 },
  yunnan: { src: u("1528164344705-47542687000d"), alt: "Terraced fields and mountains in rural Yunnan", width: 1600, height: 1067 },
  xinjiang: { src: u("1469474968028-56623f02e42e"), alt: "Desert dunes and distant mountains in Xinjiang", width: 1600, height: 1067 },
  guilin: { src: u("1537519646099-335112f03225"), alt: "Karst peaks rising along the Li River near Guilin", width: 1600, height: 1067 },
  tibet: { src: u("1465056836041-7f43ac27dcb5"), alt: "The Potala Palace beneath a clear Tibetan plateau sky", width: 1600, height: 1067 },

  // Trip imagery
  tripEssentials: { src: u("1508804185872-d7badad00f7d"), alt: "A classic streetscape blending old and new China", width: 1600, height: 1067 },
  tripChengduNight: { src: u("1552566626-52f8b828add9"), alt: "Steam rising from a bubbling hotpot at a Chengdu night market", width: 1600, height: 1067 },
  tripWildYunnan: { src: u("1528164344705-47542687000d"), alt: "A footpath winding through the green hills of Yunnan", width: 1600, height: 1067 },
  tripBeijingStopover: { src: u("1584646098378-0874589d76b1"), alt: "A quiet hutong alleyway in central Beijing", width: 1600, height: 1067 },
  tripHighSpeed: { src: u("1474181487882-5abf3f0ba6c2"), alt: "A high-speed train waiting at a modern Chinese station platform", width: 1600, height: 1067 },
  tripChongqing: { src: u("1623834876526-7c0e64f5d8f6"), alt: "The layered skyline of Chongqing reflected in the river", width: 1600, height: 1067 },
  tripZhangjiajie: { src: u("1513415277900-a62401e19be4"), alt: "A glass viewing platform among the peaks of Zhangjiajie", width: 1600, height: 1067 },
  tripSilkRoad: { src: u("1469474968028-56623f02e42e"), alt: "Camels crossing desert dunes on the old Silk Road", width: 1600, height: 1067 },

  // Hosts (natural portraits)
  hostLina: { src: u("1544005313-94ddf0286df2", 600), alt: "Portrait of Lina, a Chengdu food host, smiling outdoors", width: 600, height: 600 },
  hostEric: { src: u("1507003211169-0a1dd7228f2d", 600), alt: "Portrait of Eric, a Beijing history guide", width: 600, height: 600 },
  hostMia: { src: u("1438761681033-6461ffad8d80", 600), alt: "Portrait of Mia, a Yunnan trip designer", width: 600, height: 600 },
  hostTashi: { src: u("1500648767791-00dcc994a43e", 600), alt: "Portrait of Tashi, a Tibetan plateau specialist", width: 600, height: 600 },

  // Articles
  articlePay: { src: u("1556742502-ec7c0e9f34b1"), alt: "A traveler paying with a phone at a Chinese street stall", width: 1600, height: 1067 },
  articleApps: { src: u("1512941937669-90a1b58e7e9c"), alt: "A smartphone showing travel apps on a cafe table", width: 1600, height: 1067 },
  articleTrains: { src: u("1474181487882-5abf3f0ba6c2"), alt: "The interior of a modern Chinese high-speed train", width: 1600, height: 1067 },
  articleEsim: { src: u("1510552776732-03e61cf4b144"), alt: "A traveler checking a phone map on a city street", width: 1600, height: 1067 },
  articleVisa: { src: u("1488646953014-85cb44e25828"), alt: "A passport and boarding pass on a wooden surface", width: 1600, height: 1067 },
  articleSolo: { src: u("1503220317375-aaad61436b1b"), alt: "A solo traveler with a backpack looking over a city", width: 1600, height: 1067 },
  articleDays: { src: u("1469854523086-cc02fe5d8800"), alt: "A travel map and itinerary planning notes", width: 1600, height: 1067 },
  articleTips: { src: u("1528127269322-539801943592"), alt: "Everyday details of travel in a Chinese city", width: 1600, height: 1067 },

  // Reviews (traveler UGC style)
  reviewPanda: { src: u("1564349683136-77e08dba1ef7", 800), alt: "A giant panda eating bamboo at a research base", width: 800, height: 800 },
  reviewMarket: { src: u("1552566626-52f8b828add9", 800), alt: "A colorful night market food stall", width: 800, height: 800 },
  reviewMountain: { src: u("1513415277900-a62401e19be4", 800), alt: "A traveler photographing mountain scenery", width: 800, height: 800 },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof IMAGES;

export function getImage(key: ImageKey): SiteImage {
  return IMAGES[key];
}
