import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { buildMetadata } from "@/lib/seo";
import { MultiStepTripPlanner } from "@/components/planner/MultiStepTripPlanner";

export const metadata: Metadata = buildMetadata({
  title: "Plan My Trip",
  description:
    "Tell us how you like to travel and we'll design a tailored China trip — small group or private, your pace, your budget. No account required.",
  path: "/plan-my-trip",
});

export default function PlanMyTripPage() {
  return (
    <>
      <PageHeader
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Plan My Trip", path: "/plan-my-trip" },
        ]}
        eyebrow="Custom trips"
        title="Let's build your China trip"
        intro="A few quick questions and a real China trip designer takes it from there. It's free, and there's no obligation to book."
      />
      <section className="container-site py-10">
        <MultiStepTripPlanner />
      </section>
    </>
  );
}
