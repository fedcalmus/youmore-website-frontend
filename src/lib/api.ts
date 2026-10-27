export const API_URL =
    process.env.API_URL || "http://production-backend-kv2dl2:3000";

/** Prefixes a relative `/uploads/...` path returned by the backend with its base URL. */
export function resolveMediaUrl(path: string | null | undefined): string | undefined {
  if (!path) return undefined;
  if (/^https?:\/\//.test(path)) return path;
  return `${API_URL}${path}`;
}
