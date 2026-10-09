import type { Metadata } from "next";
import { LogoMark, Wordmark } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Logo · Youmore",
  description: "Il nuovo logo Youmore: simbolo, varianti, colori e caratteri.",
};

const COLORS = [
  { name: "Blu Europa", hex: "#1F3FD8", bg: "#1F3FD8", fg: "#fff" },
  { name: "Notte", hex: "#0B1A3A", bg: "#0B1A3A", fg: "#fff" },
  { name: "Stella", hex: "#FFC83D", bg: "#FFC83D", fg: "#0B1A3A" },
  { name: "Nebbia", hex: "#F5F6FA", bg: "#F5F6FA", fg: "#0B1A3A", border: true },
];

export default function LogoPage() {
  return (
    <>
      <section className="logo-page__head">
        <div>
          <div className="eyebrow eyebrow--blue">Identità visiva</div>
          <h1 className="disp logo-page__title">Il logo Youmore</h1>
        </div>
        <div className="logo-page__actions">
          <a className="btn btn-ink" href="/logo/youmore-simbolo.svg" download>
            Scarica simbolo (SVG)
          </a>
          <a className="btn btn-soft" href="/logo/youmore-logo.svg" download>
            Scarica logo (SVG)
          </a>
        </div>
      </section>

      <section className="logo-sheet-wrap">
        <div className="logo-sheet">
          <div className="logo-sheet__grid">
            <div className="logo-tile logo-tile--primary">
              <span className="logo-tile__label">Logo principale</span>
              <div className="logo-tile__content">
                <LogoMark size={132} />
                <Wordmark fontSize={112} />
              </div>
              <span className="logo-tile__caption">Una Y con le braccia alzate: una persona che parte e dice sì. La testa gialla richiama le stelle europee.</span>
            </div>

            <div className="logo-stack">
              <div className="logo-tile logo-tile--dark">
                <span className="logo-tile__label logo-tile__label--sm logo-tile__label--on-dark">Su fondo scuro</span>
                <div className="logo-tile__content logo-tile__content--tight">
                  <LogoMark size={72} />
                  <Wordmark fontSize={60} inkColor="var(--white)" starColor="var(--sun)" />
                </div>
              </div>
              <div className="logo-pair">
                <div className="logo-tile logo-tile--yellow">
                  <span className="logo-tile__label logo-tile__label--sm logo-tile__label--on-yellow">Simbolo</span>
                  <svg width="104" height="104" viewBox="0 0 64 64" aria-hidden="true">
                    <rect width="64" height="64" rx="16" fill="#0B1A3A" />
                    <path d="M17 21 L32 37 L47 21 M32 37 V52" fill="none" stroke="#FFFFFF" strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="32" cy="16" r="6" fill="#FFC83D" />
                  </svg>
                </div>
                <div className="logo-tile logo-tile--blue">
                  <span className="logo-tile__label logo-tile__label--sm logo-tile__label--on-blue">Monocromo</span>
                  <svg width="104" height="104" viewBox="0 0 64 64" aria-hidden="true">
                    <path d="M17 21 L32 37 L47 21 M32 37 V52" fill="none" stroke="#FFFFFF" strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="32" cy="16" r="6" fill="#FFFFFF" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="logo-panel logo-panel--spaced">
              <span className="logo-panel__label">Favicon e social</span>
              <div className="logo-panel__icons">
                <LogoMark size={96} />
                <svg width="48" height="48" viewBox="0 0 64 64" aria-hidden="true">
                  <rect width="64" height="64" rx="16" fill="#1F3FD8" />
                  <path d="M17 21 L32 37 L47 21 M32 37 V52" fill="none" stroke="#FFFFFF" strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="32" cy="16" r="6.5" fill="#FFC83D" />
                </svg>
                <svg width="32" height="32" viewBox="0 0 64 64" aria-hidden="true">
                  <rect width="64" height="64" rx="16" fill="#1F3FD8" />
                  <path d="M17 21 L32 37 L47 21 M32 37 V52" fill="none" stroke="#FFFFFF" strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="32" cy="15" r="7" fill="#FFC83D" />
                </svg>
                <svg width="16" height="16" viewBox="0 0 64 64" aria-hidden="true">
                  <rect width="64" height="64" rx="16" fill="#1F3FD8" />
                  <path d="M17 21 L32 37 L47 21 M32 37 V52" fill="none" stroke="#FFFFFF" strokeWidth={11} strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="32" cy="14" r="8" fill="#FFC83D" />
                </svg>
                <svg width="96" height="96" viewBox="0 0 64 64" aria-hidden="true">
                  <circle cx="32" cy="32" r="32" fill="#1F3FD8" />
                  <path d="M19 23 L32 37 L45 23 M32 37 V50" fill="none" stroke="#FFFFFF" strokeWidth={7.5} strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="32" cy="18" r="5.5" fill="#FFC83D" />
                </svg>
              </div>
              <span className="logo-panel__note">96 · 48 · 32 · 16 px, tratto più spesso alle misure piccole · avatar tondo per i social</span>
            </div>

            <div className="logo-panel">
              <span className="logo-panel__label">Colori</span>
              <div className="logo-swatches">
                {COLORS.map((c) => (
                  <div key={c.name} className="logo-swatch" style={{ background: c.bg, color: c.fg, border: c.border ? "1px solid var(--line)" : undefined }}>
                    <strong>{c.name}</strong>
                    <span className="logo-swatch__hex">{c.hex}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="logo-panel">
              <span className="logo-panel__label">Caratteri</span>
              <div className="disp logo-panel__sample">Aa Bricolage</div>
              <span className="logo-panel__caption">Bricolage Grotesque · titoli e logotipo</span>
              <div className="logo-panel__sample--sans">Aa Figtree</div>
              <span className="logo-panel__caption">Figtree · testi, moduli, interfaccia</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
