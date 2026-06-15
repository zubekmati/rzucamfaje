"use client";

import { useState } from "react";
import Header from "@/components/Header";
import SkipLink from "@/components/SkipLink";
import Footer from "@/components/Footer";

type FormState = "idle" | "success" | "error";

export default function KontaktPage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(data: FormData) {
    const errs: Record<string, string> = {};
    if (!String(data.get("name") ?? "").trim()) errs.name = "Podaj imię lub pseudonim.";
    const email = String(data.get("email") ?? "").trim();
    if (!email) errs.email = "Podaj adres e-mail.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Podaj prawidłowy adres e-mail.";
    if (!String(data.get("message") ?? "").trim()) errs.message = "Wpisz treść wiadomości.";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const errs = validate(data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});

    const subject = encodeURIComponent(`[RzucamFaje.pl] Wiadomość od ${data.get("name")}`);
    const body = encodeURIComponent(
      `Imię: ${data.get("name")}\nE-mail: ${data.get("email")}\nTemat: ${data.get("subject") || "(brak)"}\n\n${data.get("message")}`
    );
    const anchor = document.createElement("a");
    anchor.href = `mailto:kontakt@rzucamfaje.pl?subject=${subject}&body=${body}`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    setFormState("success");
  }

  return (
    <>
      <SkipLink />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 bg-gray-50 dark:bg-gray-950 outline-none">

        {/* Page header */}
        <section
          aria-labelledby="page-heading"
          className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
            <p aria-hidden="true" className="text-sm font-semibold text-green-700 dark:text-green-400 uppercase tracking-wider mb-2">
              Napisz do nas
            </p>
            <h1
              id="page-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
            >
              Kontakt
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
              Masz pytanie, chcesz podzielić się swoją historią albo zgłosić błąd?
              Czytamy każdą wiadomość.
            </p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Contact info */}
            <aside aria-label="Informacje kontaktowe" className="space-y-5">
              {[
                {
                  emoji: "✉️",
                  label: "E-mail",
                  value: "kontakt@rzucamfaje.pl",
                  href: "mailto:kontakt@rzucamfaje.pl",
                },
                {
                  emoji: "⏱️",
                  label: "Czas odpowiedzi",
                  value: "Do 48 godzin roboczych",
                  href: null,
                },
                {
                  emoji: "🌿",
                  label: "Wsparcie",
                  value: "Poniedziałek – Piątek",
                  href: null,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 shadow-sm"
                >
                  <div aria-hidden="true" className="text-2xl mb-2">{item.emoji}</div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm font-medium text-green-700 dark:text-green-400 hover:underline"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{item.value}</p>
                  )}
                </div>
              ))}

              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-5">
                <p className="text-sm text-green-800 dark:text-green-300 leading-relaxed">
                  <strong>Pamiętaj:</strong> Serwis ma charakter informacyjny i nie udziela porad medycznych.
                  W sprawach zdrowotnych skontaktuj się z lekarzem.
                </p>
              </div>
            </aside>

            {/* Form */}
            <div className="lg:col-span-2">
              {formState === "success" ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-10 shadow-sm text-center"
                >
                  <p aria-hidden="true" className="text-5xl mb-4">✅</p>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    Wiadomość wysłana!
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Twój klient poczty powinien się otworzyć. Odpiszemy w ciągu 48 godzin roboczych.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormState("idle")}
                    className="px-5 py-2.5 rounded-xl bg-green-700 text-white font-semibold hover:bg-green-800 transition-colors"
                  >
                    Wyślij kolejną wiadomość
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  aria-label="Formularz kontaktowy"
                  className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Imię lub pseudonim <span aria-hidden="true" className="text-red-500">*</span>
                        <span className="sr-only">(wymagane)</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="given-name"
                        aria-required="true"
                        aria-describedby={errors.name ? "error-name" : undefined}
                        aria-invalid={!!errors.name}
                        className={`w-full px-3 py-2.5 rounded-xl border text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition-colors ${
                          errors.name ? "border-red-400 dark:border-red-500" : "border-gray-200 dark:border-gray-700"
                        }`}
                        placeholder="np. Tomek"
                      />
                      {errors.name && (
                        <p id="error-name" role="alert" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        Adres e-mail <span aria-hidden="true" className="text-red-500">*</span>
                        <span className="sr-only">(wymagane)</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        aria-required="true"
                        aria-describedby={errors.email ? "error-email" : undefined}
                        aria-invalid={!!errors.email}
                        className={`w-full px-3 py-2.5 rounded-xl border text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition-colors ${
                          errors.email ? "border-red-400 dark:border-red-500" : "border-gray-200 dark:border-gray-700"
                        }`}
                        placeholder="ty@przyklad.pl"
                      />
                      {errors.email && (
                        <p id="error-email" role="alert" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Temat <span className="text-gray-400 dark:text-gray-500 font-normal">(opcjonalnie)</span>
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition-colors"
                      placeholder="np. Pytanie o NRT"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                      Wiadomość <span aria-hidden="true" className="text-red-500">*</span>
                      <span className="sr-only">(wymagana)</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={6}
                      aria-required="true"
                      aria-describedby={errors.message ? "error-message" : undefined}
                      aria-invalid={!!errors.message}
                      className={`w-full px-3 py-2.5 rounded-xl border text-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-transparent transition-colors resize-y ${
                        errors.message ? "border-red-400 dark:border-red-500" : "border-gray-200 dark:border-gray-700"
                      }`}
                      placeholder="Napisz, z czym możemy Ci pomóc…"
                    />
                    {errors.message && (
                      <p id="error-message" role="alert" className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {formState === "error" && (
                    <p role="alert" className="text-sm text-red-600 dark:text-red-400">
                      Coś poszło nie tak. Spróbuj napisać bezpośrednio na kontakt@rzucamfaje.pl.
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 rounded-xl bg-green-700 dark:bg-green-600 text-white font-semibold hover:bg-green-800 dark:hover:bg-green-700 transition-colors"
                  >
                    Wyślij wiadomość
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
