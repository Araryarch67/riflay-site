"use client";

import { useSiteMotion } from "@/hooks/useSiteMotion";
import { useEffect } from "react";
import type { Os } from "@/lib/site";

const LABELS: Record<Os, string> = {
  windows: "Download for Windows",
  mac: "Download for macOS",
  linux: "Download for Linux",
  android: "Download for Android",
  ios: "Download for iOS",
};

function detectOs(): Os | null {
  const ua = navigator.userAgent;
  if (/android/i.test(ua)) return "android";
  if (
    /iphone|ipad|ipod/i.test(ua) ||
    (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)
  )
    return "ios";
  if (/Mac OS X|Macintosh/.test(ua)) return "mac";
  if (/Windows/.test(ua)) return "windows";
  if (/Linux|X11|CrOS/.test(ua)) return "linux";
  return null;
}

/**
 * Page-wide enhancements: marks the visitor's system (CSS highlights its download chip
 * and install card), names it on the main button, reveals sections on scroll, and shows
 * the FAB once the hero is out of view.
 */
export function PageEffects() {
  useSiteMotion();
  useEffect(() => {
    const root = document.documentElement;
    const os = detectOs();
    if (os) {
      root.dataset.os = os;
      const label = document.querySelector("[data-download-label]");
      if (label) label.textContent = LABELS[os];
      // The big button fetches this system's recommended file straight from the release.
      const button =
        document.querySelector<HTMLAnchorElement>("[data-download]");
      const href = button?.getAttribute(`data-href-${os}`);
      if (button && href) button.href = href;
    }

    const reveals = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    reveals.forEach((el) => io.observe(el));

    const hero = document.querySelector(".hero");
    const fab = document.querySelector<HTMLElement>(".fab");
    let heroIo: IntersectionObserver | undefined;
    if (hero && fab) {
      heroIo = new IntersectionObserver(([e]) => {
        const show = !e.isIntersecting;
        fab.classList.toggle("is-visible", show);
        fab.tabIndex = show ? 0 : -1;
        fab.setAttribute("aria-hidden", String(!show));
      });
      heroIo.observe(hero);
    }

    return () => {
      io.disconnect();
      heroIo?.disconnect();
    };
  }, []);

  return null;
}
