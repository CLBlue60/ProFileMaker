import React from "react";
import ProfilePreview from "../../components/ProfilePreview";

export default function SynthwaveRetro(props) {
  return (
    <ProfilePreview
      {...props}
      template={{
        style: "retro",
        fontFamily: "'Press Start 2P', cursive",
        colors: {
          primary: "#ff5e62",
          background: "#232946",
          text: "#ffe066", 
          accent: "#ffb347",
        },
        effect: "gradient-stripes",
      }}
    />
  );
}