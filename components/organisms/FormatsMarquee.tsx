import { MARQUEE } from "@/lib/landing-content";

export function FormatsMarquee() {
  return (
    <div
      className="marquee"
      role="region"
      aria-label="Formats and sources Riflay plays"
    >
      <div className="marquee__track">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1}>
            {MARQUEE.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
