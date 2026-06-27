import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkulator zdrowia – ile zyskałeś od rzucenia palenia – RzucamFaje.pl",
  description:
    "Oblicz ile czasu, pieniędzy i zdrowia zyskałeś odkąd rzuciłeś palenie. Podaj datę i liczbę papierosów dziennie.",
  alternates: { canonical: "/kalkulator-zdrowia" },
};

export default function KalkulatorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
