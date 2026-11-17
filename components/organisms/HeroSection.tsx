import { MotionText } from "@/components/atoms/MotionText";
import { Icon } from "@/components/atoms/Icon";
import { Screenshot } from "@/components/atoms/Screenshot";
import { hasScreenshot as has } from "@/lib/screenshots";
import { RECOMMENDED } from "@/lib/landing-content";
import { asset, type Release } from "@/lib/release";
import { LATEST_RELEASE, PLATFORMS } from "@/lib/site";

export function HeroSection({ release }: { release: Release }) {
  const released = release.date
    ? new Date(release.date).toLocaleDateString("en", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      })
    : null;
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__copy">
        <a className="assist-chip" href={release.url}>
          <span className="assist-chip__dot" aria-hidden="true" />
          Riflay {release.version} is out
          {released && <span className="assist-chip__date"> · {released}</span>}
          <Icon name="arrow_forward" />
        </a>
        <h1 id="hero-title" className="hero__title">
          <MotionText>Every song,</MotionText>
          <br />
          <em>
            <MotionText>in hi-fi.</MotionText>
          </em>
        </h1>
        <div className="hero__aside">
          <p className="hero__lede">
            Your local music and YouTube Music in one free, open-source player.
            Lossless playback, synced lyrics, music videos, and no account
            needed.
          </p>
          <div className="hero__cta">
            <a
              className="btn btn--filled btn--xl"
              href={LATEST_RELEASE}
              data-download
              {...Object.fromEntries(
                Object.entries(RECOMMENDED).map(([os, name]) => [
                  `data-href-${os}`,
                  asset(release, name).url,
                ]),
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
          <Screenshot
            name="home"
            alt="Riflay on a computer: Home, the library and the player bar"
            priority
          />
        </figure>
        {has("phone") && (
          <figure className="hero__phone">
            <Screenshot
              name="phone"
              width={800}
              height={1720}
              alt="Riflay's player on a phone"
              priority
            />
          </figure>
        )}
      </div>

      <ul className="platforms" aria-label="Download for your system">
        {PLATFORMS.map((p) => (
          <li key={p.os}>
            <a
              className="filter-chip"
              data-os={p.os}
              data-pick-os={p.os}
              href="#install"
            >
              <Icon name={p.icon} />
              {p.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
