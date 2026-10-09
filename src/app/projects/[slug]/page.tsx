import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { getProjectBySlug, getProjects, slugify } from "@/lib/projects";
import { ChevronLeftIcon, DocIcon, PlayIcon } from "@/components/icons";
import { ProjectCountdown } from "@/components/ProjectCountdown";
import { ApplicationForm } from "@/components/ApplicationForm";

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: slugify(p.title) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  await connection();
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} · Youmore`,
    description: `${project.type} a ${project.city}, ${project.country}. Candidati online.`,
  };
}

export const instant = false;

export default async function ProgettoPage({ params }: { params: Promise<{ slug: string }> }) {
  await connection();
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <section className="project-detail__crumbs">
        <nav aria-label="Percorso" className="up breadcrumb">
          <Link href="/projects" className="breadcrumb__link">
            <ChevronLeftIcon size={16} />
            Progetti
          </Link>
          <span aria-hidden="true">/</span>
          <span>{project.scopeLabel === "Internazionale" ? "Internazionali" : "Nazionali"}</span>
          <span aria-hidden="true">/</span>
          <span>{project.state === "open" ? "In corso" : "Terminati"}</span>
        </nav>
        <div className="project-detail__head">
          <div className="project-detail__intro">
            <div className="up project-detail__badges">
              <span className="badge-pill badge-pill--outline">
                <span className="status-dot" style={{ background: project.dot }} />
                <span>{project.status}</span>
              </span>
              <span className="badge-pill badge-pill--soft">{project.type}</span>
              <span className="badge-pill badge-pill--soft">Erasmus+</span>
            </div>
            <h1 className="disp up d1 project-detail__title">{project.title}</h1>
            <p className="up d2 project-detail__meta">
              {project.city}, {project.country} · {project.dates}
            </p>
          </div>
          <a className="btn btn-sun up d2" href="#candidatura">
            Candidati ora
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 5v14M6 13l6 6 6-6" />
            </svg>
          </a>
        </div>
      </section>

      <section className="project-detail__media-wrap">
        <div className="up d2 media project-detail__media" style={{ background: project.bg, color: project.fg }}>
          <div className="pat pat--cover" style={{ opacity: 0.14 }} />
          <div className="disp project-detail__media-code" aria-hidden="true">
            {project.cc}
          </div>
          <button type="button" aria-label="Guarda il video del progetto" className="project-detail__play">
            <span className="play project-detail__play-icon">
              <PlayIcon size={24} />
            </span>
            Video di presentazione
          </button>
        </div>
      </section>

      <section className="project-detail__body">
        <div className="project-detail__layout">
          <div className="project-detail__main">
            <div className="rv project-detail__section">
              <h2 className="disp project-detail__section-title">Il progetto</h2>
              <p className="project-detail__section-text">
                [Descrizione del progetto inserita dall&apos;admin: tema, attività principali, perché partecipare. Il testo supporta paragrafi, grassetti, elenchi e link.]
              </p>
              <p className="project-detail__section-text">[Secondo paragrafo: chi sono i partner, quanti partecipanti per paese, lingua di lavoro.]</p>
            </div>

            <div className="rv project-detail__facts">
              {[
                { label: "Chi può partecipare", value: "[18–30 anni]" },
                { label: "Posti per l'Italia", value: "[6 partecipanti]" },
                { label: "Vitto e alloggio", value: "[Coperti]" },
                { label: "Rimborso viaggio", value: "[fino a € ...]" },
              ].map((fact) => (
                <div key={fact.label} className="fact-card">
                  <div className="fact-card__label">{fact.label}</div>
                  <div className="disp fact-card__value">{fact.value}</div>
                </div>
              ))}
            </div>

            <div className="rv project-detail__section">
              <h2 className="disp project-detail__section-title">Foto e video</h2>
              <div className="project-detail__gallery">
                <div className="media gallery-tile gallery-tile--wide">Immagine 1</div>
                <div className="gallery-tile__stack">
                  <div className="media gallery-tile gallery-tile--yellow">Immagine 2</div>
                  <div className="media gallery-tile gallery-tile--pale">
                    Video
                    <span className="gallery-tile__play">
                      <PlayIcon size={14} />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <a className="rv project-detail__infopack" href="#">
              <span className="infopack__icon">
                <DocIcon />
              </span>
              <span className="infopack__text">
                <strong>Infopack del progetto</strong>
                <span className="infopack__sub">PDF · programma, viaggio, cosa portare</span>
              </span>
            </a>
          </div>

          <aside className="project-detail__sidebar">
            <div className="deadline-card">
              {project.deadline ? (
                <>
                  <div className="deadline-card__label">Candidature aperte fino al</div>
                  <div className="disp deadline-card__date">
                    {new Date(`${project.deadline}T00:00:00`).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" })}
                  </div>
                  <ProjectCountdown deadline={project.deadline} />
                  <p className="deadline-card__note">Allo scadere il progetto viene chiuso automaticamente e spostato tra i terminati.</p>
                </>
              ) : (
                <div className="deadline-card__fallback">{project.dl}</div>
              )}
              <a className="btn btn-sun deadline-card__cta" href="#candidatura">
                Compila la candidatura
              </a>
            </div>
            <div className="info-card">
              <div className="info-card__row">
                <span className="info-card__label">Date</span>
                <strong>{project.dates}</strong>
              </div>
              <div className="info-card__row">
                <span className="info-card__label">Luogo</span>
                <strong>
                  {project.city}, {project.country}
                </strong>
              </div>
              <div className="info-card__row">
                <span className="info-card__label">Tipo</span>
                <strong>{project.type}</strong>
              </div>
              <div className="info-card__row">
                <span className="info-card__label">Programma</span>
                <strong>Erasmus+</strong>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <ApplicationForm projectTitle={project.title} projectLocation={`${project.city}, ${project.country}`} />
    </>
  );
}
