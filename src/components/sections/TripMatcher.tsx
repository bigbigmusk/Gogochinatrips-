"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft, RotateCcw, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TripCard } from "@/components/cards/TripCard";
import { getAllTrips } from "@/content/trips";
import type { Trip } from "@/content/types";
import { cn } from "@/lib/utils";

// Each step offers tagged options; tags are matched against trips at the end.
interface Step {
  key: string;
  question: string;
  helper: string;
  options: { label: string; tags: string[] }[];
}

const STEPS: Step[] = [
  {
    key: "month",
    question: "When are you thinking of traveling?",
    helper: "Roughly is fine — we can refine later.",
    options: [
      { label: "Spring (Mar–May)", tags: ["3", "4", "5"] },
      { label: "Summer (Jun–Aug)", tags: ["6", "7", "8"] },
      { label: "Autumn (Sep–Nov)", tags: ["9", "10", "11"] },
      { label: "I'm flexible", tags: [] },
    ],
  },
  {
    key: "length",
    question: "How long do you have?",
    helper: "We'll match the trip length to your time.",
    options: [
      { label: "A few hours / a day", tags: ["short"] },
      { label: "2–4 days", tags: ["short"] },
      { label: "About a week", tags: ["mid"] },
      { label: "10+ days", tags: ["long"] },
    ],
  },
  {
    key: "interest",
    question: "What pulls you to China?",
    helper: "Pick the one that excites you most.",
    options: [
      { label: "The big icons", tags: ["first-time"] },
      { label: "Food & nightlife", tags: ["food-nightlife"] },
      { label: "Mountains & nature", tags: ["mountains-nature"] },
      { label: "Ancient culture", tags: ["ancient-culture"] },
    ],
  },
  {
    key: "style",
    question: "How do you like to travel?",
    helper: "There's no wrong answer.",
    options: [
      { label: "Small group", tags: ["small-group"] },
      { label: "Just my people (private)", tags: ["private"] },
      { label: "Either is fine", tags: [] },
    ],
  },
  {
    key: "pace",
    question: "What's your ideal pace?",
    helper: "Last one — then we'll match you.",
    options: [
      { label: "Relaxed and slow", tags: ["slow-local"] },
      { label: "A balanced mix", tags: [] },
      { label: "Pack it all in", tags: ["first-time"] },
    ],
  },
];

function matchTrips(tags: string[]): Trip[] {
  const all = getAllTrips();
  const scored = all.map((trip) => {
    let score = 0;
    for (const tag of tags) {
      if (trip.travelStyleSlugs.includes(tag)) score += 3;
      if (trip.departureMonths.map(String).includes(tag)) score += 1;
      if (tag === "short" && (trip.durationUnit === "hours" || trip.durationValue <= 4)) score += 2;
      if (tag === "mid" && trip.durationUnit === "days" && trip.durationValue >= 5 && trip.durationValue <= 9) score += 2;
      if (tag === "long" && trip.durationUnit === "days" && trip.durationValue >= 10) score += 2;
    }
    return { trip, score };
  });
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((s) => s.trip);
}

/** Front-end trip-matcher quiz. No account required; state is local only. */
export function TripMatcher() {
  const [started, setStarted] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<string[][]>([]);
  const [done, setDone] = useState(false);

  const step = STEPS[stepIndex];
  const progress = done ? 100 : Math.round((stepIndex / STEPS.length) * 100);

  function choose(tags: string[]) {
    const next = [...answers];
    next[stepIndex] = tags;
    setAnswers(next);
    if (stepIndex < STEPS.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      setDone(true);
    }
  }

  function reset() {
    setStarted(false);
    setStepIndex(0);
    setAnswers([]);
    setDone(false);
  }

  const results = done ? matchTrips(answers.flat()) : [];

  return (
    <section className="bg-ivory">
      <div className="container-site py-16 md:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Trip Matcher"
              title="Not sure where to start?"
              intro="Answer a few questions and we'll match you with the right China trip. No account, no email required."
            />
            {!started && !done && (
              <button onClick={() => setStarted(true)} className="btn-primary group mt-6 text-base">
                Find My Trip
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="rounded-card border border-soft-gray bg-paper p-6 shadow-card md:p-8">
            {!started && !done && (
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <Sparkles className="h-10 w-10 text-gogo-red" aria-hidden="true" />
                <p className="text-muted-text">Five quick questions. About thirty seconds.</p>
              </div>
            )}

            {started && !done && step && (
              <div>
                {/* Progress */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs font-medium text-muted-text">
                    <span>Question {stepIndex + 1} of {STEPS.length}</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-soft-gray" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
                    <div className="h-full rounded-full bg-gogo-red transition-all duration-300" style={{ width: `${progress}%` }} />
                  </div>
                </div>

                <h3 className="font-display text-2xl font-bold">{step.question}</h3>
                <p className="mt-1 text-sm text-muted-text">{step.helper}</p>

                <div className="mt-5 grid gap-2">
                  {step.options.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => choose(opt.tags)}
                      className="flex items-center justify-between rounded-card border border-soft-gray bg-paper px-4 py-3 text-left text-sm font-medium transition-colors hover:border-ink hover:bg-ivory"
                    >
                      {opt.label}
                      <ArrowRight className="h-4 w-4 text-muted-text" aria-hidden="true" />
                    </button>
                  ))}
                </div>

                {stepIndex > 0 && (
                  <button
                    onClick={() => setStepIndex(stepIndex - 1)}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted-text hover:text-ink"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
                  </button>
                )}
              </div>
            )}

            {done && (
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-2xl font-bold">Your top matches</h3>
                  <button onClick={reset} className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-text hover:text-ink">
                    <RotateCcw className="h-4 w-4" aria-hidden="true" /> Start over
                  </button>
                </div>
                <p className="mt-1 text-sm text-muted-text">Based on your answers — explore or fine-tune from here.</p>
                <div className="mt-5 grid gap-4">
                  {results.slice(0, 2).map((trip) => (
                    <TripCard key={trip.slug} trip={trip} />
                  ))}
                </div>
                <Link href="/plan-my-trip" className={cn("btn-blue mt-5 w-full")}>
                  Get a tailored plan instead
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
