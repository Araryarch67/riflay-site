import type { Viewport } from "next";
import { Roboto_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { siteMetadata } from "@/lib/seo";
import { Splash } from "@/components/organisms/Splash";

// Space Grotesk for all text, Roboto Mono for commands; self-hosted by next/font at build time.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

// Material Symbols subset to the icons the page uses; names must stay in alphabetical order.
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
].sort();
const SYMBOLS_URL =
  "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,400..600,0..1,0" +
  `&icon_names=${ICONS.join(",")}&display=block`;

// Runs before paint: restores the saved theme and seed colour, turns on scroll reveals, and skips the intro
// (components/Splash.tsx) when it already played this visit or motion is reduced.
const INIT = `try{var d=document.documentElement;d.classList.add('js');if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('motion-enabled');setTimeout(function(){if(!d.dataset.motionBooted)d.classList.remove('motion-enabled')},5000)};var t=localStorage.getItem('riflay-theme');if(t==='light'||t==='dark')d.dataset.theme=t;var h=localStorage.getItem('riflay-hue');if(h&&/^\\d{1,3}$/.test(h))d.style.setProperty('--seed-hue',h)}catch(e){}try{if(sessionStorage.getItem('riflay-splash')||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('no-splash')}catch(e){}`;

export const metadata = siteMetadata;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff8f5" },
    { media: "(prefers-color-scheme: dark)", color: "#1a120e" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${robotoMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: INIT }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link rel="stylesheet" href={SYMBOLS_URL} />
      </head>
      <body>
        <Splash />
        {children}
      </body>
    </html>
  );
}
