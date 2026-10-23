import { getNetworkPartners } from "@/lib/about";
import { pickPalette } from "@/lib/team";

/** First letters of up to the first two significant words in a partner's title. */
function getPartnerInitials(title: string): string {
  const words = title.trim().split(/\s+/).filter(Boolean);
  return words.slice(0, 2).map((w) => w.charAt(0)).join("").toUpperCase();
}

export async function NetworkPartners() {
  const partners = await getNetworkPartners();

  if (partners.length === 0) {
    return <p className="about-partners__empty">La nostra rete verrà aggiornata a breve.</p>;
  }

  return (
    <div className="about-partners__grid">
      {partners.map((p, i) => {
        const palette = pickPalette(i);

        return (
          <article key={p.id} className="rv about-partners__card">
            <div className="about-partners__avatar" style={{ background: palette.bg, color: palette.fg }}>
              {p.image ? (
                <img className="about-partners__avatar-img" src={p.image} alt={p.title} />
              ) : (
                <span className="disp about-partners__initials" aria-hidden="true">
                  {getPartnerInitials(p.title)}
                </span>
              )}
            </div>
            <div className="about-partners__body">
              <h3 className="disp about-partners__title">{p.title}</h3>
              {p.subtitle && <span className="about-partners__subtitle">{p.subtitle}</span>}
            </div>
          </article>
        );
      })}
    </div>
  );
}
