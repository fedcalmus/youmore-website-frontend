import { cookies } from "next/headers";
import { LANG_COOKIE, type Lang } from "./localeShared";

/** Reads the visitor's chosen language from a cookie, defaulting to Italian. */
export async function getLocale(): Promise<Lang> {
  const store = await cookies();
  return store.get(LANG_COOKIE)?.value === "en" ? "en" : "it";
}
