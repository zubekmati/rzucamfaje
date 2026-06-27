import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kalkulator petów — ile śmieci produkujesz jako palacz — RzucamFaje.pl",
  description:
    "Sprawdź, ile filtrów papierosowych trafia do środowiska przez rok i całe życie palenia. Waga, liczba petów i rok ich rozkładu.",
  alternates: { canonical: "/kalkulator-petow" },
};

export default function KalkulatorPetowLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
