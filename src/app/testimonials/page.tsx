import type { Metadata } from "next";
import Link from "next/link";
import { PlayIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Testimonianze · Youmore",
  description: "Le storie di chi è partito con Youmore.",
};

export default function TestimonianzePage() {
  return (
    <>
      <section className="testimonials-hero">
        <div className="testimonials-hero__card">
          <div className="up eyebrow">Testimonianze</div>
          <blockquote className="disp up d1 testimonials-hero__quote">
            &ldquo;Un&apos;esperienza meditativa, lontano dalla routine. Ho incontrato persone, nuovi specchi in cui guardarmi.&rdquo;
          </blockquote>
          <div className="up d2 testimonials-hero__attribution">
            <span className="disp testimonials-hero__avatar">N</span>
            <span className="testimonials-hero__attribution-text">
              <strong>Natasha, Croazia</strong>
              <span className="testimonials-hero__attribution-sub">Lead the way · Bansko, Bulgaria · tradotto dall&apos;inglese</span>
            </span>
          </div>
        </div>
      </section>

      <section className="testimonials-wall">
        <div className="testimonials-wall__masonry">
          <figure className="q rv quote-card quote-card--light">
            <span className="quote-card__tag quote-card__tag--soft">Move On · Spagna</span>
            <blockquote className="quote-card__quote">
              Spesso non riusciamo ad andare oltre le cose, oltre noi stessi, oltre i giudizi, oltre i nostri limiti, ma se ci si mette in gioco diventa tutto più semplice.
            </blockquote>
            <figcaption className="quote-card__author">Giulia</figcaption>
          </figure>

          <figure className="q rv quote-card quote-card--video">
            <div className="quote-card__video-inner">
              <span className="quote-card__play">
                <PlayIcon size={24} />
              </span>
              <figcaption className="quote-card__video-caption">
                <strong className="quote-card__video-title">Video-testimonianza</strong>
                <span className="quote-card__video-sub">Caricata dall&apos;admin · max 90 secondi</span>
              </figcaption>
            </div>
          </figure>

          <figure className="q rv quote-card quote-card--light">
            <span className="quote-card__tag quote-card__tag--soft">Lead the way · Bulgaria</span>
            <blockquote className="quote-card__quote">
              Guidare è tanto importante quanto seguire. «Se vuoi andare veloce, vai da solo. Se vuoi andare lontano, vai insieme.» Ringrazio Youmore per avermi permesso di vivere quest&apos;esperienza!
            </blockquote>
            <figcaption className="quote-card__author">Andrea</figcaption>
          </figure>

          <figure className="q rv quote-card quote-card--yellow">
            <span className="quote-card__tag quote-card__tag--on-yellow">Lead the way · Bulgaria</span>
            <blockquote className="disp quote-card__quote quote-card__quote--feature">&ldquo;I had the opportunity to learn how to learn.&rdquo;</blockquote>
            <figcaption className="quote-card__author">Mario, Bulgaria</figcaption>
          </figure>

          <figure className="q rv quote-card quote-card--light">
            <span className="quote-card__tag quote-card__tag--soft">Emotion sense · Lituania</span>
            <blockquote className="quote-card__quote">
              Siamo partiti in 7, da ogni parte d&apos;Italia e senza conoscerci prima. Ci siamo sentiti come in una grande famiglia: sembrava che ci conoscessimo tutti da una vita.
            </blockquote>
            <figcaption className="quote-card__author">Il gruppo italiano</figcaption>
          </figure>

          <figure className="q rv quote-card quote-card--dark">
            <span className="quote-card__tag quote-card__tag--on-dark">Move On · Spagna</span>
            <blockquote className="quote-card__quote">Sometimes you only need to Move On.</blockquote>
            <figcaption className="quote-card__author quote-card__author--accent">Giulia</figcaption>
          </figure>
        </div>

        <div className="rv testimonials-cta">
          <span className="disp testimonials-cta__text">Sei appena tornato da un progetto? Raccontacelo.</span>
          <Link className="btn btn-sun" href="/contact">
            Invia la tua storia
          </Link>
        </div>
      </section>
    </>
  );
}
