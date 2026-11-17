import type { MetadataRoute } from "next";
import { IS_PREVIEW, SITE_URL } from "@/lib/seo";
export default function sitemap(): MetadataRoute.Sitemap {
  return IS_PREVIEW
    ? []
    : [{ url: SITE_URL + "/", changeFrequency: "weekly", priority: 1 }];
}
