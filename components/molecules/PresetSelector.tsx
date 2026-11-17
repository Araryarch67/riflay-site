import { RadioChip } from "@/components/atoms/RadioChip";
import { PLAYER_PRESETS } from "@/lib/presets";
type Props = { name: string; selected: string; onSelect: (id: string) => void };
export function PresetSelector({ name, selected, onSelect }: Props) {
  return (
    <fieldset className="preset-selector">
      <legend className="label-large">Player preset</legend>
      {PLAYER_PRESETS.map((preset) => (
        <RadioChip
          key={preset.id}
          name={name}
          value={preset.id}
          label={preset.name}
          checked={preset.id === selected}
          onSelect={onSelect}
        />
      ))}
    </fieldset>
  );
}
