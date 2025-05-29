import { lazy } from "react";

// Template Metadata
export const TEMPLATE_METADATA = {
  "elegant-harmony": {
    name: "Elegant Harmony",
    category: "Timeless & Versatile",
    colors: ["#EAD7D1", "#2D3142", "#BFC0C0"],
    preview:
      "https://placehold.co/600x400/EAD7D1/2D3142/png?text=Elegant+Harmony",
  },
  "vivid-spectrum": {
    name: "Vivid Spectrum",
    category: "Colorful & Expressive",
    colors: ["#6A0572", "#F9DB6D", "#F5F5F5"],
    preview:
      "https://placehold.co/600x400/6A0572/F9DB6D/png?text=Vivid+Spectrum",
  },
  "urban-classic": {
    name: "Urban Classic",
    category: "Bold & Refined",
    colors: ["#22223B", "#F2E9E4", "#4A4E69"],
    preview:
      "https://placehold.co/600x400/22223B/F2E9E4/png?text=Urban+Classic",
  },
  "fresh-perspective": {
    name: "Fresh Perspective",
    category: "Modern & Inviting",
    colors: ["#7AE582", "#2B2D42", "#EDF2F4"],
    preview:
      "https://placehold.co/600x400/7AE582/2B2D42/png?text=Fresh+Perspective",
  },
  "radiant-flow": {
    name: "Radiant Flow",
    category: "Dynamic & Friendly",
    colors: ["#FFB4A2", "#6D6875", "#FFF1E6"],
    preview: "https://placehold.co/600x400/FFB4A2/6D6875/png?text=Radiant+Flow",
  },
  "serene-balance": {
    name: "Serene Balance",
    category: "Soft & Calm",
    colors: ["#A7C7E7", "#2E4057", "#F6F5F5"],
    preview:
      "https://placehold.co/600x400/A7C7E7/2E4057/png?text=Serene+Balance",
  },
  "professional-minimalist": {
    name: "Professional Minimalist",
    category: "Corporate & Clean",
    colors: ["#FFFFFF", "#1A1A1A", "#0077B6"],
    preview:
      "https://placehold.co/600x400/FFFFFF/1A1A1A/png?text=Professional+Minimalist",
  },
  "tech-innovator": {
    name: "Tech Innovator",
    category: "Startup & Technology",
    colors: ["#232946", "#43D8C9", "#E9EAEC"],
    preview:
      "https://placehold.co/600x400/232946/43D8C9/png?text=Tech+Innovator",
  },
  "creative-portfolio": {
    name: "Creative Portfolio",
    category: "Artists & Designers",
    colors: ["#FF6F61", "#2E294E", "#F6F7EB"],
    preview:
      "https://placehold.co/600x400/FF6F61/2E294E/png?text=Creative+Portfolio",
  },
  "academic-scholar": {
    name: "Academic Scholar",
    category: "Education & Research",
    colors: ["#3E92CC", "#F9F9F9", "#1B1B1E"],
    preview:
      "https://placehold.co/600x400/3E92CC/F9F9F9/png?text=Academic+Scholar",
  },
  "healthcare-pro": {
    name: "Healthcare Pro",
    category: "Medical & Wellness",
    colors: ["#DEF2F1", "#3AAFA9", "#17252A"],
    preview:
      "https://placehold.co/600x400/DEF2F1/3AAFA9/png?text=Healthcare+Pro",
  },
  "nonprofit-impact": {
    name: "Nonprofit Impact",
    category: "Charity & Social Good",
    colors: ["#FFE156", "#6A0572", "#F5F5F5"],
    preview:
      "https://placehold.co/600x400/FFE156/6A0572/png?text=Nonprofit+Impact",
  },
  "event-organizer": {
    name: "Event Organizer",
    category: "Events & Conferences",
    colors: ["#FFB997", "#2E4057", "#F6F5F5"],
    preview:
      "https://placehold.co/600x400/FFB997/2E4057/png?text=Event+Organizer",
  },
  "freelancer-focus": {
    name: "Freelancer Focus",
    category: "Consultants & Freelancers",
    colors: ["#236B4E", "#FFD700", "#C0C0C0"],
    preview:
      "https://placehold.co/600x400/236B4E/FFD700/png?text=Freelancer+Focus",
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
