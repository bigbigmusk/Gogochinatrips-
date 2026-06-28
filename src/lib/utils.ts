import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names while resolving Tailwind conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a USD amount as a compact "from" price. */
export function formatPriceUSD(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Build a human-friendly duration label from a structured value. */
export function formatDuration(value: number, unit: "days" | "hours") {
  const rounded = Math.round(value);
  if (unit === "hours") return `${rounded} ${rounded === 1 ? "hour" : "hours"}`;
  return `${rounded} ${rounded === 1 ? "day" : "days"}`;
}
