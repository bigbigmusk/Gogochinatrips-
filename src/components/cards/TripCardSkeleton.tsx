/** Loading placeholder matching TripCard's footprint to avoid layout shift. */
export function TripCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-card border border-soft-gray bg-paper" aria-hidden="true">
      <div className="aspect-[4/3] animate-pulse bg-soft-gray" />
      <div className="flex flex-col gap-3 p-4">
        <div className="h-5 w-3/4 animate-pulse rounded bg-soft-gray" />
        <div className="h-4 w-1/3 animate-pulse rounded bg-soft-gray" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-soft-gray" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-soft-gray" />
        <div className="mt-2 h-7 w-1/3 animate-pulse rounded bg-soft-gray" />
      </div>
    </div>
  );
}
