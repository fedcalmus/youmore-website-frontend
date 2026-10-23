import { ArrowRightIcon } from "@/components/icons";
import { resolveMediaUrl } from "@/lib/api";
import { extractDomain, getFinancingEntities } from "@/lib/funders";

export async function FundersGrid() {
  const funders = await getFinancingEntities();

  if (funders.length === 0) {
    return <p className="funders-list__empty">Gli enti finanziatori verranno aggiunti a breve.</p>;
  }

  return (
    <div className="funders-list__grid">
      {funders.map((f) => (
        <a key={f.id} className="fund rv funder-card" href={f.url} target="_blank" rel="noopener noreferrer">
          <div className="funder-card__logo">
            <img className="funder-card__logo-img" src={resolveMediaUrl(f.image)} alt={f.name} />
          </div>
          <div className="funder-card__body">
            <h2 className="disp funder-card__title">{f.name}</h2>
            <div className="funder-card__domain">
              {extractDomain(f.url)}
              <span className="icon-circle go">
                <ArrowRightIcon />
              </span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}
