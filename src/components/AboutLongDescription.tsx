import { getAboutPageContent } from "@/lib/about";
import { getLocale } from "@/lib/locale";

export async function AboutLongDescription() {
  const lang = await getLocale();
  const content = await getAboutPageContent(lang);

  if (!content?.longDescription) {
    return null;
  }

  return (
    <section className="about-long">
      <div className="about-long__text" dangerouslySetInnerHTML={{ __html: content.longDescription }} />
    </section>
  );
}
