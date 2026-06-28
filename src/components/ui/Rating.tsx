import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  reviewCount?: number;
  className?: string;
  showCount?: boolean;
}

/** Accessible star rating. The numeric value is exposed to screen readers. */
export function Rating({ value, reviewCount, className, showCount = true }: RatingProps) {
  const label =
    reviewCount !== undefined
      ? `Rated ${value} out of 5 from ${reviewCount} reviews`
      : `Rated ${value} out of 5`;
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-sm", className)} aria-label={label}>
      <Star className="h-4 w-4 fill-gogo-red text-gogo-red" aria-hidden="true" />
      <span className="font-semibold text-ink">{value.toFixed(1)}</span>
      {showCount && reviewCount !== undefined && (
        <span className="text-muted-text">({reviewCount})</span>
      )}
    </span>
  );
}
