import type { Metadata } from "next";
import { connection } from "next/server";
import { getTestimonialsPageContent } from "@/lib/testimonialsPage";
import type { TestimonialCard, TestimonialsPageContent } from "@/lib/testimonialsPage";
import { TestimonialSubmitForm } from "@/components/TestimonialSubmitForm";
import { TestimonialQuoteCard } from "@/components/TestimonialQuoteCard";

export const metadata: Metadata = {
  title: "Testimonianze · Youmore",
  description: "Le storie di chi è partito con Youmore.",
};

export const instant = false;

const FALLBACK_HERO = {
  eyebrow: "Testimonianze",
  quote: "Un'esperienza meditativa, lontano dalla routine. Ho incontrato persone, nuovi specchi in cui guardarmi.",
  name: "Natasha",
  country: "Croazia",
  context: "Lead the way · Bansko, Bulgaria · tradotto dall'inglese",
};

const FALLBACK_CTA_TEXT = "Sei appena tornato da un progetto? Raccontacelo.";

const FALLBACK_CARDS: TestimonialCard[] = [
  {
    id: 1,
    order: 1,
    variant: "LIGHT",
    tag: "Move On · Spagna",
    quote: "Spesso non riusciamo ad andare oltre le cose, oltre noi stessi, oltre i giudizi, oltre i nostri limiti, ma se ci si mette in gioco diventa tutto più semplice.",
    author: "Giulia",
    videoUrl: null,
  },
  {
    id: 2,
    order: 2,
    variant: "VIDEO",
    tag: null,
    quote: null,
    author: "",
    videoUrl: null,
  },
  {
    id: 3,
    order: 3,
    variant: "LIGHT",
    tag: "Lead the way · Bulgaria",
    quote: "Guidare è tanto importante quanto seguire. «Se vuoi andare veloce, vai da solo. Se vuoi andare lontano, vai insieme.» Ringrazio Youmore per avermi permesso di vivere quest'esperienza!",
    author: "Andrea",
    videoUrl: null,
  },
  {
    id: 4,
    order: 4,
    variant: "YELLOW",
    tag: "Lead the way · Bulgaria",
    quote: "I had the opportunity to learn how to learn.",
    author: "Mario, Bulgaria",
    videoUrl: null,
  },
  {
    id: 5,
    order: 5,
    variant: "LIGHT",
    tag: "Emotion sense · Lituania",
    quote: "Siamo partiti in 7, da ogni parte d'Italia e senza conoscerci prima. Ci siamo sentiti come in una grande famiglia: sembrava che ci conoscessimo tutti da una vita.",
    author: "Il gruppo italiano",
    videoUrl: null,
  },
  {
    id: 6,
    order: 6,
    variant: "DARK",
    tag: "Move On · Spagna",
    quote: "Sometimes you only need to Move On.",
    author: "Giulia",
    videoUrl: null,
  },
];

export default async function TestimonianzePage() {
  await connection();
  const content: TestimonialsPageContent | null = await getTestimonialsPageContent();

  const eyebrow = content?.heroEyebrow ?? FALLBACK_HERO.eyebrow;
  const quote = content?.heroQuote ?? FALLBACK_HERO.quote;
  const name = content?.heroName ?? FALLBACK_HERO.name;
  const country = content?.heroCountry ?? FALLBACK_HERO.country;
  const context = content?.heroContext ?? FALLBACK_HERO.context;
  const ctaText = content?.ctaText ?? FALLBACK_CTA_TEXT;
  const cards = content?.cards ?? FALLBACK_CARDS;
  const avatarLetter = name.charAt(0).toUpperCase();

  return (
    <>
      <section className="testimonials-hero">
        <div className="testimonials-hero__card">
          <div className="up eyebrow">{eyebrow}</div>
          <blockquote className="disp up d1 testimonials-hero__quote">
            &ldquo;{quote}&rdquo;
          </blockquote>
          <div className="up d2 testimonials-hero__attribution">
            <span className="disp testimonials-hero__avatar">{avatarLetter}</span>
            <span className="testimonials-hero__attribution-text">
              <strong>
                {name}, {country}
              </strong>
              <span className="testimonials-hero__attribution-sub">{context}</span>
            </span>
          </div>
        </div>
      </section>

      <section className="testimonials-wall">
        <div className="testimonials-wall__masonry">
          {cards.map((card) => (
            <TestimonialQuoteCard key={card.id} card={card} />
          ))}
        </div>

        <div className="rv testimonials-cta">
          <span className="disp testimonials-cta__text">{ctaText}</span>
          <a className="btn btn-sun" href="#racconta">
            Invia la tua storia
          </a>
        </div>
      </section>

      <section id="racconta" className="section testimonial-submit scroll-anchor">
        <div className="testimonial-submit__card">
          <TestimonialSubmitForm />
        </div>
      </section>
    </>
  );
}
