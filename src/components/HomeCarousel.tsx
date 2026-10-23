"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { Project } from "@/lib/projects";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon, GlobeIcon } from "./icons";
import { ProjectCard } from "./ProjectCard";

const EMPTY_COPY = {
  open: {
    title: "Nessuna candidatura aperta in questo momento",
    text: "I prossimi progetti sono in preparazione. Dai un'occhiata ai progetti conclusi o torna a trovarci presto.",
  },
  ended: {
    title: "Nessun progetto concluso ancora",
    text: "I progetti terminati compariranno qui non appena si chiuderanno.",
  },
};

export function HomeCarousel({ open, ended }: { open: Project[]; ended: Project[] }) {
  // Lands on whichever tab actually has projects, so visitors aren't greeted by an empty rail.
  const [tab, setTab] = useState<"open" | "ended">(open.length > 0 ? "open" : "ended");
  const [progress, setProgress] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const list = tab === "open" ? open : ended;

  function scrollTrack(dir: 1 | -1) {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir * Math.max(300, track.clientWidth * 0.8), behavior: "smooth" });
  }

  function onScroll() {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    setProgress((max > 0 ? track.scrollLeft / max : 0) * 72);
  }

  function changeTab(next: "open" | "ended") {
    setTab(next);
    trackRef.current?.scrollTo({ left: 0 });
    setProgress(0);
  }

  return (
    <section className="carousel" aria-labelledby="proj-h">
      <div className="carousel__head">
        <div>
          <div className="eyebrow eyebrow--blue">Progetti</div>
          <h2 id="proj-h" className="disp carousel__title">
            Dove puoi andare adesso
          </h2>
        </div>
        <div className="carousel__controls">
          <div role="tablist" aria-label="Stato dei progetti" className="tablist">
            <button type="button" role="tab" className="tabbtn" aria-selected={tab === "open"} onClick={() => changeTab("open")}>
              In corso · <span>{open.length}</span>
            </button>
            <button type="button" role="tab" className="tabbtn" aria-selected={tab === "ended"} onClick={() => changeTab("ended")}>
              Terminati · <span>{ended.length}</span>
            </button>
          </div>
          <button type="button" className="round" aria-label="Progetti precedenti" onClick={() => scrollTrack(-1)}>
            <ChevronLeftIcon size={20} />
          </button>
          <button type="button" className="round" aria-label="Progetti successivi" onClick={() => scrollTrack(1)}>
            <ChevronRightIcon size={20} />
          </button>
        </div>
      </div>

      <div ref={trackRef} className="scroller carousel__track" onScroll={onScroll}>
        {list.length === 0 && (
          <div className="snap carousel__empty">
            <span className="icon-circle carousel__empty-icon">
              <GlobeIcon size={22} />
            </span>
            <h3 className="disp carousel__empty-title">{EMPTY_COPY[tab].title}</h3>
            <p className="carousel__empty-text">{EMPTY_COPY[tab].text}</p>
          </div>
        )}
        {list.map((p) => (
          <ProjectCard key={p.title} project={p} carousel />
        ))}
        <Link href="/projects" className="card snap carousel__more">
          <span className="disp carousel__more-title">Vedi tutti i progetti</span>
          <span className="carousel__more-cta">
            Nazionali e internazionali
            <span className="carousel__more-arrow">
              <ArrowRightIcon />
            </span>
          </span>
        </Link>
      </div>
      <div className="carousel__progress">
        <div className="carousel__progress-track" aria-hidden="true">
          <div className="carousel__progress-fill" style={{ "--carousel-progress": `${progress}%` } as React.CSSProperties} />
        </div>
      </div>
    </section>
  );
}
