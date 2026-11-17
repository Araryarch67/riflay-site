import type { Metadata } from "next";
import type { Release } from "./release";
import { FAQ } from "./faq";
import { REPO } from "./site";

/** One public origin for every crawler-facing URL; previews never become canonical. */
export const SITE_URL = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "https://riflay.my.id",
).origin;
export const IS_PREVIEW = process.env.VERCEL_ENV === "preview";
export const SITE_TITLE = "Riflay — Free, open-source hi-fi music player";
export const SITE_DESCRIPTION =
  "Play local music and YouTube Music together with Riflay. Free and open source, with lossless audio, synced lyrics, music videos and customizable player presets.";
export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: "%s | Riflay" },
  description: SITE_DESCRIPTION,
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
