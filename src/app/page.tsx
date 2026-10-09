import Link from "next/link";
import { connection } from "next/server";
import { CountryMap } from "@/components/CountryMap";
import { HomeCarousel } from "@/components/HomeCarousel";
import { StatCounter } from "@/components/StatCounter";
import { ArrowRightIcon } from "@/components/icons";
import { getProjects } from "@/lib/projects";
import { PINS } from "@/lib/map";

export const instant = false;

export default async function Home() {
  await connection();
  const projects = getProjects(false);
  const open = projects.filter((p) => p.state === "open");
  const ended = projects.filter((p) => p.state === "ended");
  const countriesCount = PINS.length;
  const projectsCount = PINS.reduce((a, p) => a + p.n, 0);

  return (
    <>
      <section className="home-hero">
        <div className="home-hero__card">
          <div className="home-hero__inner">
            <div className="home-hero__copy">
              <div className="up home-hero__badge">
                <span className="home-hero__badge-dot" />
                Associazione di promozione sociale · Chiari (BS)
              </div>
              <h1 className="disp up d1 home-hero__title">
                Parti con l&apos;Europa. Torna con qualcosa <span className="home-hero__title-accent">in più.</span>
              </h1>
              <p className="up d2 home-hero__lede">
                Scambi giovanili, corsi di formazione e volontariato in tutta Europa con Erasmus+ e il Corpo europeo di solidarietà.
              </p>
              <div className="up d3 home-hero__actions">
                <Link className="btn btn-sun" href="/projects">
                  Scopri i progetti
                  <ArrowRightIcon />
                </Link>
                <Link className="btn btn-line" href="/register">
                  Crea il tuo profilo
                </Link>
              </div>
              <div className="up d4 home-hero__stats">
                <div>
                  <StatCounter to={countriesCount} />
                  <div className="home-hero__stat-label">paesi raggiunti</div>
                </div>
                <div>
                  <StatCounter to={projectsCount} />
                  <div className="home-hero__stat-label">progetti realizzati</div>
                </div>
                <div>
                  <StatCounter to={open.length} color="var(--sun)" />
                  <div className="home-hero__stat-label">candidature aperte</div>
                </div>
              </div>
            </div>

            <div className="home-hero__map">
              <CountryMap />
              <div className="home-hero__map-hint">
                <span className="home-hero__map-hint-dot" />
                Passa sopra un paese (o toccalo) per vedere quanti progetti abbiamo realizzato
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-steps">
        <div className="rv home-steps__head">
          <div className="eyebrow eyebrow--blue">Come funziona</div>
          <h2 className="disp carousel__title">Dal primo clic alla partenza, in tre passi.</h2>
        </div>
        <div className="home-steps__grid">
          <div className="rv home-step">
            <div className="disp home-step__index">01</div>
            <h3 className="disp home-step__title">Scegli il progetto</h3>
            <p className="home-step__text">Filtra per paese, tipo e periodo. Ogni scheda ti dice date, posti disponibili e scadenza.</p>
          </div>
          <div className="rv home-step">
            <div className="disp home-step__index">02</div>
            <h3 className="disp home-step__title">Candidati online</h3>
            <p className="home-step__text">Compili il modulo direttamente dalla pagina del progetto. Nessuna email, nessun file da scaricare.</p>
          </div>
          <div className="rv home-step home-step--accent">
            <div className="disp home-step__index">03</div>
            <h3 className="disp home-step__title">Parti preparato</h3>
            <p className="home-step__text">Prima della partenza ti accompagniamo con un incontro di preparazione e tutte le informazioni pratiche.</p>
          </div>
        </div>
      </section>

      <HomeCarousel open={open} ended={ended} />

      <section className="home-about">
        <div className="home-about__row">
          <div className="rv home-about__gallery">
            <div className="home-about__tile home-about__tile--group">Foto di gruppo · progetto</div>
            <div className="home-about__gallery-stack">
              <div className="home-about__tile home-about__tile--activity">Foto attività</div>
              <div className="home-about__tile home-about__tile--travel">Foto viaggio</div>
            </div>
          </div>
          <div className="rv home-about__copy">
            <div className="eyebrow eyebrow--blue">Chi siamo</div>
            <h2 className="disp carousel__title carousel__title--flush">Giovani che mandano giovani in Europa.</h2>
            <p className="home-about__text">
              Youmore Morcelli Giovani è un&apos;associazione di promozione sociale di Chiari, legata alla Fondazione Istituto Morcelliano. Coinvolgiamo ragazzi e operatori giovanili in scambi, corsi di
              formazione e volontariato con partner in tutta Europa e nel Mediterraneo.
            </p>
            <div className="home-about__cta">
              <Link className="btn btn-blue" href="/about">
                Chi siamo
                <ArrowRightIcon />
              </Link>
              <Link className="btn btn-soft" href="/board">
                Il board
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="home-testimonials">
        <div className="home-testimonials__inner">
          <div className="rv home-testimonials__head">
            <div>
              <div className="eyebrow eyebrow--blue">Testimonianze</div>
              <h2 className="disp carousel__title">Raccontato da chi è partito</h2>
            </div>
            <Link href="/testimonials" className="home-testimonials__link">
              Tutte le storie <ArrowRightIcon />
            </Link>
          </div>
          <div className="home-testimonials__grid">
            <figure className="rv testimonial-card testimonial-card--dark">
              <QuoteIcon color="var(--sun)" />
              <blockquote className="testimonial-card__quote">
                I had the opportunity to learn how to learn — and how to explore the depth of your personality through others.
              </blockquote>
              <figcaption className="testimonial-card__caption">
                <strong className="testimonial-card__name">Mario</strong> · Lead the way, Bansko (Bulgaria)
              </figcaption>
            </figure>
            <figure className="rv testimonial-card testimonial-card--light">
              <QuoteIcon color="var(--blue)" />
              <blockquote className="testimonial-card__quote">
                In pochi giorni siamo riusciti a creare connessioni molto forti con gli altri partecipanti. Un&apos;esperienza che ci porteremo dentro per molto tempo.
              </blockquote>
              <figcaption className="testimonial-card__caption">
                <strong className="testimonial-card__name">Giulia</strong> · Move On, Coma-ruga (Spagna)
              </figcaption>
            </figure>
            <figure className="rv testimonial-card testimonial-card--light">
              <QuoteIcon color="var(--blue)" />
              <blockquote className="testimonial-card__quote">
                Nella vita bisogna uscire dalla propria comfort zone e buttarsi a capofitto nelle esperienze, perché non si sa mai come ti possono svoltare la vita.
              </blockquote>
              <figcaption className="testimonial-card__caption">
                <strong className="testimonial-card__name">Il gruppo italiano</strong> · Emotion sense (Lituania)
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="home-funders">
        <div className="rv home-funders__row">
          <div className="home-funders__intro">
            <div className="eyebrow eyebrow--blue">Enti finanziatori</div>
            <p className="disp home-funders__intro-text">I nostri progetti sono possibili grazie a</p>
          </div>
          <div className="home-funders__grid">
            {["Logo Erasmus+", "Logo Corpo europeo di solidarietà", "Logo Agenzia Nazionale per i Giovani"].map((label) => (
              <Link key={label} href="/funders" className="home-funders__logo">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-cta">
        <div className="rv home-cta__card">
          <div className="pat pat--cover" style={{ color: "var(--ink)", opacity: 0.07 }} />
          <h2 className="disp home-cta__title">Il prossimo gruppo parte con te?</h2>
          <div className="home-cta__panel">
            <p className="home-cta__text">Crea il tuo profilo una volta sola: candidarti ai prossimi progetti sarà questione di un clic.</p>
            <div className="home-cta__actions">
              <Link className="btn btn-ink" href="/register">
                Registrati
              </Link>
              <Link className="btn btn-ghost-ink" href="/projects">
                Vedi i progetti
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function QuoteIcon({ color }: { color: string }) {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill={color} aria-hidden="true">
      <path d="M4 18v-5c0-4 2-7 6-8l1 2c-2 1-3 2.5-3 5h3v6H4zm9 0v-5c0-4 2-7 6-8l1 2c-2 1-3 2.5-3 5h3v6h-7z" />
    </svg>
  );
}
