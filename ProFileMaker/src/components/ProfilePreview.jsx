import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { UserIcon, BriefcaseIcon, CodeBracketIcon, EnvelopeIcon } from "@heroicons/react/24/outline";

// Animation variants
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};
const quantumItem = {
  hidden: { opacity: 0, y: 40, rotateX: 90 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { type: "spring", stiffness: 120, damping: 15 } }
};
const neonItem = {
  hidden: { opacity: 0, scale: 0.8, filter: "blur(8px)" },
  show: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { type: "spring", stiffness: 180, damping: 18 } }
};
const retroItem = {
  hidden: { opacity: 0, x: -60, skewY: 10 },
  show: { opacity: 1, x: 0, skewY: 0, transition: { type: "spring", stiffness: 90, damping: 12 } }
};
const cyberItem = {
  hidden: { opacity: 0, y: 60, scale: 0.7 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 200, damping: 20 } }
};
const decoItem = {
  hidden: { opacity: 0, rotate: -10, y: 30 },
  show: { opacity: 1, rotate: 0, y: 0, transition: { type: "spring", stiffness: 110, damping: 14 } }
};
const brutalItem = {
  hidden: { opacity: 0, x: 50, scale: 0.9 },
  show: { opacity: 1, x: 0, scale: 1, transition: { type: "spring", stiffness: 150, damping: 10 } }
};

// Google Fonts loader
function useGoogleFont(fontFamily) {
  useEffect(() => {
    if (!fontFamily) return;
    const fontMap = {
      "'Orbitron', sans-serif": "Orbitron:wght@400;700",
      "'Press Start 2P', cursive": "Press+Start+2P",
      "'Share Tech Mono', monospace": "Share+Tech+Mono",
      "'Cinzel Decorative', serif": "Cinzel+Decorative:wght@700",
      "'Bebas Neue', sans-serif": "Bebas+Neue",
      "'Rajdhani', sans-serif": "Rajdhani:wght@400;500;700",
      "'Merriweather', serif": "Merriweather:wght@400;700",
      "'Montserrat', sans-serif": "Montserrat:wght@400;700",
      "'Lora', serif": "Lora:wght@400;700",
      "'Poppins', sans-serif": "Poppins:wght@400;700",
      "'Quicksand', sans-serif": "Quicksand:wght@400;700",
      "'Nunito', sans-serif": "Nunito:wght@400;700",
      "'Roboto', sans-serif": "Roboto:wght@400;700",
      "'Pacifico', cursive": "Pacifico",
      "'PT Serif', serif": "PT+Serif:wght@400;700",
      "'Open Sans', sans-serif": "Open+Sans:wght@400;700",
      "'Ubuntu', sans-serif": "Ubuntu:wght@400;700",
      "'Barlow', sans-serif": "Barlow:wght@400;700",
      "'Source Sans Pro', sans-serif": "Source+Sans+Pro:wght@400;700"
    };
    const fontKey = Object.keys(fontMap).find(key => fontFamily.includes(key.split(",")[0].replace(/'/g, "")));
    if (!fontKey) return;
    const fontName = fontMap[fontKey];
    const linkId = `google-font-${fontName}`;
    if (document.getElementById(linkId)) return;
    const link = document.createElement("link");
    link.id = linkId;
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${fontName}&display=swap`;
    document.head.appendChild(link);
    return () => {
      if (document.getElementById(linkId)) {
        document.head.removeChild(document.getElementById(linkId));
      }
    };
  }, [fontFamily]);
}

const defaultProject = {
  title: "Domineke Nelson",
  role: "Senior Product Designer",
  about: "Creating user-centered digital experiences with beautiful interfaces.",
  description: "I love building beautiful, functional products that delight users and drive business results.",
  experience: [
    { title: "Lead Product Designer", company: "TechStart Inc.", period: "2020-Present" },
    { title: "UI/UX Designer", company: "Adobe", period: "2017-2020" }
  ],
  tags: ["Figma", "Sketch", "Adobe XD", "Prototyping", "User Research"],
  contact: ["DNelsohn@example.com", "linkedin.com/in/D'Nelson"],
  avatarUrl: "/default-avatar.png"
};

export default function ProfilePreview({ template = {}, project = null, showBrowseTemplates = true }) {
  // Use style/effect/category for styling
  const templateStyle =
    template?.style ||
    template?.effect ||
    (template.category || "").toLowerCase();

  // Fallback colors
  const colors = template.colors || {
    primary: "#000",
    background: "#fff",
    text: "#333",
    accent: "#007bff"
  };

  // Fallback font
  const fontFamily = template.fontFamily || "inherit";
  useGoogleFont(fontFamily);

  // Merge project data
  const mergedProject = { ...defaultProject, ...(project || {}) };
  const { title, role, about, description, experience, tags, contact, avatarUrl } = mergedProject;

  // Defaults
  let creativeStyles = {
    backgroundColor: colors.background,
    color: colors.text,
    fontFamily,
    border: `1px solid ${colors.accent}`,
    borderRadius: "1rem",
    position: "relative",
    overflow: "hidden"
  };
  let creativeHeader = {
    color: colors.primary,
    borderBottom: `2px solid ${colors.accent}`,
    fontFamily
  };
  let creativeSkills = {
    backgroundColor: colors.accent + "20",
    border: `1px solid ${colors.accent}`,
    fontFamily
  };
  let creativePattern = null;
  let animationVariants = item;

  // ADVANCED STYLES
  if (templateStyle === "quantum" || templateStyle === "quantum-glow") {
    creativeStyles = {
      ...creativeStyles,
      backgroundColor: "#0A0E17",
      color: "#00BBF9",
      fontFamily: "'Rajdhani', sans-serif",
      border: "2px solid #7B2CBF",
      boxShadow: "0 0 20px rgba(123, 44, 191, 0.5)"
    };
    creativeHeader = {
      color: "#00BBF9",
      textShadow: "0 0 10px #7B2CBF, 0 0 4px #00BBF9",
      letterSpacing: "1px"
    };
    creativePattern = (
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0.18,
          filter: "blur(0.5px)"
        }}
        viewBox="0 0 400 400"
        fill="none"
      >
        <defs>
          <linearGradient id="gridLine" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00BBF9" />
            <stop offset="1" stopColor="#7B2CBF" />
          </linearGradient>
        </defs>
        {[...Array(9)].map((_, i) => (
          <line
            key={`v${i}`}
            x1={i * 50}
            y1="0"
            x2={i * 50}
            y2="400"
            stroke="url(#gridLine)"
            strokeWidth="1"
          />
        ))}
        {[...Array(9)].map((_, i) => (
          <line
            key={`h${i}`}
            x1="0"
            y1={i * 50}
            x2="400"
            y2={i * 50}
            stroke="url(#gridLine)"
            strokeWidth="1"
          />
        ))}
      </svg>
    );
    animationVariants = quantumItem;
  }
  else if (templateStyle === "neon" || templateStyle === "glow") {
    creativeStyles = {
      ...creativeStyles,
      backgroundColor: "#1a1a2e",
      color: "#aefeff",
      fontFamily: "'Orbitron', sans-serif",
      border: "2px solid #ff00ea",
      boxShadow: "0 0 24px 4px #00fff799, 0 0 48px 8px #ff00ea66"
    };
    creativeHeader = {
      color: "#aefeff",
      textShadow: "0 0 8px #ff00ea, 0 0 16px #ff00ea, 0 0 2px #aefeff",
      letterSpacing: "2px"
    };
    creativePattern = (
      <svg
        style={{
          position: "absolute",
          top: "10%",
          left: "10%",
          width: "80%",
          height: "80%",
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0.22,
          filter: "blur(1.5px)"
        }}
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle cx="200" cy="200" r="120" stroke="#ff00ea" strokeWidth="8" />
        <circle cx="200" cy="200" r="90" stroke="#00fff7" strokeWidth="4" />
        <circle cx="200" cy="200" r="60" stroke="#aefeff" strokeWidth="2" />
      </svg>
    );
    animationVariants = neonItem;
  }
  else if (templateStyle === "retro" || templateStyle === "gradient-stripes") {
    creativeStyles = {
      ...creativeStyles,
      backgroundColor: "#232946",
      color: "#ffe066",
      fontFamily: "'Press Start 2P', cursive",
      border: "2px solid #ffb347",
      boxShadow: "0 0 24px 4px #ff5e6299, 0 0 48px 8px #ffb34766"
    };
    creativeHeader = {
      textShadow: "2px 2px 0 #ffb347",
      letterSpacing: "1px"
    };
    creativePattern = (
      <svg
        style={{
          position: "absolute",
          top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0
        }}
        viewBox="0 0 400 400"
        fill="none"
      >
        <g opacity="0.08">
          <rect x="40" y="40" width="320" height="320" fill="#ffb347" />
          <rect x="80" y="80" width="240" height="240" fill="#ff5e62" />
        </g>
      </svg>
    );
    animationVariants = retroItem;
  }
  else if (templateStyle === "cyber" || templateStyle === "matrix-rain") {
    creativeStyles = {
      ...creativeStyles,
      backgroundColor: "#000000",
      color: "#00ff41",
      fontFamily: "'Share Tech Mono', monospace",
      border: "2px solid #ff00ea",
      boxShadow: "0 0 24px 4px #00ff4199, 0 0 48px 8px #ff00ea66"
    };
    creativeHeader = {
      textShadow: "0 0 8px #00ff41",
      fontFamily: "'Share Tech Mono', monospace",
      letterSpacing: "2px"
    };
    creativePattern = (
      <svg
        style={{
          position: "absolute",
          top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0
        }}
        viewBox="0 0 400 400"
        fill="none"
      >
        <g opacity="0.15">
          <text x="10" y="40" fontFamily="Share Tech Mono" fontSize="32" fill="#00ff41">101010</text>
          <text x="200" y="200" fontFamily="Share Tech Mono" fontSize="32" fill="#ff00ea">011011</text>
          <text x="100" y="350" fontFamily="Share Tech Mono" fontSize="32" fill="#00ff41">110001</text>
        </g>
      </svg>
    );
    animationVariants = cyberItem;
  }
  else if (templateStyle === "deco" || templateStyle === "gold-lines") {
    creativeStyles = {
      ...creativeStyles,
      backgroundColor: "#f5f5f5",
      color: "#333333",
      fontFamily: "'Cinzel Decorative', serif",
      border: "3px double #d4af37",
      boxShadow: "0 0 24px 4px #d4af3733"
    };
    creativeHeader = {
      fontFamily: "'Cinzel Decorative', serif",
      letterSpacing: "3px",
      color: "#d4af37",
      textShadow: "0 2px 0 #bfa14a"
    };
    creativePattern = (
      <svg
        style={{
          position: "absolute",
          top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0
        }}
        viewBox="0 0 400 400"
        fill="none"
      >
        <g stroke="#d4af37" strokeWidth="3" opacity="0.15">
          <line x1="0" y1="0" x2="400" y2="400" />
          <line x1="400" y1="0" x2="0" y2="400" />
          <rect x="50" y="50" width="300" height="300" />
        </g>
      </svg>
    );
    animationVariants = decoItem;
  }
  else if (templateStyle === "brutal" || templateStyle === "block-shadow") {
    creativeStyles = {
      ...creativeStyles,
      backgroundColor: "#ffffff",
      color: "#000000",
      fontFamily: "'Bebas Neue', sans-serif",
      border: "4px solid #000000",
      boxShadow: "12px 12px 0 0 #ffb347",
      borderRadius: "0.5rem"
    };
    creativeHeader = {
      fontFamily: "'Bebas Neue', sans-serif",
      textTransform: "uppercase",
      letterSpacing: "2px",
      color: "#000000"
    };
    creativePattern = (
      <div style={{
        position: 'absolute',
        top: 0, left: 0, width: '100%', height: '100%',
        background: `repeating-linear-gradient(135deg, #ffb34722 0 10px, transparent 10px 20px)`,
        zIndex: 0
      }} />
    );
    animationVariants = brutalItem;
  }

  return (
    <motion.div
      className="rounded-xl shadow-lg p-8 mb-8 border relative overflow-hidden bg-white dark:bg-base-dark"
      style={creativeStyles}
      variants={animationVariants}
      initial="hidden"
      animate="show"
    >
      {creativePattern}
      <div className="flex flex-col md:flex-row gap-8 items-stretch" style={{ position: "relative", zIndex: 1 }}>
        <div className="flex flex-col items-center md:items-start justify-center gap-4 md:w-1/2">
          {avatarUrl && (
            <img
              src={avatarUrl}
              alt={title + " avatar"}
              className="w-20 h-20 rounded-full object-cover border-2"
              style={{
                borderColor: colors.accent,
                background: "#fff",
                marginBottom: "0.5rem",
                boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)"
              }}
              onError={e => (e.target.style.display = "none")}
            />
          )}
          <motion.h2
            className="text-3xl font-bold mb-1 text-center md:text-left"
            style={creativeHeader}
            variants={animationVariants}
          >
            {title}
          </motion.h2>
          <motion.p className="text-lg mb-2 text-center md:text-left" style={{ color: colors.accent }} variants={animationVariants}>
            {role}
          </motion.p>
          <motion.p className="mb-2 text-center md:text-left" variants={animationVariants}>{description}</motion.p>
          <motion.p className="mb-2 text-center md:text-left" variants={animationVariants}>{about}</motion.p>
        </div>
        <div className="flex flex-col items-center justify-center md:w-1/2">
          {mergedProject.imageUrl && (
            <img
              src={mergedProject.imageUrl}
              alt={title + " project image"}
              className="w-full max-w-md rounded-lg object-cover border-4"
              style={{
                borderColor: colors.accent,
                boxShadow: "0 4px 24px 0 rgba(0,0,0,0.18)"
              }}
              onError={e => (e.target.style.display = "none")}
            />
          )}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8 mt-8" style={{ position: "relative", zIndex: 1 }}>
        <motion.div className="space-y-6">
          <motion.div className="space-y-2" variants={animationVariants}>
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <BriefcaseIcon className="w-5 h-5" />
              Experience
            </h3>
            <div className="space-y-4">
              {Array.isArray(experience) && experience.length > 0 ? experience.map((exp, idx) => (
                <div key={idx}>
                  <h4 className="font-medium">{exp.title}</h4>
                  <p className="text-sm opacity-70">{exp.company} • {exp.period}</p>
                </div>
              )) : <p className="text-gray-500">No experience listed.</p>}
            </div>
          </motion.div>
        </motion.div>
        <div className="space-y-6">
          <motion.div className="space-y-2" variants={animationVariants}>
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <CodeBracketIcon className="w-5 h-5" />
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(tags) && tags.length > 0 ? tags.map((skill, idx) => (
                <motion.span
                  key={idx}
                  className="px-3 py-1 rounded-full text-sm"
                  style={creativeSkills}
                  whileHover={{ scale: 1.05 }}
                  variants={animationVariants}
                >
                  {skill}
                </motion.span>
              )) : <span className="text-gray-500">No skills listed.</span>}
            </div>
          </motion.div>
          <motion.div className="space-y-2" variants={animationVariants}>
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <EnvelopeIcon className="w-5 h-5" />
              Contact
            </h3>
            <div className="space-y-1">
              {Array.isArray(contact) && contact.length > 0 ? contact.map((c, idx) => (
                <p key={idx}>{c}</p>
              )) : <span className="text-gray-500">No contact info.</span>}
            </div>
          </motion.div>
        </div>
      </div>
      {showBrowseTemplates && (
        <div className="mt-8 flex justify-center" style={{ position: "relative", zIndex: 1 }}>
          <a
            href="/templates"
            className="px-6 py-2 rounded-md font-medium hover:bg-accent/90 transition"
            style={{
              backgroundColor: colors.accent,
              color: colors.text,
            }}
          >
            Browse All Templates
          </a>
        </div>
      )}
    </motion.div>
  );
}