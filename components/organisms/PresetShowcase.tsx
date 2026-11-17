"use client";
import { useId, useState } from "react";
import { ImagePreview } from "@/components/molecules/ImagePreview";
import { PresetDetails } from "@/components/molecules/PresetDetails";
import { PresetSelector } from "@/components/molecules/PresetSelector";
import { PLAYER_PRESETS } from "@/lib/presets";
export function PresetShowcase() {
  const group = useId();
  const [selected, setSelected] = useState<string>(PLAYER_PRESETS[0].id);
  const current =
    PLAYER_PRESETS.find((preset) => preset.id === selected) ??
    PLAYER_PRESETS[0];
  return (
    <section className="preset-showcase" aria-labelledby={group + "-title"}>
      <div className="preset-showcase__copy">
        <h3 className="headline-medium" id={group + "-title"}>
          Start with a preset.
        </h3>
        <p className="body-large muted">
          Five looks, ready to play. Pick your favourite, then change any detail
          in the app.
        </p>
        <PresetSelector
          name={group}
          selected={current.id}
          onSelect={setSelected}
        />
        <PresetDetails preset={current} />
      </div>
      <figure className="preset-showcase__preview">
        <ImagePreview
          className="preset-showcase__frame"
          activeId={current.id}
          images={PLAYER_PRESETS.map((preset) => ({
            id: preset.id,
            src: "preset-" + preset.id,
            alt: preset.name + " preset in the Riflay phone player",
            width: 800,
            height: 1720,
          }))}
        />
        <figcaption>{current.name} · phone player</figcaption>
      </figure>
    </section>
  );
}
