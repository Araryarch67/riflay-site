import type { StyleSet } from "./types";

export const VISUALIZERS: [string, string][] = [
  ["wave", "Wave"],
  ["bars", "Bars"],
  ["line", "Line"],
  ["dots", "Dots"],
  ["mirror", "Mirror"],
  ["twinWaves", "Twin waves"],
  ["pulse", "Pulse"],
  ["orbit", "Orbit"],
  ["petals", "Petals"],
  ["peaks", "Peaks"],
];

export const TAB_BARS: [string, string][] = [
  ["classic", "Classic"],
  ["material", "Material"],
  ["underline", "Underline"],
  ["minimal", "Minimal"],
  ["text", "Text only"],
  ["floating", "Floating"],
  ["capsule", "Capsule"],
  ["dock", "Dock"],
  ["glass", "Liquid glass"],
];

export const DESKTOP_BARS: [string, string][] = [
  ["classic", "Classic"],
  ["compact", "Compact"],
  ["minimal", "Minimal"],
];

export const STYLE_SETS: StyleSet[] = [
  {
    id: "visualizer",
    label: "Visualizer",
    phone: true,
    styles: VISUALIZERS.map(([id, name]) => ({
      id,
      name,
      src: `visualizer-phone-${id}`,
    })),
  },
  {
    id: "tabbar",
    label: "Tab bar on phones",
    phone: true,
    styles: TAB_BARS.map(([id, name]) => ({
      id,
      name,
      src: `phone-bar-${id}`,
    })),
  },
  {
    id: "desktopbar",
    label: "Desktop player bar",
    styles: DESKTOP_BARS.map(([id, name]) => ({
      id,
      name,
      src: `desktop-bar-${id}`,
    })),
  },
];
