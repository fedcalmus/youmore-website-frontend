import { CookieBanner } from "./CookieBanner";
import { getCookieCategories, getLegalPage } from "@/lib/legal";

const FALLBACK_TITLE = "Usiamo i cookie, con giudizio.";
const FALLBACK_TEXT = "Quelli tecnici servono al sito per funzionare. Statistiche e marketing solo se ci dai il permesso.";
const FALLBACK_LABELS = { necessari: "Necessari", statistici: "Statistiche", marketing: "Marketing" };

export async function CookieBannerData() {
  const [cookiePage, categories] = await Promise.all([getLegalPage("cookie-policy"), getCookieCategories()]);

  const title = cookiePage?.bannerTitle || FALLBACK_TITLE;
  const text = cookiePage?.bannerText || FALLBACK_TEXT;

  const necessari = categories.find((c) => c.key === "NECESSARI")?.name;
  const statistici = categories.find((c) => c.key === "STATISTICI")?.name;
  const marketing = categories.find((c) => c.key === "MARKETING")?.name;

  const categoryLabels = {
    necessari: necessari || FALLBACK_LABELS.necessari,
    statistici: statistici || FALLBACK_LABELS.statistici,
    marketing: marketing || FALLBACK_LABELS.marketing,
  };

  return <CookieBanner title={title} text={text} categoryLabels={categoryLabels} />;
}
