import { ImageResponse } from "next/og";
import { SITE } from "@/content/site";

export const runtime = "edge";
export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Branded default Open Graph image. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#F5F1E8",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", fontSize: 36, fontWeight: 700, color: "#111111" }}>
          <span style={{ color: "#FF4B35" }}>GoGo</span>
          <span>ChinaTrips</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700, color: "#111111", lineHeight: 1.05 }}>
            China, without the guesswork.
          </div>
          <div style={{ marginTop: 24, fontSize: 32, color: "#66645F", maxWidth: 900 }}>
            Small-group trips, private journeys and local experiences designed by people who live here.
          </div>
        </div>
        <div style={{ display: "flex", height: 12, width: "100%" }}>
          <div style={{ flex: 1, backgroundColor: "#FF4B35" }} />
          <div style={{ flex: 1, backgroundColor: "#3155FF" }} />
          <div style={{ flex: 1, backgroundColor: "#009B7A" }} />
        </div>
      </div>
    ),
    { ...size },
  );
}
