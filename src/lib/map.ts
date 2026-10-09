export type MapPin = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  n: number;
  last?: string;
};

/** Dati di esempio: sostituire con i numeri reali. */
export const PINS: MapPin[] = [
  { id: "es", name: "Spagna", lat: 41.2, lon: 1.5, n: 6, last: "Move On, 2022" },
  { id: "pt", name: "Portogallo", lat: 39.6, lon: -8.2, n: 2 },
  { id: "fr", name: "Francia", lat: 46.6, lon: 2.5, n: 1 },
  { id: "si", name: "Slovenia", lat: 46.1, lon: 14.8, n: 1 },
  { id: "hu", name: "Ungheria", lat: 47.2, lon: 19.4, n: 2 },
  { id: "pl", name: "Polonia", lat: 52.1, lon: 19.4, n: 2 },
  { id: "lt", name: "Lituania", lat: 55.4, lon: 24.5, n: 3, last: "Emotion sense, 2022" },
  { id: "ro", name: "Romania", lat: 45.9, lon: 24.9, n: 3 },
  { id: "bg", name: "Bulgaria", lat: 41.8, lon: 23.5, n: 4, last: "Ways of facilitation, 2022" },
  { id: "gr", name: "Grecia", lat: 38.6, lon: 22.3, n: 3 },
  { id: "tr", name: "Turchia", lat: 37.6, lon: 31.5, n: 5, last: "WIN-WIN, Antalya" },
  { id: "cy", name: "Cipro", lat: 35.1, lon: 33.4, n: 2, last: "Bridge to the future, 2022" },
  { id: "ge", name: "Georgia", lat: 42.2, lon: 43.5, n: 2 },
  { id: "am", name: "Armenia", lat: 40.2, lon: 44.5, n: 4, last: "Act of Unity, 2022" },
];

export const HOME_PIN = { lat: 45.53, lon: 9.93, label: "Chiari · sede" };

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
