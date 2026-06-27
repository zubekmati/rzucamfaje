import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt – RzucamFaje.pl",
  description: "Napisz do nas – chętnie odpowiemy na pytania dotyczące portalu RzucamFaje.pl.",
  alternates: { canonical: "/kontakt" },
};

export default function KontaktLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
