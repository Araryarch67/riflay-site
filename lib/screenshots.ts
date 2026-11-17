import { existsSync } from "node:fs";
import path from "node:path";
/** Server-only asset availability; never imported by interactive controls. */
export const hasScreenshot = (name: string) =>
  existsSync(path.join(process.cwd(), "public", "screens", name + ".webp"));
