import Link from "next/link";
import { connection } from "next/server";
import { CountryMap } from "@/components/CountryMap";
import { HomeCarousel } from "@/components/HomeCarousel";
import { StatCounter } from "@/components/StatCounter";
import { ArrowRightIcon } from "@/components/icons";
import { getProjects } from "@/lib/projects";
import { computeCountryPins } from "@/lib/map";
import { getHomePageContent } from "@/lib/home";
import type { HomeGalleryImage, HomeTestimonial } from "@/lib/home";
import { getFinancingEntities } from "@/lib/funders";
import { resolveMediaUrl } from "@/lib/api";
import { getLocale } from "@/lib/locale";

export const instant = false;

const FALLBACK_STEPS = [
  { id: 1, title: "Scegli il progetto", text: "Filtra per paese, tipo e periodo. Ogni scheda ti dice date, posti disponibili e scadenza." },
  { id: 2, title: "Candidati online", text: "Compili il modulo direttamente dalla pagina del progetto. Nessuna email, nessun file da scaricare." },
  { id: 3, title: "Parti preparato", text: "Prima della partenza ti accompagniamo con un incontro di preparazione e tutte le informazioni pratiche." },
];

const FALLBACK_HERO_BADGE = "Associazione di promozione sociale · Chiari (BS)";

const FALLBACK_ABOUT_TEASER_TEXT =
  "<p>Youmore Morcelli Giovani è un'associazione di promozione sociale di Chiari, legata alla Fondazione Istituto Morcelliano. Coinvolgiamo ragazzi e operatori giovanili in scambi, corsi di formazione e volontariato con partner in tutta Europa e nel Mediterraneo.</p>";

const FALLBACK_TESTIMONIALS: HomeTestimonial[] = [
  {
    id: 1,
    order: 1,
    quote: "I had the opportunity to learn how to learn — and how to explore the depth of your personality through others.",
    name: "Mario",
    context: "Lead the way, Bansko (Bulgaria)",
    variant: "dark",
  },
  {
    id: 2,
    order: 2,
    quote: "In pochi giorni siamo riusciti a creare connessioni molto forti con gli altri partecipanti. Un'esperienza che ci porteremo dentro per molto tempo.",
    name: "Giulia",
    context: "Move On, Coma-ruga (Spagna)",
    variant: "light",
  },
  {
    id: 3,
    order: 3,
    quote: "Nella vita bisogna uscire dalla propria comfort zone e buttarsi a capofitto nelle esperienze, perché non si sa mai come ti possono svoltare la vita.",
    name: "Il gruppo italiano",
    context: "Emotion sense (Lituania)",
    variant: "light",
  },
];

export default async function Home() {
  await connection();
  const lang = await getLocale();
  const projects = await getProjects(lang);
  const home = await getHomePageContent();
  const funders = await getFinancingEntities();
  const open = projects.filter((p) => p.state === "open");
  const ended = projects.filter((p) => p.state === "ended");
  const pins = computeCountryPins(projects);
  const countriesCount = pins.length;
  const projectsCount = ended.length;

  const steps = home?.steps.length ? home.steps : FALLBACK_STEPS;
  const testimonials = home?.testimonials.length ? home.testimonials : FALLBACK_TESTIMONIALS;

  return (
    <>
      <section className="home-hero">
        <div className="home-hero__card">
          <div className="home-hero__inner">
            <div className="home-hero__copy">
              <div className="up home-hero__badge">
                <span className="home-hero__badge-dot" />
                {home?.heroBadge ?? FALLBACK_HERO_BADGE}
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
                <Link className="btn btn-line" href="/contact">
                  Contattaci
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
              <CountryMap pins={pins} />
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
          <div className="eyebrow eyebrow--blue">{home?.stepsEyebrow ?? "Come funziona"}</div>
          <h2 className="disp carousel__title">{home?.stepsTitle ?? "Dal primo clic alla partenza, in tre passi."}</h2>
        </div>
        <div className="home-steps__grid">
          {steps.map((step, i) => (
            <div key={step.id} className={`rv home-step${i === steps.length - 1 ? " home-step--accent" : ""}`}>
              <div className="disp home-step__index">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="disp home-step__title">{step.title}</h3>
              <p className="home-step__text">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <HomeCarousel open={open} ended={ended} />

      <section className="home-about">
        <div className="home-about__row">
          <div className="rv home-about__gallery">
            <GalleryTile slot="GROUP" variant="group" fallbackLabel="Foto di gruppo · progetto" gallery={home?.gallery ?? []} />
            <div className="home-about__gallery-stack">
              <GalleryTile slot="ACTIVITY" variant="activity" fallbackLabel="Foto attività" gallery={home?.gallery ?? []} />
              <GalleryTile slot="TRAVEL" variant="travel" fallbackLabel="Foto viaggio" gallery={home?.gallery ?? []} />
            </div>
          </div>
          <div className="rv home-about__copy">
            <div className="eyebrow eyebrow--blue">{home?.aboutTeaserEyebrow ?? "Chi siamo"}</div>
            <h2 className="disp carousel__title carousel__title--flush">{home?.aboutTeaserTitle ?? "Giovani che mandano giovani in Europa."}</h2>
            <div className="home-about__text" dangerouslySetInnerHTML={{ __html: home?.aboutTeaserText ?? FALLBACK_ABOUT_TEASER_TEXT }} />
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
              <div className="eyebrow eyebrow--blue">{home?.testimonialsEyebrow ?? "Testimonianze"}</div>
              <h2 className="disp carousel__title">{home?.testimonialsTitle ?? "Raccontato da chi è partito"}</h2>
            </div>
            <Link href="/testimonials" className="home-testimonials__link">
              Tutte le storie <ArrowRightIcon />
            </Link>
          </div>
          <div className="home-testimonials__grid">
            {testimonials.map((t) => (
              <figure key={t.id} className={`rv testimonial-card testimonial-card--${t.variant}`}>
                <QuoteIcon color={t.variant === "dark" ? "var(--sun)" : "var(--blue)"} />
                <blockquote className="testimonial-card__quote">{t.quote}</blockquote>
                <figcaption className="testimonial-card__caption">
                  <strong className="testimonial-card__name">{t.name}</strong> · {t.context}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="home-funders">
        <div className="rv home-funders__row">
          <div className="home-funders__intro">
            <div className="eyebrow eyebrow--blue">{home?.fundersEyebrow ?? "Enti finanziatori"}</div>
            <p className="disp home-funders__intro-text">{home?.fundersIntroText ?? "I nostri progetti sono possibili grazie a"}</p>
          </div>
          <div className="home-funders__grid">
            {funders.slice(0, 4).map((f) => (
              <Link key={f.id} href="/funders" className="home-funders__logo">
                <img src={resolveMediaUrl(f.image)} alt={f.name} />
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
            <p className="home-cta__text">Sfoglia i progetti attivi e candidati online in pochi minuti, direttamente dalla scheda del progetto.</p>
            <div className="home-cta__actions">
              <Link className="btn btn-ink" href="/projects">
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

function GalleryTile({
  slot,
  variant,
  fallbackLabel,
  gallery,
}: {
  slot: HomeGalleryImage["slot"];
  variant: "group" | "activity" | "travel";
  fallbackLabel: string;
  gallery: HomeGalleryImage[];
}) {
  const photo = gallery.find((g) => g.slot === slot);

  if (!photo) {
    return <div className={`home-about__tile home-about__tile--${variant}`}>{fallbackLabel}</div>;
  }

  return (
    <div className={`home-about__tile home-about__tile--${variant} home-about__tile--photo`}>
      <img className="home-about__tile-img" src={resolveMediaUrl(photo.image)} alt={photo.caption ?? fallbackLabel} />
      {photo.caption && <span className="home-about__tile-caption">{photo.caption}</span>}
    </div>
  );
}
