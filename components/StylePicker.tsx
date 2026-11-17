"use client";

import { useState } from "react";

export type StyleSet = {
  id: string;
  label: string;
  phone?: boolean;
  styles: { id: string; name: string; src: string }[];
};

/**
 * "Pick one, see it": an M3 segmented button for the kind of thing (visualizer, tab bar, …), chips for its
 * styles, and the real screenshot of the chosen one, cross-fading in.
 */
export function StylePicker({ sets }: { sets: StyleSet[] }) {
  const [setId, setSetId] = useState(sets[0]?.id);
  const set = sets.find((s) => s.id === setId) ?? sets[0];
  const [picked, setPicked] = useState<Record<string, string>>(() =>
    Object.fromEntries(sets.map((s) => [s.id, s.styles[0]?.id])),
  );
  if (!set) return null;
  const current = set.styles.find((s) => s.id === picked[set.id]) ?? set.styles[0];

  return (
    <div className={`picker${set.phone ? " picker--phone" : ""}`}>
      <div className="picker__controls">
        <div className="segmented" role="radiogroup" aria-label="What to change">
          {sets.map((s) => (
            <button key={s.id} type="button" role="radio" aria-checked={s.id === set.id} onClick={() => setSetId(s.id)}>
              {s.label}
            </button>
          ))}
        </div>
        <div className="picker__chips" role="radiogroup" aria-label={`${set.label} style`}>
          {set.styles.map((s) => (
            <button
              key={s.id}
              type="button"
              role="radio"
              className="fchip"
              aria-checked={s.id === current.id}
              aria-pressed={s.id === current.id}
              onClick={() => setPicked((p) => ({ ...p, [set.id]: s.id }))}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>
      <figure className="picker__stage">
        <div className="picker__frame">
          {set.styles.map((s) => (
            <img
              key={s.id}
              src={`/screens/${s.src}.webp`}
              alt={s.id === current.id ? `${set.label}: ${s.name}` : ""}
              aria-hidden={s.id !== current.id}
              loading="lazy"
              width={set.phone ? 800 : 1440}
              height={set.phone ? 1720 : 900}
              className={s.id === current.id ? "is-active" : ""}
            />
          ))}
        </div>
        <figcaption>
          {set.label} · <b>{current.name}</b>
        </figcaption>
      </figure>
    </div>
  );
}
