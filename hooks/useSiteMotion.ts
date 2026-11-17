"use client";
import { useEffect } from "react";

/** Choreography is independent of content. Observers and pointer work stop on cleanup. */
export function useSiteMotion() {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.motionBooted = "true";
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const hero = document.querySelector(".hero");
    const revealHero = () => {
      hero?.classList.add("has-entered");
      hero
        ?.querySelectorAll<HTMLElement>("[data-motion-text]")
        .forEach((el) => (el.dataset.motionRevealed = "true"));
    };
    const update = () => {
      root.classList.toggle("motion-enabled", !preference.matches);
      if (preference.matches) revealHero();
    };
    update();
    preference.addEventListener("change", update);
    window.addEventListener("riflay:intro-end", revealHero);
    if (!root.classList.contains("splash-on")) revealHero();
    const introFallback = window.setTimeout(revealHero, 2000);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.motionRevealed = "true";
            observer.unobserve(entry.target);
          }
      },
      { threshold: 0.2, rootMargin: "0px 0px -5% 0px" },
    );
    document.querySelectorAll("[data-motion-text]").forEach((el) => {
      if (!hero?.contains(el)) observer.observe(el);
    });
    const cleanups: Array<() => void> = [];
    const fine = matchMedia("(hover:hover) and (pointer:fine)");
    document
      .querySelectorAll<HTMLElement>(".hero .btn--xl,.closing .btn--xl")
      .forEach((button) => {
        let raf = 0;
        const move = (event: PointerEvent) => {
          if (preference.matches || !fine.matches) return;
          cancelAnimationFrame(raf);
          const box = button.getBoundingClientRect();
          const x = Math.max(
            -5,
            Math.min(5, (event.clientX - box.left - box.width / 2) * 0.05),
          );
          const y = Math.max(
            -5,
            Math.min(5, (event.clientY - box.top - box.height / 2) * 0.1),
          );
          raf = requestAnimationFrame(() => {
            button.style.setProperty("--magnet-x", x + "px");
            button.style.setProperty("--magnet-y", y + "px");
          });
        };
        const reset = () => {
          cancelAnimationFrame(raf);
          button.style.removeProperty("--magnet-x");
          button.style.removeProperty("--magnet-y");
        };
        button.addEventListener("pointermove", move);
        button.addEventListener("pointerleave", reset);
        button.addEventListener("blur", reset);
        cleanups.push(() => {
          reset();
          button.removeEventListener("pointermove", move);
          button.removeEventListener("pointerleave", reset);
          button.removeEventListener("blur", reset);
        });
      });
    return () => {
      window.clearTimeout(introFallback);
      observer.disconnect();
      preference.removeEventListener("change", update);
      window.removeEventListener("riflay:intro-end", revealHero);
      cleanups.forEach((fn) => fn());
      delete root.dataset.motionBooted;
      root.classList.remove("motion-enabled");
    };
  }, []);
}
