import type { CSSProperties } from "react";
/** Real text stays in the document for readers, crawlers and no-JavaScript visits. */
export function MotionText({ children }: { children: string }) {
  return (
    <span data-motion-text>
      {children.split(" ").map((word, index) => (
        <span key={index}>
          <span className="motion-mask">
            <span
              className="motion-word"
              style={{ "--word-index": index } as CSSProperties}
            >
              {word}
            </span>
          </span>
          {index < children.split(" ").length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
