import React from "react";
import ProfilePreview from "../../components/ProfilePreview";

export default function Brutalism(props) {
  return (
    <ProfilePreview
      {...props}
      template={{
        style: "brutal",
        fontFamily: "'Bebas Neue', sans-serif",
        colors: {
          primary: "#000000",
          background: "#ffffff",
          text: "#000000",
          accent: "#ffb347",
        },
        effect: "block-shadow",
      }}
    />
  );
}