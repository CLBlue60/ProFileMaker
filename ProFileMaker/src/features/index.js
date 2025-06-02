import { lazy } from "react";

// Helper to convert array to object for colors
function colorArrayToObject(arr, style) {
  // You can customize text color logic per style if you want
  let text = "#1A1A1A";
  if (
    style === "neon" ||
    style === "dark" ||
    (arr[1] && arr[1].toLowerCase() === "#2d3142")
  ) {
    text = "#fff";
  }
  return {
    primary: arr[0],
    background: arr[1],
    accent: arr[2],
    text,
  };
}

// Template Metadata
export const TEMPLATE_METADATA = {
  "elegant-harmony": {
    name: "Elegant Harmony",
    category: "Timeless & Versatile",
    colors: colorArrayToObject(["#EAD7D1", "#2D3142", "#BFC0C0"]),
    preview:
      "https://placehold.co/600x400/EAD7D1/2D3142/png?text=Elegant+Harmony",
  },
  "vivid-spectrum": {
    name: "Vivid Spectrum",
    category: "Colorful & Expressive",
    colors: colorArrayToObject(["#6A0572", "#F9DB6D", "#F5F5F5"]),
    preview:
      "https://placehold.co/600x400/6A0572/F9DB6D/png?text=Vivid+Spectrum",
  },
  "urban-classic": {
    name: "Urban Classic",
    category: "Bold & Refined",
    colors: colorArrayToObject(["#22223B", "#F2E9E4", "#4A4E69"]),
    preview:
      "https://placehold.co/600x400/22223B/F2E9E4/png?text=Urban+Classic",
  },
  "fresh-perspective": {
    name: "Fresh Perspective",
    category: "Modern & Inviting",
    colors: colorArrayToObject(["#7AE582", "#2B2D42", "#EDF2F4"]),
    preview:
      "https://placehold.co/600x400/7AE582/2B2D42/png?text=Fresh+Perspective",
  },
  "radiant-flow": {
    name: "Radiant Flow",
    category: "Dynamic & Friendly",
    colors: colorArrayToObject(["#FFB4A2", "#6D6875", "#FFF1E6"]),
    preview: "https://placehold.co/600x400/FFB4A2/6D6875/png?text=Radiant+Flow",
  },
  "serene-balance": {
    name: "Serene Balance",
    category: "Soft & Calm",
    colors: colorArrayToObject(["#A7C7E7", "#2E4057", "#F6F5F5"]),
    preview:
      "https://placehold.co/600x400/A7C7E7/2E4057/png?text=Serene+Balance",
  },
  "professional-minimalist": {
    name: "Professional Minimalist",
    category: "Corporate & Clean",
    colors: colorArrayToObject(["#FFFFFF", "#1A1A1A", "#0077B6"]),
    preview:
      "https://placehold.co/600x400/FFFFFF/1A1A1A/png?text=Professional+Minimalist",
  },
  "tech-innovator": {
    name: "Tech Innovator",
    category: "Startup & Technology",
    colors: colorArrayToObject(["#232946", "#43D8C9", "#E9EAEC"]),
    preview:
      "https://placehold.co/600x400/232946/43D8C9/png?text=Tech+Innovator",
  },
  "creative-portfolio": {
    name: "Creative Portfolio",
    category: "Artists & Designers",
    colors: colorArrayToObject(["#FF6F61", "#2E294E", "#F6F7EB"]),
    preview:
      "https://placehold.co/600x400/FF6F61/2E294E/png?text=Creative+Portfolio",
  },
  "academic-scholar": {
    name: "Academic Scholar",
    category: "Education & Research",
    colors: colorArrayToObject(["#3E92CC", "#F9F9F9", "#1B1B1E"]),
    preview:
      "https://placehold.co/600x400/3E92CC/F9F9F9/png?text=Academic+Scholar",
  },
  "healthcare-pro": {
    name: "Healthcare Pro",
    category: "Medical & Wellness",
    colors: colorArrayToObject(["#DEF2F1", "#3AAFA9", "#17252A"]),
    preview:
      "https://placehold.co/600x400/DEF2F1/3AAFA9/png?text=Healthcare+Pro",
  },
  "nonprofit-impact": {
    name: "Nonprofit Impact",
    category: "Charity & Social Good",
    colors: colorArrayToObject(["#FFE156", "#6A0572", "#F5F5F5"]),
    preview:
      "https://placehold.co/600x400/FFE156/6A0572/png?text=Nonprofit+Impact",
  },
  "event-organizer": {
    name: "Event Organizer",
    category: "Events & Conferences",
    colors: colorArrayToObject(["#FFB997", "#2E4057", "#F6F5F5"]),
    preview:
      "https://placehold.co/600x400/FFB997/2E4057/png?text=Event+Organizer",
  },
  "freelancer-focus": {
    name: "Freelancer Focus",
    category: "Consultants & Freelancers",
    colors: colorArrayToObject(["#236B4E", "#FFD700", "#C0C0C0"]),
    preview:
      "https://placehold.co/600x400/236B4E/FFD700/png?text=Freelancer+Focus",
  },
  "neon-dream": {
    name: "Neon Dream",
    category: "Futuristic Neon",
    advanced: true,
    style: "neon",
    fontFamily: "'Orbitron', sans-serif",
    preview: "https://placehold.co/600x400/18122B/39FF14/png?text=Neon+Dream",
    colors: {
      primary: "#39FF14",
      background: "#18122B",
      text: "#F8F8F8",
      accent: "#FF00C8",
    },
    effect: "glow",
  },
  "retro-wave": {
    name: "Retro Wave",
    category: "80s Synthwave",
    advanced: true,
    style: "retro",
    fontFamily: "'Press Start 2P', cursive",
    preview: "https://placehold.co/600x400/2D033B/FF6EC7/png?text=Retro+Wave",
    colors: {
      primary: "#FF6EC7",
      background: "#2D033B",
      text: "#F7F7F7",
      accent: "#FFD700",
    },
    effect: "gradient-stripes",
  },
  "cyber-noir": {
    name: "Cyber Noir",
    category: "Tech Noir",
    advanced: true,
    style: "cyber",
    fontFamily: "'Share Tech Mono', monospace",
    preview: "https://placehold.co/600x400/000000/FF00C8/png?text=Cyber+Noir",
    colors: {
      primary: "#FF00C8", 
      background: "#000000",
      text: "#FFFFFF",
      accent: "#C0C0C0",
    },
    effect: "matrix-rain",
  },
  "art-deco-luxe": {
    name: "Art Deco Luxe",
    category: "Gatsby Glam",
    advanced: true,
    style: "deco",
    fontFamily: "'Cinzel Decorative', serif",
    preview:
      "https://placehold.co/600x400/22223B/FFD700/png?text=Art+Deco+Luxe",
    colors: {
      primary: "#FFD700",
      background: "#22223B",
      text: "#F2E9E4",
      accent: "#BFC0C0",
    },
    effect: "gold-lines",
  },
  "minimal-brutalism": {
    name: "Minimal Brutalism",
    category: "Bold Minimalism",
    advanced: true,
    style: "brutal",
    fontFamily: "'Bebas Neue', sans-serif",
    preview:
      "https://placehold.co/600x400/FFFFFF/1A1A1A/png?text=Minimal+Brutalism",
    colors: {
      primary: "#1A1A1A",
      background: "#FFFFFF",
      text: "#1A1A1A",
      accent: "#FF6F61",
    },
    effect: "block-shadow",
  },
};

// Lazy-loaded template components
const templateComponents = {
  "elegant-harmony": lazy(() => import("./templates/ElegantHarmony")),
  "vivid-spectrum": lazy(() => import("./templates/VividSpectrum")),
  "urban-classic": lazy(() => import("./templates/UrbanClassic")),
  "fresh-perspective": lazy(() => import("./templates/FreshPerspective")),
  "radiant-flow": lazy(() => import("./templates/RadiantFlow")),
  "serene-balance": lazy(() => import("./templates/SereneBalance")),
  "professional-minimalist": lazy(() =>
    import("./templates/ProfessionalMinimalist")
  ),
  "tech-innovator": lazy(() => import("./templates/TechInnovator")),
  "creative-portfolio": lazy(() => import("./templates/CreativePortfolio")),
  "academic-scholar": lazy(() => import("./templates/AcademicScholar")),
  "healthcare-pro": lazy(() => import("./templates/HealthcarePro")),
  "nonprofit-impact": lazy(() => import("./templates/NonprofitImpact")),
  "event-organizer": lazy(() => import("./templates/EventOrganizer")),
  "freelancer-focus": lazy(() => import("./templates/FreelancerFocus")),
};

// Public API
export const TEMPLATES = Object.keys(templateComponents).map((id) => ({
  id,
  ...TEMPLATE_METADATA[id],
}));

export const getTemplateComponent = (id) => {
  return templateComponents[id] || templateComponents["elegant-harmony"];
};
