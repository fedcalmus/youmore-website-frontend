import { API_URL } from "./api";

export interface TestimonialCard {
  id: number;
  order: number;
  variant: "LIGHT" | "YELLOW" | "DARK" | "VIDEO";
  tag: string | null;
  quote: string | null;
  author: string;
  videoUrl: string | null;
}

export interface TestimonialsPageContent {
  heroEyebrow: string;
  heroQuote: string;
  heroName: string;
  heroCountry: string;
  heroContext: string;
  ctaText: string;
  updatedAt: string;
  cards: TestimonialCard[];
}

export async function getTestimonialsPageContent(): Promise<TestimonialsPageContent | null> {
  try {
    const res = await fetch(`${API_URL}/api/testimonials-page`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return (await res.json()) as TestimonialsPageContent;
  } catch (error) {
    console.error("Failed to load testimonials page content from backend", error);
    return null;
  }
}

export type SubmitTestimonialResult = { ok: true } | { ok: false; message: string };

export async function submitTestimonial(input: { author: string; tag?: string; quote: string }): Promise<SubmitTestimonialResult> {
  try {
    const res = await fetch(`${API_URL}/api/testimonials-page/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    const body = await res.json().catch(() => null);

    if (!res.ok) {
      return { ok: false, message: body?.message ?? "Invio non riuscito. Riprova più tardi." };
    }

    return { ok: true };
  } catch (error) {
    console.error("Failed to submit testimonial to backend", error);
    return { ok: false, message: "Impossibile contattare il server. Controlla la connessione e riprova." };
  }
}
