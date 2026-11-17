import { PLAYER_PRESETS } from "@/lib/presets";
type Preset = (typeof PLAYER_PRESETS)[number];
export function PresetDetails({ preset }: { preset: Preset }) {
  return (
    <div className="preset-details" aria-live="polite" aria-atomic="true">
      <div key={preset.id} className="preset-details__copy">
        <p className="title-large">{preset.name}</p>
        <p className="body-large muted">{preset.description}</p>
        <ul className="preset-details__traits" aria-label="Preset features">
          {preset.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
