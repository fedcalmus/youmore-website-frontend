import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import "@/styles/main.scss";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieBannerData } from "@/components/CookieBannerData";
import { ScrollReveal } from "@/components/ScrollReveal";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "700", "800"],
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
        <CookieBannerData />
        <ScrollReveal />
      </body>
    </html>
  );
}
