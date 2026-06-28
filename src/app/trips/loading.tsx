import { TripCardSkeleton } from "@/components/cards/TripCardSkeleton";

/** Loading skeleton shown while the trips route segment streams in. */
export default function Loading() {
  return (
    <div className="container-site py-16">
      <div className="h-9 w-48 animate-pulse rounded bg-soft-gray" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <TripCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
