import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { getProjectBySlug, getProjects } from "@/lib/projects";
import { getLocale } from "@/lib/locale";
import { ChevronLeftIcon, DocIcon } from "@/components/icons";
import { ProjectCountdown } from "@/components/ProjectCountdown";
import { ApplicationForm } from "@/components/ApplicationForm";
import { TestimonialQuoteCard } from "@/components/TestimonialQuoteCard";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  await connection();
  const { slug } = await params;
  const lang = await getLocale();
  const project = await getProjectBySlug(slug, lang);
  if (!project) return {};
  return {
    title: `${project.title} · Youmore`,
    description: project.shortDescription,
  };
}

export const instant = false;

export default async function ProgettoPage({ params }: { params: Promise<{ slug: string }> }) {
  await connection();
  const { slug } = await params;
  const lang = await getLocale();
  const project = await getProjectBySlug(slug, lang);
  if (!project) notFound();

  const startsInFuture = project.startDate ? new Date(project.startDate) > new Date() : false;

  const facts = [
    project.whoCanJoin ? { label: "Chi può partecipare", value: project.whoCanJoin } : null,
    project.location ? { label: "Luogo", value: project.location } : null,
    project.dates ? { label: "Date", value: project.dates } : null,
    project.type ? { label: "Tipo", value: project.type } : null,
  ].filter((fact): fact is { label: string; value: string } => fact !== null);

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
              {project.type && <span className="badge-pill badge-pill--soft">{project.type}</span>}
            </div>
            <h1 className="disp up d1 project-detail__title">{project.title}</h1>
            <p className="up d2 project-detail__meta">{[project.location, project.dates].filter(Boolean).join(" · ")}</p>
          </div>
          {project.state === "open" && (
            <a className="btn btn-sun up d2" href="#candidatura">
              Candidati ora
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 5v14M6 13l6 6 6-6" />
              </svg>
            </a>
          )}
        </div>
      </section>

      <section className="project-detail__media-wrap">
        <div className="project-detail__media">
          <img className="project-detail__media-img" src={project.mainImage} alt={project.title} />
        </div>
      </section>

      <section className="project-detail__body">
        <div className="project-detail__layout">
          <div className="project-detail__main">
            <div className="rv project-detail__section">
              <h2 className="disp project-detail__section-title">Il progetto</h2>
              <div className="project-detail__section-text" dangerouslySetInnerHTML={{ __html: project.description }} />
            </div>

            {facts.length > 0 && (
              <div className="rv project-detail__facts">
                {facts.map((fact) => (
                  <div key={fact.label} className="fact-card">
                    <div className="fact-card__label">{fact.label}</div>
                    <div className="disp fact-card__value">{fact.value}</div>
                  </div>
                ))}
              </div>
            )}

            {project.images.length > 0 && (
              <div className="rv project-detail__section">
                <h2 className="disp project-detail__section-title">Foto</h2>
                <div className="project-detail__gallery">
                  {project.images.map((img, i) => (
                    <div key={img.id} className={`gallery-tile gallery-tile--photo ${i === 0 && project.images.length > 1 ? "gallery-tile--wide" : ""}`}>
                      <img className="gallery-tile__img" src={img.image} alt={img.caption ?? project.title} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.testimonials.length > 0 && (
              <div className="rv project-detail__section">
                <h2 className="disp project-detail__section-title">Testimonianze</h2>
                <div className="testimonials-wall__masonry project-detail__testimonials">
                  {project.testimonials.map((card) => (
                    <TestimonialQuoteCard key={card.id} card={card} />
                  ))}
                </div>
              </div>
            )}

            {project.documentUrl && (
              <a className="rv project-detail__infopack" href={project.documentUrl} target="_blank" rel="noreferrer">
                <span className="infopack__icon">
                  <DocIcon />
                </span>
                <span className="infopack__text">
                  <strong>Infopack del progetto</strong>
                  <span className="infopack__sub">PDF · programma, viaggio, cosa portare</span>
                </span>
              </a>
            )}
          </div>

          <aside className="project-detail__sidebar">
            <div className="deadline-card">
              {project.state === "open" && startsInFuture && project.startDate ? (
                <>
                  <div className="deadline-card__label">Il progetto inizia tra</div>
                  <ProjectCountdown deadline={project.startDate.slice(0, 10)} />
                  <p className="deadline-card__note">Candidati prima dell&apos;inizio del progetto.</p>
                </>
              ) : (
                <div className="deadline-card__fallback">{project.state === "open" ? "Candidature aperte" : "Progetto concluso"}</div>
              )}
              {project.state === "open" && (
                <a className="btn btn-sun deadline-card__cta" href="#candidatura">
                  Compila la candidatura
                </a>
              )}
            </div>
            <div className="info-card">
              {project.dates && (
                <div className="info-card__row">
                  <span className="info-card__label">Date</span>
                  <strong>{project.dates}</strong>
                </div>
              )}
              {project.location && (
                <div className="info-card__row">
                  <span className="info-card__label">Luogo</span>
                  <strong>{project.location}</strong>
                </div>
              )}
              {project.type && (
                <div className="info-card__row">
                  <span className="info-card__label">Tipo</span>
                  <strong>{project.type}</strong>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>

      {project.state === "open" ? (
        <ApplicationForm slug={project.slug} projectTitle={project.title} projectLocation={project.location ?? ""} />
      ) : (
        <section id="candidatura" className="section scroll-anchor">
          <div className="application-form__card">
            <div className="application-form__success success-panel">
              <div className="eyebrow eyebrow--blue">Candidatura</div>
              <h2 className="disp application-form__success-title">Candidature chiuse</h2>
              <p className="application-form__success-text">Questo progetto si è già concluso e non accetta più candidature.</p>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
