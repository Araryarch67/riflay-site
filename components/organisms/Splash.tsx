"use client";

import { useEffect, useRef } from "react";

/*
 * The app's launch intro, rebuilt from lib/ui/widgets/desktop_intro.dart: the mark's four pieces are drawn by a pen
 * with a glowing orange tip, one after another, then filled in; at the impact the mark punches (a damped spring)
 * and sends out a shock ring and its echo; a glint sweeps it; then it zooms out of the way. About 2.25 s, the same
 * timeline in milliseconds. A click or any key skips to the end. Shown once per visit (sessionStorage), never with
 * reduced motion; the overlay is in the server HTML, so the page never flashes before it.
 */

// The logo's pieces, in its design units (centre 720, 720), as in assets/icon/riflay-transparent.svg.
const PIECES = [
  {
    d: "M580 468L691 579.5L552 719.5L691 859.5L580 971L395.0 786.0A94 94 0 0 1 395.0 653.0Z",
    accent: false,
  }, // left
  { d: "M720 328L831 439.5L720 551L609 439.5Z", accent: false }, // top
  { d: "M720 888L831 999.5L720 1111L609 999.5Z", accent: false }, // bottom
  {
    d: "M859 468L1111 719.5L859 971L748 859.5L887 719.5L748 579.5Z",
    accent: true,
  }, // right
];

const DRAW_FOR = 900,
  DRAW_EVERY = 90;
const FILL_FROM = 700,
  FILL_FOR = 340,
  FILL_EVERY = 90;
const IMPACT = FILL_FROM + 3 * FILL_EVERY + FILL_FOR;
const HOLD = 1900,
  END = 2250;
const PEN = 20;
const MARK = 716; // the mark's width in design units; rings are sized from it as the app sizes them from 150 px
const ORANGE = "#FF7A1A";

const seg = (ms: number, a: number, b: number) =>
  Math.min(1, Math.max(0, (ms - a) / (b - a)));
const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInCubic = (t: number) => t * t * t;
const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

export function Splash() {
  const root = useRef<HTMLDivElement>(null);
  const group = useRef<SVGGElement>(null);
  const strokes = useRef<(SVGPathElement | null)[]>([]);
  const fills = useRef<(SVGPathElement | null)[]>([]);
  const tips = useRef<(SVGGElement | null)[]>([]);
  const rings = useRef<(SVGCircleElement | null)[]>([]);
  const glint = useRef<SVGRectElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (document.documentElement.classList.contains("no-splash")) {
      el.remove();
      return;
    }
    try {
      sessionStorage.setItem("riflay-splash", "1");
    } catch {}
    document.documentElement.classList.add("splash-on");

    const lengths = strokes.current.map((p) => p?.getTotalLength() ?? 0);
    strokes.current.forEach(
      (p, i) => p && (p.style.strokeDasharray = `${lengths[i]} ${lengths[i]}`),
    );

    let start = performance.now();
    let raf = 0;
    let finished = false;

    const frame = (now: number) => {
      const ms = now - start;
      // Pieces: outline by pen, then fill in as the outline fades.
      PIECES.forEach((_, i) => {
        const drawn = easeInOutCubic(
          seg(ms, i * DRAW_EVERY, i * DRAW_EVERY + DRAW_FOR),
        );
        const filled = easeOutCubic(
          seg(
            ms,
            FILL_FROM + i * FILL_EVERY,
            FILL_FROM + i * FILL_EVERY + FILL_FOR,
          ),
        );
        const stroke = strokes.current[i],
          fill = fills.current[i],
          tip = tips.current[i];
        if (stroke) {
          stroke.style.strokeDashoffset = String(lengths[i] * (1 - drawn));
          stroke.style.opacity = String(drawn > 0 ? 1 - filled : 0);
        }
        if (fill) fill.style.opacity = String(filled);
        if (tip && stroke) {
          const on = drawn > 0 && drawn < 1 && filled < 1;
          tip.style.opacity = on ? String(1 - filled) : "0";
          if (on) {
            const p = stroke.getPointAtLength(lengths[i] * drawn);
            tip.setAttribute("transform", `translate(${p.x} ${p.y})`);
          }
        }
      });

      // Punch: a damped spring kicked at the impact.
      const pt = seg(ms, IMPACT, IMPACT + 380);
      const punch =
        pt > 0 ? 0.08 * Math.exp(-5 * pt) * Math.sin(3 * Math.PI * pt) : 0;
      group.current?.setAttribute(
        "transform",
        `translate(720 720) scale(${1 + punch}) translate(-720 -720)`,
      );

      // The shock ring and its echo.
      [
        [0, 0.75],
        [90, 0.35],
      ].forEach(([delay, strength], i) => {
        const ring = rings.current[i];
        if (!ring) return;
        const t = seg(ms, IMPACT + delay, IMPACT + delay + 520);
        const e = easeOutCubic(t);
        ring.setAttribute("r", String(MARK * (0.5 + e)));
        ring.style.strokeWidth = String((6 * (1 - e) + 0.5) * (MARK / 150));
        ring.style.opacity = String(t > 0 && t < 1 ? strength * (1 - t) : 0);
      });

      // The glint sweeping the mark.
      const g = seg(ms, IMPACT + 120, IMPACT + 560);
      if (glint.current) {
        glint.current.style.opacity = g > 0 && g < 1 ? "1" : "0";
        glint.current.setAttribute(
          "x",
          String(395 - 360 - 260 + (716 + 720) * easeInOutSine(g)),
        );
      }

      // Out of the way: zoom and fade.
      const exit = easeInCubic(seg(ms, HOLD, END));
      el.style.opacity = String(1 - exit);
      el.style.setProperty("--splash-scale", String(1 + 0.14 * exit));

      if (ms < END) raf = requestAnimationFrame(frame);
      else done();
    };

    const done = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("splash-on");
      el.remove();
      window.dispatchEvent(new Event("riflay:intro-end"));
    };

    // A click or any key skips to the held, finished mark.
    const skip = () => {
      const ms = performance.now() - start;
      if (ms < HOLD) start = performance.now() - HOLD;
    };
    el.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", skip);
    raf = requestAnimationFrame(frame);
    const failsafe = window.setTimeout(done, END + 1500);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(failsafe);
      el.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
      document.documentElement.classList.remove("splash-on");
    };
  }, []);

  return (
    <div className="splash" ref={root} role="img" aria-label="Riflay">
      <svg
        className="splash__mark"
        viewBox="-139 -139 1718 1718"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="splash-glint" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0.35" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#ffe3cf" stopOpacity="0.85" />
            <stop offset="0.65" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <clipPath id="splash-clip">
            {PIECES.map((p) => (
              <path key={p.d} d={p.d} />
            ))}
          </clipPath>
          <filter id="splash-blur" x="-2" y="-2" width="5" height="5">
            <feGaussianBlur stdDeviation={PEN * 1.6} />
          </filter>
        </defs>
        {[0, 1].map((i) => (
          <circle
            key={i}
            ref={(el) => {
              rings.current[i] = el;
            }}
            className="splash__ring"
            cx="720"
            cy="720"
            r="358"
          />
        ))}
        <g ref={group}>
          {PIECES.map((p, i) => (
            <g key={p.d}>
              <path
                ref={(el) => {
                  fills.current[i] = el;
                }}
                d={p.d}
                className={
                  p.accent
                    ? "splash__fill splash__fill--accent"
                    : "splash__fill"
                }
              />
              <path
                ref={(el) => {
                  strokes.current[i] = el;
                }}
                d={p.d}
                className={
                  p.accent
                    ? "splash__stroke splash__stroke--accent"
                    : "splash__stroke"
                }
                strokeWidth={PEN}
              />
              <g
                ref={(el) => {
                  tips.current[i] = el;
                }}
                className="splash__tip"
              >
                <circle
                  r={PEN * 2.4}
                  fill={ORANGE}
                  opacity="0.55"
                  filter="url(#splash-blur)"
                />
                <circle r={PEN * 0.8} fill="#fff" />
              </g>
            </g>
          ))}
          <rect
            ref={glint}
            className="splash__glint"
            x="0"
            y="200"
            width="520"
            height="1040"
            fill="url(#splash-glint)"
            clipPath="url(#splash-clip)"
          />
        </g>
      </svg>
    </div>
  );
}
