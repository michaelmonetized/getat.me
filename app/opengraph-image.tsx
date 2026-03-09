import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "GetAt.Me — The Relationship-First Link-In-Bio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #16213e 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "400px",
            background: "radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-50px",
            left: "0",
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          {/* Logo text */}
          <div
            style={{
              fontSize: "80px",
              fontWeight: 800,
              letterSpacing: "-2px",
              display: "flex",
            }}
          >
            <span style={{ color: "#ffffff" }}>GetAt</span>
            <span
              style={{
                background: "linear-gradient(90deg, #6366f1, #a855f7)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              .Me
            </span>
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: "28px",
              color: "rgba(255,255,255,0.7)",
              maxWidth: "700px",
              textAlign: "center",
              lineHeight: 1.4,
              display: "flex",
            }}
          >
            Turn your audience into fans & customers
          </div>

          {/* Features pills */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "16px",
            }}
          >
            {["Link Page", "Bookings", "Payments", "Referrals", "Messaging"].map(
              (feature) => (
                <div
                  key={feature}
                  style={{
                    padding: "8px 20px",
                    borderRadius: "999px",
                    border: "1px solid rgba(99,102,241,0.4)",
                    color: "rgba(255,255,255,0.85)",
                    fontSize: "16px",
                    background: "rgba(99,102,241,0.1)",
                    display: "flex",
                  }}
                >
                  {feature}
                </div>
              )
            )}
          </div>
        </div>

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            bottom: "32px",
            right: "40px",
            fontSize: "20px",
            color: "rgba(255,255,255,0.4)",
            display: "flex",
          }}
        >
          getat.me
        </div>
      </div>
    ),
    { ...size }
  );
}
