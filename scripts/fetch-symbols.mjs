// Remakes app/fonts/material-symbols-rounded.woff2: Material Symbols Rounded cut down to the icons below (the ones
// the page uses). Add an icon's name here (alphabetical), then run:  node scripts/fetch-symbols.mjs
import { writeFile } from "node:fs/promises";

const ICONS = [
  "android",
  "arrow_forward",
  "auto_awesome",
  "brightness_auto",
  "check",
  "close",
  "code",
  "content_copy",
  "dark_mode",
  "desktop_windows",
  "devices",
  "download",
  "equalizer",
  "expand_less",
  "expand_more",
  "graphic_eq",
  "group",
  "insights",
  "laptop_mac",
  "library_music",
  "light_mode",
  "lyrics",
  "menu",
  "merge",
  "music_video",
  "palette",
  "open_in_full",
  "pause",
  "phone_iphone",
  "picture_in_picture_alt",
  "play_circle",
  "repeat",
  "schedule",
  "search",
  "shuffle",
  "skip_next",
  "skip_previous",
  "speaker",
  "terminal",
  "touch_app",
  "tune",
  "volume_up",
];

const css = await (
  await fetch(
    "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,400..600,0..1,0" +
      `&icon_names=${ICONS.join(",")}&display=block`,
    // A current browser's name, or Google sends an older font format.
    { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140.0 Safari/537.36" } },
  )
).text();
const url = css.match(/src: url\((https:[^)]+)\) format\('woff2'\)/)?.[1];
if (!url) throw new Error(`No woff2 in Google's answer: ${css}`);
const font = Buffer.from(await (await fetch(url)).arrayBuffer());
await writeFile(new URL("../app/fonts/material-symbols-rounded.woff2", import.meta.url), font);
console.log(`material-symbols-rounded.woff2: ${ICONS.length} icons, ${font.length} bytes`);
