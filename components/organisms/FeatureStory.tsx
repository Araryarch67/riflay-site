"use client";
import { MotionText } from "@/components/atoms/MotionText";

import { useEffect, useRef, useState } from "react";

import type { StoryItem } from "@/lib/types";

/**
 * Scrollytelling: on wide screens the screenshot frame stays put while the features scroll past it, and it
 * cross-fades to the one in the middle of the screen. On phones each feature carries its own screenshot.
 */
export function FeatureStory({
  items,
  available,
}: {
  items: StoryItem[];
  available: Record<string, boolean>;
}) {
  const [active, setActive] = useState(0);
  const steps = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting)
            setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    steps.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="story">
      <div className="story__stage" aria-hidden="true">
        <div className="story__frame">
          {items.map((it, i) =>
            available[it.shot] ? (
              <img
                key={it.id}
                src={`/screens/${it.shot}.webp`}
                width={1440}
                height={900}
                alt=""
                loading="lazy"
                className={i === active ? "is-active" : ""}
              />
            ) : null,
          )}
        </div>
        <ol className="story__dots">
          {items.map((it, i) => (
            <li key={it.id} className={i === active ? "is-active" : ""} />
          ))}
        </ol>
      </div>

      <div className="story__steps">
        {items.map((it, i) => (
          <article
            key={it.id}
            ref={(el) => {
              steps.current[i] = el;
            }}
            data-index={i}
            className={`story__step${i === active ? " is-active" : ""}`}
            aria-labelledby={`f-${it.id}`}
          >
            <p className="story__kicker label-large">
              <span>{String(i + 1).padStart(2, "0")}</span>
              {it.kicker}
            </p>
            <h3 id={`f-${it.id}`} className="headline-large">
              <MotionText>{it.title}</MotionText>
            </h3>
            <div className="story__body">{it.body}</div>
            {available[it.shot] && (
              <figure className="story__inline">
                <img
                  src={`/screens/${it.shot}.webp`}
                  width={1440}
                  height={900}
                  alt={it.alt}
                  loading="lazy"
                />
              </figure>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
