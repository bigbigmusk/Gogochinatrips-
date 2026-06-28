# GoGoChinaTrips

**China, without the guesswork.** — a production-ready marketing & booking-inquiry
website for an international inbound-China travel brand.

Built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion and
Lucide icons. Server components by default, with small client islands only where
interactivity is required.

---

## Local development

```bash
npm install        # install dependencies
npm run dev        # start the dev server at http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run lint       # ESLint (next/core-web-vitals)
npm run typecheck  # TypeScript, no emit
```

Node 18.18+ (developed and verified on Node 22).

---

## Architecture

```
src/
  app/                       # App Router routes
    layout.tsx               # fonts, metadata, header/footer, org schema
    page.tsx                 # homepage
    trips/                   # /trips listing + /trips/[slug] detail
    destinations/            # listing + [slug] detail
    travel-styles/           # listing + [slug] detail
    china-guide/             # article hub + [slug] article
    plan-my-trip/            # multi-step inquiry form
    about/ contact/          # static pages
    sitemap.ts robots.ts     # SEO infrastructure
    opengraph-image.tsx      # branded default OG image
  components/
    layout/   header, footer, announcement bar, mobile menu, selectors
    sections/ homepage sections (hero, trust strip, grids, matcher, etc.)
    cards/    TripCard, DestinationCard, HostCard, ReviewCard, ArticleCard
    trips/    explorer, filters, booking widgets, itinerary, gallery
    planner/  MultiStepTripPlanner
    search/   HeroSearch
    contact/  ContactForm
    ui/       shared primitives (SectionHeading, Rating, Breadcrumbs, FAQ…)
  content/                   # typed mock content layer (CMS-ready)
    types.ts trips.ts destinations.ts travel-styles.ts
    hosts.ts reviews.ts articles.ts site.ts
  lib/
    images.ts                # centralized, replaceable image config
    seo.ts                   # metadata + JSON-LD helpers
    utils.ts                 # cn(), price/duration formatting
```

### Content layer
All trips, destinations, styles, hosts, reviews and articles live in
`src/content/*` as typed data with accessor functions. Presentation components
never import raw arrays directly — they call the accessors. This makes it
straightforward to swap the mock layer for a headless CMS (Sanity, Payload,
Contentful) later: reimplement the accessors to fetch from the CMS and keep the
types.

### Design tokens
Color and typography tokens are declared once as CSS custom properties in
`src/app/globals.css` and mirrored in `tailwind.config.ts`, so they are
available both as Tailwind utilities (`bg-gogo-red`) and raw CSS.

---

## Before launch — replace these

This build uses temporary placeholder content and imagery. Replace before going
live:

### Images
- **All photography is temporary Unsplash imagery** referenced from a single
  map in `src/lib/images.ts`. Swap each entry for owned, licensed photography
  (keep the `width`/`height` and write real `alt` text). Update the remote
  domain allow-list in `next.config.mjs` to your CDN.

### Copy & data (mock — clearly marked in source)
- **Trips** (`src/content/trips.ts`) — prices, departure dates, ratings, review
  counts and itineraries are sample data. Ratings/review counts feed
  `TouristTrip` structured data, so only keep them once they reflect real,
  verified reviews.
- **Reviews** (`src/content/reviews.ts`) — placeholder traveler stories. Do not
  present as real reviews; replace with verified submissions before enabling any
  review schema.
- **Articles** (`src/content/articles.ts`) — China Guide content is editorial
  placeholder. Visa, payment and connectivity details change frequently and must
  be reviewed by a local expert. No hard visa-policy promise is hard-coded.
- **Hosts** (`src/content/hosts.ts`) — sample host profiles.
- **Brand details** (`src/content/site.ts`) — `SITE.url`, `email`, `whatsapp`,
  announcement bar copy, social links (currently `#`).

### Wiring (currently front-end prototypes)
- `MultiStepTripPlanner` and `ContactForm` validate and show a confirmation
  state but do not submit anywhere — connect to your CRM/email backend.
- `NewsletterSignup` — connect to your ESP.
- `CurrencySelector` / `LanguageSelector` — track local state only; wire to real
  pricing/i18n.
- Trip-detail **route map** is a labeled placeholder — add a real map embed.

---

## Accessibility & performance notes
- Semantic landmarks, skip link, visible focus states, labelled forms with
  errors linked via `aria-describedby`, and `prefers-reduced-motion` support
  throughout.
- Images use `next/image` with intrinsic dimensions and responsive `sizes`.
- Fonts loaded via `next/font` with `display: swap`.
- Most pages are statically prerendered; client JS is limited to interactive
  islands.
