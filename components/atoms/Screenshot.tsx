import type { ImgHTMLAttributes } from "react";
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
  return (
    <img
      src={`/screens/${name}.webp`}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      {...props}
    />
  );
}
