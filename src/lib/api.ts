export const API_URL =
    process.env.API_URL || "http://production-backend-kv2dl2:3000";

/**
 * Converts uploaded-media paths into URLs accessible by website visitors.
 */
export function resolveMediaUrl(
    path: string | null | undefined
): string | undefined {
  if (!path) return undefined;

  // Rewrite internal Docker backend URLs to the public website domain.
  const internalPrefix =
      /^https?:\/\/production-backend-kv2dl2:3000/i;

  if (internalPrefix.test(path)) {
    return `https://youmore.org${path.replace(internalPrefix, "")}`;
  }

  // Preserve other absolute URLs.
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  // Serve uploaded images through the website domain.
  if (path.startsWith("/uploads/")) {
    return `https://youmore.org${path}`;
  }

  // Keep existing behavior for other relative API paths.
  return `${API_URL}${path}`;
}
