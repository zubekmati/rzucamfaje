import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ – Najczęstsze pytania o rzucaniu palenia – RzucamFaje.pl",
  description:
    "Odpowiedzi na najczęstsze pytania o rzucaniu palenia – NRT, objawy odstawienne, leki, e-papierosy i więcej.",
  alternates: { canonical: "/faq" },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
