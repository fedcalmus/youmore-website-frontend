import Link from "next/link";
import type { Project } from "@/lib/projects";
import { ArrowRightIcon, CalendarIcon, PinIcon } from "./icons";

export function ProjectCard({ project, carousel = false, delay = 0 }: { project: Project; carousel?: boolean; delay?: number }) {
  const eyebrow = carousel ? `${project.type} · ${project.scopeLabel}` : project.type;
  const Heading = carousel ? "h3" : "h2";

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`card project-card ${carousel ? "snap project-card--carousel" : "anim"}`}
      style={carousel ? undefined : { animationDelay: `${delay}s` }}
    >
      <div className="project-card__media" style={{ aspectRatio: `16/${carousel ? 11 : 10}` }}>
        <img className="project-card__media-img" src={project.mainImage} alt={project.title} />
        <span className="project-card__status">
          <span className="status-dot" style={{ background: project.dot }} />
          {project.status}
        </span>
      </div>
      <div className="project-card__body">
        <div className="project-card__eyebrow">{eyebrow}</div>
        <Heading className="disp project-card__title">{project.title}</Heading>
        <div className="project-card__meta">
          {project.location && (
            <span className="project-card__meta-row">
              <PinIcon />
              {project.location}
            </span>
          )}
          {project.dates && (
            <span className="project-card__meta-row">
              <CalendarIcon />
              {project.dates}
            </span>
          )}
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
