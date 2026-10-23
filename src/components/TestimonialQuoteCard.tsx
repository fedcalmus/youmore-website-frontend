import { PlayIcon } from "@/components/icons";
import { resolveMediaUrl } from "@/lib/api";
import type { TestimonialCard } from "@/lib/testimonialsPage";

/** Renders one testimonial card per its variant — shared by the Testimonials wall and the project detail page. */
export function TestimonialQuoteCard({ card }: { card: TestimonialCard }) {
  if (card.variant === "VIDEO") {
    if (card.videoUrl) {
      return (
        <figure className="q rv quote-card quote-card--video">
          {/* eslint-disable-next-line jsx-a11y/media-has-caption -- user-provided testimonial clip, no captions authored by admin */}
          <video controls className="quote-card__video-el" src={resolveMediaUrl(card.videoUrl)} />
          {card.author && <figcaption className="quote-card__video-el-caption">{card.author}</figcaption>}
        </figure>
      );
    }

    return (
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
    );
  }

  if (card.variant === "YELLOW") {
    return (
      <figure className="q rv quote-card quote-card--yellow">
        {card.tag && <span className="quote-card__tag quote-card__tag--on-yellow">{card.tag}</span>}
        <blockquote className="disp quote-card__quote quote-card__quote--feature">
          &ldquo;{card.quote}&rdquo;
        </blockquote>
        <figcaption className="quote-card__author">{card.author}</figcaption>
      </figure>
    );
  }

  if (card.variant === "DARK") {
    return (
      <figure className="q rv quote-card quote-card--dark">
        {card.tag && <span className="quote-card__tag quote-card__tag--on-dark">{card.tag}</span>}
        <blockquote className="quote-card__quote">{card.quote}</blockquote>
        <figcaption className="quote-card__author quote-card__author--accent">{card.author}</figcaption>
      </figure>
    );
  }

  return (
    <figure className="q rv quote-card quote-card--light">
      {card.tag && <span className="quote-card__tag quote-card__tag--soft">{card.tag}</span>}
      <blockquote className="quote-card__quote">{card.quote}</blockquote>
      <figcaption className="quote-card__author">{card.author}</figcaption>
    </figure>
  );
}
