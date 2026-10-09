"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const STORAGE_KEY = "ym-cookie";
const OPEN_EVENT = "ym:open-cookie-prefs";

type Consent = { stats: boolean; mkt: boolean; at: string };

let cachedRaw: string | null = null;
let cachedConsent: Consent | null = null;

function readConsent(): Consent | null {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      cachedConsent = raw ? JSON.parse(raw) : null;
    } catch {
      cachedConsent = null;
    }
  }
  return cachedConsent;
}

let listeners: Array<() => void> = [];
function subscribe(onChange: () => void) {
  listeners.push(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners = listeners.filter((l) => l !== onChange);
    window.removeEventListener("storage", onChange);
  };
}
function notify() {
  listeners.forEach((l) => l());
}
function getServerSnapshot(): Consent | null {
  return null;
}

export function openCookiePreferences() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function CookieBanner() {
  const consent = useSyncExternalStore(subscribe, readConsent, getServerSnapshot);
  const [forceOpen, setForceOpen] = useState(false);
  const [mode, setMode] = useState<"simple" | "custom">("simple");
  const [stats, setStats] = useState(false);
  const [mkt, setMkt] = useState(false);

  useEffect(() => {
    function onOpenPrefs() {
      const saved = readConsent();
      if (saved) {
        setStats(saved.stats);
        setMkt(saved.mkt);
      }
      setMode("custom");
      setForceOpen(true);
    }
    window.addEventListener(OPEN_EVENT, onOpenPrefs);
    return () => window.removeEventListener(OPEN_EVENT, onOpenPrefs);
  }, []);

  function save(nextStats: boolean, nextMkt: boolean) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ stats: nextStats, mkt: nextMkt, at: new Date().toISOString() }));
    notify();
    setForceOpen(false);
  }

  if (consent !== null && !forceOpen) return null;

  return (
    <div className="cookie" role="dialog" aria-label="Preferenze cookie">
      <div className="disp cookie__title">Usiamo i cookie, con giudizio.</div>
      <p className="cookie__text">
        Quelli tecnici servono al sito per funzionare. Statistiche e marketing solo se ci dai il permesso.{" "}
        <a href="/privacy-cookie#cookie">Leggi la cookie policy</a>
      </p>
      {mode === "custom" && (
        <div className="cookie__prefs">
          <div className="cookie__pref-row">
            <span className="cookie__pref-label">Necessari</span>
            <span className="cookie__pref-static">Sempre attivi</span>
          </div>
          <div className="cookie__pref-row">
            <span className="cookie__pref-label">Statistiche</span>
            <button type="button" className="tog" role="switch" aria-checked={stats} aria-label="Cookie statistici" onClick={() => setStats((v) => !v)}>
              <span />
            </button>
          </div>
          <div className="cookie__pref-row">
            <span className="cookie__pref-label">Marketing</span>
            <button type="button" className="tog" role="switch" aria-checked={mkt} aria-label="Cookie di marketing" onClick={() => setMkt((v) => !v)}>
              <span />
            </button>
          </div>
        </div>
      )}
      <div className="cookie__actions">
        <button type="button" className="btn btn-blue cookie__action" onClick={() => save(true, true)}>
          Accetta tutti
        </button>
        <button type="button" className="btn btn-panel cookie__action" onClick={() => save(false, false)}>
          Rifiuta
        </button>
        {mode === "custom" ? (
          <button type="button" className="btn btn-text cookie__action--full" onClick={() => save(stats, mkt)}>
            Salva le mie scelte
          </button>
        ) : (
          <button type="button" className="btn btn-text cookie__action--full" onClick={() => setMode("custom")}>
            Personalizza
          </button>
        )}
      </div>
    </div>
  );
}
