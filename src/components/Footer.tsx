import Link from "next/link";
import { LogoMark, Wordmark } from "./Logo";
import { SocialLinks } from "./SocialLinks";
import { FOOTER_LINKS, SITE } from "@/lib/site";
import { openCookiePreferences } from "./CookieBanner";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <div className="site-footer__brand-mark">
              <LogoMark size={44} />
              <Wordmark fontSize={28} starColor="var(--sun)" inkColor="var(--white)" />
            </div>
            <p className="site-footer__tagline">
              {SITE.legalName} · {SITE.tagline}
            </p>
          </div>
          <nav aria-label="Pagine" className="site-footer__nav">
            <div className="site-footer__heading">Esplora</div>
            {FOOTER_LINKS.map((link) => (
              <Link key={link.href} className="flink" href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="site-footer__contact">
            <div className="site-footer__heading">Contatti</div>
            <Link className="flink" href="/contact">
              {SITE.email}
            </Link>
            <div className="site-footer__social">
              <SocialLinks />
            </div>
          </div>
        </div>
        <div className="site-footer__bottom">
          <span>© 2026 {SITE.legalName} · C.F. {SITE.taxCode}</span>
          <div className="site-footer__legal-links">
            <Link className="flink" href="/privacy-cookie">
              Privacy policy
            </Link>
            <Link className="flink" href="/privacy-cookie#cookie">
              Cookie policy
            </Link>
            <button type="button" className="linkbtn" onClick={openCookiePreferences}>
              Preferenze cookie
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
