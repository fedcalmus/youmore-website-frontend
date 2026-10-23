import { API_URL } from "./api";

export type Gender = "MALE" | "FEMALE" | "OTHER";
export type TshirtSize = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export interface VolunteerApplicationInput {
  name: string;
  surname: string;
  gender: Gender;
  citizenship: string;
  city: string;
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  hasPassport: boolean;
  travelDocumentValidForCountry: boolean | null;
  motivation: string;
  isFirstExperience: boolean;
  howDidYouFindUs: string;
  emergencyContact: string;
  specialNeeds?: string;
  tshirtSize: TshirtSize;
  emailGroupConsent: boolean;
  personalDataConsent: boolean;
}

export type SubmitApplicationResult =
  | { ok: true; applicationId: number }
  | { ok: false; message: string };

/** Sends a volunteer application to the backend for the given project slug. */
export async function submitApplication(
  slug: string,
  input: VolunteerApplicationInput
): Promise<SubmitApplicationResult> {
  try {
    const res = await fetch(`${API_URL}/api/projects/${slug}/apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    const body = await res.json().catch(() => null);

    if (!res.ok) {
      return { ok: false, message: body?.message ?? "Invio non riuscito. Riprova più tardi." };
    }

    return { ok: true, applicationId: body.applicationId };
  } catch (error) {
    console.error("Failed to submit application to backend", error);
    return { ok: false, message: "Impossibile contattare il server. Controlla la connessione e riprova." };
  }
}
