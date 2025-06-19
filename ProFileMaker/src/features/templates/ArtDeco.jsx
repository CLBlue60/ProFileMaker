import React from "react";
import ProfilePreview from "../../components/ProfilePreview";

export default function ArtDeco(props) {
  return (
    <ProfilePreview
      {...props}
      template={{
        style: "deco",
        fontFamily: "'Cinzel Decorative', serif",
        colors: {
          primary: "#d4af37",
          background: "#f5f5f5",
          text: "#333333",
          accent: "#bfa14a",
        },
        effect: "gold-lines",
      }}
    />
  );
}