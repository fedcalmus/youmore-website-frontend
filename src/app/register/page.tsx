import type { Metadata } from "next";
import { CheckIcon } from "@/components/icons";
import { RegistrationForm } from "@/components/RegistrationForm";

export const metadata: Metadata = {
  title: "Registrati · Youmore",
  description: "Crea il tuo profilo Youmore per candidarti ai progetti.",
};

const BENEFITS = [
  "Ti candidi più in fretta: i tuoi dati sono già compilati.",
  "Vedi lo storico dei progetti a cui hai partecipato.",
  "Ricevi un avviso quando apriamo nuove candidature.",
];

export default function RegistratiPage() {
  return (
    <section className="register-page">
      <div className="register-page__layout">
        <div className="up register-page__pitch">
          <div className="pat pat--cover" style={{ color: "var(--sun)", opacity: 0.06 }} />
          <h1 className="disp register-page__title">Un profilo, tutti i progetti.</h1>
          <ul className="register-page__benefits">
            {BENEFITS.map((text) => (
              <li key={text} className="register-page__benefit">
                <span className="register-page__benefit-icon">
                  <CheckIcon size={14} strokeWidth={3} />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        <div className="up d1 register-page__form-card">
          <RegistrationForm />
        </div>
      </div>
    </section>
  );
}
