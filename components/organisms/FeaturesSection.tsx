import { MotionText } from "@/components/atoms/MotionText";
import { Icon } from "@/components/atoms/Icon";
import { FeatureStory } from "@/components/organisms/FeatureStory";
import type { StoryItem } from "@/lib/types";
import { hasScreenshot as has } from "@/lib/screenshots";

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
          A YouTube Music song keeps its cover, lyrics, music video and place in
          your library, while the sound comes from the same recording in
          lossless, when there is one:
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
              <span>
                Only when its stream is FLAC; kept on disk for next time
              </span>
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
        Synced and karaoke lyrics from nine free sources, with pronunciation and
        translation for lyrics you can&apos;t read. Use your own{" "}
        <code>.lrc</code> files, edit them, and share lines as lyric cards.
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
        Bit-perfect and exclusive output, ASIO, native DSD and USB DACs. Or
        shape it: an equalizer with AutoEQ, crossfade and gapless, volume
        leveling, crossfeed, room correction, and virtual speakers up to a 7.1
        room.
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
        Friends play along in sync over Wi-Fi or the internet, with room chat,
        end-to-end encrypted internet rooms and joining by QR code.
      </p>
    ),
  },
];
const available = Object.fromEntries(
  STORY.map((item) => [item.shot, has(item.shot)]),
);
export function FeaturesSection() {
  return (
    <section className="section" id="features" aria-labelledby="features-title">
      <header className="section__head section__head--split reveal">
        <h2 id="features-title" className="display-medium">
          One library.
          <br />
          Everything you listen to.
        </h2>
        <p className="body-large muted">
          Local files and YouTube Music side by side, in one library and one
          playlist. Sign in only if you want to sync.
        </p>
      </header>
      <FeatureStory items={STORY} available={available} />
    </section>
  );
}
