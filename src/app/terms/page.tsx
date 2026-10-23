import type { Metadata } from "next";
import { connection } from "next/server";
import { getStaticPage } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Termini e condizioni · Youmore",
  description: "Termini e condizioni di utilizzo del sito e dei progetti Youmore.",
};

export const instant = false;

export default async function TermsPage() {
  await connection();
  const page = await getStaticPage("terms-and-conditions");

  return (
    <>
      <section className="privacy-head">
        <h1 className="disp up privacy-head__title">Termini e condizioni</h1>
        {page?.updatedAt && (
          <p className="privacy-head__updated">
            Ultimo aggiornamento:{" "}
            {new Date(page.updatedAt).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        )}
      </section>

      <section className="legal-tabs__layout">
        <article className="legal-tabs__panel">
          <div className="doc">
            {page?.content ? (
              <div dangerouslySetInnerHTML={{ __html: page.content }} />
            ) : (
              <p>Contenuto in pubblicazione a breve.</p>
            )}
          </div>
        </article>
      </section>
    </>
  );
}
