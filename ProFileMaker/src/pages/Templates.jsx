import { Link } from 'react-router-dom';

export default function Templates() {
  const templates = [
    {
      name: "Elegant Harmony",
      category: "Timeless & Versatile",
      preview: "https://placehold.co/600x400/EAD7D1/2D3142/png?text=Elegant+Harmony",
      colors: ["#EAD7D1", "#2D3142", "#BFC0C0"]
    },
    {
      name: "Vivid Spectrum",
      category: "Colorful & Expressive",
      preview: "https://placehold.co/600x400/6A0572/F9DB6D/png?text=Vivid+Spectrum",
      colors: ["#6A0572", "#F9DB6D", "#F5F5F5"]
    },
    {
      name: "Urban Classic",
      category: "Bold & Refined",
      preview: "https://placehold.co/600x400/22223B/F2E9E4/png?text=Urban+Classic",
      colors: ["#22223B", "#F2E9E4", "#4A4E69"]
    },
    {
      name: "Fresh Perspective",
      category: "Modern & Inviting",
      preview: "https://placehold.co/600x400/7AE582/2B2D42/png?text=Fresh+Perspective",
      colors: ["#7AE582", "#2B2D42", "#EDF2F4"]
    },
    {
      name: "Radiant Flow",
      category: "Dynamic & Friendly",
      preview: "https://placehold.co/600x400/FFB4A2/6D6875/png?text=Radiant+Flow",
      colors: ["#FFB4A2", "#6D6875", "#FFF1E6"]
    },
    {
      name: "Serene Balance",
      category: "Soft & Calm",
      preview: "https://placehold.co/600x400/A7C7E7/2E4057/png?text=Serene+Balance",
      colors: ["#A7C7E7", "#2E4057", "#F6F5F5"]
    },
    {
      name: "Professional Minimalist",
      category: "Corporate & Clean",
      preview: "https://placehold.co/600x400/FFFFFF/1A1A1A/png?text=Professional+Minimalist",
      colors: ["#FFFFFF", "#1A1A1A", "#0077B6"]
    },
    {
      name: "Tech Innovator",
      category: "Startup & Technology",
      preview: "https://placehold.co/600x400/232946/43D8C9/png?text=Tech+Innovator",
      colors: ["#232946", "#43D8C9", "#E9EAEC"]
    },
    {
      name: "Creative Portfolio",
      category: "Artists & Designers",
      preview: "https://placehold.co/600x400/FF6F61/2E294E/png?text=Creative+Portfolio",
      colors: ["#FF6F61", "#2E294E", "#F6F7EB"]
    },
    {
      name: "Academic Scholar",
      category: "Education & Research",
      preview: "https://placehold.co/600x400/3E92CC/F9F9F9/png?text=Academic+Scholar",
      colors: ["#3E92CC", "#F9F9F9", "#1B1B1E"]
    },
    {
      name: "Healthcare Pro",
      category: "Medical & Wellness",
      preview: "https://placehold.co/600x400/DEF2F1/3AAFA9/png?text=Healthcare+Pro",
      colors: ["#DEF2F1", "#3AAFA9", "#17252A"]
    },
    {
      name: "Nonprofit Impact",
      category: "Charity & Social Good",
      preview: "https://placehold.co/600x400/FFE156/6A0572/png?text=Nonprofit+Impact",
      colors: ["#FFE156", "#6A0572", "#F5F5F5"]
    },
    {
      name: "Event Organizer",
      category: "Events & Conferences",
      preview: "https://placehold.co/600x400/FFB997/2E4057/png?text=Event+Organizer",
      colors: ["#FFB997", "#2E4057", "#F6F5F5"]
    },
    {
      name: "Freelancer Focus",
      category: "Consultants & Freelancers",
      preview: "https://placehold.co/600x400/6A0572/F9DB6D/png?text=Freelancer+Focus",
      colors: ["#6A0572", "#F9DB6D", "#F5F5F5"]
    }
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-4">
            Stunning Templates
          </h1>
          <p className="text-xl text-text/80 dark:text-text-dark/80 max-w-3xl mx-auto">
            Choose a design that matches your personal brand and style
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {templates.map((template, index) => (
            <div
              key={index}
              className="bg-white dark:bg-base-dark rounded-xl shadow-md border border-accent/20 overflow-hidden hover:shadow-lg transition"
            >
              <div className="h-64 bg-gray-100 dark:bg-gray-800">
                <img
                  src={template.preview}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-primary">{template.name}</h3>
                    <p className="text-accent/80">{template.category}</p>
                  </div>
                  <Link
                    to={`/templates/${template.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="px-4 py-2 rounded-md bg-primary/10 dark:bg-accent/10 text-primary dark:text-accent hover:bg-primary/20 dark:hover:bg-accent/20 transition"
                  >
                    Preview
                  </Link>
                </div>
                <div className="mt-4 flex space-x-2">
                  {template.colors.map((color, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full border border-gray-200 dark:border-gray-700"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-text/80 dark:text-text-dark/80 mb-4">
            Don't see what you're looking for? More templates coming soon!
          </p>
          <Link
            to="/contact"
            className="inline-block px-6 py-2 rounded-md border border-accent text-accent font-medium hover:bg-accent/10 transition"
          >
            Request a Template
          </Link>
        </div>
      </div>
    </div>
  );
}
