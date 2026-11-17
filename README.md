# Riflay website

The landing page for [Riflay](https://github.com/Araryarch67/Riflay), the open-source hi-fi music player.
Next.js (App Router), designed with Material 3: colour roles generated from one seed (light and dark), the M3
type scale (set in Space Grotesk), shape, elevation, state layers and emphasized motion. Smooth scrolling with
Lenis.

## Run it

```sh
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Deploy

Import the repository in Vercel; it detects Next.js, no settings needed. Optional environment variables:

- `NEXT_PUBLIC_SITE_URL`: a custom domain, for Open Graph links.
- `GITHUB_TOKEN`: raises GitHub's API rate limit for the release lookup (not needed at one lookup an hour).

## How it stays current

- `lib/release.ts` reads Riflay's latest GitHub release: the version and date in the hero, and every download
  link and file size in Get Riflay. The page is regenerated at most once an hour (`revalidate` in
  `app/page.tsx`); without GitHub it falls back to `APP_VERSION` in `lib/site.ts` and
  `/releases/latest/download/<file>` links.
- `lib/features.ts` is the full feature list, from the Features table in Riflay's README. Keep the two in step.

## Screenshots

`public/screens/` holds screenshots from the app's own generator,
`integration_test/readme_screenshots_test.dart` in the Riflay repo, all in the default theme (Dynamic, dark) with
its made-up library. To take them again on Windows, from a copy of the Riflay repo:

```sh
flutter test integration_test/readme_screenshots_test.dart -d windows --dart-define=SHOTS=C:/shots
```

For these, the generator was changed in the copy only: brightness back to dark after the Matugen step, the phone
step on the default layout (capsule tab bar, default player), and "Dusk Signals" playing for the phone, visualizer
and desktop-bar shots. Convert with `ffmpeg -i in.png -c:v libwebp -quality 80 out.webp`. A screenshot missing from
`public/screens/` is left out of the page.

## Pieces rebuilt from the app

- `components/organisms/Splash.tsx`: the launch intro, from `lib/ui/widgets/desktop_intro.dart` (same logo paths and
  timeline). Plays once per visit, never with reduced motion; a click or key skips it.
- `components/organisms/PresetShowcase.tsx`: all five built-in presets, with screenshots rendered from the app's actual Now Playing page and `PlayerPreset.all`, using the made-up Lantern Row song and isolated preferences.
- `components/organisms/IslandDemo.tsx`: the desktop island, from `lib/ui/player/mini_window.dart` (sizes, springs,
  timings and the blur hand-over between the pill and the deck).
- `public/covers/lantern-row.webp`: the made-up cover the island shows, cut from a screenshot.

## License

AGPL-3.0, like Riflay.

## Architecture

The App Router route loads release data and renders the LandingPage template. Components follow atomic design: atoms hold small primitives (icons, screenshots, radio chips, motion text); molecules compose controls and previews; organisms own complete sections and their interactions; templates compose the page. Providers hold page-wide browser effects. Shared content and types live in lib; server filesystem screenshot checks stay out of client components. Styles for the customization controls live next to their owning components. Global tokens and shared layout live in styles/base.css, with motion rules in styles/motion.css.

Use Screenshot for screenshot assets: every image has a 2px radius, without a phone bezel. Preset screenshots are actual app renders. Motion uses IntersectionObserver, CSS transforms and the existing Lenis provider; reduced-motion preferences bypass choreography.

## Search and sharing

Production canonical origin is https://riflay.my.id. NEXT_PUBLIC_SITE_URL may override it for a deliberate domain migration; never set it to a preview URL. Vercel preview deployments receive noindex metadata and disallow crawling. app/robots.ts and app/sitemap.ts share the same origin. app/opengraph-image.tsx generates a local 1200×630 social card. lib/seo.ts owns metadata and the WebSite, SoftwareApplication and FAQ structured data; FAQ answers are shared with visible content. Set GOOGLE_SITE_VERIFICATION only with your actual Search Console token. No rankings or rich-result placement are guaranteed by metadata.
