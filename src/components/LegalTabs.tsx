"use client";

import { useEffect, useState, type ReactNode } from "react";

export function LegalTabs({
  tocPrivacy,
  tocCookie,
  privacyDoc,
  cookieDoc,
}: {
  tocPrivacy: ReactNode;
  tocCookie: ReactNode;
  privacyDoc: ReactNode;
  cookieDoc: ReactNode;
}) {
  const [tab, setTab] = useState<"privacy" | "cookie">("privacy");

  useEffect(() => {
    const h = window.location.hash.slice(1);
    if (h === "cookie" || /^c\d$/.test(h)) setTab("cookie");
  }, []);

  function show(which: "privacy" | "cookie") {
    setTab(which);
    window.history.replaceState(null, "", `#${which}`);
  }

  return (
    <>
      <section className="legal-tabs__bar">
        <div role="tablist" aria-label="Documento" className="tablist">
          <button type="button" role="tab" className="tab" aria-controls="privacy" aria-selected={tab === "privacy"} onClick={() => show("privacy")}>
            Privacy policy
          </button>
          <button type="button" role="tab" className="tab" aria-controls="cookie" aria-selected={tab === "cookie"} onClick={() => show("cookie")}>
            Cookie policy
          </button>
        </div>
      </section>

      <section className="legal-tabs__layout">
        <nav aria-label="Indice" className="legal-tabs__nav">
          {tab === "privacy" ? tocPrivacy : tocCookie}
        </nav>

        <article className="legal-tabs__panel">
          <div className="doc" id="privacy" role="tabpanel" aria-labelledby="t-privacy" hidden={tab !== "privacy"}>
            {privacyDoc}
          </div>
          <div className="doc" id="cookie" role="tabpanel" aria-labelledby="t-cookie" hidden={tab !== "cookie"}>
            {cookieDoc}
          </div>
        </article>
      </section>
    </>
  );
}
