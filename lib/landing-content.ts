import type { GalleryShot } from "./types";

export const GALLERY: GalleryShot[] = [
  { src: "playlist", caption: "Playlists" },
  { src: "phone-home", caption: "Home, on a phone", phone: true },
  { src: "smart-playlists", caption: "Smart playlists" },
  { src: "stats", caption: "Listening stats" },
  { src: "phone", caption: "The player, on a phone", phone: true },
  { src: "downloads", caption: "Downloads" },
  { src: "sleep-timer", caption: "Sleep timer" },
  { src: "phone-library", caption: "Library, on a phone", phone: true },
  { src: "duplicates", caption: "Duplicate finder" },
  { src: "settings", caption: "Settings" },
  { src: "phone-settings", caption: "Settings, on a phone", phone: true },
];

export const RECOMMENDED: Record<string, string> = {
  windows: "Riflay-windows-x64-setup.exe",
  mac: "Riflay-macos.dmg",
  linux: "Riflay-linux-x86_64.AppImage",
  android: "Riflay-android-arm64.apk",
  ios: "Riflay-ios-unsigned.ipa",
};

export const MARQUEE = [
  "FLAC",
  "ALAC",
  "DSD",
  "SACD ISO",
  "WavPack",
  "APE",
  "Opus",
  "AIFF",
  "YouTube Music",
  "SoundCloud",
  "Monochrome",
  "Bit-perfect",
  "ASIO",
  "AutoEQ",
  "Cue sheets",
  "Last.fm",
  "ListenBrainz",
];

export const NUMBERS = [
  { n: "5", l: "systems, one app" },
  { n: "11", l: "audio formats, DSD included" },
  { n: "13", l: "themes, or your cover's colours" },
  { n: "9", l: "free lyric sources" },
];
