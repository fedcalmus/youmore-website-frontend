import type { Metadata } from "next";
import { ArrowRightIcon, FacebookIcon, InstagramIcon, LinkedinIcon, MailIcon } from "@/components/icons";
import { SITE, SOCIAL_LINKS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contatti · Youmore",
  description: "Scrivi a Youmore: email, Instagram, Facebook, LinkedIn.",
};

const CARDS = [
  {
    key: "email",
    href: `mailto:${SITE.email}`,
    bg: "#1F3FD8",
    color: "#fff",
    labelColor: "#C9D3F5",
    goBg: "#FFC83D",
    goColor: "#0B1A3A",
    icon: MailIcon,
    label: "Email",
    value: SITE.email,
    full: true,
  },
  {
    key: "instagram",
    href: SOCIAL_LINKS[0].href,
    bg: "#fff",
    color: "#0B1A3A",
    border: true,
    labelColor: "#4A5571",
    goBg: "#EEF1FA",
    goColor: undefined,
    icon: InstagramIcon,
    label: "Instagram",
    value: "[@account]",
  },
  {
    key: "facebook",
    href: SOCIAL_LINKS[1].href,
    bg: "#fff",
    color: "#0B1A3A",
    border: true,
    labelColor: "#4A5571",
    goBg: "#EEF1FA",
    goColor: undefined,
    icon: FacebookIcon,
    label: "Facebook",
    value: "[pagina]",
  },
  {
    key: "linkedin",
    href: SOCIAL_LINKS[2].href,
    bg: "#0B1A3A",
    color: "#fff",
    labelColor: "#A9B6E0",
    goBg: "#FFC83D",
    goColor: "#0B1A3A",
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: "[pagina]",
  },
] as const;

export default function ContattiPage() {
  return (
    <section className="contact-head">
      <div className="up eyebrow eyebrow--blue">Contatti</div>
      <h1 className="disp up d1 contact-head__title">Scrivici. Ti rispondiamo noi.</h1>
      <div className="contact-grid">
        {CARDS.map((card, i) => {
          const Icon = card.icon;
          return (
            <a
              key={card.key}
              className={`ct up d${i + 1} contact-card`}
              href={card.href}
              target={card.key === "email" ? undefined : "_blank"}
              rel={card.key === "email" ? undefined : "noopener noreferrer"}
              style={{
                gridColumn: "full" in card && card.full ? "1 / -1" : undefined,
                background: card.bg,
                border: "border" in card && card.border ? "1px solid var(--line)" : undefined,
                color: card.color,
              }}
            >
              <span className="contact-card__top">
                <Icon size={40} />
                <span className="go icon-circle" style={{ "--icon-circle-bg": card.goBg, "--icon-circle-size": "48px" } as React.CSSProperties}>
                  <ArrowRightIcon />
                </span>
              </span>
              <span className="contact-card__info">
                <span className="contact-card__label" style={{ color: card.labelColor }}>
                  {card.label}
                </span>
                <span className="disp contact-card__value" style={{ fontSize: "full" in card && card.full ? "clamp(26px, 3vw, 40px)" : 26 }}>
                  {card.value}
                </span>
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
