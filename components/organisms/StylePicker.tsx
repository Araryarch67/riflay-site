"use client";
import { useState } from "react";
import { ImagePreview } from "@/components/molecules/ImagePreview";
import { SegmentedControl } from "@/components/molecules/SegmentedControl";
import type { StyleSet } from "@/lib/types";
export function StylePicker({ sets }: { sets: StyleSet[] }) {
  const [setId, setSetId] = useState(sets[0]?.id);
  const set = sets.find((item) => item.id === setId) ?? sets[0];
  const [picked, setPicked] = useState<Record<string, string>>(() =>
    Object.fromEntries(sets.map((item) => [item.id, item.styles[0]?.id])),
  );
  if (!set) return null;
  const current =
    set.styles.find((item) => item.id === picked[set.id]) ?? set.styles[0];
  return (
    <div className="style-picker">
      <SegmentedControl
        options={sets.map((item) => ({ id: item.id, label: item.label }))}
        value={set.id}
        onChange={setSetId}
        label="What to change"
        className="picker__categories"
      />
      <div className={`picker${set.phone ? " picker--phone" : ""}`}>
        <div className="picker__controls">
          <div
            className="picker__chips"
            role="radiogroup"
            aria-label={set.label + " style"}
          >
            {set.styles.map((style) => (
              <button
                key={style.id}
                type="button"
                role="radio"
                className="fchip"
                aria-checked={style.id === current.id}
                aria-pressed={style.id === current.id}
                onClick={() =>
                  setPicked((previous) => ({ ...previous, [set.id]: style.id }))
                }
              >
                {style.name}
              </button>
            ))}
          </div>
        </div>
        <figure className="picker__stage">
          <ImagePreview
            className="picker__frame"
            activeId={current.id}
            images={set.styles.map((style) => ({
              id: style.id,
              src: style.src,
              alt: set.label + ": " + style.name,
              width: set.phone ? 800 : 1440,
              height: set.phone ? 1720 : 900,
            }))}
          />
          <figcaption>
            {set.label} · <b>{current.name}</b>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
