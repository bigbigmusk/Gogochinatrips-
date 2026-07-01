// Generates self-hosted, on-brand SVG placeholder images into public/img/.
//
// Why SVG placeholders: this build environment has no access to external photo
// hosts, and common image CDNs (Unsplash etc.) are often blocked in mainland
// China anyway. Self-hosted SVGs always load, are tiny, look intentional, and
// are trivially replaceable with real photography — drop a same-named file into
// public/img (e.g. beijing.jpg) and update the extension in src/lib/images.ts,
// or point src at your own CDN.
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "public", "img");
mkdirSync(OUT, { recursive: true });

const LANDSCAPE = [1600, 1067];
const HERO = [2000, 1250];
const SQUARE = [800, 800];
const PORTRAIT = [700, 800];

// key -> [label, dimensions, plain?]. `plain` images (heroes) carry their own
// headline in the page, so they render as clean gradient art with no label.
const IMAGES = {
  heroHome: ["", HERO, true],
  ctaFinal: ["", HERO, true],
  spotlightTibet: ["Tibet", HERO],
  spotlightChengdu: ["Chengdu", HERO],

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

  tripEssentials: ["Beijing · Xi'an · Shanghai", LANDSCAPE],
  tripChengduNight: ["Chengdu Nights", LANDSCAPE],
  tripWildYunnan: ["Yunnan", LANDSCAPE],
  tripBeijingStopover: ["Beijing", LANDSCAPE],
  tripHighSpeed: ["High-Speed Rail", LANDSCAPE],
  tripChongqing: ["Chongqing", LANDSCAPE],
  tripZhangjiajie: ["Zhangjiajie", LANDSCAPE],
  tripSilkRoad: ["Silk Road", LANDSCAPE],
  tripTibet: ["Tibet", LANDSCAPE],
  tripChengdu: ["Chengdu", LANDSCAPE],

  hostLina: ["Lina", PORTRAIT],
  hostEric: ["Eric", PORTRAIT],
  hostMia: ["Mia", PORTRAIT],
  hostTashi: ["Tashi", PORTRAIT],

  articlePay: ["Money", LANDSCAPE],
  articleApps: ["Apps", LANDSCAPE],
  articleTrains: ["Trains", LANDSCAPE],
  articleEsim: ["Connectivity", LANDSCAPE],
  articleVisa: ["Visas", LANDSCAPE],
  articleSolo: ["Solo Travel", LANDSCAPE],
  articleDays: ["Planning", LANDSCAPE],
  articleTips: ["Good to Know", LANDSCAPE],

  reviewPanda: ["Chengdu", SQUARE],
  reviewMarket: ["Night Market", SQUARE],
  reviewMountain: ["Mountains", SQUARE],
};

// Refined gradient pairs drawn from the brand palette (deep, photographic).
const THEMES = [
  ["#FF5A45", "#7A1E14"],
  ["#3A5BFF", "#141A4D"],
  ["#0FB08C", "#0A3B30"],
  ["#FF5A45", "#2A2140"],
  ["#3A5BFF", "#0A3B30"],
  ["#E8503A", "#1B1B24"],
  ["#1E2A5A", "#0FB08C"],
  ["#C43A28", "#161616"],
];

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}
function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;");
}

// A layered mountain-ridge silhouette gives an editorial landscape feel.
function ridge(key, w, h, baseFrac, amp, opacity, seed) {
  const baseY = h * baseFrac;
  const steps = 5;
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const x = (w / steps) * i;
    const y = baseY + Math.sin(seed + i * 1.1) * amp * h;
    pts.push(`${x.toFixed(0)},${y.toFixed(0)}`);
  }
  return `<polygon points="0,${h} ${pts.join(" ")} ${w},${h}" fill="#FFFDF8" opacity="${opacity}"/>`;
}

function svg(key, label, [w, h], plain) {
  const seed = hash(key);
  const [c1, c2] = THEMES[seed % THEMES.length];
  const angle = 15 + (seed % 30);
  const ridges =
    ridge(key, w, h, 0.66, 0.05, 0.06, seed) +
    ridge(key, w, h, 0.78, 0.06, 0.10, seed + 2) +
    ridge(key, w, h, 0.9, 0.04, 0.14, seed + 4);

  let overlay = "";
  if (!plain && label) {
    const pad = Math.round(h * 0.06);
    const fs = Math.round(h * 0.055);
    const tickY = h - pad - fs * 0.35;
    overlay = `
  <rect x="${pad}" y="${tickY - fs * 0.55}" width="${Math.round(fs * 0.5)}" height="${Math.round(fs * 0.9)}" rx="2" fill="#FF4B35"/>
  <text x="${pad + fs * 0.9}" y="${h - pad}" font-family="'Space Grotesk', Arial, sans-serif" font-size="${fs}" font-weight="700" fill="#FFFDF8" letter-spacing="0.5">${esc(label)}</text>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="g" gradientTransform="rotate(${angle})">
      <stop offset="0" stop-color="${c1}"/>
      <stop offset="1" stop-color="${c2}"/>
    </linearGradient>
    <radialGradient id="glow" cx="78%" cy="26%" r="55%">
      <stop offset="0" stop-color="#FFFDF8" stop-opacity="0.20"/>
      <stop offset="1" stop-color="#FFFDF8" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>
  <circle cx="${Math.round(w * 0.78)}" cy="${Math.round(h * 0.26)}" r="${Math.round(h * 0.1)}" fill="#FFFDF8" opacity="0.10"/>
  ${ridges}${overlay}
</svg>`;
}

let count = 0;
for (const [key, [label, dim, plain]] of Object.entries(IMAGES)) {
  writeFileSync(join(OUT, `${key}.svg`), svg(key, label, dim, !!plain));
  count++;
}
console.log(`Generated ${count} placeholder SVGs into public/img/`);
