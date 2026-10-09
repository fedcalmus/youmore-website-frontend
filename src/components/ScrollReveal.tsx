"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Fallback for browsers without `animation-timeline: view()` support. */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const supportsTimeline = typeof CSS !== "undefined" && CSS.supports?.("animation-timeline: view()");
    if (supportsTimeline || !("IntersectionObserver" in window)) return;

    document.documentElement.classList.add("js-rv");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".rv:not(.in)").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
