import { MotionText } from "@/components/atoms/MotionText";
import { Icon } from "@/components/atoms/Icon";
import { LATEST_RELEASE, SUPPORT } from "@/lib/site";

export function ClosingSection() {
  return (
    <section className="section">
      <div className="closing reveal">
        <h2 className="closing__title">
          <MotionText>Turn the sound on.</MotionText>
        </h2>
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
  );
}
