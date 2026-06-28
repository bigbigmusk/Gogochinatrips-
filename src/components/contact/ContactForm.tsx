"use client";

import { useState } from "react";
import { Check, ShieldCheck } from "lucide-react";

/** Simple contact form with client-side validation and a confirmation state. */
export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const set = (patch: Partial<typeof form>) => setForm((f) => ({ ...f, ...patch }));

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!form.name.trim()) er.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) er.email = "Please enter a valid email.";
    if (!form.message.trim()) er.message = "Please add a message.";
    setErrors(er);
    if (Object.keys(er).length === 0) setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-card border border-soft-gray bg-paper p-8 text-center shadow-card">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-jade/15 text-jade">
          <Check className="h-6 w-6" aria-hidden="true" />
        </span>
        <h2 className="mt-4 font-display text-xl font-bold">Message sent</h2>
        <p className="mt-2 text-muted-text">Thanks — we&apos;ll reply within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-card border border-soft-gray bg-paper p-6 shadow-card md:p-8">
      <div className="flex flex-col gap-5">
        <div>
          <label htmlFor="c-name" className="block text-sm font-semibold">Name</label>
          <input id="c-name" type="text" value={form.name} onChange={(e) => set({ name: e.target.value })} aria-invalid={!!errors.name} aria-describedby={errors.name ? "c-err-name" : undefined} className="mt-2 w-full rounded-card border border-soft-gray bg-white px-4 py-2.5 text-sm focus:border-ink focus:outline-none" />
          {errors.name && <p id="c-err-name" className="mt-1.5 text-sm text-gogo-red">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="c-email" className="block text-sm font-semibold">Email</label>
          <input id="c-email" type="email" value={form.email} onChange={(e) => set({ email: e.target.value })} aria-invalid={!!errors.email} aria-describedby={errors.email ? "c-err-email" : undefined} className="mt-2 w-full rounded-card border border-soft-gray bg-white px-4 py-2.5 text-sm focus:border-ink focus:outline-none" />
          {errors.email && <p id="c-err-email" className="mt-1.5 text-sm text-gogo-red">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="c-message" className="block text-sm font-semibold">How can we help?</label>
          <textarea id="c-message" rows={5} value={form.message} onChange={(e) => set({ message: e.target.value })} aria-invalid={!!errors.message} aria-describedby={errors.message ? "c-err-message" : undefined} className="mt-2 w-full rounded-card border border-soft-gray bg-white px-4 py-2.5 text-sm focus:border-ink focus:outline-none" />
          {errors.message && <p id="c-err-message" className="mt-1.5 text-sm text-gogo-red">{errors.message}</p>}
        </div>
        <p className="flex items-start gap-2 text-xs text-muted-text">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-jade" aria-hidden="true" />
          We only use your details to reply to your enquiry.
        </p>
        <button type="submit" className="btn-primary w-full">Send message</button>
      </div>
    </form>
  );
}
