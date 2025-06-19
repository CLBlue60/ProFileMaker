import React from "react";
import ProfilePreview from "../../components/ProfilePreview";

export default function QuantumFlux(props) {
  return (
    <ProfilePreview
      {...props}
      template={{
        style: "quantum",
        fontFamily: "'Rajdhani', sans-serif",
        colors: {
          primary: "#7B2CBF",
          background: "#0A0E17",
          text: "#E8F1F2", 
          accent: "#00BBF9",
        },
        effect: "quantum-glow",
      }}
    />
  );
}