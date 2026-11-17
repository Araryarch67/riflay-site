import { GALLERY } from "@/lib/landing-content";
import { hasScreenshot } from "@/lib/screenshots";
import { HorizontalGallery } from "@/components/organisms/HorizontalGallery";

export function ScreenshotsSection() {
  return (
    <HorizontalGallery
      title="A closer look."
      lede="On a computer, and on a phone. Keep scrolling."
      shots={GALLERY.filter((shot) => hasScreenshot(shot.src))}
    />
  );
}
