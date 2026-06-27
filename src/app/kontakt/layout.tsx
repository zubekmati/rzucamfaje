import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt – RzucamFaje.pl",
  description: "Napisz do mnie – chętnie odpowiem na pytania dotyczące portalu RzucamFaje.pl.",
  alternates: { canonical: "/kontakt" },
};

export default function KontaktLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
