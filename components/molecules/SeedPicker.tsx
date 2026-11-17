"use client";

import { useEffect, useState } from "react";
import { showSnackbar } from "@/components/molecules/Snackbar";

const SEEDS = [
  { hue: 50, name: "Riflay orange" },
  { hue: 145, name: "Green" },
  { hue: 200, name: "Teal" },
  { hue: 265, name: "Blue" },
  { hue: 310, name: "Violet" },
  { hue: 0, name: "Pink" },
];

/** Re-seeds the whole page's M3 scheme from one hue, like Material You's dynamic colour. */
export function SeedPicker() {
  const [hue, setHue] = useState(50);

  useEffect(() => {
    const v = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue("--seed-hue"),
      10,
    );
    if (!Number.isNaN(v)) setHue(v);
  }, []);

  function pick(index: number, focus = false) {
    const s = SEEDS[index];
    setHue(s.hue);
    document.documentElement.style.setProperty("--seed-hue", String(s.hue));
    try {
      if (s.hue === 50) localStorage.removeItem("riflay-hue");
      else localStorage.setItem("riflay-hue", String(s.hue));
    } catch {}
    showSnackbar(`Page re-coloured from ${s.name}`);
    if (focus)
      document.querySelectorAll<HTMLElement>(".swatch")[index]?.focus();
  }

  function onKey(e: React.KeyboardEvent, i: number) {
    const step = ["ArrowRight", "ArrowDown"].includes(e.key)
      ? 1
      : ["ArrowLeft", "ArrowUp"].includes(e.key)
        ? -1
        : 0;
    if (!step) return;
    e.preventDefault();
    pick((i + step + SEEDS.length) % SEEDS.length, true);
  }

  return (
    <div
      className="seed-picker__swatches"
      role="radiogroup"
      aria-labelledby="seed-label"
    >
      {SEEDS.map((s, i) => (
        <button
          key={s.hue}
          type="button"
          role="radio"
          className="swatch"
          style={{ "--sw": s.hue } as React.CSSProperties}
          aria-label={s.name}
          aria-checked={hue === s.hue}
          tabIndex={hue === s.hue ? 0 : -1}
          onClick={() => pick(i)}
          onKeyDown={(e) => onKey(e, i)}
        />
      ))}
    </div>
  );
}
