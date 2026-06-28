"use client";

import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { FilterBar, EMPTY_FILTERS, type Filters } from "./FilterBar";

interface Props {
  open: boolean;
  onClose: () => void;
  filters: Filters;
  onChange: (f: Filters) => void;
  resultCount: number;
}

/** Bottom-sheet filter panel for mobile. */
export function MobileFilterSheet({ open, onClose, filters, onChange, resultCount }: Props) {
  const reduce = useReducedMotion();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col justify-end bg-ink/40 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Filters"
        >
          <motion.div
            className="max-h-[88vh] overflow-y-auto rounded-t-card bg-ivory"
            initial={reduce ? { opacity: 0 } : { y: "100%" }}
            animate={reduce ? { opacity: 1 } : { y: 0 }}
            exit={reduce ? { opacity: 0 } : { y: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-soft-gray bg-ivory px-5 py-4">
              <h2 className="font-display text-lg font-bold">Filters</h2>
              <button type="button" onClick={onClose} aria-label="Close filters" className="rounded-full p-2 hover:bg-soft-gray">
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="p-5">
              <FilterBar filters={filters} onChange={onChange} />
            </div>

            <div className="sticky bottom-0 flex items-center gap-3 border-t border-soft-gray bg-ivory px-5 py-4">
              <button type="button" onClick={() => onChange(EMPTY_FILTERS)} className="btn-secondary flex-1">
                Clear all
              </button>
              <button type="button" onClick={onClose} className="btn-primary flex-1">
                Show {resultCount} {resultCount === 1 ? "trip" : "trips"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
