import { NUMBERS } from "@/lib/landing-content";

export function NumbersSection() {
  return (
    <section className="numbers" aria-label="Riflay in numbers">
      {NUMBERS.map((x) => (
        <div key={x.l} className="numbers__item reveal">
          <p className="numbers__n">{x.n}</p>
          <p className="numbers__l">{x.l}</p>
        </div>
      ))}
    </section>
  );
}
