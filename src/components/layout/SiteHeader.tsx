"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import { PRIMARY_NAV } from "@/content/site";
import { Wordmark } from "./Wordmark";
import { CurrencySelector } from "./CurrencySelector";
import { MobileMenu } from "./MobileMenu";
import { HeroSearch } from "@/components/search/HeroSearch";
import { cn } from "@/lib/utils";

/**
 * Responsive sticky header. Desktop shows centered nav with right-aligned
 * actions; mobile collapses to a compact bar with a full-screen menu and an
 * always-accessible "Plan My Trip" CTA.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Close overlays on route change.
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Lock scroll while the search overlay is open.
  useEffect(() => {
    document.body.style.overflow = searchOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [searchOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-soft-gray bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/80">
      <div className="container-site flex h-16 items-center justify-between gap-4">
        {/* Left: wordmark */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:block">
            <Wordmark />
          </span>
          <span className="sm:hidden">
            <Wordmark compact />
          </span>
        </div>

        {/* Center: primary nav (desktop) */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {PRIMARY_NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "text-sm font-medium text-ink transition-colors hover:text-gogo-red",
                      active && "text-gogo-red",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right: actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Open search"
            className="rounded-full p-2 text-ink hover:bg-ivory"
          >
            <Search className="h-5 w-5" aria-hidden="true" />
          </button>

          <span className="hidden md:block">
            <CurrencySelector />
          </span>

          <Link href="/trips" className="hidden md:inline-flex btn-secondary px-5 py-2">
            Browse Trips
          </Link>

          <Link href="/plan-my-trip" className="hidden sm:inline-flex btn-primary px-5 py-2">
            Plan My Trip
          </Link>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="rounded-full p-2 text-ink hover:bg-ivory lg:hidden"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-ink/40" role="dialog" aria-modal="true" aria-label="Search">
          <div className="container-site pt-24">
            <div className="relative mx-auto max-w-2xl rounded-card bg-paper p-5 shadow-lift">
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
                className="absolute -top-12 right-0 rounded-full bg-paper p-2 text-ink shadow-card"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
              <h2 className="mb-3 font-display text-xl font-bold">Search China trips</h2>
              <HeroSearch variant="compact" autoFocus onNavigate={() => setSearchOpen(false)} />
            </div>
          </div>
        </div>
      )}

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
