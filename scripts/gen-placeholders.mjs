// Generates self-hosted, on-brand SVG placeholder images into public/img/.
// Each image always loads (no external image host), works fast in China, and
// is trivially replaceable with real photography later — just drop a same-named
// file in public/img/ or point src in src/lib/images.ts at your CDN.
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "public", "img");
mkdirSync(OUT, { recursive: true });

// key -> [label, kind]. kind picks the aspect ratio.
const LANDSCAPE = [1600, 1067];
const HERO = [2000, 1250];
const SQUARE = [800, 800];
const PORTRAIT = [700, 800];

const IMAGES = {
  heroHome: ["Contemporary China", HERO],
  ctaFinal: ["Go by high-speed rail", HERO],
  beijing: ["Beijing", LANDSCAPE],
  shanghai: ["Shanghai", LANDSCAPE],
  xian: ["Xi'an", LANDSCAPE],
  chengdu: ["Chengdu", LANDSCAPE],
  chongqing: ["Chongqing", LANDSCAPE],
  zhangjiajie: ["Zhangjiajie", LANDSCAPE],
  yunnan: ["Yunnan", LANDSCAPE],
  xinjiang: ["Xinjiang", LANDSCAPE],
  guilin: ["Guilin", LANDSCAPE],
  tibet: ["Tibet", LANDSCAPE],
  tripEssentials: ["China Essentials", LANDSCAPE],
  tripChengduNight: ["Chengdu After Dark", LANDSCAPE],
  tripWildYunnan: ["Wild Yunnan", LANDSCAPE],
  tripBeijingStopover: ["Beijing Stopover", LANDSCAPE],
  tripHighSpeed: ["High-Speed Rail", LANDSCAPE],
  tripChongqing: ["Chongqing City Rush", LANDSCAPE],
  tripZhangjiajie: ["Zhangjiajie & Beyond", LANDSCAPE],
  tripSilkRoad: ["Silk Road West", LANDSCAPE],
  tripTibet: ["Roof of the World", LANDSCAPE],
  tripChengdu: ["Chengdu & Pandas", LANDSCAPE],
  spotlightTibet: ["Tibet", HERO],
  spotlightChengdu: ["Chengdu", HERO],
  hostLina: ["Lina · Chengdu", PORTRAIT],
  hostEric: ["Eric · Beijing", PORTRAIT],
  hostMia: ["Mia · Yunnan", PORTRAIT],
  hostTashi: ["Tashi · Tibet", PORTRAIT],
  articlePay: ["Paying in China", LANDSCAPE],
  articleApps: ["Essential apps", LANDSCAPE],
  articleTrains: ["High-speed trains", LANDSCAPE],
  articleEsim: ["Staying connected", LANDSCAPE],
  articleVisa: ["Visa-free transit", LANDSCAPE],
  articleSolo: ["Solo travel", LANDSCAPE],
  articleDays: ["How many days", LANDSCAPE],
  articleTips: ["Useful details", LANDSCAPE],
  reviewPanda: ["Pandas", SQUARE],
  reviewMarket: ["Night market", SQUARE],
  reviewMountain: ["Mountains", SQUARE],
};

// Gradient pairs built from the brand palette.
const THEMES = [
  ["#FF4B35", "#7A1E14"],
  ["#3155FF", "#141A4D"],
  ["#009B7A", "#0A3B30"],
  ["#FF4B35", "#3155FF"],
  ["#3155FF", "#009B7A"],
  ["#009B7A", "#B5361F"],
  ["#1B1B1B", "#3155FF"],
  ["#C43A28", "#111111"],
];

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&apos;");
}

function svg(key, label, [w, h]) {
  const seed = hash(key);
  const [c1, c2] = THEMES[seed % THEMES.length];
  const angle = 20 + (seed % 40);
  // A simple layered mountain silhouette for a travel feel.
  const baseY = h * 0.62;
  const ridge = (offset, amp, opacity) => {
    const pts = [];
    const steps = 6;
    for (let i = 0; i <= steps; i++) {
      const x = (w / steps) * i;
      const y = baseY + offset + Math.sin(seed + i * 1.3) * amp;
      pts.push(`${x.toFixed(0)},${y.toFixed(0)}`);
    }
    return `<polygon points="0,${h} ${pts.join(" ")} ${w},${h}" fill="#FFFDF8" opacity="${opacity}"/>`;
  };
  const fontSize = Math.round(h * 0.11);
  const tag = Math.round(h * 0.028);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img">
  <defs>
    <linearGradient id="g" gradientTransform="rotate(${angle})">
      <stop offset="0" stop-color="${c1}"/>
      <stop offset="1" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <circle cx="${w * 0.8}" cy="${h * 0.28}" r="${h * 0.14}" fill="#FFFDF8" opacity="0.14"/>
  ${ridge(h * 0.06, h * 0.05, 0.10)}
  ${ridge(h * 0.16, h * 0.07, 0.16)}
  <rect x="${w * 0.055}" y="${h * 0.08}" width="${tag * 12}" height="${tag * 2}" rx="${tag}" fill="#FFFDF8" opacity="0.9"/>
  <text x="${w * 0.055 + tag * 1.1}" y="${h * 0.08 + tag * 1.35}" font-family="Space Grotesk, Arial, sans-serif" font-size="${tag}" font-weight="700" fill="#111111">GoGoChinaTrips</text>
  <text x="${w * 0.055}" y="${h * 0.9}" font-family="Space Grotesk, Arial, sans-serif" font-size="${fontSize}" font-weight="700" fill="#FFFDF8">${esc(label)}</text>
  <text x="${w * 0.055}" y="${h * 0.9 + tag * 1.6}" font-family="Arial, sans-serif" font-size="${tag * 0.85}" fill="#FFFDF8" opacity="0.75">Placeholder image · replace before launch</text>
</svg>`;
}

let count = 0;
for (const [key, [label, dim]] of Object.entries(IMAGES)) {
  writeFileSync(join(OUT, `${key}.svg`), svg(key, label, dim));
  count++;
}
console.log(`Generated ${count} placeholder SVGs into public/img/`);
