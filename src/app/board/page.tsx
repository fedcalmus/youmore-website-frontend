import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeftIcon, MailIcon, PhoneIcon } from "@/components/icons";
import { CopyButton } from "@/components/CopyButton";

export const metadata: Metadata = {
  title: "Il board · Youmore",
  description: "Il board di Youmore: Sona, Seda, Paola, Elisa Faglia. Ruoli e contatti.",
};

const MEMBERS = [
  { initials: "S", name: "Sona", surname: "[Cognome]", role: "[Presidente]", bg: "#1F3FD8", fg: "#FFFFFF", email: "[sona@email]", delay: 0.15 },
  { initials: "S", name: "Seda", surname: "[Cognome]", role: "[Vicepresidente]", bg: "#FFC83D", fg: "#0B1A3A", email: "[seda@email]", delay: 0.25 },
  { initials: "P", name: "Paola", surname: "[Cognome]", role: "[Coordinatrice progetti]", bg: "#0B1A3A", fg: "#FFC83D", email: "[paola@email]", delay: 0.35 },
  { initials: "EF", name: "Elisa", surname: "Faglia", surnameColor: "#1F3FD8", role: "[Ruolo]", bg: "#DCE3FF", fg: "#1F3FD8", email: "[elisa@email]", delay: 0.45 },
];

const PHONE = "[+39 000 000 0000]";

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
        <div className="board-list__grid">
          {MEMBERS.map((m) => (
            <article key={m.email} className="mcard board-card" style={{ animationDelay: `${m.delay}s` }}>
              <div className="board-card__photo" style={{ background: m.bg, color: m.fg }}>
                {/* Sostituire con: <img className="photo" src={`/team/${m.name.toLowerCase()}.jpg`} alt={`${m.name} ${m.surname}`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} /> */}
                <div className="photo board-card__photo-inner">
                  <div className="pat pat--cover" style={{ opacity: 0.16 }} />
                  <span className="disp board-card__initials" aria-hidden="true">
                    {m.initials}
                  </span>
                </div>
              </div>
              <div className="board-card__body">
                <div>
                  <span className="board-card__role">{m.role}</span>
                  <h2 className="disp board-card__name">
                    {m.name} <span style={{ color: m.surnameColor ?? "var(--muted-faint)" }}>{m.surname}</span>
                  </h2>
                </div>
                <div className="board-card__contacts">
                  <div className="row">
                    <MailIcon size={18} className="board-card__icon" />
                    <a href={`mailto:${m.email}`} aria-label={`Scrivi a ${m.name} ${m.surname}`}>
                      {m.email}
                    </a>
                    <CopyButton text={m.email} label={`Copia l'email di ${m.name} ${m.surname}`} />
                  </div>
                  <div className="row">
                    <PhoneIcon size={18} className="board-card__icon" />
                    <a href="tel:+390000000000" aria-label={`Chiama ${m.name} ${m.surname}`}>
                      {PHONE}
                    </a>
                    <CopyButton text={PHONE} label={`Copia il telefono di ${m.name} ${m.surname}`} />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
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
