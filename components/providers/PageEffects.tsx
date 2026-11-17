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

    // Links to other sites (Tako, GitHub, AltStore...) open in a new tab, so the page stays where it was; a file
    // straight from a release downloads in place. Links added later (another install tab) are marked too.
    const markLinks = (scope: ParentNode) =>
      scope.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((a) => {
        let url: URL;
        try {
          url = new URL(a.href, location.href);
        } catch {
          return;
        }
        const external = /^https?:$/.test(url.protocol) && url.host !== location.host;
        const file = /\/releases\/(latest\/)?download\//.test(url.pathname);
        if (external && !file) {
          a.target = "_blank";
          a.rel = "noopener noreferrer";
        } else if (a.target === "_blank") {
          a.removeAttribute("target");
        }
      });
    markLinks(document);
    const links = new MutationObserver((changes) => {
      for (const c of changes)
        if (c.type === "attributes") markLinks(c.target.parentNode ?? document);
        else c.addedNodes.forEach((n) => n instanceof Element && markLinks(n.parentNode ?? n));
    });
    links.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ["href"] });

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
      // Shown once its top comes on screen: a share of its height (8% was) never shows on a phone for a section
      // taller than the screen many times over (the feature list, ~10,000 px there stayed hidden).
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
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
      links.disconnect();
      io.disconnect();
      heroIo?.disconnect();
    };
  }, []);

  return null;
}
