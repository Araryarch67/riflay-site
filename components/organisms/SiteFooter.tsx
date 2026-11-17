import type { Release } from "@/lib/release";
import { REPO, SUPPORT } from "@/lib/site";

export function SiteFooter({ release }: { release: Release }) {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <img src="/icon/riflay-round.svg" width={36} height={36} alt="" />
          <div>
            <p className="title-medium">Riflay</p>
            <p className="body-small muted">
              Version {release.version} ·{" "}
              <a href={`${REPO}/blob/main/LICENSE`}>AGPL-3.0</a>
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
          Riflay is not affiliated with YouTube, Google, Discord or Apple.
          Screenshots show a made-up library.
        </p>
      </div>
      {/* A faint watermark, drawn by CSS (::before): decoration, not text to read. */}
      <p className="footer__mark" aria-hidden="true" data-mark="Riflay" />
    </footer>
  );
}
