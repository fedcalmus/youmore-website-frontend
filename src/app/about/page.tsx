import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";
import { AboutHero } from "@/components/AboutHero";
import { AboutGallery } from "@/components/AboutGallery";
import { AboutGoals } from "@/components/AboutGoals";
import { AboutLongDescription } from "@/components/AboutLongDescription";
import { BoardPreview } from "@/components/BoardPreview";
import { NetworkPartners } from "@/components/NetworkPartners";

export const metadata: Metadata = {
  title: "Chi siamo · Youmore",
  description: "Youmore Morcelli Giovani APS: chi siamo, cosa ci muove, il board e la nostra rete europea.",
};

export default function ChiSiamoPage() {
  return (
    <>
      <section className="about-hero">
        <div className="up eyebrow eyebrow--blue">Chi siamo</div>
        <Suspense fallback={<div className="about-hero__row" aria-busy="true" />}>
          <AboutHero />
        </Suspense>
      </section>

      <section className="about-gallery">
        <Suspense fallback={<div className="about-gallery__grid" aria-busy="true" />}>
          <AboutGallery />
        </Suspense>
      </section>

      <section className="about-goals">
        <div className="rv about-goals__row">
          <div className="about-goals__intro">
            <div className="eyebrow eyebrow--blue">Cosa ci muove</div>
            <h2 className="disp carousel__title">Quattro obiettivi, ogni progetto.</h2>
          </div>
          <Suspense fallback={<div className="about-goals__list" aria-busy="true" />}>
            <AboutGoals />
          </Suspense>
        </div>
      </section>

      <Suspense>
        <AboutLongDescription />
      </Suspense>

      <section className="about-partners">
        <div className="about-partners__inner">
          <div className="rv about-partners__head">
            <div className="eyebrow">La nostra rete</div>
            <h2 className="disp carousel__title about-partners__heading">Persone e organizzazioni che rendono possibile ogni progetto.</h2>
            <p className="about-partners__text">
              Dalle agenzie Eurodesk alle ONG partner in tutta Europa: ecco chi lavora con noi per far partire ogni scambio e corso di
              formazione.
            </p>
          </div>
          <Suspense fallback={<div className="about-partners__grid" aria-busy="true" />}>
            <NetworkPartners />
          </Suspense>
        </div>
      </section>

      <section className="about-board">
        <div className="rv about-board__head">
          <div>
            <div className="eyebrow eyebrow--blue">Il board</div>
            <h2 className="disp carousel__title">Le persone dietro Youmore</h2>
          </div>
          <Link className="btn btn-ink" href="/board">
            Ruoli e contatti del board
            <ArrowRightIcon />
          </Link>
        </div>
        <Suspense fallback={<div className="about-board__grid" aria-busy="true" />}>
          <BoardPreview />
        </Suspense>
      </section>

      <section className="about-closing">
        <h2 className="disp rv about-closing__title">Vuoi partire con noi o diventare partner?</h2>
        <div className="rv about-closing__actions">
          <Link className="btn btn-sun" href="/projects">
            Vedi i progetti
          </Link>
          <Link className="btn btn-ink" href="/contact">
            Scrivici
          </Link>
        </div>
      </section>
    </>
  );
}
