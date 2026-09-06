import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Bolsa Obra — la bolsa de trabajo de la construcción";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(60% 60% at 18% 15%, rgba(255,203,5,0.35) 0%, rgba(255,203,5,0) 60%), linear-gradient(180deg, #ffffff 0%, #fff8e1 100%)",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <svg width="90" height="72" viewBox="0 0 100 80" fill="none">
            <path
              d="M6 54 Q6 47 14 46 L86 46 Q94 47 94 54 Q94 60 86 60 L14 60 Q6 60 6 54 Z"
              fill="#FFCB05"
              stroke="#141414"
              strokeWidth="4"
            />
            <path
              d="M18 48 Q18 18 50 16 Q82 18 82 48 Z"
              fill="#FFCB05"
              stroke="#141414"
              strokeWidth="4"
            />
            <path
              d="M50 16 L50 48 M34 20 L34 48 M66 20 L66 48"
              stroke="#141414"
              strokeWidth="3"
            />
          </svg>
          <span style={{ fontSize: 84, fontWeight: 800, color: "#141414" }}>
            Bolsa Obra
          </span>
        </div>
        <span
          style={{
            marginTop: 28,
            fontSize: 34,
            color: "#4b5563",
            maxWidth: 820,
            textAlign: "center",
          }}
        >
          El trabajo de la construcción, directo y sin intermediarios
        </span>
      </div>
    ),
    { ...size }
  );
}
