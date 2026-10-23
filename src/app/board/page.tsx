import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ChevronLeftIcon } from "@/components/icons";
import { BoardGrid } from "@/components/BoardGrid";

export const metadata: Metadata = {
  title: "Il board · Youmore",
  description: "Il board di Youmore: ruoli e contatti delle persone che guidano l'associazione.",
};

export default function BoardPage() {
  return (
    <>
      <section className="board-crumbs">
        <nav aria-label="Percorso" className="up breadcrumb">
          <Link href="/about" className="breadcrumb__link">
            <ChevronLeftIcon size={16} />
            Chi siamo
          </Link>
          <span aria-hidden="true">/</span>
          <span>Il board</span>
        </nav>
        <div className="board-crumbs__head">
          <h1 className="disp up d1 board-crumbs__title">Il board di Youmore.</h1>
          <p className="up d2 board-crumbs__intro">Le persone che guidano l&apos;associazione. Scrivi direttamente a chi segue l&apos;area che ti interessa.</p>
        </div>
      </section>

      <section className="board-list">
        <Suspense fallback={<div className="board-list__grid" aria-busy="true" />}>
          <BoardGrid />
        </Suspense>
        <div className="board-cta">
          <span className="disp board-cta__text">Domande sui progetti? C&apos;è un indirizzo unico.</span>
          <Link className="btn btn-sun" href="/contact">
            Vai ai contatti
          </Link>
        </div>
      </section>
    </>
  );
}
