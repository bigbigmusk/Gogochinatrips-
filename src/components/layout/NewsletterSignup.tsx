"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

/**
 * Newsletter signup. Prototype-only: validates the email client-side and shows
 * a confirmation state. Wire the submit handler to a real ESP before launch.
 */
export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    setDone(true);
  }

  if (done) {
    return (
      <p className="inline-flex items-center gap-2 text-sm text-jade">
        <Check className="h-4 w-4" aria-hidden="true" />
        Thanks — check your inbox to confirm.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full max-w-sm" noValidate>
      <label htmlFor="newsletter-email" className="mb-2 block text-sm font-medium text-ink">
        Get China travel ideas in your inbox
      </label>
      <div className="flex items-center gap-2 rounded-pill border border-soft-gray bg-white px-2 py-1.5 focus-within:border-ink">
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full bg-transparent px-3 py-1.5 text-sm text-ink placeholder:text-muted-text focus:outline-none"
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? "newsletter-error" : undefined}
        />
        <button type="submit" className="btn-primary shrink-0 px-4 py-2" aria-label="Subscribe">
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      {error && (
        <p id="newsletter-error" className="mt-2 text-sm text-gogo-red">
          {error}
        </p>
      )}
    </form>
  );
}
