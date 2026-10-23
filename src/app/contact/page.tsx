import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactCards } from "@/components/ContactCards";

export const metadata: Metadata = {
  title: "Contatti · Youmore",
  description: "Scrivi a Youmore: email, Instagram, Facebook, LinkedIn.",
};

export default function ContattiPage() {
  return (
    <section className="contact-head">
      <div className="up eyebrow eyebrow--blue">Contatti</div>
      <h1 className="disp up d1 contact-head__title">Scrivici. Ti rispondiamo noi.</h1>
      <Suspense fallback={<div className="contact-grid" aria-busy="true" />}>
        <ContactCards />
      </Suspense>
    </section>
  );
}
