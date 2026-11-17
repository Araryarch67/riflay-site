"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/atoms/Icon";

/*
 * Riflay's desktop island, rebuilt from lib/ui/player/mini_window.dart (_IslandView):
 * - closed: a 300 × 44 pill (40 docked), black (#0A0A0C) with 16% of the cover's colour,
 *   a 28px round cover, the title in semibold, five accent bars 22 × 16;
 * - pointed at for 160 ms (or clicked) it opens into the 460 × 224 deck on springs, width a little
 *   ahead of height and overshooting about 5%; it closes 420 ms after the pointer leaves, without a bounce;
 * - the row blurs away at once (blur 6, scale 1.06), the deck comes into focus over the second half
 *   (blur 10, scale 0.9 → 1); the corner radius goes from half the height to 28; the shadow grows with it;
 * - docked: flat against the top edge, round below, like a notch.
 */

const CLOSED_W = 300;
const OPEN_W = 460;
const OPEN_H = 224;
const RADIUS = 28;

type Spring = { k: number; c: number };
const spring = (stiffness: number, ratio: number): Spring => ({
  k: stiffness,
  c: 2 * ratio * Math.sqrt(stiffness),
});
const OPEN_WIDTH = spring(420, 0.68);
const OPEN_HEIGHT = spring(300, 0.7);
const CLOSE = spring(360, 0.92);

const clamp = (v: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function IslandDemo() {
  const [docked, setDocked] = useState(false);
  const [open, setOpen] = useState(false);
  const pill = useRef<HTMLDivElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const deck = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const sim = useRef({ w: 0, h: 0, vw: 0, vh: 0, target: 0, raf: 0, last: 0 });
  const timer = useRef<number | undefined>(undefined);
  const touched = useRef(false);
  const dockedRef = useRef(docked);
  dockedRef.current = docked;

  const paint = useCallback(() => {
    const s = sim.current;
    const closedH = dockedRef.current ? 40 : 44;
    const p = clamp(s.h);
    const w = lerp(CLOSED_W, OPEN_W, s.w);
    const h = lerp(closedH, OPEN_H, s.h);
    const r = lerp(closedH / 2, RADIUS, p);
    const el = pill.current;
    if (!el) return;
    el.style.width = `${w}px`;
    el.style.height = `${h}px`;
    el.style.borderRadius = dockedRef.current ? `0 0 ${r}px ${r}px` : `${r}px`;
    el.style.boxShadow = `0 3px 8px rgb(0 0 0 / ${0.3 * p})`;
    const closed = clamp(1 - p * 3);
    const opened = clamp((p - 0.35) / 0.65);
    morph(row.current, closed, 6, 1.06);
    morph(deck.current, opened, 10, 0.9);
  }, []);

  const step = useCallback(
    (now: number) => {
      const s = sim.current;
      const dt = Math.min(0.032, (now - (s.last || now)) / 1000) || 1 / 60;
      s.last = now;
      const opening = s.target === 1;
      // Semi-implicit Euler in small steps: stable for these stiffnesses.
      const n = 4;
      for (let i = 0; i < n; i++) {
        const t = dt / n;
        const sw = opening ? OPEN_WIDTH : CLOSE;
        const sh = opening ? OPEN_HEIGHT : CLOSE;
        s.vw += (-sw.k * (s.w - s.target) - sw.c * s.vw) * t;
        s.w += s.vw * t;
        s.vh += (-sh.k * (s.h - s.target) - sh.c * s.vh) * t;
        s.h += s.vh * t;
      }
      paint();
      const settled =
        Math.abs(s.w - s.target) < 0.0005 &&
        Math.abs(s.h - s.target) < 0.0005 &&
        Math.abs(s.vw) < 0.01 &&
        Math.abs(s.vh) < 0.01;
      if (settled) {
        s.w = s.h = s.target;
        s.vw = s.vh = 0;
        s.raf = 0;
        s.last = 0;
        paint();
      } else {
        s.raf = requestAnimationFrame(step);
      }
    },
    [paint],
  );

  const set = useCallback(
    (next: boolean) => {
      setOpen(next);
      const s = sim.current;
      s.target = next ? 1 : 0;
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        s.w = s.h = s.target;
        s.vw = s.vh = 0;
        paint();
        return;
      }
      if (!s.raf) s.raf = requestAnimationFrame(step);
    },
    [paint, step],
  );

  const later = useCallback(
    (ms: number, next: boolean) => {
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => set(next), ms);
    },
    [set],
  );

  // Until someone points at it, it shows itself: opens and folds back now and then while in view.
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let loop: number | undefined;
    let visible = false;
    const tick = () => {
      if (touched.current || !visible) return;
      set(sim.current.target !== 1);
      loop = window.setTimeout(tick, sim.current.target === 1 ? 3200 : 2200);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      window.clearTimeout(loop);
      if (visible) loop = window.setTimeout(tick, 1200);
    });
    if (stage.current) io.observe(stage.current);
    return () => {
      io.disconnect();
      window.clearTimeout(loop);
    };
  }, [set]);

  // Fit the 460px deck on narrow screens.
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const scale = Math.min(1, (e.contentRect.width - 16) / OPEN_W);
      el.style.setProperty("--island-scale", String(scale));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => paint(), [docked, paint]);
  useEffect(
    () => () => {
      cancelAnimationFrame(sim.current.raf);
      window.clearTimeout(timer.current);
    },
    [],
  );

  const take = () => {
    touched.current = true;
  };

  return (
    <div className="island-stage" ref={stage}>
      <div className="island-stage__screen" data-docked={docked}>
        <div className="island-stage__scale">
          <div
            ref={pill}
            className="island"
            role="button"
            tabIndex={0}
            aria-expanded={open}
            aria-label={
              open
                ? "Island, open. Press to close"
                : "Island: Lantern Row by Marlow Quartet. Press to open"
            }
            onPointerEnter={(e) => {
              if (e.pointerType !== "mouse") return;
              take();
              later(160, true);
            }}
            onPointerLeave={(e) => {
              if (e.pointerType !== "mouse") return;
              later(420, false);
            }}
            onClick={() => {
              take();
              later(0, !sim.current.target);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                take();
                set(!open);
              } else if (e.key === "Escape") set(false);
            }}
          >
            <div className="island__row" ref={row} aria-hidden="true">
              <img
                src="/covers/lantern-row.webp"
                width={28}
                height={28}
                alt=""
              />
              <b>Lantern Row</b>
              <span className="island__bars">
                <i />
                <i />
                <i />
                <i />
                <i />
              </span>
            </div>
            <div className="island__deck" ref={deck} aria-hidden="true">
              <div className="deck__top">
                <img
                  className="deck__cover"
                  src="/covers/lantern-row.webp"
                  width={128}
                  height={128}
                  alt=""
                />
                <div className="deck__info">
                  <div className="deck__title">
                    <b>Lantern Row</b>
                    <Icon name="lyrics" className="deck__on" />
                    <Icon name="picture_in_picture_alt" />
                    <Icon name="open_in_full" />
                  </div>
                  <p className="deck__artist">
                    Marlow Quartet <span>FLAC 24/44.1</span>
                  </p>
                  <p className="deck__lyric">
                    Hold the light a little longer now
                  </p>
                </div>
              </div>
              <div className="deck__seek">
                <span />
              </div>
              <div className="deck__controls">
                <div className="deck__side">
                  <Icon name="shuffle" />
                  <Icon name="repeat" />
                </div>
                <div className="deck__transport">
                  <Icon name="skip_previous" />
                  <span className="deck__play">
                    <Icon name="pause" />
                  </span>
                  <Icon name="skip_next" />
                </div>
                <div className="deck__side deck__side--end">
                  <Icon name="volume_up" />
                  <span className="deck__vol">
                    <span />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="segmented"
        role="radiogroup"
        aria-label="Island placement"
      >
        {[
          { v: false, label: "Floating" },
          { v: true, label: "Docked" },
        ].map((o) => (
          <button
            key={o.label}
            type="button"
            role="radio"
            aria-checked={docked === o.v}
            onClick={() => setDocked(o.v)}
          >
            {docked === o.v && <Icon name="check" />}
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function morph(
  el: HTMLElement | null,
  amount: number,
  blur: number,
  scale: number,
) {
  if (!el) return;
  const sigma = (1 - amount) * blur;
  el.style.opacity = String(amount);
  el.style.transform = `scale(${lerp(scale, 1, amount)})`;
  el.style.filter = sigma > 0.1 ? `blur(${sigma}px)` : "";
  el.style.visibility = amount <= 0 ? "hidden" : "visible";
}
