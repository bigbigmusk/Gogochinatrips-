import type { Destination } from "./types";
import { getTripsByDestination } from "./trips";

export const destinations: Destination[] = [
  {
    slug: "beijing",
    name: "Beijing",
    region: "Northern China",
    personality: "Imperial heavyweight with a hutong heart and a contemporary edge.",
    intro:
      "China's capital holds the country's grandest history — the Forbidden City, the Great Wall, the Temple of Heaven — alongside a fast-moving art, food and design scene tucked into its grey-brick lanes.",
    image: "beijing",
    reasonsToVisit: [
      "The Great Wall within easy reach of the city",
      "The Forbidden City and imperial Beijing",
      "Hutong neighborhoods, courtyard cafes and street food",
      "World-class roast duck",
    ],
    bestTime: "September–November and April–May for clear skies and mild temperatures.",
    recommendedDays: "3–4 days",
    topExperiences: [
      { title: "A quiet Great Wall section", description: "Skip the busiest stretches for a restored-but-peaceful walk along the ramparts." },
      { title: "Hutong food crawl", description: "Breakfast stalls, courtyard cafes and the lanes most groups miss." },
      { title: "Forbidden City at opening", description: "Beat the crowds through the imperial palace's vast courtyards." },
    ],
    neighborhoods: [
      { name: "Dongcheng & the hutongs", description: "Historic lanes, courtyard hotels and the old city core." },
      { name: "798 Art District", description: "A former factory zone turned contemporary-art quarter." },
      { name: "Sanlitun", description: "Beijing's nightlife and design-retail hub." },
    ],
    localFood: ["Peking roast duck", "Zhajiangmian noodles", "Jianbing breakfast crepes", "Lamb hotpot in winter"],
    practical: [
      { label: "Airport", value: "Two airports; the airport express links to the metro." },
      { label: "Getting around", value: "Extensive, cheap metro plus ride-hailing." },
      { label: "Language", value: "English limited outside hotels; translation apps help." },
    ],
  },
  {
    slug: "shanghai",
    name: "Shanghai",
    region: "Eastern China",
    personality: "Future-facing skyline over Art Deco bones and leafy plane-tree streets.",
    intro:
      "China's most international city pairs a dazzling riverfront skyline with the low-rise charm of the former French Concession, world-class dining and a restless creative energy.",
    image: "shanghai",
    reasonsToVisit: ["The Bund and the Pudong skyline", "Former French Concession streets", "A deep, modern food and bar scene", "Easy day trips to water towns"],
    bestTime: "October–November and March–May; summers are hot and humid.",
    recommendedDays: "2–4 days",
    topExperiences: [
      { title: "The Bund at dusk", description: "Watch the skyline light up across the Huangpu River." },
      { title: "French Concession wander", description: "Plane-tree streets, indie boutiques and cafes." },
      { title: "Rooftop and speakeasy night", description: "Shanghai's bar scene is among Asia's best." },
    ],
    neighborhoods: [
      { name: "The Bund & Pudong", description: "Historic waterfront facing the skyscraper skyline." },
      { name: "Former French Concession", description: "Low-rise streets, cafes and boutiques." },
      { name: "Jing'an", description: "Temples, malls and a central buzz." },
    ],
    localFood: ["Xiaolongbao soup dumplings", "Shengjianbao pan-fried buns", "Hairy crab in autumn", "Red-braised pork"],
    practical: [
      { label: "Airport", value: "Two airports; the maglev links Pudong to the metro." },
      { label: "Getting around", value: "Vast metro, walkable core, ride-hailing." },
      { label: "Day trips", value: "Water towns like Zhujiajiao are close by." },
    ],
  },
  {
    slug: "xian",
    name: "Xi'an",
    region: "Central China",
    personality: "Ancient capital, intact city wall and the gateway to the Silk Road.",
    intro:
      "Once the start of the Silk Road and capital of thirteen dynasties, Xi'an guards the Terracotta Warriors, a complete Ming city wall and one of China's great street-food quarters.",
    image: "xian",
    reasonsToVisit: ["The Terracotta Warriors", "Cycling the intact city wall", "The Muslim Quarter food scene", "Silk Road history"],
    bestTime: "September–October and April–May.",
    recommendedDays: "2 days",
    topExperiences: [
      { title: "Terracotta Army", description: "Thousands of life-size warriors guarding an emperor's tomb." },
      { title: "City wall by bike", description: "Ride the full 14km loop atop the Ming walls." },
      { title: "Muslim Quarter at night", description: "Skewers, flatbreads and crowds after dark." },
    ],
    neighborhoods: [
      { name: "Within the walls", description: "The old city core around the Bell and Drum towers." },
      { name: "Muslim Quarter", description: "Xi'an's famous Hui food streets." },
    ],
    localFood: ["Roujiamo (Chinese 'burger')", "Biangbiang noodles", "Yangrou paomo lamb soup", "Persimmon cakes"],
    practical: [
      { label: "Rail", value: "On the high-speed network to Beijing, Chengdu and beyond." },
      { label: "Getting around", value: "Metro plus taxis; the walled core is walkable." },
    ],
  },
  {
    slug: "chengdu",
    name: "Chengdu",
    region: "Southwestern China",
    personality: "Tea houses, pandas and serious late-night eating.",
    intro:
      "The laid-back capital of Sichuan is China's food and tea-house heartland — home to giant pandas, fiery hotpot and a famously unhurried pace of life.",
    image: "chengdu",
    reasonsToVisit: ["Giant pandas at the research base", "The birthplace of mala hotpot", "Tea-house culture", "A relaxed, walkable city"],
    bestTime: "March–June and September–November.",
    recommendedDays: "2–3 days",
    topExperiences: [
      { title: "Giant panda base at dawn", description: "See the pandas at their most active in the early morning." },
      { title: "Hotpot night", description: "The mala broth, the rituals and the spice levels." },
      { title: "Tea house afternoon", description: "Bottomless tea, ear-cleaners and slow conversation." },
    ],
    neighborhoods: [
      { name: "Jinli & Wuhou", description: "Historic streets and snack stalls." },
      { name: "Taikoo Li & Daci Temple", description: "Design retail beside an ancient temple." },
    ],
    localFood: ["Sichuan hotpot", "Mapo tofu", "Dan dan noodles", "Sweet water noodles"],
    practical: [
      { label: "Rail & air", value: "Major rail hub and two airports." },
      { label: "Getting around", value: "Growing metro and easy ride-hailing." },
    ],
  },
  {
    slug: "chongqing",
    name: "Chongqing",
    region: "Southwestern China",
    personality: "The most vertical megacity on earth — neon, rivers and fire.",
    intro:
      "Stacked across hills where two rivers meet, Chongqing is a dizzying vertical metropolis of cliffside buildings, monorails that run through apartment blocks, and the original, ferocious mala hotpot.",
    image: "chongqing",
    reasonsToVisit: ["A genuinely vertical, cinematic cityscape", "The original Chongqing hotpot", "Night river cruises and light shows", "Monorails through buildings"],
    bestTime: "March–May and September–November; summers are intensely hot.",
    recommendedDays: "2–3 days",
    topExperiences: [
      { title: "Liziba monorail", description: "Watch the train run straight through a residential tower." },
      { title: "Hongya Cave at night", description: "A stilted cliffside complex lit up over the river." },
      { title: "Night river cruise", description: "See the layered skyline from the water." },
    ],
    neighborhoods: [
      { name: "Jiefangbei & Hongya", description: "The neon downtown and cliffside waterfront." },
      { name: "Ciqikou", description: "An old riverside town within the city." },
    ],
    localFood: ["Chongqing hotpot", "Xiaomian spicy noodles", "Spicy chicken with chilies", "Sour-and-spicy dishes"],
    practical: [
      { label: "Rail & air", value: "Major rail hub and a large international airport." },
      { label: "Getting around", value: "Metro, monorail and lots of stairs." },
    ],
  },
  {
    slug: "zhangjiajie",
    name: "Zhangjiajie",
    region: "Hunan, Central China",
    personality: "Forests of sandstone pillars that look like floating mountains.",
    intro:
      "The towering quartz-sandstone columns of Zhangjiajie's national forest park rise out of the mist like something from a film — joined by glass bridges, deep canyons and dramatic lookouts.",
    image: "zhangjiajie",
    reasonsToVisit: ["The famous 'floating' sandstone pillars", "Glass bridges and skywalks", "The world's tallest outdoor lift", "Dramatic, mist-wrapped scenery"],
    bestTime: "April–June and September–October.",
    recommendedDays: "3–4 days",
    topExperiences: [
      { title: "Forest park pillars", description: "Walk and ride among the soaring stone columns." },
      { title: "Glass bridge", description: "Cross the Grand Canyon's vertigo-inducing skywalk." },
      { title: "Bailong elevator", description: "Ride the glass lift up a sheer cliff face." },
    ],
    neighborhoods: [
      { name: "Forest park area", description: "Base for the main scenic zones." },
      { name: "Wulingyuan", description: "Gateway town with hotels and restaurants." },
    ],
    localFood: ["Tujia smoked pork", "Sour fish soup", "Wild mountain vegetables", "Glutinous rice cakes"],
    practical: [
      { label: "Access", value: "Reached by air or high-speed rail, then road." },
      { label: "Getting around", value: "Park shuttles, cable cars and lifts." },
    ],
  },
  {
    slug: "yunnan",
    name: "Yunnan",
    region: "Southwestern China",
    personality: "Old towns, tea hills and Himalayan foothills with deep ethnic diversity.",
    intro:
      "China's most diverse province runs from subtropical valleys to the edge of the Tibetan plateau, stringing together lakeside old towns, terraced tea hills, caravan-trail villages and snow peaks.",
    image: "yunnan",
    reasonsToVisit: ["Dali and Lijiang old towns", "The Tea Horse Road and Shaxi", "Tibetan-edge Shangri-La", "Rich ethnic-minority cultures"],
    bestTime: "March–June and September–October.",
    recommendedDays: "7–10 days",
    topExperiences: [
      { title: "Erhai Lake by Dali", description: "Cycle the lakeshore between Bai villages." },
      { title: "Shaxi caravan town", description: "A restored stop on the old Tea Horse Road." },
      { title: "Songzanlin Monastery", description: "A grand Tibetan monastery near Shangri-La." },
    ],
    neighborhoods: [
      { name: "Dali", description: "Lakeside old town beneath the Cangshan range." },
      { name: "Shaxi", description: "A tiny, beautifully preserved caravan town." },
      { name: "Shangri-La", description: "Plateau town with Tibetan culture and meadows." },
    ],
    localFood: ["Crossing-the-bridge rice noodles", "Wild mushrooms in season", "Yak and highland dishes", "Pu'er tea"],
    practical: [
      { label: "Altitude", value: "Shangri-La sits above 3,000m — acclimatize slowly." },
      { label: "Getting around", value: "High-speed rail plus mountain road drives." },
    ],
  },
  {
    slug: "xinjiang",
    name: "Xinjiang",
    region: "Far Western China",
    personality: "Silk Road deserts, oasis bazaars and Central Asian crossroads.",
    intro:
      "China's vast far west is a land of desert oases, snow-capped ranges and Silk Road history, where the food, music and markets feel closer to Central Asia than to the eastern coast.",
    image: "xinjiang",
    reasonsToVisit: ["Kashgar's old town and Sunday market", "Silk Road oases and ruins", "Dramatic deserts and mountains", "A distinct food and music culture"],
    bestTime: "May–June and September–October.",
    recommendedDays: "5–7 days within a longer Silk Road trip",
    topExperiences: [
      { title: "Kashgar Sunday market", description: "One of Asia's great trading bazaars." },
      { title: "Turpan oases", description: "Ancient karez wells, grape valleys and ruins." },
      { title: "Old town lanes", description: "Mud-brick quarters and tea houses." },
    ],
    neighborhoods: [
      { name: "Kashgar old town", description: "The historic heart of the far west." },
      { name: "Turpan", description: "Desert oasis basin with vineyards." },
    ],
    localFood: ["Hand-pulled laghman noodles", "Lamb kebabs", "Polo (pilaf) rice", "Naan flatbreads"],
    practical: [
      { label: "Permits", value: "Some areas can need extra documentation; we handle current requirements." },
      { label: "Distance", value: "Vast region — best done as part of a longer overland route." },
    ],
  },
  {
    slug: "guilin",
    name: "Guilin & the Li River",
    region: "Guangxi, Southern China",
    personality: "Storybook karst peaks rising along a slow green river.",
    intro:
      "The karst landscape around Guilin and Yangshuo — limestone peaks mirrored in the Li River — is one of China's most iconic scenes, best seen from a slow boat or a bike through the rice fields.",
    image: "guilin",
    reasonsToVisit: ["The classic Li River karst scenery", "Cycling the Yangshuo countryside", "River cruises and bamboo rafts", "Rice-terrace day trips"],
    bestTime: "April–October, with lush green peaks in summer.",
    recommendedDays: "2–3 days",
    topExperiences: [
      { title: "Li River cruise", description: "Drift past the peaks from Guilin toward Yangshuo." },
      { title: "Yangshuo by bike", description: "Ride between karst hills and rice paddies." },
      { title: "Rice terraces", description: "Day-trip to the Longji terraced fields." },
    ],
    neighborhoods: [
      { name: "Guilin city", description: "River city and cruise departure point." },
      { name: "Yangshuo", description: "Laid-back town amid the peaks." },
    ],
    localFood: ["Guilin rice noodles", "Beer fish", "Stuffed Li River snails", "Pomelo"],
    practical: [
      { label: "Rail", value: "On the high-speed network from Guangzhou and beyond." },
      { label: "Getting around", value: "River boats, bikes and local buses." },
    ],
  },
];

export function getAllDestinations(): Destination[] {
  return destinations;
}

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}

/** Count of trips that visit a given destination — used on cards. */
export function getTripCountForDestination(slug: string): number {
  return getTripsByDestination(slug).length;
}
