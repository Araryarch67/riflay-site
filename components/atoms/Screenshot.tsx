import type { ImgHTMLAttributes } from "react";
import { preload } from "react-dom";
import { SCREEN_SIZES, screenSrcSet } from "@/lib/screens";
type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  name: string;
  alt: string;
  priority?: boolean;
};
/** Original app screenshot, with shared loading defaults and no device bezel. */
export function Screenshot({
  name,
  alt,
  width = 1440,
  height = 900,
  priority = false,
  ...props
}: Props) {
  const srcSet = screenSrcSet(name);
  // The hero's shots: asked for from <head>, before the page's CSS and scripts are read, so a slow phone
  // starts on them at once (they are the page's largest paint).
  if (priority) {
    preload(`/screens/${name}.webp`, {
      as: "image",
      fetchPriority: "high",
      ...(srcSet ? { imageSrcSet: srcSet, imageSizes: SCREEN_SIZES } : {}),
    });
  }
  return (
    <img
      src={`/screens/${name}.webp`}
      srcSet={srcSet}
      sizes={SCREEN_SIZES}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      {...props}
    />
  );
}
