import { Icon } from "@/components/atoms/Icon";
import { IslandDemo } from "@/components/organisms/IslandDemo";

export function IslandShowcase() {
  return (
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
            On a computer the player shrinks to a pill at the top of the screen.
            Point at it and it springs open into the controls; move away and it
            folds back. Let it float anywhere, or dock it to the edge like a
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
  );
}
