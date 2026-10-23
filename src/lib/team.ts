import { API_URL } from "./api";

export interface TeamMember {
  id: number;
  name: string;
  surname: string;
  role: string | null;
  email: string;
  phoneNumber: string;
  image: string | null;
}

const PALETTE = [
  { bg: "#1F3FD8", fg: "#FFFFFF" },
  { bg: "#FFC83D", fg: "#0B1A3A" },
  { bg: "#0B1A3A", fg: "#FFC83D" },
  { bg: "#DCE3FF", fg: "#1F3FD8" },
];

/** Rotates through the brand palette so cards keep the template's look without per-member color data from the backend. */
export function pickPalette(index: number) {
  return PALETTE[index % PALETTE.length];
}

export function getInitials({ name, surname }: Pick<TeamMember, "name" | "surname">): string {
  return `${name.charAt(0)}${surname.charAt(0)}`.toUpperCase();
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const res = await fetch(`${API_URL}/api/team`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return (await res.json()) as TeamMember[];
  } catch (error) {
    console.error("Failed to load team members from backend", error);
    return [];
  }
}
