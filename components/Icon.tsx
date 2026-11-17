/** A Material Symbols Rounded glyph, decorative (hidden from assistive tech). */
export function Icon({ name, className = "" }: { name: string; className?: string }) {
  return (
    <span className={`ms ${className}`} aria-hidden="true">
      {name}
    </span>
  );
}
