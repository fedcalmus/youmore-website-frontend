import { API_URL, resolveMediaUrl } from "./api";
import type { Lang } from "./localeShared";

export interface AboutPageContent {
  title: string;
  description: string;
  longDescription: string | null;
  sede: string;
  legalForm: string;
}

export interface AboutGalleryImage {
  id: number;
  image: string;
  caption: string;
}

export interface AboutGoal {
  id: number;
  title: string;
  text: string;
}

export interface NetworkPartner {
  id: number;
  title: string;
  subtitle: string | null;
  image: string | null;
}

export async function getAboutPageContent(lang: Lang = "it"): Promise<AboutPageContent | null> {
  try {
    const res = await fetch(`${API_URL}/api/about?lang=${lang}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return (await res.json()) as AboutPageContent;
  } catch (error) {
    console.error("Failed to load About page content from backend", error);
    return null;
  }
}

export async function getAboutGallery(): Promise<AboutGalleryImage[]> {
  try {
    const res = await fetch(`${API_URL}/api/about/gallery`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return (await res.json()) as AboutGalleryImage[];
  } catch (error) {
    console.error("Failed to load About page gallery from backend", error);
    return [];
  }
}

export async function getAboutGoals(lang: Lang = "it"): Promise<AboutGoal[]> {
  try {
    const res = await fetch(`${API_URL}/api/about/goals?lang=${lang}`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return (await res.json()) as AboutGoal[];
  } catch (error) {
    console.error("Failed to load About page goals from backend", error);
    return [];
  }
}

export async function getNetworkPartners(lang: Lang = "it"): Promise<NetworkPartner[]> {
  try {
    const res = await fetch(`${API_URL}/api/network-partners?lang=${lang}`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const partners = (await res.json()) as NetworkPartner[];
    return partners.map((p) => ({ ...p, image: resolveMediaUrl(p.image) ?? null }));
  } catch (error) {
    console.error("Failed to load network partners from backend", error);
    return [];
  }
}

/** Splits a title into its plain lead-in and the final phrase, so the last words can be styled as an accent. */
export function splitTitleAccent(title: string): { lead: string; accent: string } {
  const words = title.trim().split(/\s+/);
  if (words.length <= 2) return { lead: "", accent: title };
  return { lead: words.slice(0, -2).join(" "), accent: words.slice(-2).join(" ") };
}
