import { Screenshot } from "@/components/atoms/Screenshot";
import type { PreviewImage } from "@/lib/types";
type Props = { images: PreviewImage[]; activeId: string; className: string };
/** One selected screenshot, with the others ready for a smooth transition. */
export function ImagePreview({ images, activeId, className }: Props) {
  return (
    <div className={className}>
      {images.map((image) => (
        <Screenshot
          key={image.id}
          name={image.src}
          alt={image.id === activeId ? image.alt : ""}
          aria-hidden={image.id !== activeId}
          className={image.id === activeId ? "is-active" : ""}
          width={image.width}
          height={image.height}
          decoding="async"
        />
      ))}
    </div>
  );
}
