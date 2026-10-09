import Link from "next/link";
import type { Project } from "@/lib/projects";
import { slugify } from "@/lib/projects";
import { ArrowRightIcon, CalendarIcon, PinIcon } from "./icons";

export function ProjectCard({ project, carousel = false, delay = 0 }: { project: Project; carousel?: boolean; delay?: number }) {
  const eyebrow = carousel ? `${project.type} · ${project.scopeLabel}` : project.type;
  const Heading = carousel ? "h3" : "h2";

  return (
    <Link
      href={`/projects/${slugify(project.title)}`}
      className={`card project-card ${carousel ? "snap project-card--carousel" : "anim"}`}
      style={carousel ? undefined : { animationDelay: `${delay}s` }}
    >
      <div
        className="project-card__media"
        style={{ aspectRatio: `16/${carousel ? 11 : 10}`, background: project.bg, color: project.fg }}
      >
        <div className="pat pat--cover" style={{ opacity: 0.18 }} />
        <div className="disp project-card__media-code" aria-hidden="true">
          {project.cc}
        </div>
        <span className="project-card__status">
          <span className="status-dot" style={{ background: project.dot }} />
          {project.status}
        </span>
      </div>
      <div className="project-card__body">
        <div className="project-card__eyebrow">{eyebrow}</div>
        <Heading className="disp project-card__title">{project.title}</Heading>
        <div className="project-card__meta">
          <span className="project-card__meta-row">
            <PinIcon />
            {project.city}, {project.country}
          </span>
          <span className="project-card__meta-row">
            <CalendarIcon />
            {project.dates}
          </span>
        </div>
        <div className="project-card__footer">
          <span className="project-card__deadline" style={{ color: project.dlColor }}>
            {project.dl}
          </span>
          <span className="icon-circle arrow">
            <ArrowRightIcon />
          </span>
        </div>
      </div>
    </Link>
  );
}
