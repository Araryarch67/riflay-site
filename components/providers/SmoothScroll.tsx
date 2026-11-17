"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/**
 * Smooth, inertial scrolling with Lenis. It drives the window's own scroll position, so sticky elements,
 * IntersectionObservers and scroll-driven CSS keep working. Off when the visitor asks for reduced motion;
 * in-page links (#install, …) glide there with M3's emphasized-decelerate feel, under the sticky top bar.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) return;

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      anchors: {
        offset: -80,
        duration: 1.1,
        easing: (t: number) => 1 - Math.pow(1 - t, 4),
      },
      autoRaf: true,
    });
    // Native smooth scrolling would fight Lenis.
    document.documentElement.style.scrollBehavior = "auto";

    const onChange = () => reduce.matches && lenis.destroy();
    reduce.addEventListener("change", onChange);
    return () => {
      reduce.removeEventListener("change", onChange);
      lenis.destroy();
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return null;
}
