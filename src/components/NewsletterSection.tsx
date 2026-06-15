"use client";

import { useState, useId } from "react";
import Link from "next/link";

function validateEmail(value: string): string {
  if (!value.trim()) return "Adres e-mail jest wymagany.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
    return "Podaj poprawny adres e-mail, np. jan@przykład.pl.";
  }
  return "";
}

export default function NewsletterSection() {
  const emailId = useId();
  const errorId = useId();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const err = validateEmail(email);
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setSubmitted(true);
    setEmail("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="bg-green-50 dark:bg-green-950/30 border-y border-green-100 dark:border-green-900/50"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
        <p aria-hidden="true" className="text-2xl mb-3">📬</p>
        <h2
          id="newsletter-heading"
          className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-3"
        >
          Wsparcie co tydzień na Twój e-mail
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-8 max-w-md mx-auto">
          Subskrybuj newsletter i otrzymuj porady, motywację oraz historię
          sukcesu raz w tygodniu – bezpłatnie.
        </p>

        {/* Success message — announced via aria-live */}
        <div aria-live="polite" aria-atomic="true">
          {submitted && (
            <div
              role="status"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300 font-medium"
            >
              <svg aria-hidden="true" className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Dziękujemy! Sprawdź swoją skrzynkę pocztową i potwierdź subskrypcję.
            </div>
          )}
        </div>

        {!submitted && (
          <form
            onSubmit={handleSubmit}
            noValidate
            aria-label="Formularz zapisu na newsletter"
          >
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-1 text-left">
                {/* Visible label — required for WCAG 1.3.1 & 4.1.2 */}
                <label
                  htmlFor={emailId}
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Adres e-mail
                  <span aria-hidden="true" className="text-red-600 dark:text-red-400 ml-0.5">*</span>
                </label>
                <input
                  id={emailId}
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="jan@przykład.pl"
                  autoComplete="email"
                  required
                  aria-required="true"
                  aria-invalid={error ? "true" : "false"}
                  aria-describedby={error ? errorId : undefined}
                  className={[
                    "w-full px-4 py-2.5 rounded-lg border text-gray-900 dark:text-white",
                    "bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500",
                    "focus:outline-none focus:ring-2 focus:border-transparent transition-colors",
                    error
                      ? "border-red-500 dark:border-red-400 focus:ring-red-500"
                      : "border-gray-300 dark:border-gray-600 focus:ring-green-700",
                  ].join(" ")}
                />
                {/* Error message — role="alert" triggers immediate SR announcement */}
                {error && (
                  <p
                    id={errorId}
                    role="alert"
                    className="mt-1.5 text-sm text-red-700 dark:text-red-400 flex items-start gap-1"
                  >
                    <svg aria-hidden="true" className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    </svg>
                    {error}
                  </p>
                )}
              </div>

              <div className="sm:self-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-green-700 dark:bg-green-600 text-white font-semibold hover:bg-green-800 dark:hover:bg-green-700 transition-colors whitespace-nowrap"
                >
                  Zapisz się
                </button>
              </div>
            </div>

            <p className="mt-4 text-xs text-gray-600 dark:text-gray-400">
              Twój adres e-mail jest bezpieczny. Możesz wypisać się w każdej chwili.
              Przeczytaj naszą{" "}
              <Link
                href="/polityka-prywatnosci"
                className="underline hover:text-green-700 dark:hover:text-green-400"
              >
                politykę prywatności
              </Link>
              .
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
