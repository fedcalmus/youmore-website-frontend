import { API_URL } from "./api";

export interface HomeStep {
  id: number;
  order: number;
  title: string;
  text: string;
}

export interface HomeTestimonial {
  id: number;
  order: number;
  quote: string;
  name: string;
  context: string;
  variant: "dark" | "light";
}

export interface HomeGalleryImage {
  id: number;
  slot: "GROUP" | "ACTIVITY" | "TRAVEL";
  image: string;
  caption: string | null;
}

export interface HomePageContent {
  heroBadge: string;
  stepsEyebrow: string;
  stepsTitle: string;
  aboutTeaserEyebrow: string;
  aboutTeaserTitle: string;
  aboutTeaserText: string;
  testimonialsEyebrow: string;
  testimonialsTitle: string;
  fundersEyebrow: string;
  fundersIntroText: string;
  updatedAt: string;
  steps: HomeStep[];
  testimonials: HomeTestimonial[];
  gallery: HomeGalleryImage[];
}

export async function getHomePageContent(): Promise<HomePageContent | null> {
  try {
    const res = await fetch(`${API_URL}/api/home-page`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return (await res.json()) as HomePageContent;
  } catch (error) {
    console.error("Failed to load home page content from backend", error);
    return null;
  }
}
