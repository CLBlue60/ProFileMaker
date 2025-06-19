import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserIcon, BriefcaseIcon, CodeBracketIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 }
  }
};
// Quantum Flux
const quantumItem = {
  hidden: { opacity: 0, y: 40, rotateX: 90 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: "spring", stiffness: 120, damping: 15 }
  }
};
// Neon/Glow
const neonItem = {
  hidden: { opacity: 0, scale: 0.8, filter: "blur(8px)" },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 180, damping: 18 }
  }
};
// Synthwave/Retro
const retroItem = {
  hidden: { opacity: 0, x: -60, skewY: 10 },
  show: {
    opacity: 1,
    x: 0,
    skewY: 0,
    transition: { type: "spring", stiffness: 90, damping: 12 }
  }
};
// Tech Noir/Cyber
const cyberItem = {
  hidden: { opacity: 0, y: 60, scale: 0.7 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 }
  }
};
// Art Deco
const decoItem = {
  hidden: { opacity: 0, rotate: -10, y: 30 },
  show: {
    opacity: 1,
    rotate: 0,
    y: 0,
    transition: { type: "spring", stiffness: 110, damping: 14 }
  }
};
// Brutalism
const brutalItem = {
  hidden: { opacity: 0, x: 50, scale: 0.9 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 150, damping: 10 }
  }
};

function useGoogleFont(fontFamily) {
  useEffect(() => {
    if (!fontFamily) return;
    const fontMap = {
      "'Orbitron', sans-serif": "Orbitron:wght@400;700",
      "'Press Start 2P', cursive": "Press+Start+2P",
      "'Share Tech Mono', monospace": "Share+Tech+Mono",
      "'Cinzel Decorative', serif": "Cinzel+Decorative:wght@700",
      "'Bebas Neue', sans-serif": "Bebas+Neue",
      "'Rajdhani', sans-serif": "Rajdhani:wght@400;500;700"
    };
    const fontKey = Object.keys(fontMap).find(key => fontFamily.includes(key.split(',')[0].replace(/'/g, "")));
    if (!fontKey) return;
    const fontName = fontMap[fontKey];
    const linkId = `google-font-${fontName}`;
    if (document.getElementById(linkId)) return;
    const link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${fontName}&display=swap`;
    document.head.appendChild(link);
    return () => {
      if (document.getElementById(linkId)) {
        document.head.removeChild(document.getElementById(linkId));
      }
    };
  }, [fontFamily]);
}

export default function ProfilePreview({ template, project = null, showBrowseTemplates = true }) {
  let creativeStyles = {};
  let creativeHeader = {};
  let creativeBg = {};
  let creativeSkills = {};
  let creativePattern = null;
  let animationVariants = item;

  if (template?.style === "quantum") {
    creativeStyles = {
      backgroundColor: '#0A0E17',
      color: '#00BBF9',
      fontFamily: "'Rajdhani', sans-serif",
      border: `2px solid #7B2CBF`,
      boxShadow: `0 0 20px rgba(123, 44, 191, 0.5)`,
      position: 'relative',
      overflow: 'hidden'
    };
    creativeHeader = {
      color: '#00BBF9',
      textShadow: `0 0 10px #7B2CBF, 0 0 4px #00BBF9`,
      letterSpacing: '1px'
    };
    creativePattern = (
      <>
        {/* Animated glowing grid */}
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
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
          {/* Vertical lines */}
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
          {/* Horizontal lines */}
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
        {/* Neon glow blobs */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          left: '-10%',
          width: '60%',
          height: '60%',
          background: 'radial-gradient(circle at 30% 30%, #00BBF9aa 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: "none",
          filter: "blur(8px)"
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-20%',
          right: '-10%',
          width: '50%',
          height: '50%',
          background: 'radial-gradient(circle at 70% 70%, #7B2CBF99 0%, transparent 80%)',
          zIndex: 0,
          pointerEvents: "none",
          filter: "blur(12px)"
        }} />
      </>
    );
  }
  else if (template?.effect === "glow" || template?.style === "neon") {
    creativeStyles = {
      backgroundColor: template.colors?.background || '#1a1a2e',
      color: '#aefeff',
      fontFamily: template.fontFamily,
      border: `2px solid ${template.colors?.accent}`,
      boxShadow: `0 0 24px 4px ${template.colors?.primary}99, 0 0 48px 8px ${template.colors?.accent}66`,
      position: 'relative',
      overflow: 'hidden'
    };
    creativeHeader = {
      color: '#aefeff',
      textShadow: `0 0 8px #ff00ea, 0 0 16px #ff00ea, 0 0 2px #aefeff`,
      letterSpacing: "2px"
    };
    creativePattern = (
      <>
        {/* Animated neon rings */}
        <svg
          style={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '80%',
            height: '80%',
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
        {/* Neon gradient overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(120deg, #ff00ea33 0%, #00fff733 100%)',
          zIndex: 0,
          pointerEvents: "none",
          mixBlendMode: "screen"
        }} />
        {/* Subtle animated glow */}
        <div style={{
          position: 'absolute',
          bottom: '-15%',
          right: '-10%',
          width: '40%',
          height: '40%',
          background: 'radial-gradient(circle at 80% 80%, #ff00ea88 0%, transparent 80%)',
          zIndex: 0,
          pointerEvents: "none",
          filter: "blur(10px)"
        }} />
      </>
    );
  }
  else if (template?.effect === "gradient-stripes" || template?.style === "retro") {
    creativeStyles = {
      backgroundColor: template.colors?.background || '#232946',
      color: template.colors?.text || '#ffe066',
      fontFamily: template.fontFamily,
      border: `2px solid ${template.colors?.accent}`,
      boxShadow: `0 0 24px 4px ${template.colors?.primary}99, 0 0 48px 8px ${template.colors?.accent}66`,
      position: 'relative',
      overflow: 'hidden'
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
          <rect x="40" y="40" width="320" height="320" fill={template.colors?.accent} />
          <rect x="80" y="80" width="240" height="240" fill={template.colors?.primary} />
        </g>
      </svg>
    );
  }
  else if (template?.effect === "matrix-rain" || template?.style === "cyber") {
    creativeStyles = {
      backgroundColor: template.colors?.background || '#000000',
      color: template.colors?.text || '#00ff41',
      fontFamily: template.fontFamily,
      border: `2px solid ${template.colors?.accent}`,
      boxShadow: `0 0 24px 4px ${template.colors?.primary}99, 0 0 48px 8px ${template.colors?.accent}66`,
      position: 'relative',
      overflow: 'hidden'
    };
  }
  else if (template?.effect === "gold-lines" || template?.style === "deco") {
    creativeStyles = {
      backgroundColor: template.colors?.background || '#f5f5f5',
      color: template.colors?.text || '#333333',
      fontFamily: template.fontFamily,
      border: `3px double ${template.colors?.primary}`,
      boxShadow: `0 0 24px 4px ${template.colors?.primary}33`,
      position: 'relative',
      overflow: 'hidden'
    };
  }
  else if (template?.effect === "block-shadow" || template?.style === "brutal") {
    creativeStyles = {
      backgroundColor: template.colors?.background || '#ffffff',
      color: template.colors?.text || '#000000',
      fontFamily: template.fontFamily,
      border: `4px solid ${template.colors?.primary}`,
      boxShadow: `12px 12px 0 0 ${template.colors?.accent}`,
      borderRadius: "0.5rem",
      position: 'relative',
      overflow: 'hidden'
    };
  }
  else {
    creativeStyles = {
      backgroundColor: template?.colors?.background || '#ffffff',
      color: template?.colors?.text || '#333333',
      fontFamily: template?.fontFamily || "inherit",
      border: `1px solid ${template?.colors?.accent || '#e5e7eb'}`,
      position: 'relative',
      overflow: 'hidden'
    };
  }

  // QUANTUM FLUX THEME
  if (template?.style === "quantum") {
    creativeHeader = {
      color: '#7B2CBF',
      textShadow: `0 0 10px rgba(123, 44, 191, 0.7)`,
      letterSpacing: '1px'
    };
    creativeSkills = {
      background: 'rgba(0, 187, 249, 0.2)',
      color: '#00BBF9',
      border: `1px solid #00BBF9`,
      boxShadow: `0 0 8px rgba(0, 187, 249, 0.5)`
    };
    creativeBg = {
      background: `radial-gradient(circle at 30% 50%, rgba(123, 44, 191, 0.15) 0%, transparent 50%)`
    };
    creativePattern = (
      <>
        {/* Animated glowing grid */}
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
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
          {/* Vertical lines */}
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
          {/* Horizontal lines */}
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
        {/* Neon glow blobs */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          left: '-10%',
          width: '60%',
          height: '60%',
          background: 'radial-gradient(circle at 30% 30%, #00BBF9aa 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: "none",
          filter: "blur(8px)"
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-20%',
          right: '-10%',
          width: '50%',
          height: '50%',
          background: 'radial-gradient(circle at 70% 70%, #7B2CBF99 0%, transparent 80%)',
          zIndex: 0,
          pointerEvents: "none",
          filter: "blur(12px)"
        }} />
      </>
    );
    animationVariants = quantumItem;
  }
  // NEON/GLOW STYLE
  else if (template?.effect === "glow" || template?.style === "neon") {
    creativeHeader = {
      textShadow: `0 0 8px ${template.colors?.primary}, 0 0 16px ${template.colors?.accent}`,
      letterSpacing: "2px"
    };
    creativeSkills = {
      boxShadow: `0 0 8px ${template.colors?.primary}`,
      border: `1px solid ${template.colors?.accent}`,
      background: template.colors?.accent,
      color: template.colors?.text
    };
    creativeBg = {
      background: `radial-gradient(circle at 70% 30%, ${template.colors?.accent}22 0%, transparent 70%)`,
    };
    creativePattern = (
      <>
        {/* Animated neon rings */}
        <svg
          style={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '80%',
            height: '80%',
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
        {/* Neon gradient overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(120deg, #ff00ea33 0%, #00fff733 100%)',
          zIndex: 0,
          pointerEvents: "none",
          mixBlendMode: "screen"
        }} />
        {/* Subtle animated glow */}
        <div style={{
          position: 'absolute',
          bottom: '-15%',
          right: '-10%',
          width: '40%',
          height: '40%',
          background: 'radial-gradient(circle at 80% 80%, #ff00ea88 0%, transparent 80%)',
          zIndex: 0,
          pointerEvents: "none",
          filter: "blur(10px)"
        }} />
      </>
    );
    animationVariants = neonItem;
  }
  // SYNTHWAVE/RETRO 
  else if (template?.effect === "gradient-stripes" || template?.style === "retro") {
    creativeHeader = {
      textShadow: `2px 2px 0 ${template.colors?.accent}`,
      letterSpacing: "1px"
    };
    creativeSkills = {
      border: `1px dashed ${template.colors?.accent}`,
      background: template.colors?.primary,
      color: template.colors?.text
    };
    creativeBg = {
      background: `repeating-linear-gradient(135deg, ${template.colors?.primary}22 0 10px, transparent 10px 20px)`,
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
          <rect x="40" y="40" width="320" height="320" fill={template.colors?.accent} />
          <rect x="80" y="80" width="240" height="240" fill={template.colors?.primary} />
        </g>
      </svg>
    );
    animationVariants = retroItem;
  }
  // Tech Noir/Cyber
  else if (template?.effect === "matrix-rain" || template?.style === "cyber") {
    creativeHeader = {
      textShadow: `0 0 8px ${template.colors?.primary}`,
      fontFamily: template.fontFamily,
      letterSpacing: "2px"
    };
    creativeSkills = {
      background: "#000",
      color: template.colors?.primary,
      fontFamily: template.fontFamily,
      border: `1px solid ${template.colors?.accent}`,
      boxShadow: `0 0 8px ${template.colors?.primary}`
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
          <text x="10" y="40" fontFamily="Share Tech Mono" fontSize="32" fill={template.colors?.primary}>101010</text>
          <text x="200" y="200" fontFamily="Share Tech Mono" fontSize="32" fill={template.colors?.accent}>011011</text>
          <text x="100" y="350" fontFamily="Share Tech Mono" fontSize="32" fill={template.colors?.primary}>110001</text>
        </g>
      </svg>
    );
    animationVariants = cyberItem;
  }
  // Art Deco
  else if (template?.effect === "gold-lines" || template?.style === "deco") {
    creativeHeader = {
      fontFamily: template.fontFamily,
      letterSpacing: "3px",
      color: template.colors?.primary,
      textShadow: `0 2px 0 ${template.colors?.accent}`,
    };
    creativeSkills = {
      border: `1px solid ${template.colors?.primary}`,
      background: template.colors?.accent,
      color: template.colors?.text,
      fontFamily: template.fontFamily,
      boxShadow: `0 0 8px ${template.colors?.primary}`
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
        <g stroke={template.colors?.primary} strokeWidth="3" opacity="0.15">
          <line x1="0" y1="0" x2="400" y2="400" />
          <line x1="400" y1="0" x2="0" y2="400" />
          <rect x="50" y="50" width="300" height="300" />
        </g>
      </svg>
    );
    animationVariants = decoItem;
  }
  // Brutalism
  else if (template?.effect === "block-shadow" || template?.style === "brutal") {
    creativeHeader = {
      fontFamily: template.fontFamily,
      textTransform: "uppercase",
      letterSpacing: "2px",
      color: template.colors?.primary,
    };
    creativeSkills = {
      border: `2px solid ${template.colors?.primary}`,
      background: template.colors?.accent,
      color: template.colors?.text,
      fontFamily: template.fontFamily,
      boxShadow: `4px 4px 0 0 ${template.colors?.primary}`,
    };
    creativePattern = (
      <div style={{
        position: 'absolute',
        top: 0, left: 0, width: '100%', height: '100%',
        background: `repeating-linear-gradient(135deg, ${template.colors?.accent}22 0 10px, transparent 10px 20px)`,
        zIndex: 0
      }} />
    );
    animationVariants = brutalItem;
  }

  useGoogleFont(creativeStyles.fontFamily);

  // Data selection logic
  const name = project?.title ?? "Domineke Nelson";
  const role = project?.role ?? "Senior Product Designer";
  const about = project?.about ?? "Creating user-centered digital experiences with beautiful interfaces.";
  const description = project?.description ?? "I love building beautiful, functional products that delight users and drive business results.";
  const experience = Array.isArray(project?.experience)
    ? project.experience
    : [
        { title: "Lead Product Designer", company: "TechStart Inc.", period: "2020-Present" },
        { title: "UI/UX Designer", company: "Adobe", period: "2017-2020" }
      ];
  const skills = Array.isArray(project?.tags)
    ? project.tags
    : ['Figma', 'Sketch', 'Adobe XD', 'Prototyping', 'User Research'];
  const contact = Array.isArray(project?.contact)
    ? project.contact
    : ["DNelsohn@example.com", "linkedin.com/in/D'Nelson"];
  const imageUrl = project?.avatarUrl || "";

  return (
    <motion.div
      className="rounded-xl shadow-lg p-8 mb-8 border relative overflow-hidden"
      style={creativeStyles}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {creativePattern}
      <div className="flex flex-col md:flex-row items-center gap-8" style={{ position: "relative", zIndex: 1 }}>
        <div className="flex-shrink-0">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-32 h-32 rounded-full object-cover border-4"
              style={{ borderColor: template.colors?.accent }}
            />
          ) : (
            <div
              className="w-32 h-32 rounded-full flex items-center justify-center bg-gray-200"
              style={{ background: template.colors?.accent }}
            >
              <UserIcon className="w-16 h-16 text-white" />
            </div>
          )}
        </div>
        <div>
          <motion.h2
            className="text-3xl font-bold mb-1"
            style={creativeHeader}
            variants={animationVariants}
          >
            {name}
          </motion.h2>
          <motion.p className="text-lg mb-2" style={{ color: template.colors?.accent }} variants={animationVariants}>
            {role}
          </motion.p>
          <motion.p className="mb-2" variants={animationVariants}>{description}</motion.p>
          <motion.p className="mb-2" variants={animationVariants}>{about}</motion.p>
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
              {experience.length > 0 ? experience.map((exp, idx) => (
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
              {skills.length > 0 ? skills.map((skill, idx) => (
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
              {contact.length > 0 ? contact.map((c, idx) => (
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
              backgroundColor: template.colors?.accent,
              color: template.colors?.text,
            }}
          >
            Browse All Templates
          </a>
        </div>
      )}
    </motion.div>
  );
}