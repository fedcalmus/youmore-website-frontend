import { API_URL } from "./api";

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  instagram: string | null;
  facebook: string | null;
  linkedin: string | null;
}

export async function getContactInfo(): Promise<ContactInfo | null> {
  try {
    const res = await fetch(`${API_URL}/api/contact`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return (await res.json()) as ContactInfo;
  } catch (error) {
    console.error("Failed to load contact information from backend", error);
    return null;
  }
}

/** Turns a full social profile URL into a short "@handle"-style label instead of printing the whole URL. */
export function extractSocialHandle(url: string): string {
  try {
    const { pathname, hostname } = new URL(url);
    const segment = pathname.replace(/\/+$/, "").split("/").filter(Boolean).pop();
    return segment ?? hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
