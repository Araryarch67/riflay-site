import type { Metadata } from "next";
import type { Release } from "./release";
import { FAQ } from "./faq";
import { REPO } from "./site";

/**
 * One public origin for every crawler-facing URL; previews never become canonical.
 * It must be the origin that serves the page: the host sends riflay.my.id to www.riflay.my.id (308), and a
 * canonical pointing at a redirect left the page unindexed ("Page with redirect" in Search Console).
 */
export const SITE_URL = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.riflay.my.id",
).origin;
export const IS_PREVIEW = process.env.VERCEL_ENV === "preview";
export const SITE_TITLE = "Riflay — Free, open-source hi-fi music player";
export const SITE_DESCRIPTION =
  "Play local music and YouTube Music together with Riflay. Free and open source, with lossless audio, synced lyrics, music videos and customizable player presets.";
/** What people search for to find an app like this: honest terms the page itself is about, nothing stuffed. */
export const SITE_KEYWORDS = [
  // The app
  "Riflay",
  "Riflay music player",
  "free music player",
  "open source music player",
  "free open source music player",
  "cross platform music player",
  // YouTube Music, as people search for a desktop or third-party app
  "YouTube Music desktop app",
  "YouTube Music desktop client",
  "YouTube Music app for Windows",
  "YouTube Music app for Linux",
  "YouTube Music app for macOS",
  "YouTube Music player with lyrics",
  "YouTube Music in FLAC",
  "YouTube Music lossless",
  // Sound quality
  "hi-fi music player",
  "hi-res audio player",
  "lossless music player",
  "lossless audio player",
  "FLAC player",
  "FLAC player for Windows",
  "FLAC player for Android",
  "ALAC player",
  "DSD player",
  "bit-perfect music player",
  "bit-perfect playback",
  "exclusive mode audio",
  "gapless playback",
  "crossfade music player",
  "music player with equalizer",
  // Lyrics and video
  "synced lyrics",
  "synced lyrics player",
  "word-by-word lyrics",
  "karaoke lyrics",
  "music player with lyrics",
  "music videos in music player",
  // Library and devices
  "local music player",
  "offline music player",
  "music library manager",
  "music tag editor",
  "music downloader",
  "Windows music player",
  "macOS music player",
  "Linux music player",
  "Android music player",
  "iOS music player",
  // Desktop and sharing
  "mini player always on top",
  "dynamic island music player",
  "listen together",
  "AirPlay and DLNA casting",
  "Discord Rich Presence music",
  "Last.fm scrobbling",
  // Look
  "Material 3 music player",
  "Material You music player",
  "customizable music player",
];

/** What the app does, as structured data reads it (each one shown on the page). */
export const FEATURE_LIST = [
  "Smart merge: YouTube Music songs with lossless FLAC of the same recording",
  "Local library with lossless and hi-res playback",
  "Synced and word-by-word karaoke lyrics",
  "Music videos in the player",
  "Desktop mini player and dynamic island",
  "Equalizer, crossfade, bit-perfect output and virtual speakers",
  "Listen together",
  "Downloads and library tools",
  "Player presets and Material 3 customization",
];

/** IndexNow's key: the file of that name in public/ proves the site is ours (scripts/indexnow.mjs). */
export const INDEXNOW_KEY = "fb4928981ca0b2563383a733bb6493ea";

export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: "%s | Riflay" },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: "Araryarch67", url: "https://github.com/Araryarch67" }],
  publisher: "Araryarch67",
  applicationName: "Riflay",
  category: "music",
  creator: "Araryarch67",
  alternates: { canonical: "/" },
  icons: { icon: "/icon/riflay-round.svg", apple: "/icon/master-1024.png" },
  robots: IS_PREVIEW
    ? { index: false, follow: false }
    : {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Riflay",
    locale: "en_US",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Riflay — Every song, in hi-fi.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image"],
  },
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
};

/** Keep FAQ answers identical to the visible content; never invent ratings or reviews. */
export function buildStructuredData(release: Release) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": SITE_URL + "/#website",
        url: SITE_URL + "/",
        name: "Riflay",
        description: SITE_DESCRIPTION,
        inLanguage: "en",
      },
      {
        "@type": "SoftwareApplication",
        "@id": SITE_URL + "/#app",
        name: "Riflay",
        url: SITE_URL + "/",
        description: SITE_DESCRIPTION,
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Windows, macOS, Linux, Android, iOS",
        featureList: FEATURE_LIST,
        keywords: SITE_KEYWORDS.join(", "),
        author: { "@type": "Person", name: "Araryarch67", url: "https://github.com/Araryarch67" },
        ...(release.date ? { datePublished: release.date } : {}),
        softwareVersion: release.version,
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        license: REPO + "/blob/main/LICENSE",
        sameAs: REPO,
        downloadUrl: release.url,
        screenshot: SITE_URL + "/screens/home.webp",
      },
      {
        "@type": "FAQPage",
        "@id": SITE_URL + "/#faq",
        mainEntity: FAQ.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  };
}
