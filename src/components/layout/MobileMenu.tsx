"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { PRIMARY_NAV } from "@/content/site";
import { Wordmark } from "./Wordmark";
import { CurrencySelector } from "./CurrencySelector";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Full-screen mobile navigation with large typography and a fixed primary CTA.
 * Traps scroll while open and supports reduced-motion preferences.
 */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const reduce = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col bg-paper lg:hidden"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="Main menu"
        >
          <div className="container-site flex h-16 items-center justify-between border-b border-soft-gray">
            <Wordmark />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="rounded-full p-2 text-ink hover:bg-ivory"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile" className="container-site flex-1 overflow-y-auto py-8">
            <ul className="flex flex-col gap-1">
              {PRIMARY_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center justify-between py-3 font-display text-3xl font-bold text-ink hover:text-gogo-red"
                  >
                    {item.label}
                    <ArrowUpRight className="h-6 w-6 text-muted-text" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex items-center gap-3">
              <CurrencySelector />
              <Link href="/contact" onClick={onClose} className="btn-secondary px-5 py-2">
                Talk to an expert
              </Link>
            </div>
          </nav>

          <div className="container-site border-t border-soft-gray py-4">
            <Link href="/plan-my-trip" onClick={onClose} className="btn-primary w-full py-3.5 text-base">
              Plan My Trip
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
