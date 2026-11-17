import type { MetadataRoute } from "next";
import { IS_PREVIEW, SITE_URL } from "@/lib/seo";
import { latestRelease } from "@/lib/release";

/** The one page, dated by the latest release (the page changes with it), with its screenshots for image search. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (IS_PREVIEW) return [];
  const release = await latestRelease();
  return [
    {
      url: SITE_URL + "/",
      lastModified: release.date ? new Date(release.date) : new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: ["home", "lyrics", "listen-together", "downloads"].map((s) => `${SITE_URL}/screens/${s}.webp`),
    },
  ];
}
