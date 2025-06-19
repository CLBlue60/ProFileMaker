import React from "react";
import ProfilePreview from "../../components/ProfilePreview";

export default function NeonGlow(props) {
  return (
    <ProfilePreview
      {...props}
      template={{
        style: "neon",
        fontFamily: "'Orbitron', sans-serif",
        colors: {
          primary: "#00fff7",
          background: "#1a1a2e",
          text: "#aefeff",
          accent: "#ff00ea",
        },
        effect: "glow",
      }}
    />
  );
}