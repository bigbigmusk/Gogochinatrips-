import Link from "next/link";
import { cn } from "@/lib/utils";

/** GoGoChinaTrips wordmark. Pure type, no image dependency. */
export function Wordmark({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="GoGoChinaTrips home"
      className={cn(
        "font-display text-xl font-bold tracking-tight text-ink",
        className,
      )}
    >
      <span className="text-gogo-red">GoGo</span>
      {compact ? "China" : "ChinaTrips"}
    </Link>
  );
}
