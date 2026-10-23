import { API_URL } from "./api";

export interface FinancingEntity {
  id: number;
  name: string;
  image: string;
  url: string;
}

export async function getFinancingEntities(): Promise<FinancingEntity[]> {
  try {
    const res = await fetch(`${API_URL}/api/financing-entities`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return (await res.json()) as FinancingEntity[];
  } catch (error) {
    console.error("Failed to load financing entities from backend", error);
    return [];
  }
}

export function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
