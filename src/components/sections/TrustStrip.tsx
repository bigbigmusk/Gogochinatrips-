import { TRUST_SIGNALS } from "@/content/site";
import { Icon } from "@/components/ui/Icon";

/**
 * Trust strip directly below the hero. Wraps responsively on desktop and scrolls
 * horizontally on small screens. Deliberately understated — concise wording,
 * simple icons, no banking-style heaviness.
 */
export function TrustStrip() {
  return (
    <section aria-label="Why travelers trust us" className="border-y border-soft-gray bg-paper">
      <div className="container-site">
        <ul className="no-scrollbar flex gap-6 overflow-x-auto py-4 md:flex-wrap md:justify-between md:gap-4">
          {TRUST_SIGNALS.map((signal) => (
            <li key={signal.label} className="flex shrink-0 items-center gap-2.5 text-sm font-medium text-ink">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ivory text-jade">
                <Icon name={signal.icon} className="h-4 w-4" />
              </span>
              {signal.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
