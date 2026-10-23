import { MailIcon, PhoneIcon } from "@/components/icons";
import { CopyButton } from "@/components/CopyButton";
import { resolveMediaUrl } from "@/lib/api";
import { getInitials, getTeamMembers, pickPalette } from "@/lib/team";

export async function BoardGrid() {
  const members = await getTeamMembers();

  if (members.length === 0) {
    return <p className="board-list__empty">Il board verrà aggiornato a breve.</p>;
  }

  return (
    <div className="board-list__grid">
      {members.map((m, i) => {
        const palette = pickPalette(i);
        const photo = resolveMediaUrl(m.image);
        const fullName = `${m.name} ${m.surname}`;

        return (
          <article key={m.id} className="mcard board-card" style={{ animationDelay: `${0.1 * i}s` }}>
            <div className="board-card__photo" style={{ background: palette.bg, color: palette.fg }}>
              {photo ? (
                <img
                  className="photo"
                  src={photo}
                  alt={fullName}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <div className="photo board-card__photo-inner">
                  <div className="pat pat--cover" style={{ opacity: 0.16 }} />
                  <span className="disp board-card__initials" aria-hidden="true">
                    {getInitials(m)}
                  </span>
                </div>
              )}
            </div>
            <div className="board-card__body">
              <div>
                {m.role && <span className="board-card__role">{m.role}</span>}
                <h2 className="disp board-card__name">{fullName}</h2>
              </div>
              <div className="board-card__contacts">
                <div className="row">
                  <MailIcon size={18} className="board-card__icon" />
                  <a href={`mailto:${m.email}`} aria-label={`Scrivi a ${fullName}`}>
                    {m.email}
                  </a>
                  <CopyButton text={m.email} label={`Copia l'email di ${fullName}`} />
                </div>
                <div className="row">
                  <PhoneIcon size={18} className="board-card__icon" />
                  <a href={`tel:${m.phoneNumber}`} aria-label={`Chiama ${fullName}`}>
                    {m.phoneNumber}
                  </a>
                  <CopyButton text={m.phoneNumber} label={`Copia il telefono di ${fullName}`} />
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
