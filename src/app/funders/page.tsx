import type { Metadata } from "next";
import { ArrowRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Enti finanziatori · Youmore",
  description: "Gli enti che finanziano i progetti Youmore: Erasmus+, Corpo europeo di solidarietà, Agenzia Nazionale per i Giovani.",
};

const FUNDERS = [
  {
    logo: "Logo Erasmus+",
    name: "Erasmus+",
    text: "Il programma dell'Unione europea per istruzione, formazione, gioventù e sport. Finanzia i nostri scambi giovanili e corsi di formazione.",
    domain: "erasmus-plus.ec.europa.eu",
    href: "https://erasmus-plus.ec.europa.eu/it",
  },
  {
    logo: "Logo Corpo europeo di solidarietà",
    name: "Corpo europeo di solidarietà",
    text: "Sostiene progetti di volontariato e solidarietà per giovani dai 18 ai 30 anni, in Italia e all'estero.",
    domain: "youth.europa.eu",
    href: "https://youth.europa.eu/solidarity_it",
  },
  {
    logo: "Logo Agenzia Nazionale per i Giovani",
    name: "Agenzia Nazionale per i Giovani",
    text: "L'agenzia italiana che gestisce i fondi Erasmus+ Gioventù e Corpo europeo di solidarietà.",
    domain: "agenziagiovani.it",
    href: "https://www.agenziagiovani.it",
  },
];

export default function EntiFinanziatoriPage() {
  return (
    <>
      <section className="funders-head">
        <div>
          <div className="up eyebrow eyebrow--blue">Enti finanziatori</div>
          <h1 className="disp up d1 funders-head__title">Chi rende possibile ogni partenza.</h1>
        </div>
        <p className="up d2 funders-head__intro">
          I nostri progetti sono finanziati da programmi europei e nazionali per i giovani. Partecipare, per te, è quasi sempre gratuito.
        </p>
      </section>

      <section className="funders-list">
        <div className="funders-list__grid">
          {FUNDERS.map((f) => (
            <a key={f.name} className="fund rv funder-card" href={f.href} target="_blank" rel="noopener noreferrer">
              <div className="funder-card__logo">
                <span className="funder-card__logo-badge">{f.logo}</span>
              </div>
              <div className="funder-card__body">
                <h2 className="disp funder-card__title">{f.name}</h2>
                <p className="funder-card__text">{f.text}</p>
                <div className="funder-card__domain">
                  {f.domain}
                  <span className="icon-circle go">
                    <ArrowRightIcon />
                  </span>
                </div>
              </div>
            </a>
          ))}
          <div className="rv funders-placeholder">
            <span className="disp funders-placeholder__title">[Altro ente finanziatore]</span>
            <span className="funders-placeholder__text">Ogni ente si aggiunge con logo, descrizione breve e link al sito.</span>
          </div>
        </div>
      </section>
    </>
  );
}
