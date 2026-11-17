"use client";

import { useEffect, useRef, useState } from "react";
import type { Asset } from "@/lib/release";
import { BREW_INSTALL, SCOOP_ADD, SCOOP_INSTALL, type Os } from "@/lib/site";
import { CopySnippet } from "./CopySnippet";
import { Icon } from "./Icon";
import { SideloadGuide } from "./SideloadGuide";

type File = { name: string; label: string; note?: string; primary?: boolean };
type Method = { title: string; text?: React.ReactNode; code?: string[] };
type Platform = {
  os: Os;
  label: string;
  icon: string;
  needs: string;
  files: File[];
  methods: Method[];
  checksum: string;
};

const PLATFORMS: Platform[] = [
  {
    os: "windows",
    label: "Windows",
    icon: "desktop_windows",
    needs: "Windows 10 or 11, 64-bit (x64).",
    checksum: "SHA256SUMS-windows",
    files: [
      { name: "Riflay-windows-x64-setup.exe", label: "Installer", note: "Recommended", primary: true },
      { name: "Riflay-windows-x64.zip", label: "Portable zip", note: "Unzip and run, nothing installed" },
    ],
    methods: [
      {
        title: "With the installer",
        text: <>Download the installer, open it and follow the steps. Riflay appears in the Start menu.</>,
      },
      {
        title: "With Scoop",
        text: <>Add Riflay&apos;s bucket once, then install. <code>scoop update riflay</code> keeps it current.</>,
        code: [SCOOP_ADD, SCOOP_INSTALL],
      },
    ],
  },
  {
    os: "mac",
    label: "macOS",
    icon: "laptop_mac",
    needs: "macOS 12 Monterey or later, Apple silicon or Intel.",
    checksum: "SHA256SUMS-macos",
    files: [
      { name: "Riflay-macos.dmg", label: "Disk image", note: "Recommended", primary: true },
      { name: "Riflay-macos.zip", label: "Zip", note: "The same app, zipped" },
    ],
    methods: [
      {
        title: "With the disk image",
        text: <>Open the .dmg and drag Riflay into Applications.</>,
      },
      {
        title: "With Homebrew",
        code: [BREW_INSTALL],
      },
      {
        title: "The first time you open it",
        text: (
          <>
            The app isn&apos;t signed by Apple, so macOS stops it once. Open System Settings › Privacy &amp; Security,
            scroll down and choose <b>Open Anyway</b>.
          </>
        ),
      },
    ],
  },
  {
    os: "linux",
    label: "Linux",
    icon: "terminal",
    needs: "A 64-bit (x86_64) distribution with GTK 3, on Wayland or X11, with PipeWire, PulseAudio or ALSA.",
    checksum: "SHA256SUMS-linux",
    files: [
      { name: "Riflay-linux-x86_64.AppImage", label: "AppImage", note: "Any distribution", primary: true },
      { name: "Riflay-linux-amd64.deb", label: ".deb", note: "Debian, Ubuntu, Mint" },
      { name: "Riflay-linux-x86_64.rpm", label: ".rpm", note: "Fedora, openSUSE" },
      { name: "Riflay-linux-x86_64.pkg.tar.zst", label: "Arch package", note: "Arch, Manjaro" },
      { name: "Riflay-linux-x64.tar.gz", label: "Tarball", note: "Unpack anywhere" },
    ],
    methods: [
      { title: "AppImage", text: <>Make it executable, then run it.</>, code: ["chmod +x Riflay-linux-x86_64.AppImage", "./Riflay-linux-x86_64.AppImage"] },
      { title: "Debian, Ubuntu, Mint", code: ["sudo apt install ./Riflay-linux-amd64.deb"] },
      { title: "Fedora", code: ["sudo dnf install ./Riflay-linux-x86_64.rpm"] },
      { title: "openSUSE", code: ["sudo zypper install ./Riflay-linux-x86_64.rpm"] },
      { title: "Arch", code: ["sudo pacman -U Riflay-linux-x86_64.pkg.tar.zst"] },
      { title: "Homebrew", code: [BREW_INSTALL] },
    ],
  },
  {
    os: "android",
    label: "Android",
    icon: "android",
    needs: "Android 7.0 or later. Bit-perfect output to a USB DAC on Android 14 and later.",
    checksum: "SHA256SUMS-android",
    files: [
      { name: "Riflay-android-arm64.apk", label: "arm64", note: "Most phones from the last years", primary: true },
      { name: "Riflay-android-arm32.apk", label: "arm32", note: "Older phones" },
      { name: "Riflay-android-x86_64.apk", label: "x86_64", note: "Emulators, Chromebooks" },
      { name: "Riflay-android.apk", label: "Universal", note: "Every kind, larger download" },
    ],
    methods: [
      {
        title: "Install the APK",
        text: (
          <>
            Download it on the phone and open it. If Android asks, allow your browser or file manager to{" "}
            <b>install unknown apps</b>, then tap <b>Install</b>. Not sure which file? Take arm64, or the universal
            one.
          </>
        ),
      },
    ],
  },
  {
    os: "ios",
    label: "iOS",
    icon: "phone_iphone",
    needs: "iPhone or iPad on iOS 15 or later, plus a Windows or Mac computer to install from.",
    checksum: "SHA256SUMS-ios",
    files: [{ name: "Riflay-ios-unsigned.ipa", label: "Unsigned IPA", note: "For sideloading", primary: true }],
    methods: [],
  },
];

function size(bytes: number | null) {
  if (bytes == null) return null;
  return bytes >= 1e9 ? `${(bytes / 1e9).toFixed(1)} GB` : `${Math.round(bytes / 1e6)} MB`;
}

/**
 * Get Riflay, one system at a time: M3 primary tabs with the visitor's system picked, and in each panel the
 * files to download (straight from the latest release, with their sizes) and how to install them.
 */
export function InstallTabs({ assets, version }: { assets: Record<string, Asset>; version: string }) {
  const [os, setOs] = useState<Os>("windows");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const detected = document.documentElement.dataset.os as Os | undefined;
    if (detected && PLATFORMS.some((p) => p.os === detected)) setOs(detected);
    // Platform chips elsewhere on the page open their system here.
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-pick-os]");
      if (el) setOs(el.dataset.pickOs as Os);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const i = PLATFORMS.findIndex((p) => p.os === os);
  const p = PLATFORMS[i];
  const link = (name: string) => assets[name] ?? { url: `https://github.com/Araryarch67/Riflay/releases/latest/download/${name}`, size: null };

  function onKey(e: React.KeyboardEvent) {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const n = (i + step + PLATFORMS.length) % PLATFORMS.length;
    setOs(PLATFORMS[n].os);
    tabs.current[n]?.focus();
  }

  return (
    <div className="get">
      <div className="get__tabs" role="tablist" aria-label="Your system" onKeyDown={onKey}>
        {PLATFORMS.map((x, n) => (
          <button
            key={x.os}
            ref={(el) => {
              tabs.current[n] = el;
            }}
            type="button"
            role="tab"
            id={`get-tab-${x.os}`}
            aria-controls="get-panel"
            aria-selected={x.os === os}
            tabIndex={x.os === os ? 0 : -1}
            className="get__tab"
            onClick={() => setOs(x.os)}
          >
            <Icon name={x.icon} />
            <span>{x.label}</span>
          </button>
        ))}
      </div>

      <div className="get__panel" role="tabpanel" id="get-panel" aria-labelledby={`get-tab-${p.os}`} key={p.os}>
        <div className="get__files">
          <div className="get__head">
            <Icon name={p.icon} />
            <div>
              <h3 className="headline-medium">Riflay for {p.label}</h3>
              <p className="body-medium muted">Version {version}</p>
            </div>
          </div>
          <p className="muted get__needs">{p.needs}</p>
          <ul className="get__list">
            {p.files.map((f) => {
              const a = link(f.name);
              return (
                <li key={f.name}>
                  <a className={`get__file${f.primary ? " get__file--primary" : ""}`} href={a.url}>
                    <Icon name="download" />
                    <span className="get__file-text">
                      <b>{f.label}</b>
                      <span>
                        {f.note}
                        {size(a.size) && ` · ${size(a.size)}`}
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
          <a className="get__sums" href={link(p.checksum).url}>
            Checksums ({p.checksum})
          </a>
        </div>

        <div className="get__how">
          {p.os === "ios" ? (
            <>
              <h4 className="title-large">How to sideload it</h4>
              <p className="muted">
                Riflay&apos;s iOS app isn&apos;t on the App Store. You sign it with your own Apple ID as you install it,
                with one of these tools.
              </p>
              <SideloadGuide />
            </>
          ) : (
            <>
              <h4 className="title-large">How to install</h4>
              <ol className="steps get__methods">
                {p.methods.map((m) => (
                  <li key={m.title}>
                    <p className="title-medium">{m.title}</p>
                    <div className="get__method">
                      {m.text && <p className="body-medium muted">{m.text}</p>}
                      {m.code?.map((c) => <CopySnippet key={c} code={c} />)}
                    </div>
                  </li>
                ))}
              </ol>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
