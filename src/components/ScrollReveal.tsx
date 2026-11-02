"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Drives the `.rv` scroll-reveal classes via IntersectionObserver.
 *
 * This used to skip itself on browsers reporting `animation-timeline: view()`
 * support, letting a pure-CSS `@supports` block drive the reveal instead.
 * iOS Safari reports that feature as supported but doesn't reliably run the
 * timeline for every layout (observed: elements stuck at the keyframe's
 * `from` state — invisible but still taking up layout space), so the CSS
 * path has been removed and IntersectionObserver is now used everywhere.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

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
