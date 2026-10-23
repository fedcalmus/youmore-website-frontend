import type { Metadata } from "next";
import { LegalTabs } from "@/components/LegalTabs";
import { OpenCookiePrefsButton } from "@/components/OpenCookiePrefsButton";
import { getCookieCategories, getLegalPage, type LegalPageContent, type LegalSection } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy e cookie · Youmore",
  description: "Privacy policy e cookie policy di Youmore Morcelli Giovani APS.",
};

export const instant = false;

function TocList({ items }: { items: { href: string; label: string }[] }) {
  return (
    <div>
      {items.map((item) => (
        <a key={item.href} className="toc" href={item.href}>
          {item.label}
        </a>
      ))}
    </div>
  );
}

function SectionsDoc({ page, emptyMessage }: { page: LegalPageContent | null; emptyMessage: string }) {
  if (!page) {
    return <p className="legal-doc__lead">{emptyMessage}</p>;
  }

  return (
    <>
      {page.intro && <div className="legal-doc__lead" dangerouslySetInnerHTML={{ __html: page.intro }} />}
      {page.sections.map((s) => (
        <div key={s.id}>
          <h2 id={`section-${s.id}`}>{s.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: s.content }} />
        </div>
      ))}
    </>
  );
}

function sectionsToToc(sections: LegalSection[]) {
  return sections.map((s) => ({ href: `#section-${s.id}`, label: s.title }));
}

export default async function PrivacyCookiePage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const initialTab = tab === "cookie" ? "cookie" : "privacy";

  const [privacyPage, cookiePage, categories] = await Promise.all([
    getLegalPage("privacy-policy"),
    getLegalPage("cookie-policy"),
    getCookieCategories(),
  ]);

  const updatedAt = cookiePage?.updatedAt ?? privacyPage?.updatedAt;

  return (
    <>
      <section className="privacy-head">
        <h1 className="disp up privacy-head__title">Privacy e cookie</h1>
        {updatedAt && (
          <p className="privacy-head__updated">
            Ultimo aggiornamento:{" "}
            {new Date(updatedAt).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        )}
      </section>

      <LegalTabs
        initialTab={initialTab}
        tocPrivacy={<TocList items={privacyPage ? sectionsToToc(privacyPage.sections) : []} />}
        tocCookie={<TocList items={[{ href: "#cookie-table", label: "Cookie che usiamo" }, ...(cookiePage ? sectionsToToc(cookiePage.sections) : [])]} />}
        privacyDoc={<SectionsDoc page={privacyPage} emptyMessage="Contenuto in pubblicazione a breve." />}
        cookieDoc={
          <>
            {cookiePage?.intro && <p className="legal-doc__lead" dangerouslySetInnerHTML={{ __html: cookiePage.intro }} />}

            <h2 id="cookie-table">Cookie che usiamo</h2>
            {categories.length > 0 ? (
              <div className="legal-table-wrap">
                <table className="legal-table">
                  <thead>
                    <tr>
                      <th>Categoria</th>
                      <th>Scopo</th>
                      <th>Durata</th>
                      <th>Consenso</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((cat) => (
                      <tr key={cat.key}>
                        <td>{cat.name}</td>
                        <td>{cat.purpose}</td>
                        <td>{cat.duration}</td>
                        <td>{cat.key === "NECESSARI" ? "Non richiesto" : "Richiesto"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>Contenuto in pubblicazione a breve.</p>
            )}
            <p>
              Puoi cambiare le tue scelte in ogni momento: <OpenCookiePrefsButton />, oppure dalle impostazioni del browser.
            </p>

            {cookiePage?.sections.map((s) => (
              <div key={s.id}>
                <h2 id={`section-${s.id}`}>{s.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: s.content }} />
              </div>
            ))}
          </>
        }
      />
    </>
  );
}
