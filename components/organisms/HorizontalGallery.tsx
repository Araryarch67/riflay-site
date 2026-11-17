"use client";

import { useEffect, useRef } from "react";

import type { GalleryShot } from "@/lib/types";

/**
 * A pinned horizontal gallery: the section sticks to the screen while scrolling down moves the track sideways,
 * and each picture drifts a little inside its frame (parallax). It follows the window's scroll position, so it
 * moves with Lenis too. On narrow screens, or with reduced motion, it is a plain swipeable row.
 */
export function HorizontalGallery({
  shots,
  title,
  lede,
}: {
  shots: GalleryShot[];
  title: string;
  lede: string;
}) {
  const outer = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = outer.current;
    const row = track.current;
    if (!section || !row) return;
    const wide = matchMedia(
      "(min-width: 600px) and (prefers-reduced-motion: no-preference)",
    );
    let distance = 0;
    let raf = 0;

    const measure = () => {
      if (!wide.matches) {
        section.style.height = "";
        row.style.transform = "";
        section.dataset.pinned = "false";
        return;
      }
      section.dataset.pinned = "true";
      distance = Math.max(0, row.scrollWidth - window.innerWidth);
      section.style.height = `${window.innerHeight + distance}px`;
      update();
    };

    const update = () => {
      raf = 0;
      if (!wide.matches) return;
      const top = section.getBoundingClientRect().top;
      const progress = Math.min(1, Math.max(0, -top / Math.max(1, distance)));
      row.style.transform = `translate3d(${-progress * distance}px, 0, 0)`;
      if (bar.current) bar.current.style.transform = `scaleX(${progress})`;
      // Parallax without cropping: phones and computers sit at different depths, so they drift past each other
      // a little, by how far they are from the middle of the screen. The pictures themselves stay whole.
      const mid = window.innerWidth / 2;
      for (const fig of row.querySelectorAll<HTMLElement>(".gallery__item")) {
        const frame = fig.querySelector<HTMLElement>(".gallery__frame");
        if (!frame) continue;
        const r = fig.getBoundingClientRect();
        const offset = (r.left + r.width / 2 - mid) / window.innerWidth;
        const depth = fig.classList.contains("gallery__item--phone") ? -36 : 14;
        frame.style.transform = `translate3d(${offset * depth}px, ${Math.abs(offset) * depth * 0.6}px, 0)`;
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(row);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    wide.addEventListener("change", measure);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
      wide.removeEventListener("change", measure);
    };
  }, []);

  return (
    <section
      className="gallery"
      id="screenshots"
      ref={outer}
      aria-labelledby="shots-title"
      data-pinned="false"
    >
      <div className="gallery__sticky">
        <header className="gallery__head">
          <h2 id="shots-title" className="display-medium">
            {title}
          </h2>
          <p className="body-large muted">{lede}</p>
        </header>
        <div
          className="gallery__viewport"
          tabIndex={0}
          role="region"
          aria-label="Screenshots"
        >
          <div className="gallery__track" ref={track}>
            {shots.map((s) => (
              <figure
                key={s.src}
                className={`gallery__item${s.phone ? " gallery__item--phone" : ""}`}
              >
                <div className="gallery__frame">
                  <img
                    src={`/screens/${s.src}.webp`}
                    width={s.phone ? 800 : 1440}
                    height={s.phone ? 1720 : 900}
                    alt={s.caption}
                    loading="lazy"
                  />
                </div>
                <figcaption>{s.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div className="gallery__progress" aria-hidden="true">
          <span ref={bar} />
        </div>
      </div>
    </section>
  );
}
