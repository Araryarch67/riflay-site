/** Riflay's current release, as the app's `lib/app_version.dart` names it. Bump with each release. */
export const APP_VERSION = "1.6.3";

export const REPO = "https://github.com/Araryarch67/Riflay";
export const LATEST_RELEASE = `${REPO}/releases/latest`;
export const SCOOP_ADD = "scoop bucket add riflay https://github.com/Araryarch67/scoop-riflay";
export const SCOOP_INSTALL = "scoop install riflay/riflay";
export const BREW_INSTALL = "brew install --cask araryarch67/riflay/riflay";
export const SUPPORT = "https://tako.id/ararya/gift";

export type Os = "windows" | "mac" | "linux" | "android" | "ios";

export const PLATFORMS: { os: Os; label: string; icon: string }[] = [
  { os: "windows", label: "Windows", icon: "desktop_windows" },
  { os: "mac", label: "macOS", icon: "laptop_mac" },
  { os: "linux", label: "Linux", icon: "terminal" },
  { os: "android", label: "Android", icon: "android" },
  { os: "ios", label: "iOS", icon: "phone_iphone" },
];
