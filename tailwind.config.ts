import type { Config } from "tailwindcss";

/**
 * GoGoChinaTrips design system.
 * Token values mirror the CSS custom properties declared in src/app/globals.css
 * so they can be consumed both via Tailwind utilities and raw CSS.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        ivory: "var(--ivory)",
        paper: "var(--paper)",
        "gogo-red": "var(--gogo-red)",
        "electric-blue": "var(--electric-blue)",
        jade: "var(--jade)",
        "soft-gray": "var(--soft-gray)",
        "muted-text": "var(--muted-text)",
      },
      fontFamily: {
        // Bold contemporary grotesk for headlines, legible sans for body.
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Fluid display sizes used for hero + section titles.
        hero: ["clamp(2.75rem, 7vw, 6rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        section: ["clamp(2rem, 4.5vw, 4rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
      },
      borderRadius: {
        card: "1.25rem",
        pill: "999px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(17,17,17,0.04), 0 8px 24px -12px rgba(17,17,17,0.12)",
        lift: "0 12px 40px -16px rgba(17,17,17,0.22)",
      },
      maxWidth: {
        site: "90rem",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s var(--ease-editorial) both",
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
