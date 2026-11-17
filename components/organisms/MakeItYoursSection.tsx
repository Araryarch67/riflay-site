import { MotionText } from "@/components/atoms/MotionText";
import { Icon } from "@/components/atoms/Icon";
import { SeedPicker } from "@/components/molecules/SeedPicker";
import { PresetShowcase } from "@/components/organisms/PresetShowcase";
import { StylePicker } from "@/components/organisms/StylePicker";
import { PLAYER_PRESETS } from "@/lib/presets";
import {
  VISUALIZERS,
  TAB_BARS,
  DESKTOP_BARS,
  STYLE_SETS,
} from "@/lib/showcase";
import { hasScreenshot as has } from "@/lib/screenshots";

export function MakeItYoursSection() {
  return (
    <section className="section" id="yours" aria-labelledby="yours-title">
      <header className="section__head section__head--split reveal">
        <h2 id="yours-title" className="display-medium">
          <MotionText>Make it yours.</MotionText>
        </h2>
        <p className="body-large muted">
          {VISUALIZERS.length} visualizers, {TAB_BARS.length} phone tab bars,{" "}
          {DESKTOP_BARS.length} desktop bars, {PLAYER_PRESETS.length} player
          presets and thirteen themes. Pick one and see it, straight from the
          app.
        </p>
      </header>
      <div className="yours">
        <div className="reveal">
          <PresetShowcase />
        </div>
        <div className="reveal">
          <StylePicker
            sets={STYLE_SETS.map((set) => ({
              ...set,
              styles: set.styles.filter((st) => has(st.src)),
            })).filter((set) => set.styles.length > 0)}
          />
        </div>
        <div className="tile tile--seed reveal">
          <Icon name="palette" />
          <div>
            <p className="title-medium" id="seed-label">
              Colours from a seed
            </p>
            <p>
              Riflay&apos;s Material 3 pages take their colours from the
              song&apos;s cover. This page does it too: pick one.
            </p>
          </div>
          <SeedPicker />
        </div>
      </div>
    </section>
  );
}
