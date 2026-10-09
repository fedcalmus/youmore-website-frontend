import type { Metadata } from "next";
import { LegalTabs } from "@/components/LegalTabs";
import { OpenCookiePrefsButton } from "@/components/OpenCookiePrefsButton";

export const metadata: Metadata = {
  title: "Privacy e cookie · Youmore",
  description: "Privacy policy e cookie policy di Youmore Morcelli Giovani APS.",
};

const PRIVACY_TOC = [
  { href: "#p1", label: "Titolare del trattamento" },
  { href: "#p2", label: "Dati raccolti" },
  { href: "#p3", label: "Finalità e base giuridica" },
  { href: "#p4", label: "Conservazione" },
  { href: "#p5", label: "Destinatari" },
  { href: "#p6", label: "I tuoi diritti" },
];

const COOKIE_TOC = [
  { href: "#c1", label: "Cosa sono i cookie" },
  { href: "#c2", label: "Cookie che usiamo" },
  { href: "#c3", label: "Come gestirli" },
  { href: "#c4", label: "Contatti" },
];

const COOKIE_TABLE = [
  { category: "Tecnici", purpose: "Login, preferenze cookie", duration: "[durata]", consent: "Non richiesto" },
  { category: "Statistici", purpose: "[Strumento di analisi]", duration: "[durata]", consent: "Richiesto" },
  { category: "Marketing", purpose: "[Social e contenuti incorporati]", duration: "[durata]", consent: "Richiesto" },
];

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

export default function PrivacyCookiePage() {
  return (
    <>
      <section className="privacy-head">
        <h1 className="disp up privacy-head__title">Privacy e cookie</h1>
        <p className="privacy-head__updated">Ultimo aggiornamento: [data]</p>
      </section>

      <LegalTabs
        tocPrivacy={<TocList items={PRIVACY_TOC} />}
        tocCookie={<TocList items={COOKIE_TOC} />}
        privacyDoc={
          <>
            <p className="legal-doc__lead">
              La presente informativa descrive come Youmore Morcelli Giovani APS tratta i dati personali di chi visita il sito, si registra o si candida ai progetti, ai sensi del Regolamento UE 2016/679 (GDPR) e del D.lgs. 196/2003.
            </p>
            <h2 id="p1">Titolare del trattamento</h2>
            <p>Youmore Morcelli Giovani APS, [indirizzo sede], Chiari (BS) · C.F. [codice fiscale] · email [email privacy].</p>
            <h2 id="p2">Dati raccolti</h2>
            <p>
              Dati di registrazione (nome, cognome, email), dati della candidatura (data di nascita, genere, cittadinanza, città, telefono, documento di viaggio, contatto di emergenza, esigenze particolari, taglia), dati di navigazione.
            </p>
            <h2 id="p3">Finalità e base giuridica</h2>
            <p>[Gestione delle candidature e dei progetti; comunicazioni sui progetti tramite il gruppo Youmore APS Projects, previo consenso; adempimenti verso gli enti finanziatori.]</p>
            <h2 id="p4">Conservazione</h2>
            <p>[Periodo di conservazione dei dati per ciascuna finalità.]</p>
            <h2 id="p5">Destinatari</h2>
            <p>[Organizzazioni partner del progetto, enti finanziatori, fornitori tecnici del sito.]</p>
            <h2 id="p6">I tuoi diritti</h2>
            <p>Puoi chiedere accesso, rettifica, cancellazione, limitazione, portabilità e opporti al trattamento scrivendo a [email privacy]. Puoi proporre reclamo al Garante per la protezione dei dati personali.</p>
          </>
        }
        cookieDoc={
          <>
            <p className="legal-doc__lead">Questa pagina spiega quali cookie usa il sito e come puoi gestirli, in conformità alle Linee guida del Garante Privacy sui cookie.</p>
            <h2 id="c1">Cosa sono i cookie</h2>
            <p>Piccoli file di testo che il sito salva nel tuo browser per ricordare informazioni sulla tua visita.</p>
            <h2 id="c2">Cookie che usiamo</h2>
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
                  {COOKIE_TABLE.map((row) => (
                    <tr key={row.category}>
                      <td>{row.category}</td>
                      <td>{row.purpose}</td>
                      <td>{row.duration}</td>
                      <td>{row.consent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h2 id="c3">Come gestirli</h2>
            <p>
              Puoi cambiare le tue scelte in ogni momento: <OpenCookiePrefsButton />, oppure dalle impostazioni del browser.
            </p>
            <h2 id="c4">Contatti</h2>
            <p>Per domande scrivi a [email privacy].</p>
          </>
        }
      />
    </>
  );
}
