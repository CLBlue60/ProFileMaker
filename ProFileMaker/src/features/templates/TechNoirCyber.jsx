import React from "react";
import ProfilePreview from "../../components/ProfilePreview";

export default function TechNoirCyber(props) {
  return (
    <ProfilePreview
      {...props}
      template={{
        style: "cyber",
        fontFamily: "'Share Tech Mono', monospace",
        colors: {
          primary: "#00ff41",
          background: "#000000",
          text: "#00ff41",
          accent: "#ff00ea",
        },
        effect: "matrix-rain",
      }}
    />
  );
}