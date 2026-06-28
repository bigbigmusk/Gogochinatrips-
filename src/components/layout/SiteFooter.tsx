import Link from "next/link";
import { Instagram, Youtube, Facebook } from "lucide-react";
import { FOOTER_NAV, SITE } from "@/content/site";
import { Wordmark } from "./Wordmark";
import { NewsletterSignup } from "./NewsletterSignup";
import { CurrencySelector } from "./CurrencySelector";
import { LanguageSelector } from "./LanguageSelector";

/** Global site footer with navigation columns, newsletter and selectors. */
export function SiteFooter() {
  const year = 2026;

  return (
    <footer className="mt-24 border-t border-soft-gray bg-paper">
      <div className="container-site grid gap-12 py-16 lg:grid-cols-[1.2fr_2fr]">
        {/* Brand + newsletter */}
        <div className="flex flex-col gap-6">
          <Wordmark />
          <p className="max-w-xs text-sm text-muted-text">{SITE.supportingLine}</p>
          <NewsletterSignup />
          <div className="flex items-center gap-3">
            <a href="#" aria-label="GoGoChinaTrips on Instagram" className="rounded-full border border-soft-gray p-2 text-ink hover:border-ink">
              <Instagram className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#" aria-label="GoGoChinaTrips on YouTube" className="rounded-full border border-soft-gray p-2 text-ink hover:border-ink">
              <Youtube className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#" aria-label="GoGoChinaTrips on Facebook" className="rounded-full border border-soft-gray p-2 text-ink hover:border-ink">
              <Facebook className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Nav columns */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {Object.entries(FOOTER_NAV).map(([heading, links]) => (
            <nav key={heading} aria-label={heading}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted-text">
                {heading}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-ink hover:text-gogo-red">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-soft-gray">
        <div className="container-site flex flex-col items-start justify-between gap-4 py-6 text-sm text-muted-text sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-4">
            <span>© {year} {SITE.name}</span>
            <Link href="/china-guide" className="hover:text-ink">Privacy</Link>
            <Link href="/china-guide" className="hover:text-ink">Terms</Link>
            <Link href="/china-guide" className="hover:text-ink">Cookies</Link>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <CurrencySelector />
          </div>
        </div>
      </div>
    </footer>
  );
}
