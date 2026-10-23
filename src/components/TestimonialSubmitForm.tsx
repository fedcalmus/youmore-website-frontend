"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { submitTestimonial } from "@/lib/testimonialsPage";
import { CheckIcon } from "./icons";

export function TestimonialSubmitForm() {
  const [author, setAuthor] = useState("");
  const [tag, setTag] = useState("");
  const [quote, setQuote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (!author.trim() || !quote.trim()) {
      setError("Nome e testimonianza sono obbligatori.");
      return;
    }

    setSubmitting(true);
    setError(null);

    const result = await submitTestimonial({ author: author.trim(), tag: tag.trim() || undefined, quote: quote.trim() });

    setSubmitting(false);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    setSent(true);
  }

  if (sent) {
    return (
      <div role="status" className="success-panel testimonial-submit__success">
        <span className="okmark success-icon">
          <CheckIcon size={32} />
        </span>
        <h3 className="disp testimonial-submit__success-title">Grazie!</h3>
        <p className="testimonial-submit__success-text">
          La tua testimonianza è in revisione e verrà pubblicata a breve.
        </p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="testimonial-submit__form form-stack">
      <div className="eyebrow">Racconta la tua esperienza</div>
      <h3 className="disp testimonial-submit__title">Sei appena tornato da un progetto?</h3>
      {error && (
        <div role="alert" className="alert alert-error">
          {error}
        </div>
      )}
      <div className="field-grid">
        <label className="lbl">
          Nome *<input className="in" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </label>
        <label className="lbl">
          Progetto
          <input className="in" value={tag} onChange={(e) => setTag(e.target.value)} placeholder="Es. Move On · Spagna" />
        </label>
      </div>
      <label className="lbl">
        La tua testimonianza *<textarea className="in" value={quote} onChange={(e) => setQuote(e.target.value)} required />
      </label>
      <div className="testimonial-submit__actions">
        <span className="testimonial-submit__note">* campo obbligatorio · pubblicata dopo una verifica</span>
        <button type="submit" className="btn btn-sun" disabled={submitting} aria-busy={submitting}>
          {submitting ? "Invio in corso…" : "Invia la tua storia"}
        </button>
      </div>
    </form>
  );
}
