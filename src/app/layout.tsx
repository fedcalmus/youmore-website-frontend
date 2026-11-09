import type { Metadata } from "next";
import { Suspense } from "react";
import localFont from "next/font/local";
import "@/styles/main.scss";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieBannerData } from "@/components/CookieBannerData";
import { ScrollReveal } from "@/components/ScrollReveal";

// Self-hosted rather than next/font/google: Turbopack's Google Fonts loader
// fails the Docker build with "next/font/google queries have exactly one
// entry" for these two families — both resolve to a single variable-font
// file for every requested weight, which trips up its per-weight query
// lookup. The files below are that same variable-font woff2 (latin subset),
// downloaded once from fonts.gstatic.com, so no network access is needed
// at build time either.
const figtree = localFont({
  src: "../fonts/figtree-latin-variable.woff2",
  variable: "--font-figtree",
  weight: "400 700",
  display: "swap",
});

const bricolage = localFont({
  src: "../fonts/bricolage-grotesque-latin-variable.woff2",
  variable: "--font-bricolage",
  weight: "500 800",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Youmore · Progetti europei per giovani",
  description:
    "Scambi giovanili, corsi di formazione e volontariato in Europa con Erasmus+ e il Corpo europeo di solidarietà.",
  icons: { icon: "/favicon.svg" },
};

export const viewport = {
  themeColor: "#0B1A3A",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="it" className={`${figtree.variable} ${bricolage.variable}`} suppressHydrationWarning>
      <body>
        <a className="skip" href="#main">
          Vai al contenuto
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Suspense fallback={null}>
          <CookieBannerData />
        </Suspense>
        <ScrollReveal />
      </body>
    </html>
  );
}
