import { APP_VERSION, LATEST_RELEASE, REPO } from "./site";

export type Asset = { url: string; size: number | null };
export type Release = {
  version: string;
  url: string;
  date: string | null;
  assets: Record<string, Asset>;
};

/**
 * A file on the latest release. GitHub's /releases/latest/download/<name> always points at the newest one, so
 * the link works even when the API can't be reached; the size is known only from the API.
 */
export function asset(release: Release, name: string): Asset {
  return (
    release.assets[name] ?? {
      url: `${REPO}/releases/latest/download/${name}`,
      size: null,
    }
  );
}

/**
 * Riflay's latest release, from GitHub. The page is regenerated at most once an hour (see `revalidate` in
 * app/page.tsx), so this stays well inside GitHub's unauthenticated rate limit. Falls back to APP_VERSION
 * when GitHub can't be reached. Set GITHUB_TOKEN on Vercel to raise the limit (optional).
 */
export async function latestRelease(): Promise<Release> {
  const fallback: Release = {
    version: APP_VERSION,
    url: LATEST_RELEASE,
    date: null,
    assets: {},
  };
  try {
    const res = await fetch(
      "https://api.github.com/repos/Araryarch67/Riflay/releases/latest",
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          ...(process.env.GITHUB_TOKEN
            ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
            : {}),
        },
        next: { revalidate: 3600 },
        signal: AbortSignal.timeout(5000),
      },
    );
    if (!res.ok) return fallback;
    const json = (await res.json()) as {
      tag_name?: string;
      html_url?: string;
      published_at?: string;
      assets?: { name: string; size: number; browser_download_url: string }[];
    };
    const version = json.tag_name?.replace(/^v/i, "");
    if (!version) return fallback;
    const assets: Record<string, Asset> = {};
    for (const a of json.assets ?? [])
      assets[a.name] = { url: a.browser_download_url, size: a.size };
    return {
      version,
      url: json.html_url ?? LATEST_RELEASE,
      date: json.published_at ?? null,
      assets,
    };
  } catch {
    return fallback;
  }
}
