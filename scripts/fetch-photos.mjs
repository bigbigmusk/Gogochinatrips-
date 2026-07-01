// Downloads real photos into public/img based on scripts/photos.urls.json.
//
// Fill scripts/photos.urls.json with { "<imageKey>": "<direct image URL>" } —
// leave a key as "" to keep its placeholder. Then run this on a machine with
// internet access:
//
//   node scripts/fetch-photos.mjs
//   npm run build
//
// Only keys with a URL are fetched; failures are skipped (the placeholder
// stays). After downloading, the build's prebuild step records them
// automatically (or run `npm run photos`).
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMG = join(__dirname, "..", "public", "img");
const map = JSON.parse(readFileSync(join(__dirname, "photos.urls.json"), "utf8"));

function extFromUrl(url) {
  const m = url.split("?")[0].match(/\.(jpe?g|png|webp|avif)$/i);
  return m ? m[1].toLowerCase().replace("jpeg", "jpg") : "jpg";
}

let ok = 0;
let skipped = 0;
for (const [key, url] of Object.entries(map)) {
  if (!url) { skipped++; continue; }
  try {
    const res = await fetch(url, { redirect: "follow", headers: { "User-Agent": "GoGoChinaTrips-image-fetch" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const file = `${key}.${extFromUrl(url)}`;
    writeFileSync(join(IMG, file), buf);
    console.log(`✓ ${key} → ${file} (${Math.round(buf.length / 1024)} KB)`);
    ok++;
  } catch (err) {
    console.warn(`✗ ${key}: ${err.message} — keeping placeholder`);
  }
}
console.log(`\nDone: ${ok} downloaded, ${skipped} left as placeholders. Now run: npm run build`);
