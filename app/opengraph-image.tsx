import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
export const alt =
  "Riflay — Every song, in hi-fi. Free, open-source music player.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function Image() {
  const logo = await readFile(
    path.join(process.cwd(), "public/icon/master-1024.png"),
  );
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#100e0c",
        color: "#fff4ec",
        display: "flex",
        flexDirection: "column",
        padding: "64px 76px",
        justifyContent: "space-between",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <img
          src={"data:image/png;base64," + logo.toString("base64")}
          width={64}
          height={64}
          alt=""
        />
        <span style={{ fontSize: 36 }}>Riflay</span>
        <span style={{ marginLeft: "auto", fontSize: 22, color: "#c4b5aa" }}>
          Free & open source
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 96,
          fontWeight: 700,
          letterSpacing: -5,
          lineHeight: 1.02,
        }}
      >
        <span>Every song,</span>
        <span style={{ color: "#ff944d" }}>in hi-fi.</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 22,
          color: "#c4b5aa",
        }}
      >
        <span>Windows · macOS · Linux · Android · iOS</span>
        <span>riflay.my.id</span>
      </div>
    </div>,
    size,
  );
}
