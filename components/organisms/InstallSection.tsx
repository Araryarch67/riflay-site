import { MotionText } from "@/components/atoms/MotionText";
import type { Release } from "@/lib/release";
import { InstallTabs } from "@/components/organisms/InstallTabs";

export function InstallSection({ release }: { release: Release }) {
  return (
    <section className="section" id="install" aria-labelledby="install-title">
      <header className="section__head section__head--split reveal">
        <h2 id="install-title" className="display-medium">
          <MotionText>Get Riflay.</MotionText>
        </h2>
        <p className="body-large muted">
          Pick your system. Every file comes straight from the{" "}
          <a href={release.url}>latest release</a>.
        </p>
      </header>
      <div className="reveal">
        <InstallTabs assets={release.assets} version={release.version} />
      </div>
    </section>
  );
}
