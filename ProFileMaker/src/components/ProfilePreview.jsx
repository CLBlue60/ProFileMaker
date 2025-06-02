import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import {
  UserIcon,
  BriefcaseIcon,
  EnvelopeIcon,
  CodeBracketIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

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
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

const templateTransition = {
  type: "spring",
  damping: 20,
  stiffness: 100
};

const pulse = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    repeatType: "reverse"
  }
};

const hoverScale = {
  scale: 1.03,
  transition: { type: "spring", stiffness: 400 }
};

const tapScale = {
  scale: 0.98
};

// Helper to dynamically load Google Fonts
function useGoogleFont(fontFamily) {
  useEffect(() => {
    if (!fontFamily) return;
    const fontMap = {
      "'Orbitron', sans-serif": "Orbitron:wght@400;700",
      "'Press Start 2P', cursive": "Press+Start+2P",
      "'Share Tech Mono', monospace": "Share+Tech+Mono",
      "'Cinzel Decorative', serif": "Cinzel+Decorative:wght@700",
      "'Bebas Neue', sans-serif": "Bebas+Neue",
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
      // Optionally remove font link on unmount
    };
  }, [fontFamily]);
}

export default function ProfilePreview({ template }) {
  const demoTemplates = [
    {
      name: "Modern Professional",
      colors: {
        primary: '#3B82F6',
        background: '#FFFFFF',
        text: '#1F2937',
        accent: '#E5E7EB'
      },
      style: 'minimal'
    },
    {
      name: "Creative Portfolio",
      colors: {
        primary: '#8B5CF6',
        background: '#F5F3FF',
        text: '#4C1D95',
        accent: '#DDD6FE'
      },
      style: 'creative'
    },
    {
      name: "Tech Innovator",
      colors: {
        primary: '#06B6D4',
        background: '#ECFEFF',
        text: '#164E63',
        accent: '#A5F3FC'
      },
      style: 'tech'
    }
  ];

  const templates = template ? [template] : demoTemplates;
  const [activeTemplate, setActiveTemplate] = useState(0);
  const currentTemplate = templates[activeTemplate];

  // Font integration
  useGoogleFont(currentTemplate.fontFamily);

  // Creative effects based on style/effect
  let creativeStyles = {};
  let creativeHeader = {};
  let creativeBg = {};
  let creativeSkills = {};
  let creativePattern = null;

  // Neon/Glow
  if (currentTemplate.effect === "glow" || currentTemplate.style === "neon") {
    creativeStyles = {
      boxShadow: `0 0 24px 4px ${currentTemplate.colors.primary}99, 0 0 48px 8px ${currentTemplate.colors.accent}66`,
      border: `2px solid ${currentTemplate.colors.accent}`,
      fontFamily: currentTemplate.fontFamily,
      background: currentTemplate.colors.background,
      color: currentTemplate.colors.text,
    };
    creativeHeader = {
      textShadow: `0 0 8px ${currentTemplate.colors.primary}, 0 0 16px ${currentTemplate.colors.accent}`,
      letterSpacing: "2px"
    };
    creativeSkills = {
      boxShadow: `0 0 8px ${currentTemplate.colors.primary}`,
      border: `1px solid ${currentTemplate.colors.accent}`,
    };
    creativeBg = {
      background: `radial-gradient(circle at 70% 30%, ${currentTemplate.colors.accent}22 0%, transparent 70%)`,
    };
  }
  // Synthwave/Retro
  else if (currentTemplate.effect === "gradient-stripes" || currentTemplate.style === "retro") {
    creativeStyles = {
      background: `linear-gradient(135deg, ${currentTemplate.colors.primary} 0%, ${currentTemplate.colors.accent} 100%)`,
      color: currentTemplate.colors.text,
      fontFamily: currentTemplate.fontFamily,
      border: `2px solid ${currentTemplate.colors.accent}`,
    };
    creativeHeader = {
      textShadow: `2px 2px 0 ${currentTemplate.colors.accent}`,
      letterSpacing: "1px"
    };
    creativeSkills = {
      border: `1px dashed ${currentTemplate.colors.accent}`,
    };
    creativeBg = {
      background: `repeating-linear-gradient(135deg, ${currentTemplate.colors.primary}22 0 10px, transparent 10px 20px)`,
    };
  }
  // Tech Noir/Cyber
  else if (currentTemplate.effect === "matrix-rain" || currentTemplate.style === "cyber") {
    creativeStyles = {
      background: currentTemplate.colors.background,
      color: currentTemplate.colors.text,
      fontFamily: currentTemplate.fontFamily,
      border: `2px solid ${currentTemplate.colors.accent}`,
    };
    creativeHeader = {
      textShadow: `0 0 8px ${currentTemplate.colors.primary}`,
      fontFamily: currentTemplate.fontFamily,
      letterSpacing: "2px"
    };
    creativeSkills = {
      background: "#000",
      color: currentTemplate.colors.primary,
      fontFamily: currentTemplate.fontFamily,
    };
    // Matrix rain SVG overlay
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
          <text x="10" y="40" fontFamily="Share Tech Mono" fontSize="32" fill={currentTemplate.colors.primary}>101010</text>
          <text x="200" y="200" fontFamily="Share Tech Mono" fontSize="32" fill={currentTemplate.colors.accent}>011011</text>
          <text x="100" y="350" fontFamily="Share Tech Mono" fontSize="32" fill={currentTemplate.colors.primary}>110001</text>
        </g>
      </svg>
    );
  }
  // Art Deco
  else if (currentTemplate.effect === "gold-lines" || currentTemplate.style === "deco") {
    creativeStyles = {
      background: currentTemplate.colors.background,
      color: currentTemplate.colors.text,
      fontFamily: currentTemplate.fontFamily,
      border: `3px double ${currentTemplate.colors.primary}`,
    };
    creativeHeader = {
      fontFamily: currentTemplate.fontFamily,
      letterSpacing: "3px",
      color: currentTemplate.colors.primary,
      textShadow: `0 2px 0 ${currentTemplate.colors.accent}`,
    };
    creativeSkills = {
      border: `1px solid ${currentTemplate.colors.primary}`,
      background: currentTemplate.colors.accent,
      color: currentTemplate.colors.text,
      fontFamily: currentTemplate.fontFamily,
    };
    // Gold lines SVG overlay
    creativePattern = (
      <svg
        style={{
          position: "absolute",
          top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0
        }}
        viewBox="0 0 400 400"
        fill="none"
      >
        <g stroke={currentTemplate.colors.primary} strokeWidth="3" opacity="0.15">
          <line x1="0" y1="0" x2="400" y2="400" />
          <line x1="400" y1="0" x2="0" y2="400" />
          <rect x="50" y="50" width="300" height="300" />
        </g>
      </svg>
    );
  }
  // Brutalism
  else if (currentTemplate.effect === "block-shadow" || currentTemplate.style === "brutal") {
    creativeStyles = {
      background: currentTemplate.colors.background,
      color: currentTemplate.colors.text,
      fontFamily: currentTemplate.fontFamily,
      border: `4px solid ${currentTemplate.colors.primary}`,
      boxShadow: `12px 12px 0 0 ${currentTemplate.colors.accent}`,
      borderRadius: "0.5rem"
    };
    creativeHeader = {
      fontFamily: currentTemplate.fontFamily,
      textTransform: "uppercase",
      letterSpacing: "2px",
      color: currentTemplate.colors.primary,
    };
    creativeSkills = {
      border: `2px solid ${currentTemplate.colors.primary}`,
      background: currentTemplate.colors.accent,
      color: currentTemplate.colors.text,
      fontFamily: currentTemplate.fontFamily,
      boxShadow: `4px 4px 0 0 ${currentTemplate.colors.primary}`,
    };
  }
  // Default
  else {
    creativeStyles = {
      background: currentTemplate.colors.background,
      color: currentTemplate.colors.text,
      fontFamily: currentTemplate.fontFamily || "inherit",
      border: `1px solid ${currentTemplate.colors.accent}`,
    };
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={container}
      className="mt-16 md:mt-24 mx-auto max-w-4xl px-4"
      style={creativeStyles}
    >
      {creativePattern}
      {!template && (
        <motion.div className="flex flex-wrap gap-2 mb-6 justify-center">
          {templates.map((template, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveTemplate(index)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeTemplate === index
                  ? 'text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
              style={activeTemplate === index ? {
                backgroundColor: currentTemplate.colors.primary
              } : {}}
              variants={item}
              whileHover={hoverScale}
              whileTap={tapScale}
              animate={{
                scale: activeTemplate === index ? [1, 1.1, 1] : 1
              }}
              transition={{
                scale: { duration: 0.3 }
              }}
            >
              {template.name}
            </motion.button>
          ))}
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTemplate}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: templateTransition
          }}
          exit={{
            opacity: 0,
            y: -20,
            transition: { duration: 0.2 }
          }}
          className="relative rounded-2xl overflow-hidden shadow-2xl"
          style={{
            ...creativeBg,
            border: "none",
            zIndex: 1
          }}
          whileHover={{
            boxShadow: `0 20px 25px -5px ${currentTemplate.colors.primary}20`
          }}
        >
          <motion.div
            key={activeTemplate + '-header'}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start border-b"
            style={{ borderColor: currentTemplate.colors.accent, ...creativeHeader }}
            variants={item}
          >
            <motion.div
              className="w-20 h-20 rounded-full flex items-center justify-center shadow-sm"
              style={{ backgroundColor: currentTemplate.colors.primary, ...creativeHeader }}
              animate={pulse}
            >
              <UserIcon className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-1"
                style={{ color: currentTemplate.colors.primary, ...creativeHeader }}
                initial={{ x: -10 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Domineke Nelson
              </motion.h2>
              <motion.p
                className="text-lg mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Senior Product Designer
              </motion.p>
              <motion.p
                className="opacity-80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 0.4 }}
              >
                Creating user-centered digital experiences with beautiful interfaces.
              </motion.p>
            </div>
          </motion.div>

          <motion.div
            className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <div className="md:col-span-2 space-y-6">
              <motion.div className="space-y-2" variants={item}>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <UserIcon className="w-5 h-5" />
                  About
                </h3>
                <p>
                  Passionate designer with 8+ years of experience at companies like
                  Adobe and Airbnb. Specializing in design systems and prototypes.
                </p>
              </motion.div>

              <motion.div className="space-y-4" variants={item}>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <BriefcaseIcon className="w-5 h-5" />
                  Experience
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Lead Product Designer</h4>
                    <p className="text-sm opacity-70">TechStart Inc. • 2020-Present</p>
                  </div>
                  <div>
                    <h4 className="font-medium">UI/UX Designer</h4>
                    <p className="text-sm opacity-70">Adobe • 2017-2020</p>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="space-y-6">
              <motion.div className="space-y-2" variants={item}>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <CodeBracketIcon className="w-5 h-5" />
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Figma', 'Sketch', 'Adobe XD', 'Prototyping', 'User Research'].map((skill) => (
                    <motion.span
                      key={skill}
                      className="px-3 py-1 rounded-full text-sm"
                      style={{
                        backgroundColor: currentTemplate.colors.accent,
                        color: currentTemplate.colors.text,
                        ...creativeSkills
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              <motion.div className="space-y-2" variants={item}>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <EnvelopeIcon className="w-5 h-5" />
                  Contact
                </h3>
                <div className="space-y-1">
                  <p>DNelsohn@example.com</p>
                  <p>linkedin.com/in/D'Nelson</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <motion.div
        className="mt-8 text-center"
        variants={item}
      >
        <motion.a
          href="/templates"
          className="inline-flex items-center px-6 py-3 rounded-md font-medium gap-2"
          style={{
            backgroundColor: currentTemplate.colors.primary,
            color: 'white',
            fontFamily: currentTemplate.fontFamily
          }}
          whileHover={{
            scale: 1.05,
            boxShadow: `0 5px 15px ${currentTemplate.colors.primary}80`
          }}
          whileTap={tapScale}
        >
          Browse All Templates
          <ArrowRightIcon className="w-4 h-4" />
        </motion.a>
      </motion.div>
    </motion.div>
  );
}
