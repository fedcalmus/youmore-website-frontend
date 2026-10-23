"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { LANG_COOKIE } from "@/lib/localeShared";
import type { Lang } from "@/lib/localeShared";
import { CheckIcon, ChevronDownIcon, GlobeIcon } from "./icons";

const LANG_NAMES: Record<Lang, string> = { it: "Italiano", en: "English" };
const LANG_LABELS: Record<Lang, string> = { it: "IT", en: "EN" };

function readLangCookie(): Lang {
  if (typeof document === "undefined") return "it";
  const match = document.cookie.match(new RegExp(`(?:^|; )${LANG_COOKIE}=([^;]*)`));
  return match && decodeURIComponent(match[1]) === "en" ? "en" : "it";
}

export function LanguageSwitcher() {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>("it");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLang(readLangCookie());
  }, []);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function select(next: Lang) {
    setOpen(false);
    if (next === lang) return;
    document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=31536000`;
    setLang(next);
    router.refresh();
  }

  return (
    <div className="lang-switch" ref={rootRef}>
      <button
        type="button"
        className="lang-switch__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <GlobeIcon />
        <span>{LANG_LABELS[lang]}</span>
        <ChevronDownIcon className={`lang-switch__chevron${open ? " open" : ""}`} />
      </button>
      {open && (
        <ul className="lang-switch__menu" role="listbox" aria-label="Lingua / Language">
          {(Object.keys(LANG_NAMES) as Lang[]).map((code) => (
            <li
              key={code}
              role="option"
              aria-selected={code === lang}
              className={`lang-switch__option${code === lang ? " on" : ""}`}
              onClick={() => select(code)}
            >
              {LANG_NAMES[code]}
              {code === lang && <CheckIcon size={14} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
