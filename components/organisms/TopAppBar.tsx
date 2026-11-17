"use client";

import { useEffect, useRef, useState } from "react";
import { REPO } from "@/lib/site";
import { Icon } from "@/components/atoms/Icon";

type Theme = "system" | "light" | "dark";
const THEME_ICON: Record<Theme, string> = {
  system: "brightness_auto",
  light: "light_mode",
  dark: "dark_mode",
};
const NEXT_THEME: Record<Theme, Theme> = {
  system: "light",
  light: "dark",
  dark: "system",
};
const THEME_NAME: Record<Theme, string> = {
  system: "follow system",
  light: "light",
  dark: "dark",
};

const LINKS = [
  { href: "#features", label: "Features", icon: "auto_awesome" },
  { href: "#screenshots", label: "Screenshots", icon: "desktop_windows" },
  { href: "#install", label: "Install", icon: "download" },
  { href: "#faq", label: "FAQ", icon: "expand_more" },
];

export function GitHubMark() {
  return (
    <svg className="gh" viewBox="0 0 16 16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
      />
    </svg>
  );
}

/** M3 small top app bar, with a modal navigation drawer on narrow screens and a theme switch. */
export function TopAppBar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("system");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = document.documentElement.dataset.theme;
    if (t === "light" || t === "dark") setTheme(t);
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;
    drawerRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDrawerOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  function close() {
    setDrawerOpen(false);
    toggleRef.current?.focus();
  }

  function cycleTheme() {
    const next = NEXT_THEME[theme];
    setTheme(next);
    const root = document.documentElement;
    if (next === "system") delete root.dataset.theme;
    else root.dataset.theme = next;
    try {
      if (next === "system") localStorage.removeItem("riflay-theme");
      else localStorage.setItem("riflay-theme", next);
    } catch {}
  }

  return (
    <>
      <header
        className={`top-app-bar${scrolled ? " is-scrolled" : ""}`}
        id="top"
      >
        <div className="top-app-bar__inner">
          <button
            ref={toggleRef}
            className="icon-btn nav-toggle"
            type="button"
            aria-label="Open navigation"
            aria-controls="drawer"
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen(true)}
          >
            <Icon name="menu" />
          </button>
          <a className="brand" href="#top" aria-label="Riflay, back to top">
            <img
              className="brand__logo logo-on-light"
              src="/icon/riflay-transparent-light.svg"
              width={36}
              height={36}
              alt=""
            />
            <img
              className="brand__logo logo-on-dark"
              src="/icon/riflay-transparent.svg"
              width={36}
              height={36}
              alt=""
            />
            <span className="brand__name">Riflay</span>
          </a>
          <nav className="top-nav" aria-label="Primary">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="top-app-bar__actions">
            <button
              className="icon-btn"
              type="button"
              aria-label={`Theme: ${THEME_NAME[theme]}. Change theme`}
              title={`Theme: ${THEME_NAME[theme]}`}
              onClick={cycleTheme}
            >
              <Icon name={THEME_ICON[theme]} />
            </button>
            <a className="btn btn--tonal btn--sm hide-xs" href={REPO}>
              <GitHubMark />
              GitHub
            </a>
          </div>
        </div>
      </header>

      <div
        className={`scrim${drawerOpen ? " is-open" : ""}`}
        hidden={!drawerOpen}
        onClick={close}
      />
      <nav
        ref={drawerRef}
        className={`drawer${drawerOpen ? " is-open" : ""}`}
        id="drawer"
        aria-label="Site"
        inert={!drawerOpen}
      >
        <div className="drawer__head">
          <span className="title-medium">Riflay</span>
          <button
            className="icon-btn"
            type="button"
            aria-label="Close navigation"
            onClick={close}
          >
            <Icon name="close" />
          </button>
        </div>
        {LINKS.map((l) => (
          <a
            key={l.href}
            className="drawer__item"
            href={l.href}
            onClick={() => setDrawerOpen(false)}
          >
            <Icon name={l.icon} />
            {l.label}
          </a>
        ))}
        <hr className="divider" />
        <a className="drawer__item" href={REPO}>
          <Icon name="code" />
          Source on GitHub
        </a>
      </nav>
    </>
  );
}
