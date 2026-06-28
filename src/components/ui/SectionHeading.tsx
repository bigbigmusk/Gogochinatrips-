import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  link?: { label: string; href: string };
  align?: "left" | "center";
  className?: string;
}

/** Consistent editorial section header used across the site. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  link,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
        align === "center" && "md:flex-col md:items-center text-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && <span className="label-eyebrow text-gogo-red">{eyebrow}</span>}
        <h2 className="mt-2 text-section">{title}</h2>
        {intro && <p className="mt-3 text-lg text-muted-text">{intro}</p>}
      </div>
      {link && (
        <Link
          href={link.href}
          className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-ink hover:text-gogo-red"
        >
          {link.label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
