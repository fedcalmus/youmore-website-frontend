"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoMark, Wordmark } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { NAV_LINKS } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="site-header">
      <div className="site-header__bar">
        <Link href="/" aria-label="Youmore, torna alla home" className="site-header__brand">
          <LogoMark />
          <Wordmark />
        </Link>
        <div className="site-header__actions">
          <button
            type="button"
            className="menu-btn"
            aria-expanded={open}
            aria-controls="main-nav"
            aria-label={open ? "Chiudi il menu" : "Apri il menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
          <nav id="main-nav" className={`main-nav${open ? " open" : ""}`} aria-label="Principale">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link key={link.href} href={link.href} className={`nl${active ? " on" : ""}`} aria-current={active ? "page" : undefined}>
                  {link.label}
                </Link>
              );
            })}
            <div className="nav-cta-group">
              <LanguageSwitcher />
              <Link className="btn btn-ink nav-cta" href="/projects">
                Scopri i progetti
              </Link>
            </div>
          </nav>
          <div className="hdr-cta-group">
            <LanguageSwitcher />
            <Link className="btn btn-ink hdr-cta" href="/projects">
              Scopri i progetti
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
