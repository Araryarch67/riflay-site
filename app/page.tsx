import { existsSync } from "node:fs";
import path from "node:path";
import { CopySnippet } from "@/components/CopySnippet";
import { FeatureCatalog } from "@/components/FeatureCatalog";
import { FeatureStory, type StoryItem } from "@/components/FeatureStory";
import { HorizontalGallery, type GalleryShot } from "@/components/HorizontalGallery";
import { InstallTabs } from "@/components/InstallTabs";
import { Icon } from "@/components/Icon";
import { IslandDemo } from "@/components/IslandDemo";
import { PageEffects } from "@/components/PageEffects";
import { SeedPicker } from "@/components/SeedPicker";
import { SmoothScroll } from "@/components/SmoothScroll";
import { StylePicker, type StyleSet } from "@/components/StylePicker";
import { Snackbar } from "@/components/Snackbar";
import { TopAppBar } from "@/components/TopAppBar";
import { FEATURE_COUNT } from "@/lib/features";
import { asset, latestRelease } from "@/lib/release";
import { LATEST_RELEASE, PLATFORMS, REPO, SUPPORT } from "@/lib/site";

// Regenerate at most once an hour, so the version follows each new GitHub release.
export const revalidate = 3600;

/** Whether a screenshot is in public/screens; checked when the page is built, so a missing one is left out. */
const has = (src: string) => existsSync(path.join(process.cwd(), "public", "screens", `${src}.webp`));

// Screenshots come from the app's own generator (integration_test/readme_screenshots_test.dart), in the default
// theme (Dynamic, dark), with a made-up library.
const GALLERY: GalleryShot[] = [
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

// The file the big Download button fetches on each system, straight from the latest release.
const RECOMMENDED: Record<string, string> = {
  windows: "Riflay-windows-x64-setup.exe",
  mac: "Riflay-macos.dmg",
  linux: "Riflay-linux-x86_64.AppImage",
  android: "Riflay-android-arm64.apk",
  ios: "Riflay-ios-unsigned.ipa",
};

const VISUALIZERS = ["bars", "dots", "line", "mirror", "orbit", "peaks", "petals", "pulse", "twinWaves", "wave"];
const TAB_BARS = ["capsule", "classic", "dock", "floating", "glass", "material", "minimal", "text", "underline"];
const DESKTOP_BARS = ["classic", "compact", "minimal"];
const nice = (id: string) => (id === "twinWaves" ? "Twin waves" : id[0].toUpperCase() + id.slice(1));

const STYLE_SETS: StyleSet[] = [
  { id: "visualizer", label: "Visualizer", phone: true, styles: VISUALIZERS.map((v) => ({ id: v, name: nice(v), src: `visualizer-phone-${v}` })) },
  { id: "tabbar", label: "Phone tab bar", phone: true, styles: TAB_BARS.map((v) => ({ id: v, name: nice(v), src: `phone-bar-${v}` })) },
  { id: "desktopbar", label: "Desktop player bar", styles: DESKTOP_BARS.map((v) => ({ id: v, name: nice(v), src: `desktop-bar-${v}` })) },
];

const MARQUEE = [
  "FLAC", "ALAC", "DSD", "SACD ISO", "WavPack", "APE", "Opus", "AIFF", "YouTube Music", "SoundCloud",
  "Monochrome", "Bit-perfect", "ASIO", "AutoEQ", "Cue sheets", "Last.fm", "ListenBrainz",
];

const STORY: StoryItem[] = [
  {
    id: "merge",
    kicker: "Smart merge",
    title: "YouTube Music's songs. Lossless sound.",
    shot: "signal-path",
    alt: "The signal path of a lossless song, from file to speaker",
    body: (
      <>
        <p>
          A YouTube Music song keeps its cover, lyrics, music video and place in your library, while the sound comes
          from the same recording in lossless, when there is one:
        </p>
        <ol className="order">
          <li>
            <div>
              <b>A lossless file in your library</b>
              <span>Judged by its codec, not its file name</span>
            </div>
          </li>
          <li>
            <div>
              <b>Monochrome, when you turn it on</b>
              <span>Only when its stream is FLAC; kept on disk for next time</span>
            </div>
          </li>
          <li>
            <div>
              <b>YouTube Music</b>
              <span>When neither has it. Never a switch mid-song</span>
            </div>
          </li>
        </ol>
      </>
    ),
  },
  {
    id: "lyrics",
    kicker: "Lyrics",
    title: "Follow every word.",
    shot: "lyrics",
    alt: "Synced lyrics, the line being sung highlighted",
    body: (
      <p>
        Synced and karaoke lyrics from nine free sources, with pronunciation and translation for lyrics you can&apos;t
        read. Use your own <code>.lrc</code> files, edit them, and share lines as lyric cards.
      </p>
    ),
  },
  {
    id: "audio",
    kicker: "Sound",
    title: "From the file to your DAC, untouched.",
    shot: "sound",
    alt: "Sound effects settings",
    body: (
      <p>
        Bit-perfect and exclusive output, ASIO, native DSD and USB DACs. Or shape it: an equalizer with AutoEQ,
        crossfade and gapless, volume leveling, crossfeed, room correction, and virtual speakers up to a 7.1 room.
      </p>
    ),
  },
  {
    id: "together",
    kicker: "Listen together",
    title: "Same song, same second.",
    shot: "listen-together",
    alt: "A Listen together room",
    body: (
      <p>
        Friends play along in sync over Wi-Fi or the internet, with room chat, end-to-end encrypted internet rooms and
        joining by QR code.
      </p>
    ),
  },
];

const NUMBERS = [
  { n: "5", l: "systems, one app" },
  { n: "11", l: "audio formats, DSD included" },
  { n: "13", l: "themes, or your cover's colours" },
  { n: "9", l: "free lyric sources" },
];

const FAQ = [
  {
    q: "Is Riflay free?",
    a: "Yes. Riflay is free, open-source software under the GNU AGPL v3.0, with no ads and no account needed.",
  },
  {
    q: "Does Riflay support lossless music?",
    a: "Yes. It plays local FLAC, ALAC, WavPack, APE, DSD and other lossless formats. Smart merge can pair a YouTube Music song with a matching lossless file or an enabled Monochrome stream. Availability depends on the track and provider; a YouTube stream itself does not become lossless.",
  },
  {
    q: "Can I import playlists from other services?",
    a: "Yes: from Spotify, Apple Music, Deezer, TIDAL and NetEase Cloud Music. Importing a playlist does not grant streaming access to those services.",
  },
  {
    q: "How heavy is it?",
    a: "Riflay picks a performance mode at first start: Lightweight, Balanced or Heavy. On Linux it uses about 150 MB idle and around 200–230 MB while playing.",
  },
  {
    q: "Why isn't it on the App Store?",
    a: "The iOS app is built unsigned on GitHub. You sign it with your own Apple ID as you install it; pick iOS under Get Riflay for the steps.",
  },
];

function Shot({ src, alt, w = 1440, h = 900, priority = false }: { src: string; alt: string; w?: number; h?: number; priority?: boolean }) {
  return (
    <img
      src={`/screens/${src}.webp`}
      width={w}
      height={h}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
    />
  );
}

export default async function Home() {
  const release = await latestRelease();
  const released = release.date
    ? new Date(release.date).toLocaleDateString("en", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })
    : null;
  const available = Object.fromEntries(STORY.map((s) => [s.shot, has(s.shot)]));

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <TopAppBar />

      <main id="main">
        {/* Hero */}
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__copy">
            <a className="assist-chip" href={release.url}>
              <span className="assist-chip__dot" aria-hidden="true" />
              Riflay {release.version} is out
              {released && <span className="assist-chip__date"> · {released}</span>}
              <Icon name="arrow_forward" />
            </a>
            <h1 id="hero-title" className="hero__title">
              Every song,
              <br />
              <em>in hi-fi.</em>
            </h1>
            <div className="hero__aside">
              <p className="hero__lede">
                Your local music and YouTube Music in one free, open-source player. Lossless playback, synced lyrics,
                music videos, and no account needed.
              </p>
              <div className="hero__cta">
                <a
                  className="btn btn--filled btn--xl"
                  href={LATEST_RELEASE}
                  data-download
                  {...Object.fromEntries(
                    Object.entries(RECOMMENDED).map(([os, name]) => [`data-href-${os}`, asset(release, name).url]),
                  )}
                >
                  <Icon name="download" />
                  <span data-download-label>Download Riflay</span>
                </a>
                <a className="btn btn--outlined btn--xl" href="#install">
                  All systems
                </a>
              </div>
            </div>
          </div>

          <div className={`hero__media${has("phone") ? "" : " hero__media--solo"}`}>
            <figure className="hero__shot">
              <Shot src="home" alt="Riflay on a computer: Home, the library and the player bar" priority />
            </figure>
            {has("phone") && (
              <figure className="hero__phone">
                <Shot src="phone" w={800} h={1720} alt="Riflay's player on a phone" priority />
              </figure>
            )}
          </div>

          <ul className="platforms" aria-label="Download for your system">
            {PLATFORMS.map((p) => (
              <li key={p.os}>
                <a className="filter-chip" data-os={p.os} data-pick-os={p.os} href="#install">
                  <Icon name={p.icon} />
                  {p.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Marquee */}
        <div className="marquee" role="region" aria-label="Formats and sources Riflay plays">
          <div className="marquee__track">
            {[0, 1].map((copy) => (
              <ul key={copy} aria-hidden={copy === 1}>
                {MARQUEE.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {/* Features, told as you scroll */}
        <section className="section" id="features" aria-labelledby="features-title">
          <header className="section__head section__head--split reveal">
            <h2 id="features-title" className="display-medium">
              One library.
              <br />
              Everything you listen to.
            </h2>
            <p className="body-large muted">
              Local files and YouTube Music side by side, in one library and one playlist. Sign in only if you want to
              sync.
            </p>
          </header>
          <FeatureStory items={STORY} available={available} />
        </section>

        {/* Island showcase */}
        <section className="showcase" aria-labelledby="f-mini">
          <div className="showcase__inner">
            <div className="showcase__copy reveal">
              <p className="story__kicker label-large">
                <span>05</span>Mini player
              </p>
              <h2 id="f-mini" className="display-medium">
                The island.
              </h2>
              <p className="muted">
                On a computer the player shrinks to a pill at the top of the screen. Point at it and it springs open
                into the controls; move away and it folds back. Let it float anywhere, or dock it to the edge like a
                notch.
              </p>
              <p className="body-medium showcase__hint">
                <Icon name="touch_app" /> Point at it, or tap it.
              </p>
            </div>
            <div className="reveal">
              <IslandDemo />
            </div>
          </div>
        </section>

        {/* Numbers */}
        <section className="numbers" aria-label="Riflay in numbers">
          {NUMBERS.map((x) => (
            <div key={x.l} className="numbers__item reveal">
              <p className="numbers__n">{x.n}</p>
              <p className="numbers__l">{x.l}</p>
            </div>
          ))}
        </section>

        {/* Make it yours */}
        <section className="section" id="yours" aria-labelledby="yours-title">
          <header className="section__head section__head--split reveal">
            <h2 id="yours-title" className="display-medium">
              Make it yours.
            </h2>
            <p className="body-large muted">
              Ten visualizers, nine phone tab bars, three desktop bars, five player presets and thirteen themes. Pick one
              and see it, straight from the app.
            </p>
          </header>
          <div className="yours">
            <div className="reveal">
              <StylePicker
                sets={STYLE_SETS.map((set) => ({ ...set, styles: set.styles.filter((st) => has(st.src)) })).filter(
                  (set) => set.styles.length > 0,
                )}
              />
            </div>
            <div className="tile tile--seed reveal">
              <Icon name="palette" />
              <div>
                <p className="title-medium" id="seed-label">
                  Colours from a seed
                </p>
                <p>
                  Riflay&apos;s Material 3 pages take their colours from the song&apos;s cover. This page does it too:
                  pick one.
                </p>
              </div>
              <SeedPicker />
            </div>
          </div>
        </section>

        {/* Everything */}
        <section className="section" id="all-features" aria-labelledby="all-title">
          <header className="section__head section__head--split reveal">
            <h2 id="all-title" className="display-medium">
              All {FEATURE_COUNT} features.
            </h2>
            <p className="body-large muted">
              Everything Riflay does, by area, and where it works. “Computers” means Windows, macOS and Linux.
            </p>
          </header>
          <div className="reveal">
            <FeatureCatalog />
          </div>
        </section>

        {/* Screenshots: a pinned horizontal gallery */}
        <HorizontalGallery
          title="A closer look."
          lede="On a computer, and on a phone. Keep scrolling."
          shots={GALLERY.filter((g) => has(g.src))}
        />

        {/* Install, one system at a time */}
        <section className="section" id="install" aria-labelledby="install-title">
          <header className="section__head section__head--split reveal">
            <h2 id="install-title" className="display-medium">
              Get Riflay.
            </h2>
            <p className="body-large muted">
              Pick your system. Every file comes straight from the <a href={release.url}>latest release</a>.
            </p>
          </header>
          <div className="reveal">
            <InstallTabs assets={release.assets} version={release.version} />
          </div>
        </section>

        {/* FAQ */}
        <section className="section" id="faq" aria-labelledby="faq-title">
          <div className="split">
            <header className="split__aside reveal">
              <h2 id="faq-title" className="headline-large">
                Questions
              </h2>
              <p className="muted">
                Something else? <a href={`${REPO}/issues`}>Ask on GitHub</a>.
              </p>
            </header>
            <div className="faq reveal">
              {FAQ.map((f) => (
                <details key={f.q}>
                  <summary>
                    <span className="title-medium">{f.q}</span>
                    <Icon name="expand_more" />
                  </summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="closing reveal">
            <h2 className="closing__title">Turn the sound on.</h2>
            <div className="hero__cta">
              <a className="btn btn--filled btn--xl" href={LATEST_RELEASE}>
                <Icon name="download" />
                Download Riflay
              </a>
              <a className="btn btn--outlined btn--xl" href={SUPPORT}>
                Support on Tako
              </a>
            </div>
          </div>
        </section>
      </main>

      <a className="fab" href="#install" aria-label="Download Riflay" tabIndex={-1} aria-hidden="true">
        <Icon name="download" />
        <span className="fab__label">Download</span>
      </a>

      <Snackbar />
      <PageEffects />
      <SmoothScroll />

      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__brand">
            <img src="/icon/riflay-round.svg" width={36} height={36} alt="" />
            <div>
              <p className="title-medium">Riflay</p>
              <p className="body-small muted">
                Version {release.version} · <a href={`${REPO}/blob/main/LICENSE`}>AGPL-3.0</a>
              </p>
            </div>
          </div>
          <nav className="footer__links" aria-label="Footer">
            <a href={REPO}>GitHub</a>
            <a href={`${REPO}/releases`}>Releases</a>
            <a href={`${REPO}/issues`}>Report a bug</a>
            <a href={`${REPO}/blob/main/docs/platforms.md`}>Platform notes</a>
            <a href={SUPPORT}>Support</a>
          </nav>
          <p className="body-small muted footer__legal">
            Riflay is not affiliated with YouTube, Google, Discord or Apple. Screenshots show a made-up library.
          </p>
        </div>
        <p className="footer__mark" aria-hidden="true">
          Riflay
        </p>
      </footer>
    </>
  );
}
