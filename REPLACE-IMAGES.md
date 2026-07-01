# Replacing placeholder images with real photos

The site ships with clean, self-hosted SVG placeholders so it always looks
intentional and loads fast everywhere (including mainland China). Swapping in
real photography is designed to be zero-friction — no code changes needed.

Pick **one** of the two methods below.

## Method 1 — Drop in files (simplest)

1. Put a real photo into `public/img/` named after the image key, e.g.
   `public/img/beijing.jpg`, `public/img/tibet.jpg`, `public/img/heroHome.jpg`.
   Accepted formats: `.jpg` `.jpeg` `.png` `.webp` `.avif`.
2. Run `npm run build` (a placeholder without a real photo simply keeps its SVG).

That's it — any key with a matching file is used automatically.

## Method 2 — Download from URLs

1. Edit `scripts/photos.urls.json` and paste a direct image URL for each key you
   want (leave `""` to keep the placeholder).
2. On a machine with internet access, run:
   ```bash
   node scripts/fetch-photos.mjs
   npm run build
   ```

## Image keys and what each shows

Landscape (~1600×1067) unless noted. Hero keys are wide (~2000×1250).

| Key | Subject | Where it appears |
|---|---|---|
| `heroHome` | Contemporary China travel scene (hero) | Homepage hero |
| `ctaFinal` | High-speed train / countryside (hero) | Homepage closing CTA |
| `spotlightTibet` | Tibet — Potala / Himalaya (hero) | Homepage spotlight, Tibet search intro |
| `spotlightChengdu` | Chengdu — pandas / tea houses (hero) | Homepage spotlight, Chengdu search intro |
| `beijing` `shanghai` `xian` `chengdu` `chongqing` `zhangjiajie` `yunnan` `xinjiang` `guilin` `tibet` | Each destination | Destination cards + hero |
| `tripEssentials` `tripChengduNight` `tripWildYunnan` `tripBeijingStopover` `tripHighSpeed` `tripChongqing` `tripZhangjiajie` `tripSilkRoad` `tripTibet` `tripChengdu` | Trip cover images | Trip cards + detail galleries |
| `hostLina` `hostEric` `hostMia` `hostTashi` | Host portraits (~700×800) | Host cards |
| `articlePay` `articleApps` `articleTrains` `articleEsim` `articleVisa` `articleSolo` `articleDays` `articleTips` | Guide article covers | China Guide |
| `reviewPanda` `reviewMarket` `reviewMountain` | Traveler photos (~800×800) | Review cards |

## Notes

- Use landscape photos for the landscape keys and roughly square for host/review
  keys to avoid awkward cropping (images are `object-cover`).
- Keep files reasonably sized (ideally < 400 KB each) for fast loads.
- Only use images you have the right to use. Placeholders stay for any key you
  don't replace, so you can roll out real photography gradually.
