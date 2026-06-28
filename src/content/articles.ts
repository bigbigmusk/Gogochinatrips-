import type { Article } from "./types";

/**
 * China Guide articles. Editorial placeholder copy written for prototyping —
 * factual details (especially visa, payment and connectivity rules) change
 * frequently and MUST be reviewed and updated by a local expert before launch.
 */
export const articles: Article[] = [
  {
    slug: "how-to-pay-in-china",
    title: "How to Pay in China as a Visitor",
    category: "Money",
    readingTime: "6 min read",
    image: "articlePay",
    description: "Mobile payments rule China — here's how visitors can set them up, plus when you'll still want a little cash.",
    publishedISO: "2026-01-15",
    body: [
      { type: "paragraph", text: "China runs on mobile payments. The good news for visitors is that the two big apps now let international cards link directly, so you no longer need a local bank account to pay almost anywhere." },
      { type: "heading", text: "Set up before you fly" },
      { type: "paragraph", text: "Install the major payment apps before arrival and link an international card while you still have easy access to verification texts and email. Test a small transaction so you know it works." },
      { type: "heading", text: "When to carry cash" },
      { type: "list", items: ["Small rural stalls and some taxis", "Temple entry boxes and tips", "Backup if your phone dies"] },
      { type: "paragraph", text: "Rules and limits change, so confirm the current setup before you travel — and as a GoGoChinaTrips traveler, your pre-trip pack includes the latest step-by-step instructions." },
    ],
  },
  {
    slug: "apps-you-need-before-you-arrive",
    title: "The Apps You Need Before You Arrive",
    category: "Tech",
    readingTime: "7 min read",
    image: "articleApps",
    description: "Maps, payments, translation and ride-hailing — the short list of apps that make China far easier to navigate.",
    publishedISO: "2026-01-20",
    body: [
      { type: "paragraph", text: "A handful of apps transform a China trip from confusing to smooth. Download and set them up before you land, while you still have your home connection." },
      { type: "heading", text: "The essentials" },
      { type: "list", items: ["A payment app linked to your card", "A reliable maps app that works offline", "A translation app with camera and voice", "A ride-hailing app for taxis"] },
      { type: "paragraph", text: "Set up accounts and test them at home. We send travelers a current app checklist with setup tips for each one." },
    ],
  },
  {
    slug: "first-timers-guide-high-speed-trains",
    title: "A First-Timer's Guide to China's High-Speed Trains",
    category: "Transport",
    readingTime: "8 min read",
    image: "articleTrains",
    description: "Booking, stations, classes and etiquette — everything you need to glide between cities at 300km/h.",
    publishedISO: "2026-02-01",
    body: [
      { type: "paragraph", text: "China's high-speed rail network is the best way to travel between major cities — fast, frequent, comfortable and far less hassle than flying." },
      { type: "heading", text: "Booking and boarding" },
      { type: "paragraph", text: "Tickets are tied to your passport. Arrive 40–60 minutes early for security and boarding, and keep your passport handy at the gate." },
      { type: "heading", text: "Which class to pick" },
      { type: "list", items: ["Second class: comfortable and great value", "First class: more space, worth it on long legs", "Business class: lie-flat seats on premium routes"] },
      { type: "paragraph", text: "On our rail-based trips we handle every ticket and meet you at the right gate, so the network feels effortless." },
    ],
  },
  {
    slug: "esim-internet-staying-connected",
    title: "eSIM, Internet and Staying Connected",
    category: "Tech",
    readingTime: "6 min read",
    image: "articleEsim",
    description: "How to get online in China, what to know about access, and why an eSIM is the simplest option for most visitors.",
    publishedISO: "2026-02-10",
    body: [
      { type: "paragraph", text: "Staying connected in China is straightforward with a little preparation. For most visitors, a travel eSIM is the simplest route to reliable data from the moment you land." },
      { type: "heading", text: "Why an eSIM" },
      { type: "list", items: ["Activate before you arrive", "Keep your home number on your main line", "Often includes access suited to international travelers"] },
      { type: "paragraph", text: "Connectivity options and access can change, so check current details before you go. Your pre-trip pack covers the latest recommendations." },
    ],
  },
  {
    slug: "what-to-know-visa-free-transit",
    title: "What to Know About Visa-Free Transit",
    category: "Planning",
    readingTime: "7 min read",
    image: "articleVisa",
    description: "Visa-free transit can turn a layover into a real trip — here's how the policies generally work and what to check.",
    publishedISO: "2026-02-18",
    body: [
      { type: "paragraph", text: "Many travelers can visit parts of China without a full tourist visa under visa-free transit policies, provided they're continuing to a third country within a set window." },
      { type: "heading", text: "The general idea" },
      { type: "paragraph", text: "Eligibility depends on your nationality, your route and the city you transit through. The allowed stay and qualifying airports vary, and the rules are updated periodically." },
      { type: "heading", text: "Always confirm before you book" },
      { type: "list", items: ["Check your nationality's current eligibility", "Confirm your routing qualifies", "Verify the city and allowed duration"] },
      { type: "paragraph", text: "Because these policies change, we confirm your eligibility with you before booking any stopover trip — and never make a promise a policy can't keep." },
    ],
  },
  {
    slug: "is-china-safe-for-solo-travelers",
    title: "Is China Safe for Solo Travelers?",
    category: "Safety",
    readingTime: "6 min read",
    image: "articleSolo",
    description: "China is one of Asia's easiest places to travel solo — here's what to expect, plus practical tips.",
    publishedISO: "2026-03-01",
    body: [
      { type: "paragraph", text: "China is widely considered one of the safest major destinations for solo travelers, with low rates of street crime and easy, reliable public transport." },
      { type: "heading", text: "Practical tips" },
      { type: "list", items: ["Keep digital and paper copies of your passport", "Use ride-hailing for late nights", "Learn a few phrases and rely on translation apps", "Save your hotel's name in Chinese characters"] },
      { type: "paragraph", text: "Joining a small-group trip is a great way to travel solo with built-in company and local support whenever you need it." },
    ],
  },
  {
    slug: "how-many-days-do-you-need-in-china",
    title: "How Many Days Do You Need in China?",
    category: "Planning",
    readingTime: "7 min read",
    image: "articleDays",
    description: "From a 48-hour stopover to a three-week grand tour — how to match your trip length to what you want to see.",
    publishedISO: "2026-03-12",
    body: [
      { type: "paragraph", text: "China is huge, so the honest answer is 'more than you think' — but you can have a fantastic trip in anything from two days to three weeks with the right routing." },
      { type: "heading", text: "Rough guide by trip length" },
      { type: "list", items: ["2–3 days: one city or a stopover", "8 days: the classic Beijing–Xi'an–Shanghai loop", "10–12 days: add Chengdu, Guilin or Yunnan", "2–3 weeks: a region in depth or a Silk Road journey"] },
      { type: "paragraph", text: "High-speed rail lets you cover more ground than you'd expect without losing days to airports." },
    ],
  },
  {
    slug: "tipping-toilets-and-other-useful-details",
    title: "Tipping, Toilets and Other Useful Details",
    category: "Culture",
    readingTime: "5 min read",
    image: "articleTips",
    description: "The small practical things — tipping norms, squat toilets, tap water and etiquette — that smooth out a first trip.",
    publishedISO: "2026-03-20",
    body: [
      { type: "paragraph", text: "A few small cultural details go a long way toward a comfortable first trip. None of these are dealbreakers — just useful to know in advance." },
      { type: "heading", text: "Good to know" },
      { type: "list", items: ["Tipping isn't customary in most settings", "Carry tissues — some public toilets are squat-style and BYO paper", "Drink bottled or boiled water rather than tap", "Hotels and trains usually provide hot water for tea"] },
      { type: "paragraph", text: "Our pre-trip pack covers all of this so nothing catches you off guard on day one." },
    ],
  },
];

export function getAllArticles(): Article[] {
  return articles;
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
