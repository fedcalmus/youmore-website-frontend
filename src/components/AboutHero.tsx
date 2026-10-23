import { getAboutPageContent, splitTitleAccent } from "@/lib/about";
import { getLocale } from "@/lib/locale";

export async function AboutHero() {
  const lang = await getLocale();
  const content = await getAboutPageContent(lang);

  if (!content) {
    return <p className="about-hero__empty">I contenuti di questa pagina verranno aggiunti a breve.</p>;
  }

  const { lead, accent } = splitTitleAccent(content.title);

  return (
    <>
      <h1 className="disp up d1 about-hero__title">
        {lead && `${lead} `}
        <span className="about-hero__title-accent">{accent}</span>
      </h1>
      <div className="up d2 about-hero__row">
        <div className="about-hero__lede" dangerouslySetInnerHTML={{ __html: content.description }} />
        <div className="about-hero__card">
          <span className="about-hero__card-label">Sede</span>
          <strong className="about-hero__card-value">{content.sede}</strong>
          <span className="about-hero__card-label about-hero__card-label--spaced">Forma giuridica</span>
          <strong className="about-hero__card-value">{content.legalForm}</strong>
        </div>
      </div>
    </>
  );
}
