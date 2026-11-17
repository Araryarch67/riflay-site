/**
 * Each screenshot's widths in public/screens: smaller copies (name-w720.webp, name-w960.webp) and the original
 * (last). A phone gets a copy its screen needs instead of the 1440-wide original.
 * Make the copies with `python scripts/screens.py`, then list a new screenshot's widths here.
 */
export const SCREEN_WIDTHS: Record<string, number[]> = {
  "desktop-bar-classic": [720, 960, 1440],
  "desktop-bar-compact": [720, 960, 1440],
  "desktop-bar-minimal": [720, 960, 1440],
  "download-as": [720, 960, 1440],
  "downloads": [720, 960, 1440],
  "duplicates": [720, 960, 1440],
  "home": [720, 960, 1440],
  "listen-qr": [720, 960, 1440],
  "listen-together": [720, 960, 1440],
  "lyrics": [720, 960, 1440],
  "phone-bar-capsule": [720, 800],
  "phone-bar-centre": [720, 800],
  "phone-bar-classic": [720, 800],
  "phone-bar-dock": [720, 800],
  "phone-bar-floating": [720, 800],
  "phone-bar-glass": [720, 800],
  "phone-bar-material": [720, 800],
  "phone-bar-minimal": [720, 800],
  "phone-bar-text": [720, 800],
  "phone-bar-underline": [720, 800],
  "phone-home": [720, 800],
  "phone-library": [720, 800],
  "phone-settings": [720, 800],
  "phone": [720, 800],
  "playlist": [720, 960, 1440],
  "preset-classic": [720, 800],
  "preset-kawaii": [720, 800],
  "preset-liquid-kawaii": [720, 800],
  "preset-liquid-stacked": [720, 800],
  "preset-stacked": [720, 800],
  "settings-downloads": [720, 960, 1440],
  "settings-power": [720, 960, 1440],
  "settings": [720, 960, 1440],
  "signal-path": [720, 960, 1440],
  "sleep-timer": [720, 960, 1440],
  "smart-playlists": [720, 960, 1440],
  "sound": [720, 960, 1440],
  "stats": [720, 960, 1440],
  "visualizer-desktop-bars": [720, 960, 1440],
  "visualizer-desktop-dots": [720, 960, 1440],
  "visualizer-desktop-line": [720, 960, 1440],
  "visualizer-desktop-mirror": [720, 960, 1440],
  "visualizer-desktop-orbit": [720, 960, 1440],
  "visualizer-desktop-peaks": [720, 960, 1440],
  "visualizer-desktop-petals": [720, 960, 1440],
  "visualizer-desktop-pulse": [720, 960, 1440],
  "visualizer-desktop-twinWaves": [720, 960, 1440],
  "visualizer-desktop-wave": [1440],
  "visualizer-phone-bars": [720, 800],
  "visualizer-phone-dots": [720, 800],
  "visualizer-phone-line": [720, 800],
  "visualizer-phone-mirror": [720, 800],
  "visualizer-phone-orbit": [720, 800],
  "visualizer-phone-peaks": [720, 800],
  "visualizer-phone-petals": [720, 800],
  "visualizer-phone-pulse": [720, 800],
  "visualizer-phone-twinWaves": [720, 800],
  "visualizer-phone-wave": [800],
};

/** srcSet for a screenshot: every width it has. */
export function screenSrcSet(name: string): string | undefined {
  const widths = SCREEN_WIDTHS[name];
  if (!widths || widths.length < 2) return undefined;
  const full = widths[widths.length - 1];
  return widths.map((w) => `/screens/${name}${w === full ? "" : `-w${w}`}.webp ${w}w`).join(", ");
}

/** How wide a screenshot shows: most of a phone's width (inside the page's margins), up to the full width on a
 *  computer. */
export const SCREEN_SIZES = "(max-width: 760px) 85vw, 1440px";
