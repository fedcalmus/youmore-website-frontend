"use client";

import { openCookiePreferences } from "./CookieBanner";

export function OpenCookiePrefsButton() {
  return (
    <button type="button" className="btn btn-blue btn-sm" onClick={openCookiePreferences}>
      Apri le preferenze cookie
    </button>
  );
}
