import { Link } from 'react-router-dom';

export default function Features() {
  const features = [
    {
      title: "Customizable Profiles",
      description: "Create a unique profile that showcases your personality and skills with our easy-to-use editor.",
      icon: "🎨"
    },
    {
      title: "Multiple Templates",
      description: "Choose from professionally designed templates tailored for developers.",
      icon: "💎"
    },
    {
      title: "Project Showcase",
      description: "Highlight your best work with rich media and detailed case studies.",
      icon: "🖼️"
    },
    {
      title: "Skills Visualization",
      description: "Display your technical skills with interactive charts and progress bars.",
      icon: "📊"
    },
    {
      title: "Contact Integration",
      description: "Make it easy for recruiters to contact you with built-in forms and links.",
      icon: "📩"
    },
    {
      title: "Analytics Dashboard",
      description: "Track who's viewing your profile and which projects get the most attention.",
      icon: "📈"
    }
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-4">
            Powerful Features
          </h1>
          <p className="text-xl text-text/80 dark:text-text-dark/80 max-w-3xl mx-auto">
            Everything you need to create a professional developer profile that stands out
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-base-dark p-8 rounded-xl shadow-md border border-accent/20 hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-primary">{feature.title}</h3>
              <p className="text-accent">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/signup"
            className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold hover:shadow-lg transition-all hover:scale-105"
          >
            Get Started Free
          </Link>
        </div>
      </div>
    </div>
  );
}
