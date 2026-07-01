// Detects real photos dropped into public/img and enables them automatically.
//
// For every placeholder <key>.svg, if a raster file <key>.(jpg|jpeg|png|webp|avif)
// exists alongside it, that real photo is recorded in photo-manifest.json and
// used by the site instead of the SVG. Keys with no photo keep the SVG.
//
// Usage: node scripts/scan-photos.mjs   (also runs automatically on build)
import { readdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMG = join(__dirname, "..", "public", "img");
const RASTER = ["jpg", "jpeg", "png", "webp", "avif"];

const files = readdirSync(IMG);
const keys = files.filter((f) => f.endsWith(".svg")).map((f) => f.slice(0, -4));

const manifest = {};
for (const key of keys) {
  for (const ext of RASTER) {
    if (files.includes(`${key}.${ext}`)) {
      manifest[key] = `${key}.${ext}`;
      break;
    }
  }
}

writeFileSync(join(IMG, "photo-manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
const n = Object.keys(manifest).length;
console.log(`Photo manifest: ${n} real photo${n === 1 ? "" : "s"} detected, ${keys.length - n} using placeholders.`);
