"use client";
type Option = { id: string; label: string };
type Props = {
  options: readonly Option[];
  value: string;
  onChange: (id: string) => void;
  label: string;
  className?: string;
};
/** Equal-width segments; text may wrap inside a segment, never into another row. */
export function SegmentedControl({
  options,
  value,
  onChange,
  label,
  className = "",
}: Props) {
  return (
    <div
      className={`segmented ${className}`}
      role="radiogroup"
      aria-label={label}
    >
      {options.map((option, index) => (
        <button
          key={option.id}
          type="button"
          role="radio"
          aria-checked={option.id === value}
          tabIndex={option.id === value ? 0 : -1}
          onClick={() => onChange(option.id)}
          onKeyDown={(event) => {
            let next = index;
            if (event.key === "ArrowRight" || event.key === "ArrowDown")
              next = (index + 1) % options.length;
            else if (event.key === "ArrowLeft" || event.key === "ArrowUp")
              next = (index - 1 + options.length) % options.length;
            else if (event.key === "Home") next = 0;
            else if (event.key === "End") next = options.length - 1;
            else return;
            event.preventDefault();
            onChange(options[next].id);
            event.currentTarget.parentElement
              ?.querySelectorAll<HTMLButtonElement>("button")
              [next]?.focus();
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
