import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { getImage } from "@/lib/images";

/** Bold full-width closing call-to-action. */
export function FinalCta() {
  const img = getImage("ctaFinal");

  return (
    <section className="relative overflow-hidden">
      <div className="relative min-h-[60vh] w-full">
        <Image src={img.src} alt={img.alt} fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-ink/65" />
        <div className="container-site relative flex min-h-[60vh] flex-col items-start justify-center py-16 text-paper">
          <h2 className="max-w-2xl text-section text-paper">China is easier than you think.</h2>
          <p className="mt-4 max-w-xl text-lg text-paper/90">
            Tell us how you like to travel. We&apos;ll help with the rest.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/plan-my-trip" className="btn-primary group text-base">
              Plan My Trip
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link href="/contact" className="btn-secondary border-paper text-base text-paper hover:bg-paper hover:text-ink">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Talk to a China Expert
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
