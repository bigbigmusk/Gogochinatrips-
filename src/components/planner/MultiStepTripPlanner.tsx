"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, ShieldCheck, Clock } from "lucide-react";
import { getAllDestinations } from "@/content/destinations";
import { cn } from "@/lib/utils";

/**
 * Multi-step trip-planning inquiry form.
 *
 * State is held in a single `form` object so it is trivially serializable —
 * a save-progress / resume layer (localStorage or a backend draft) can be added
 * without restructuring. No account is required. Client-side validation links
 * error messages to their fields via aria-describedby.
 */

interface PlannerForm {
  destinations: string[];
  startDate: string;
  flexible: boolean;
  days: string;
  adults: number;
  children: number;
  childrenAges: string;
  budget: string;
  tripType: string;
  accommodation: string;
  interests: string[];
  accessibility: string;
  dietary: string;
  name: string;
  email: string;
  whatsapp: string;
  country: string;
  contactMethod: string;
  notes: string;
}

const INITIAL: PlannerForm = {
  destinations: [],
  startDate: "",
  flexible: false,
  days: "",
  adults: 2,
  children: 0,
  childrenAges: "",
  budget: "",
  tripType: "",
  accommodation: "",
  interests: [],
  accessibility: "",
  dietary: "",
  name: "",
  email: "",
  whatsapp: "",
  country: "",
  contactMethod: "Email",
  notes: "",
};

const STEP_TITLES = [
  "Where to?",
  "When & how long?",
  "Who's traveling?",
  "What do you enjoy?",
  "Budget & style",
  "Your details",
];

const BUDGETS = ["Under $1,500", "$1,500–3,000", "$3,000–5,000", "$5,000+", "Not sure yet"];
const TRIP_TYPES = ["Small group", "Private", "Either"];
const ACCOMMODATION = ["Comfortable", "Boutique", "Luxury", "Mix it up"];
const INTERESTS = ["Food & nightlife", "History & culture", "Mountains & nature", "Big cities", "Off the beaten path", "Family-friendly", "Photography", "Slow travel"];
const CONTACT_METHODS = ["Email", "WhatsApp", "Either"];

function toggle<T>(arr: T[], v: T): T[] {
  return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
}

export function MultiStepTripPlanner({ presetTrip }: { presetTrip?: string }) {
  const destinations = getAllDestinations();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<PlannerForm>(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const set = (patch: Partial<PlannerForm>) => setForm((f) => ({ ...f, ...patch }));
  const progress = Math.round(((step + 1) / STEP_TITLES.length) * 100);

  function validateStep(): boolean {
    const e: Record<string, string> = {};
    if (step === 5) {
      if (!form.name.trim()) e.name = "Please enter your name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Please enter a valid email.";
      if (!form.country.trim()) e.country = "Please tell us your country.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (!validateStep()) return;
    if (step < STEP_TITLES.length - 1) setStep(step + 1);
    else setSubmitted(true);
  }
  function back() {
    setErrors({});
    if (step > 0) setStep(step - 1);
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl rounded-card border border-soft-gray bg-paper p-8 text-center shadow-card">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-jade/15 text-jade">
          <Check className="h-7 w-7" aria-hidden="true" />
        </span>
        <h2 className="mt-5 font-display text-2xl font-bold">Thanks, {form.name || "traveler"}!</h2>
        <p className="mt-3 text-muted-text">
          Your trip request is in. A China trip designer will reach out by{" "}
          <span className="font-medium text-ink">{form.contactMethod.toLowerCase()}</span> with ideas and a quote.
        </p>
        <p className="mt-4 inline-flex items-center gap-2 rounded-pill bg-ivory px-4 py-2 text-sm text-ink">
          <Clock className="h-4 w-4 text-gogo-red" aria-hidden="true" /> Expect a reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm font-medium">
          <span className="text-ink">{STEP_TITLES[step]}</span>
          <span className="text-muted-text">Step {step + 1} of {STEP_TITLES.length}</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-soft-gray" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Form progress">
          <div className="h-full rounded-full bg-gogo-red transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="rounded-card border border-soft-gray bg-paper p-6 shadow-card md:p-8">
        {presetTrip && step === 0 && (
          <p className="mb-5 rounded-card bg-ivory px-4 py-3 text-sm">
            Planning around <span className="font-semibold">{presetTrip}</span> — add anything else below.
          </p>
        )}

        {/* Step 1 — destinations */}
        {step === 0 && (
          <fieldset>
            <legend className="text-lg font-semibold">Where do you want to go?</legend>
            <p className="mt-1 text-sm text-muted-text">Pick as many as you like, or leave it to us.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {destinations.map((d) => (
                <button
                  key={d.slug}
                  type="button"
                  onClick={() => set({ destinations: toggle(form.destinations, d.name) })}
                  aria-pressed={form.destinations.includes(d.name)}
                  className={cn(
                    "rounded-pill border px-4 py-2 text-sm transition-colors",
                    form.destinations.includes(d.name) ? "border-ink bg-ink text-paper" : "border-soft-gray hover:border-ink",
                  )}
                >
                  {d.name}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {/* Step 2 — dates */}
        {step === 1 && (
          <div className="flex flex-col gap-5">
            <div>
              <label htmlFor="startDate" className="block text-sm font-semibold">Approximate start date</label>
              <input id="startDate" type="date" value={form.startDate} onChange={(e) => set({ startDate: e.target.value })} className="mt-2 w-full rounded-card border border-soft-gray bg-white px-4 py-2.5 text-sm focus:border-ink focus:outline-none" />
            </div>
            <label className="flex items-center gap-2.5 text-sm">
              <input type="checkbox" checked={form.flexible} onChange={(e) => set({ flexible: e.target.checked })} className="h-4 w-4 accent-gogo-red" />
              My dates are flexible
            </label>
            <div>
              <label htmlFor="days" className="block text-sm font-semibold">How many days?</label>
              <input id="days" type="number" min={1} placeholder="e.g. 10" value={form.days} onChange={(e) => set({ days: e.target.value })} className="mt-2 w-full rounded-card border border-soft-gray bg-white px-4 py-2.5 text-sm focus:border-ink focus:outline-none" />
            </div>
          </div>
        )}

        {/* Step 3 — travelers */}
        {step === 2 && (
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="adults" className="block text-sm font-semibold">Adults</label>
                <input id="adults" type="number" min={1} value={form.adults} onChange={(e) => set({ adults: Number(e.target.value) })} className="mt-2 w-full rounded-card border border-soft-gray bg-white px-4 py-2.5 text-sm focus:border-ink focus:outline-none" />
              </div>
              <div>
                <label htmlFor="children" className="block text-sm font-semibold">Children</label>
                <input id="children" type="number" min={0} value={form.children} onChange={(e) => set({ children: Number(e.target.value) })} className="mt-2 w-full rounded-card border border-soft-gray bg-white px-4 py-2.5 text-sm focus:border-ink focus:outline-none" />
              </div>
            </div>
            {form.children > 0 && (
              <div>
                <label htmlFor="childrenAges" className="block text-sm font-semibold">Children&apos;s ages</label>
                <input id="childrenAges" type="text" placeholder="e.g. 6 and 9" value={form.childrenAges} onChange={(e) => set({ childrenAges: e.target.value })} className="mt-2 w-full rounded-card border border-soft-gray bg-white px-4 py-2.5 text-sm focus:border-ink focus:outline-none" />
              </div>
            )}
          </div>
        )}

        {/* Step 4 — interests */}
        {step === 3 && (
          <div className="flex flex-col gap-5">
            <fieldset>
              <legend className="text-sm font-semibold">What do you enjoy?</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {INTERESTS.map((i) => (
                  <button key={i} type="button" onClick={() => set({ interests: toggle(form.interests, i) })} aria-pressed={form.interests.includes(i)} className={cn("rounded-pill border px-4 py-2 text-sm transition-colors", form.interests.includes(i) ? "border-ink bg-ink text-paper" : "border-soft-gray hover:border-ink")}>
                    {i}
                  </button>
                ))}
              </div>
            </fieldset>
            <div>
              <label htmlFor="dietary" className="block text-sm font-semibold">Dietary needs (optional)</label>
              <input id="dietary" type="text" placeholder="e.g. vegetarian, allergies" value={form.dietary} onChange={(e) => set({ dietary: e.target.value })} className="mt-2 w-full rounded-card border border-soft-gray bg-white px-4 py-2.5 text-sm focus:border-ink focus:outline-none" />
            </div>
            <div>
              <label htmlFor="accessibility" className="block text-sm font-semibold">Accessibility needs (optional)</label>
              <input id="accessibility" type="text" placeholder="Anything we should plan for" value={form.accessibility} onChange={(e) => set({ accessibility: e.target.value })} className="mt-2 w-full rounded-card border border-soft-gray bg-white px-4 py-2.5 text-sm focus:border-ink focus:outline-none" />
            </div>
          </div>
        )}

        {/* Step 5 — budget & style */}
        {step === 4 && (
          <div className="flex flex-col gap-5">
            <fieldset>
              <legend className="text-sm font-semibold">Estimated budget per person</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {BUDGETS.map((b) => (
                  <button key={b} type="button" onClick={() => set({ budget: b })} aria-pressed={form.budget === b} className={cn("rounded-pill border px-4 py-2 text-sm transition-colors", form.budget === b ? "border-ink bg-ink text-paper" : "border-soft-gray hover:border-ink")}>
                    {b}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-sm font-semibold">Private or small group?</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {TRIP_TYPES.map((t) => (
                  <button key={t} type="button" onClick={() => set({ tripType: t })} aria-pressed={form.tripType === t} className={cn("rounded-pill border px-4 py-2 text-sm transition-colors", form.tripType === t ? "border-ink bg-ink text-paper" : "border-soft-gray hover:border-ink")}>
                    {t}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-sm font-semibold">Accommodation level</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {ACCOMMODATION.map((a) => (
                  <button key={a} type="button" onClick={() => set({ accommodation: a })} aria-pressed={form.accommodation === a} className={cn("rounded-pill border px-4 py-2 text-sm transition-colors", form.accommodation === a ? "border-ink bg-ink text-paper" : "border-soft-gray hover:border-ink")}>
                    {a}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
        )}

        {/* Step 6 — contact */}
        {step === 5 && (
          <div className="flex flex-col gap-5">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold">Name</label>
              <input id="name" type="text" value={form.name} onChange={(e) => set({ name: e.target.value })} aria-invalid={!!errors.name} aria-describedby={errors.name ? "err-name" : undefined} className="mt-2 w-full rounded-card border border-soft-gray bg-white px-4 py-2.5 text-sm focus:border-ink focus:outline-none" />
              {errors.name && <p id="err-name" className="mt-1.5 text-sm text-gogo-red">{errors.name}</p>}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold">Email</label>
                <input id="email" type="email" value={form.email} onChange={(e) => set({ email: e.target.value })} aria-invalid={!!errors.email} aria-describedby={errors.email ? "err-email" : undefined} className="mt-2 w-full rounded-card border border-soft-gray bg-white px-4 py-2.5 text-sm focus:border-ink focus:outline-none" />
                {errors.email && <p id="err-email" className="mt-1.5 text-sm text-gogo-red">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="whatsapp" className="block text-sm font-semibold">WhatsApp (optional)</label>
                <input id="whatsapp" type="tel" value={form.whatsapp} onChange={(e) => set({ whatsapp: e.target.value })} className="mt-2 w-full rounded-card border border-soft-gray bg-white px-4 py-2.5 text-sm focus:border-ink focus:outline-none" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="country" className="block text-sm font-semibold">Country</label>
                <input id="country" type="text" value={form.country} onChange={(e) => set({ country: e.target.value })} aria-invalid={!!errors.country} aria-describedby={errors.country ? "err-country" : undefined} className="mt-2 w-full rounded-card border border-soft-gray bg-white px-4 py-2.5 text-sm focus:border-ink focus:outline-none" />
                {errors.country && <p id="err-country" className="mt-1.5 text-sm text-gogo-red">{errors.country}</p>}
              </div>
              <div>
                <label htmlFor="contactMethod" className="block text-sm font-semibold">Preferred contact</label>
                <select id="contactMethod" value={form.contactMethod} onChange={(e) => set({ contactMethod: e.target.value })} className="mt-2 w-full rounded-card border border-soft-gray bg-white px-4 py-2.5 text-sm focus:border-ink focus:outline-none">
                  {CONTACT_METHODS.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="notes" className="block text-sm font-semibold">Anything else? (optional)</label>
              <textarea id="notes" rows={3} value={form.notes} onChange={(e) => set({ notes: e.target.value })} className="mt-2 w-full rounded-card border border-soft-gray bg-white px-4 py-2.5 text-sm focus:border-ink focus:outline-none" />
            </div>
            <p className="flex items-start gap-2 text-xs text-muted-text">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-jade" aria-hidden="true" />
              We only use your details to plan your trip. No spam, no sharing, no account needed.
            </p>
          </div>
        )}

        {/* Nav */}
        <div className="mt-8 flex items-center justify-between">
          <button type="button" onClick={back} disabled={step === 0} className={cn("inline-flex items-center gap-1.5 text-sm font-medium", step === 0 ? "invisible" : "text-muted-text hover:text-ink")}>
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back
          </button>
          <button type="button" onClick={next} className="btn-primary group">
            {step === STEP_TITLES.length - 1 ? "Send my request" : "Continue"}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
