export const SITE = {
  name: "Youmore",
  legalName: "Youmore Morcelli Giovani APS",
  tagline: "Chiari (BS). Progetti europei di mobilità, formazione e volontariato.",
  taxCode: "[codice fiscale]",
  email: "[email Youmore]",
};

export const SOCIAL_LINKS = [
  { name: "Instagram", href: "https://www.instagram.com/" },
  { name: "Facebook", href: "https://www.facebook.com/" },
  { name: "LinkedIn", href: "https://www.linkedin.com/" },
] as const;

export const NAV_LINKS = [
  { href: "/about", label: "Chi siamo" },
  { href: "/projects", label: "Progetti" },
  { href: "/funders", label: "Enti finanziatori" },
  { href: "/testimonials", label: "Testimonianze" },
  { href: "/contact", label: "Contatti" },
] as const;

export const FOOTER_LINKS = [
  { href: "/about", label: "Chi siamo" },
  { href: "/board", label: "Il board" },
  { href: "/projects", label: "Progetti" },
  { href: "/funders", label: "Enti finanziatori" },
  { href: "/testimonials", label: "Testimonianze" },
  { href: "/register", label: "Registrati" },
] as const;
