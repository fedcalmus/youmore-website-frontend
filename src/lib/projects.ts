export type ProjectScope = "int" | "naz";

export type RawProject = {
  title: string;
  type: string;
  scope: ProjectScope;
  country: string;
  cc: string;
  city: string;
  dates: string;
  deadline?: string;
  ended?: boolean;
};

export type Project = RawProject & {
  bg: string;
  fg: string;
  scopeLabel: string;
  state: "open" | "ended";
  status: string;
  dot: string;
  dl: string;
  dlColor: string;
};

/** Dati di esempio: in produzione arrivano dal CMS. */
export const PROJECTS: RawProject[] = [
  { title: "Green Steps", type: "Scambio giovanile", scope: "int", country: "Portogallo", cc: "PT", city: "Braga", dates: "16–24 nov 2026", deadline: "2026-10-25" },
  { title: "Voices of Inclusion", type: "Training course", scope: "int", country: "Georgia", cc: "GE", city: "Tbilisi", dates: "2–9 dic 2026", deadline: "2026-11-05" },
  { title: "Laboratorio di facilitazione", type: "Formazione", scope: "naz", country: "Italia", cc: "IT", city: "Brescia", dates: "21–22 nov 2026", deadline: "2026-11-10" },
  { title: "Digital Commons", type: "Training course", scope: "int", country: "Romania", cc: "RO", city: "Cluj-Napoca", dates: "12–19 gen 2027", deadline: "2026-11-30" },
  { title: "Solidarity in Action", type: "Volontariato", scope: "int", country: "Grecia", cc: "GR", city: "Salonicco", dates: "feb–lug 2027", deadline: "2026-12-15" },
  { title: "Estate solidale", type: "Volontariato", scope: "naz", country: "Italia", cc: "IT", city: "Chiari", dates: "luglio 2027", deadline: "2027-05-31" },
  { title: "Mountain Minds", type: "Scambio giovanile", scope: "int", country: "Slovenia", cc: "SI", city: "Bled", dates: "14–21 ott 2026", deadline: "2026-09-20" },
  { title: "Youth Day Chiari", type: "Volontariato", scope: "naz", country: "Italia", cc: "IT", city: "Chiari", dates: "settembre 2026", deadline: "2026-08-31" },
  { title: "Bridge to the future", type: "Scambio giovanile", scope: "int", country: "Cipro", cc: "CY", city: "Cipro", dates: "21–30 nov 2022", ended: true },
  { title: "Ways of facilitation", type: "Training course", scope: "int", country: "Bulgaria", cc: "BG", city: "Bansko", dates: "14–23 ago 2022", ended: true },
  { title: "Act of Unity", type: "Training course", scope: "int", country: "Armenia", cc: "AM", city: "Armenia", dates: "giugno 2022", ended: true },
  { title: "Lead the way", type: "Training course", scope: "int", country: "Bulgaria", cc: "BG", city: "Bansko", dates: "mag–giu 2022", ended: true },
  { title: "WIN-WIN", type: "Training course", scope: "int", country: "Turchia", cc: "TR", city: "Antalya", dates: "19–26 maggio", ended: true },
  { title: "Move On", type: "Training course", scope: "int", country: "Spagna", cc: "ES", city: "Coma-ruga", dates: "3–9 mag 2022", ended: true },
  { title: "Emotion sense", type: "Scambio giovanile", scope: "int", country: "Lituania", cc: "LT", city: "Aukštaitija", dates: "aprile 2022", ended: true },
];

const PALETTE: [string, string][] = [
  ["#1F3FD8", "#FFFFFF"],
  ["#0B1A3A", "#FFC83D"],
  ["#FFC83D", "#0B1A3A"],
  ["#DCE3FF", "#1F3FD8"],
];

function formatDate(d: string) {
  return new Date(`${d}T00:00:00`).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function slugify(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Stato calcolato: un progetto con scadenza passata si chiude da solo. */
export function getProjects(withDate = false): Project[] {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  return PROJECTS.map((p, i) => {
    const [bg, fg] = PALETTE[i % PALETTE.length];
    const base = { ...p, bg, fg, scopeLabel: p.scope === "int" ? "Internazionale" : "Nazionale" };

    if (p.ended) {
      return { ...base, state: "ended", status: "Terminato", dot: "#8A93AB", dl: "Progetto concluso", dlColor: "#4A5571" } as Project;
    }

    const days = Math.round((new Date(`${p.deadline}T00:00:00`).getTime() - today.getTime()) / 86400000);
    if (days < 0) {
      return { ...base, state: "ended", status: "Chiuso automaticamente", dot: "#E8590C", dl: `Scaduto il ${formatDate(p.deadline!)}`, dlColor: "#B4450A" } as Project;
    }
    const when = days === 0 ? "oggi" : days === 1 ? "domani" : `tra ${days} giorni`;
    return {
      ...base,
      state: "open",
      status: "Candidature aperte",
      dot: "#12A150",
      dl: `Scadenza ${withDate ? `${formatDate(p.deadline!)} · ` : ""}${when}`,
      dlColor: "#0B1A3A",
    } as Project;
  });
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects(true).find((p) => slugify(p.title) === slug);
}
