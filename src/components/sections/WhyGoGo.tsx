import { WHY_BLOCKS } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/** "China is complicated. Your trip shouldn't be." — four editorial value blocks. */
export function WhyGoGo() {
  return (
    <section className="bg-ink text-paper">
      <div className="container-site py-16 md:py-24">
        <SectionHeading
          eyebrow="Why GoGoChinaTrips"
          title="China is complicated. Your trip shouldn't be."
          className="[&_h2]:text-paper [&_p]:text-paper/80"
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-card border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_BLOCKS.map((block, i) => (
            <Reveal key={block.title} delay={i * 0.05} className="bg-ink">
              <div className="flex h-full flex-col gap-3 p-7">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gogo-red text-paper">
                  <Icon name={block.icon} className="h-5 w-5" />
                </span>
                <h3 className="font-display text-lg font-bold">{block.title}</h3>
                <p className="text-sm text-paper/80">{block.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
