import type { ComponentType } from "react";
import { ArrowRightIcon, FacebookIcon, InstagramIcon, LinkedinIcon, MailIcon } from "@/components/icons";
import { extractSocialHandle, getContactInfo } from "@/lib/contact";

interface Card {
  key: string;
  href: string;
  bg: string;
  color: string;
  border?: boolean;
  labelColor: string;
  goBg: string;
  goColor?: string;
  icon: ComponentType<{ size?: number }>;
  label: string;
  value: string;
  full?: boolean;
}

export async function ContactCards() {
  const contact = await getContactInfo();

  if (!contact) {
    return <p className="contact-grid__empty">I contatti verranno aggiunti a breve.</p>;
  }

  const cards: Card[] = [
    {
      key: "email",
      href: `mailto:${contact.email}`,
      bg: "#1F3FD8",
      color: "#fff",
      labelColor: "#C9D3F5",
      goBg: "#FFC83D",
      goColor: "#0B1A3A",
      icon: MailIcon,
      label: "Email",
      value: contact.email,
      full: true,
    },
  ];

  if (contact.instagram) {
    cards.push({
      key: "instagram",
      href: contact.instagram,
      bg: "#fff",
      color: "#0B1A3A",
      border: true,
      labelColor: "#4A5571",
      goBg: "#EEF1FA",
      icon: InstagramIcon,
      label: "Instagram",
      value: `@${extractSocialHandle(contact.instagram)}`,
    });
  }

  if (contact.facebook) {
    cards.push({
      key: "facebook",
      href: contact.facebook,
      bg: "#fff",
      color: "#0B1A3A",
      border: true,
      labelColor: "#4A5571",
      goBg: "#EEF1FA",
      icon: FacebookIcon,
      label: "Facebook",
      value: `@${extractSocialHandle(contact.facebook)}`,
    });
  }

  if (contact.linkedin) {
    cards.push({
      key: "linkedin",
      href: contact.linkedin,
      bg: "#0B1A3A",
      color: "#fff",
      labelColor: "#A9B6E0",
      goBg: "#FFC83D",
      goColor: "#0B1A3A",
      icon: LinkedinIcon,
      label: "LinkedIn",
      value: `@${extractSocialHandle(contact.linkedin)}`,
    });
  }

  return (
    <div className="contact-grid">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <a
            key={card.key}
            className={`ct up d${i + 1} contact-card`}
            href={card.href}
            target={card.key === "email" ? undefined : "_blank"}
            rel={card.key === "email" ? undefined : "noopener noreferrer"}
            style={{
              gridColumn: card.full ? "1 / -1" : undefined,
              background: card.bg,
              border: card.border ? "1px solid var(--line)" : undefined,
              color: card.color,
            }}
          >
            <span className="contact-card__top">
              <Icon size={40} />
              <span
                className="go icon-circle"
                style={{ "--icon-circle-bg": card.goBg, "--icon-circle-size": "48px" } as React.CSSProperties}
              >
                <ArrowRightIcon />
              </span>
            </span>
            <span className="contact-card__info">
              <span className="contact-card__label" style={{ color: card.labelColor }}>
                {card.label}
              </span>
              <span className="disp contact-card__value" style={{ fontSize: card.full ? "clamp(26px, 3vw, 40px)" : 26 }}>
                {card.value}
              </span>
            </span>
          </a>
        );
      })}
    </div>
  );
}
