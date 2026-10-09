"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { Project } from "@/lib/projects";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "./icons";
import { ProjectCard } from "./ProjectCard";

export function HomeCarousel({ open, ended }: { open: Project[]; ended: Project[] }) {
  const [tab, setTab] = useState<"open" | "ended">("open");
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
        {list.map((p) => (
          <ProjectCard key={p.title} project={p} carousel />
        ))}
        <Link href="/projects" className="card snap carousel__more">
          <span className="disp carousel__more-title">Vedi tutti i progetti</span>
          <span className="carousel__more-cta">
            Nazionali e internazionali <ArrowRightIcon />
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
