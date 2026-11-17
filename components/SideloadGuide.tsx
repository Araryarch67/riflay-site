"use client";

import { useRef, useState } from "react";
import { Icon } from "./Icon";

type Step = { t: string; d: React.ReactNode };

const COMMON_TRUST: Step = {
  t: "Trust your Apple ID on the iPhone",
  d: (
    <>
      Settings › General › VPN &amp; Device Management, tap your Apple ID under Developer App, then{" "}
      <b>Trust</b>.
    </>
  ),
};

const DEV_MODE: Step = {
  t: "Turn on Developer Mode (iOS 16 and later)",
  d: (
    <>
      Settings › Privacy &amp; Security › <b>Developer Mode</b>. The iPhone restarts; confirm with <b>Turn On</b>. The
      switch only shows after a sideloaded app is on the phone.
    </>
  ),
};

const TOOLS: { id: string; name: string; blurb: string; steps: Step[] }[] = [
  {
    id: "sideloadly",
    name: "Sideloadly",
    blurb: "The quickest way: a computer app that installs the .ipa over USB.",
    steps: [
      {
        t: "Get the files",
        d: (
          <>
            Download <code>Riflay-ios-unsigned.ipa</code> from the latest release, and Sideloadly from{" "}
            <a href="https://sideloadly.io">sideloadly.io</a> for Windows or macOS. On Windows, also install{" "}
            <b>iTunes</b> and <b>iCloud</b> from Apple&apos;s website (not the Microsoft Store versions).
          </>
        ),
      },
      {
        t: "Connect the iPhone",
        d: <>Plug it in with a cable, unlock it and tap <b>Trust</b> when it asks about this computer.</>,
      },
      {
        t: "Install Riflay",
        d: (
          <>
            Drop the .ipa onto Sideloadly, type your Apple ID and press <b>Start</b>. Enter your password and the
            two-factor code when asked. A free Apple ID works.
          </>
        ),
      },
      COMMON_TRUST,
      DEV_MODE,
    ],
  },
  {
    id: "altstore",
    name: "AltStore",
    blurb: "An app store on the iPhone that can refresh Riflay by itself over Wi-Fi.",
    steps: [
      {
        t: "Install AltServer on your computer",
        d: (
          <>
            Get it from <a href="https://altstore.io">altstore.io</a> and follow its setup for Windows or macOS (on
            Windows it needs <b>iTunes</b> and <b>iCloud</b> from Apple&apos;s website).
          </>
        ),
      },
      {
        t: "Put AltStore on the iPhone",
        d: (
          <>
            Connect the iPhone with a cable and trust the computer. From AltServer&apos;s menu (the tray or menu bar
            icon) choose <b>Install AltStore</b>, pick your iPhone and sign in with your Apple ID.
          </>
        ),
      },
      COMMON_TRUST,
      DEV_MODE,
      {
        t: "Install Riflay",
        d: (
          <>
            Download <code>Riflay-ios-unsigned.ipa</code> on the iPhone (Safari saves it to Files). In AltStore open{" "}
            <b>My Apps</b>, tap <b>+</b> and choose the .ipa.
          </>
        ),
      },
    ],
  },
];

/** How to sideload Riflay's unsigned .ipa, with M3 primary tabs for each tool. */
export function SideloadGuide() {
  const [tab, setTab] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKey(e: React.KeyboardEvent) {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (tab + step + TOOLS.length) % TOOLS.length;
    setTab(next);
    tabs.current[next]?.focus();
  }

  const tool = TOOLS[tab];
  return (
    <div className="guide">
      <div className="tabs" role="tablist" aria-label="Sideloading tool" onKeyDown={onKey}>
        {TOOLS.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`tab-${t.id}`}
            aria-controls={`panel-${t.id}`}
            aria-selected={tab === i}
            tabIndex={tab === i ? 0 : -1}
            className="tab"
            onClick={() => setTab(i)}
          >
            {t.name}
          </button>
        ))}
      </div>
      <div className="guide__panel" role="tabpanel" id={`panel-${tool.id}`} aria-labelledby={`tab-${tool.id}`}>
        <p className="muted">{tool.blurb}</p>
        <ol className="steps">
          {tool.steps.map((s) => (
            <li key={s.t}>
              <p className="title-medium">{s.t}</p>
              <p className="body-medium muted">{s.d}</p>
            </li>
          ))}
        </ol>
        <div className="guide__notes">
          <p className="title-medium">
            <Icon name="schedule" /> Good to know
          </p>
          <ul>
            <li>
              With a free Apple ID the app stops opening after <b>7 days</b>. Install it again the same way, or let{" "}
              {tool.id === "altstore" ? "AltStore refresh it while AltServer runs on the same Wi-Fi" : "Sideloadly's automatic refresh do it"}
              . A paid developer account lasts a year.
            </li>
            <li>A free Apple ID can have 3 sideloaded apps at a time.</li>
            <li>
              The tool sends your Apple ID to Apple to sign the app. Many people use a second Apple ID made just for
              this.
            </li>
            <li>
              Finding AirPlay and DLNA speakers on the network needs a permission Apple doesn&apos;t give sideloaded
              apps.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
