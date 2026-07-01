/**
 * Thin analytics abstraction. No provider is installed; events are pushed to
 * `window.dataLayer` if present (GA4/GTM-ready) and logged in development. Swap
 * the implementation here to connect a real provider later.
 */
export type AnalyticsEvent =
  | "search_submitted"
  | "search_cleared"
  | "destination_filter_selected"
  | "filter_removed"
  | "sort_changed"
  | "trip_card_opened"
  | "tibet_planning_cta_clicked"
  | "chengdu_planning_cta_clicked"
  | "zero_results_custom_trip_clicked";

export function track(event: AnalyticsEvent, props: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[] };
  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push({ event, ...props });
  } else if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", event, props);
  }
}
