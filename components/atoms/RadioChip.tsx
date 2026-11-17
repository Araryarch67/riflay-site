type Props = {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onSelect: (value: string) => void;
};
/** A native radio input retains arrow-key navigation and an accessible label. */
export function RadioChip({ name, value, label, checked, onSelect }: Props) {
  return (
    <label className="radio-chip">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onSelect(value)}
      />
      <span className="fchip">{label}</span>
    </label>
  );
}
