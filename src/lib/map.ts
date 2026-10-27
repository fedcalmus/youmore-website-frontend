import type { Project } from "./projects";

export type MapPin = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  n: number;
  last?: string;
};

export const HOME_PIN = { lat: 45.54, lon: 10.22, label: "Brescia · sede" };

const HOME_COUNTRY = "italia";

/**
 * Geographic coordinates can't be derived from project data, so this stays
 * a static lookup — but which countries get a pin, and how many projects
 * each one has, is computed from real projects (see `computeCountryPins`).
 */
const COUNTRY_COORDS: Record<string, { lat: number; lon: number }> = {
  spagna: { lat: 41.2, lon: 1.5 },
  portogallo: { lat: 39.6, lon: -8.2 },
  francia: { lat: 46.6, lon: 2.5 },
  slovenia: { lat: 46.1, lon: 14.8 },
  ungheria: { lat: 47.2, lon: 19.4 },
  polonia: { lat: 52.1, lon: 19.4 },
  lituania: { lat: 55.4, lon: 24.5 },
  romania: { lat: 45.9, lon: 24.9 },
  bulgaria: { lat: 41.8, lon: 23.5 },
  grecia: { lat: 38.6, lon: 22.3 },
  turchia: { lat: 37.6, lon: 31.5 },
  cipro: { lat: 35.1, lon: 33.4 },
  georgia: { lat: 42.2, lon: 43.5 },
  armenia: { lat: 40.2, lon: 44.5 },
  germania: { lat: 51.2, lon: 10.4 },
  estonia: { lat: 58.6, lon: 25.0 },
  "repubblica ceca": { lat: 49.8, lon: 15.5 },
  "macedonia del nord": { lat: 41.6, lon: 21.7 },
};

/** Proper-cased display name for each `COUNTRY_COORDS` key (lowercased for matching). */
const COUNTRY_LABELS: Record<string, string> = {
  spagna: "Spagna",
  portogallo: "Portogallo",
  francia: "Francia",
  slovenia: "Slovenia",
  ungheria: "Ungheria",
  polonia: "Polonia",
  lituania: "Lituania",
  romania: "Romania",
  bulgaria: "Bulgaria",
  grecia: "Grecia",
  turchia: "Turchia",
  cipro: "Cipro",
  georgia: "Georgia",
  armenia: "Armenia",
  germania: "Germania",
  estonia: "Estonia",
  "repubblica ceca": "Repubblica Ceca",
  "macedonia del nord": "Macedonia del Nord",
};

/**
 * A project's `location` is free text like "Braga, Portogallo" or, for multi-stop/omnibus
 * posts, "Georgia, Macedonia del Nord, Spagna, Cipro". Strips parenthetical asides first
 * (e.g. "Polonia (con visita a Cracovia)") so they don't pollute comma-splitting, then
 * returns every comma-separated segment that matches a known country — segments like city
 * names simply won't match anything and are ignored.
 */
function extractCountries(location: string | null): string[] {
  if (!location) return [];
  const cleaned = location.replace(/\([^)]*\)/g, "");
  return cleaned
    .split(",")
    .map((segment) => segment.trim().toLowerCase())
    .filter((segment) => segment in COUNTRY_COORDS || segment === HOME_COUNTRY);
}

/**
 * Groups real projects by country for the home map + "paesi raggiunti" stat.
 * Excludes the home country (Italia, already marked by `HOME_PIN`) and any
 * country without a known coordinate. `n`/`last` feed the pin tooltip.
 */
export function computeCountryPins(projects: Project[]): MapPin[] {
  const byCountry = new Map<string, { name: string; count: number; latestTime: number; latestLabel: string }>();

  for (const project of projects) {
    const keys = new Set(extractCountries(project.location));

    for (const key of keys) {
      if (key === HOME_COUNTRY) continue;

      const coords = COUNTRY_COORDS[key];
      if (!coords) continue;

      const time = project.startDate ? new Date(project.startDate).getTime() : 0;
      const year = project.startDate ? new Date(project.startDate).getFullYear() : undefined;
      const label = year ? `${project.title}, ${year}` : project.title;

      const existing = byCountry.get(key);
      if (!existing) {
        byCountry.set(key, { name: COUNTRY_LABELS[key], count: 1, latestTime: time, latestLabel: label });
      } else {
        existing.count += 1;
        if (time >= existing.latestTime) {
          existing.latestTime = time;
          existing.latestLabel = label;
        }
      }
    }
  }

  return Array.from(byCountry.entries()).map(([key, data]) => ({
    id: key,
    name: data.name,
    lat: COUNTRY_COORDS[key].lat,
    lon: COUNTRY_COORDS[key].lon,
    n: data.count,
    last: data.latestLabel,
  }));
}

/** Simplified landmass rows (latitude -> longitude ranges) for the decorative dot map. */
export const LAND: Record<number, [number, number][]> = {
  61: [[5, 17], [22, 48]],
  60: [[5, 18], [22, 48]],
  59: [[6, 18], [23, 48]],
  58: [[-6, -3], [7, 8], [12, 16], [18, 18], [22, 22], [24, 48]],
  57: [[-6, -2], [8, 10], [12, 16], [18, 18], [21, 22], [25, 48]],
  56: [[-5, -3], [8, 14], [21, 48]],
  55: [[-8, -6], [-5, -2], [9, 12], [20, 48]],
  54: [[-10, -6], [-4, 0], [9, 48]],
  53: [[-10, -6], [-4, 1], [5, 48]],
  52: [[-10, -6], [-5, 1], [4, 48]],
  51: [[-5, 1], [2, 48]],
  50: [[-5, -5], [2, 48]],
  49: [[-2, 48]],
  48: [[-4, 48]],
  47: [[-2, 48]],
  46: [[-1, 30], [33, 35], [38, 46]],
  45: [[-1, 12], [14, 29], [33, 36], [38, 47]],
  44: [[-1, 7], [10, 12], [15, 28], [39, 47]],
  43: [[-9, 6], [9, 9], [11, 13], [17, 27], [40, 47]],
  42: [[-9, 3], [9, 9], [12, 14], [19, 27], [35, 35], [42, 48]],
  41: [[-8, 1], [8, 9], [14, 17], [20, 48]],
  40: [[-8, 0], [9, 9], [16, 16], [18, 18], [20, 23], [26, 48]],
  39: [[-9, -1], [3, 3], [9, 9], [16, 17], [21, 23], [27, 48]],
  38: [[-8, -1], [13, 15], [16, 16], [21, 24], [27, 48]],
  37: [[-8, -2], [8, 11], [13, 15], [22, 22], [28, 48]],
  36: [[-6, -5], [0, 10], [30, 30], [33, 33], [36, 48]],
  35: [[-6, 11], [24, 26], [33, 34], [36, 48]],
  34: [[-7, 10], [36, 48]],
  33: [[-8, 11], [35, 48]],
  32: [[-9, 15], [20, 24], [35, 48]],
  31: [[-9, 17], [20, 48]],
  30: [[-9, 32], [33, 48]],
  29: [[-10, 32], [33, 34], [35, 48]],
  28: [[-11, 33], [34, 34], [35, 48]],
  27: [[-11, 33], [36, 48]],
  26: [[-11, 34], [37, 48]],
};

export function pos(lat: number, lon: number) {
  return { x: ((lon + 11 + 0.5) / 60) * 100, y: ((61 - lat + 0.5) / 36) * 100 };
}
