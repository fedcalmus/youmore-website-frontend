import type { Metadata } from "next";
import { Suspense } from "react";
import { FundersGrid } from "@/components/FundersGrid";

export const metadata: Metadata = {
  title: "Enti finanziatori · Youmore",
  description: "Gli enti che finanziano i progetti Youmore.",
};

export default function EntiFinanziatoriPage() {
  return (
    <>
      <section className="funders-head">
        <div>
          <div className="up eyebrow eyebrow--blue">Enti finanziatori</div>
          <h1 className="disp up d1 funders-head__title">Chi rende possibile ogni partenza.</h1>
        </div>
        <p className="up d2 funders-head__intro">
          I nostri progetti sono finanziati da programmi europei e nazionali per i giovani. Partecipare, per te, è quasi sempre gratuito.
        </p>
      </section>

      <section className="funders-list">
        <Suspense fallback={<div className="funders-list__grid" aria-busy="true" />}>
          <FundersGrid />
        </Suspense>
      </section>
    </>
  );
}
