import { API_URL } from "./api";

export type StaticPageSlug = "terms-and-conditions" | "cookies";

export interface StaticPageContent {
  key: string;
  content: string;
  updatedAt: string;
}

export async function getStaticPage(slug: StaticPageSlug): Promise<StaticPageContent | null> {
  try {
    const res = await fetch(`${API_URL}/api/pages/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return (await res.json()) as StaticPageContent;
  } catch (error) {
    console.error(`Failed to load static page "${slug}" from backend`, error);
    return null;
  }
}

export type LegalPageSlug = "privacy-policy" | "cookie-policy";

export interface LegalSection {
  id: number;
  order: number;
  title: string;
  content: string;
}

export interface LegalPageContent {
  title: string;
  intro: string;
  bannerTitle: string | null;
  bannerText: string | null;
  updatedAt: string;
  sections: LegalSection[];
}

export async function getLegalPage(slug: LegalPageSlug): Promise<LegalPageContent | null> {
  try {
    const res = await fetch(`${API_URL}/api/legal/pages/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return (await res.json()) as LegalPageContent;
  } catch (error) {
    console.error(`Failed to load legal page "${slug}" from backend`, error);
    return null;
  }
}

export interface CookieCategory {
  key: "NECESSARI" | "STATISTICI" | "MARKETING";
  name: string;
  purpose: string;
  duration: string;
}

export async function getCookieCategories(): Promise<CookieCategory[]> {
  try {
    const res = await fetch(`${API_URL}/api/legal/cookie-categories`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return (await res.json()) as CookieCategory[];
  } catch (error) {
    console.error("Failed to load cookie categories from backend", error);
    return [];
  }
}
