import { API_URL, resolveMediaUrl } from "./api";
import type { Lang } from "./localeShared";
import type { TestimonialCard } from "./testimonialsPage";

export type ProjectScope = "int" | "naz";

interface ApiProjectImage {
  id: number;
  image: string;
  caption: string | null;
}

interface ApiProject {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  mainImage: string;
  documentUrl: string | null;
  scope: "NAZIONALE" | "INTERNAZIONALE";
  category: string | null;
  location: string | null;
  startDate: string | null;
  endDate: string | null;
  whoCanJoin: string | null;
  images: ApiProjectImage[];
  testimonialCards?: TestimonialCard[];
}

interface Paginated<T> {
  data: T[];
  pagination: { currentPage: number; pageSize: number; totalItems: number; totalPages: number };
}

export interface ProjectImage {
  id: number;
  image: string;
  caption: string | null;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  mainImage: string;
  documentUrl?: string;
  type: string;
  scope: ProjectScope;
  scopeLabel: string;
  location: string | null;
  startDate: string | null;
  endDate: string | null;
  dates: string;
  whoCanJoin: string | null;
  images: ProjectImage[];
  testimonials: TestimonialCard[];
  state: "open" | "ended";
  status: string;
  dot: string;
  dl: string;
  dlColor: string;
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** Builds a compact display range from optional start/end dates (e.g. "16–24 nov 2026"). */
function formatDateRange(start: string | null, end: string | null): string {
  if (!start && !end) return "";
  if (start && end) {
    return `${formatDate(start)} – ${formatDate(end)}`;
  }
  return formatDate((start ?? end) as string);
}

/** Maps the raw backend shape into the view model consumed by ProjectCard/ProjectsExplorer/the detail page. */
function deriveProject(p: ApiProject): Project {
  const scope: ProjectScope = p.scope === "INTERNAZIONALE" ? "int" : "naz";
  const ended = p.endDate ? new Date(p.endDate) < new Date() : false;
  const state: "open" | "ended" = ended ? "ended" : "open";
  const dates = formatDateRange(p.startDate, p.endDate);

  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    shortDescription: p.shortDescription,
    description: p.description,
    mainImage: resolveMediaUrl(p.mainImage) ?? p.mainImage,
    documentUrl: resolveMediaUrl(p.documentUrl ?? undefined),
    type: p.category ?? "",
    scope,
    scopeLabel: scope === "int" ? "Internazionale" : "Nazionale",
    location: p.location,
    startDate: p.startDate,
    endDate: p.endDate,
    dates,
    whoCanJoin: p.whoCanJoin,
    images: p.images.map((img) => ({ ...img, image: resolveMediaUrl(img.image) ?? img.image })),
    testimonials: p.testimonialCards ?? [],
    state,
    status: ended ? "Terminato" : "Candidature aperte",
    dot: ended ? "#8A93AB" : "#12A150",
    dl: ended ? "Progetto concluso" : dates,
    dlColor: ended ? "#4A5571" : "#0B1A3A",
  };
}

async function fetchProjects(lang: Lang): Promise<ApiProject[]> {
  try {
    const items: ApiProject[] = [];
    let page = 1;
    let totalPages = 1;

    do {
      const res = await fetch(`${API_URL}/api/projects?lang=${lang}&page=${page}`, { next: { revalidate: 60 } });
      if (!res.ok) break;
      const json = (await res.json()) as Paginated<ApiProject>;
      items.push(...(json.data ?? []));
      totalPages = json.pagination?.totalPages ?? 1;
      page += 1;
    } while (page <= totalPages);

    return items;
  } catch (error) {
    console.error("Failed to load projects from backend", error);
    return [];
  }
}

export async function getProjects(lang: Lang = "it"): Promise<Project[]> {
  const items = await fetchProjects(lang);
  return items.map(deriveProject);
}

export async function getProjectBySlug(slug: string, lang: Lang = "it"): Promise<Project | undefined> {
  try {
    const res = await fetch(`${API_URL}/api/projects/${slug}?lang=${lang}`, { next: { revalidate: 60 } });
    if (!res.ok) return undefined;
    const data = (await res.json()) as ApiProject;
    return deriveProject(data);
  } catch (error) {
    console.error("Failed to load project from backend", error);
    return undefined;
  }
}
