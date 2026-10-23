import { resolveMediaUrl } from "@/lib/api";
import { getInitials, getTeamMembers, pickPalette } from "@/lib/team";

const PREVIEW_SIZE = 4;

export async function BoardPreview() {
  const members = (await getTeamMembers()).slice(0, PREVIEW_SIZE);

  if (members.length === 0) {
    return <p className="about-board__empty">Il board verrà aggiornato a breve.</p>;
  }

  return (
    <div className="about-board__grid">
      {members.map((m, i) => {
        const palette = pickPalette(i);
        const photo = resolveMediaUrl(m.image);
        const fullName = `${m.name} ${m.surname}`;

        return (
          <article key={m.id} className="member rv about-board__card">
            <div className="ph about-board__photo" style={{ background: palette.bg, color: palette.fg }}>
              {photo ? (
                <img
                  src={photo}
                  alt={fullName}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <>
                  <div className="pat pat--cover" style={{ opacity: 0.15 }} />
                  <span className="disp about-board__initials" aria-hidden="true">
                    {getInitials(m)}
                  </span>
                </>
              )}
            </div>
            <div>
              <h3 className="disp about-board__name">{fullName}</h3>
              {m.role && <span className="about-board__role">{m.role}</span>}
            </div>
          </article>
        );
      })}
    </div>
  );
}
