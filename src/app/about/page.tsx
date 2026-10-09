import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Chi siamo · Youmore",
  description: "Youmore Morcelli Giovani APS: chi siamo, cosa ci muove, il board e la nostra rete europea.",
};

const GOALS = [
  { n: "01", title: "Cittadinanza attiva", text: "Volontariato e solidarietà come primo passo per partecipare alla vita delle comunità locali." },
  { n: "02", title: "Educazione non formale", text: "Teatro, natura, lavoro di gruppo: si impara facendo, insieme a coetanei di altri paesi." },
  { n: "03", title: "Inclusione", text: "Raggiungere chi ha meno opportunità: aree rurali, giovani migranti, minoranze." },
  { n: "04", title: "Partenariati forti", text: "Una rete di ONG partner in Europa e nel Mediterraneo con cui costruiamo nuovi progetti." },
];

const BOARD_PREVIEW = [
  { initials: "S", name: "Sona", bg: "#1F3FD8", fg: "#fff", opacity: 0.15 },
  { initials: "S", name: "Seda", bg: "#FFC83D", fg: "#0B1A3A", opacity: 0.12 },
  { initials: "P", name: "Paola", bg: "#0B1A3A", fg: "#FFC83D", opacity: 0.15 },
  { initials: "EF", name: "Elisa Faglia", bg: "#DCE3FF", fg: "#1F3FD8", opacity: 0.2 },
];

const NETWORK_COUNTRIES = [
  "Armenia", "Bulgaria", "Cipro", "Egitto", "Francia", "Georgia", "Grecia", "Lettonia",
  "Lituania", "Macedonia del Nord", "Portogallo", "Romania", "Slovenia", "Spagna", "Turchia",
];

export default function ChiSiamoPage() {
  return (
    <>
      <section className="about-hero">
        <div className="up eyebrow eyebrow--blue">Chi siamo</div>
        <h1 className="disp up d1 about-hero__title">
          Più Europa, per <span className="about-hero__title-accent">più giovani.</span>
        </h1>
        <div className="up d2 about-hero__row">
          <p className="about-hero__lede">
            Youmore Morcelli Giovani è un&apos;associazione di promozione sociale con sede a Chiari (BS), legata alla Fondazione Istituto Morcelliano. Dal [anno di fondazione] apriamo ai ragazzi le porte
            dei programmi europei: scambi giovanili, corsi di formazione per operatori e progetti di volontariato e solidarietà.
          </p>
          <div className="about-hero__card">
            <span className="about-hero__card-label">Sede</span>
            <strong className="about-hero__card-value">Chiari, Brescia</strong>
            <span className="about-hero__card-label about-hero__card-label--spaced">Forma giuridica</span>
            <strong className="about-hero__card-value">APS · Associazione di promozione sociale</strong>
          </div>
        </div>
      </section>

      <section className="about-gallery">
        <div className="rv about-gallery__grid">
          <div className="about-gallery__tile about-gallery__tile--a">Foto · gruppo in partenza</div>
          <div className="about-gallery__tile about-gallery__tile--b">Foto · attività di gruppo</div>
          <div className="about-gallery__tile about-gallery__tile--c">Foto · serata interculturale</div>
          <div className="about-gallery__tile about-gallery__tile--d">Foto · training course</div>
        </div>
      </section>

      <section className="about-goals">
        <div className="rv about-goals__row">
          <div className="about-goals__intro">
            <div className="eyebrow eyebrow--blue">Cosa ci muove</div>
            <h2 className="disp carousel__title">Quattro obiettivi, ogni progetto.</h2>
          </div>
          <div className="about-goals__list">
            {GOALS.map((g) => (
              <div key={g.n} className="about-goal">
                <div className="disp about-goal__index">{g.n}</div>
                <h3 className="disp about-goal__title">{g.title}</h3>
                <p className="about-goal__text">{g.text}</p>
              </div>
            ))}
          </div>
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
        <div className="about-board__grid">
          {BOARD_PREVIEW.map((m) => (
            <article key={m.name} className="member rv about-board__card">
              <div className="ph about-board__photo" style={{ background: m.bg, color: m.fg }}>
                <div className="pat pat--cover" style={{ opacity: m.opacity }} />
                <span className="disp about-board__initials" aria-hidden="true">
                  {m.initials}
                </span>
              </div>
              <div>
                <h3 className="disp about-board__name">{m.name}</h3>
                <span className="about-board__role">[Ruolo nel board]</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="about-network">
        <div className="about-network__inner">
          <div className="rv about-network__intro">
            <div className="eyebrow">La rete</div>
            <h2 className="disp about-network__title">Lavoriamo con partner in tutta Europa e oltre.</h2>
            <p className="about-network__text">Alcuni dei paesi coinvolti nei nostri ultimi progetti.</p>
          </div>
          <div className="rv about-network__chips">
            {NETWORK_COUNTRIES.map((c) => (
              <span key={c} className="about-network__chip">
                {c}
              </span>
            ))}
            <span className="about-network__chip about-network__chip--home">Italia · sede</span>
          </div>
        </div>
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
