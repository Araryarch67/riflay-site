import type { Viewport } from "next";
import { Roboto_Mono, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
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

// Material Symbols Rounded, only the icons the page uses (scripts/fetch-symbols.mjs makes the file), served from
// this site and preloaded: a stylesheet from fonts.googleapis.com blocked the first paint (~0.5 s). `block`: an
// icon's name never shows as text while the font loads.
const symbols = localFont({
  src: "./fonts/material-symbols-rounded.woff2",
  weight: "400 600",
  display: "block",
  variable: "--font-symbols",
  preload: true,
});

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
      className={`${spaceGrotesk.variable} ${robotoMono.variable} ${symbols.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: INIT }} />
      </head>
      <body>
        <Splash />
        {children}
      </body>
    </html>
  );
}
