import { Link } from 'react-router-dom';
import { TEMPLATE_METADATA } from '../features/index';

export default function Templates() {
  const templates = Object.entries(TEMPLATE_METADATA); 
  const advancedTemplates = templates.filter(([, t]) => t.advanced);
  const regularTemplates = templates.filter(([, t]) => !t.advanced);

  function getColorSwatches(colors) {
    if (Array.isArray(colors)) {
      return colors.filter(c => typeof c === "string" && c.startsWith("#"));
    }
    if (typeof colors === "object" && colors !== null) {
      return Object.values(colors)
        .filter((v, i, arr) => typeof v === "string" && v.startsWith("#") && arr.indexOf(v) === i);
    }
    return [];
  }

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

        {/* Advanced Templates Section */}
        {advancedTemplates.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-accent mb-6 text-center">Premium Templates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {advancedTemplates.map(([id, template]) => (
                <div
                  key={id}
                  className="bg-white dark:bg-base-dark rounded-xl shadow-md border-2 border-accent overflow-hidden hover:shadow-lg transition"
                >
                  <div className="h-64 bg-gray-100 dark:bg-gray-800 relative">
                    <img
                      src={template.preview}
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-accent text-white text-xs font-bold px-2 py-1 rounded">
                      PRO
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold text-primary">{template.name}</h3>
                        <p className="text-accent/80">{template.category}</p>
                      </div>
                      <Link
                        to={`/templates/${id}`}
                        className="px-4 py-2 rounded-md bg-primary/10 dark:bg-accent/10 text-primary dark:text-accent hover:bg-primary/20 dark:hover:bg-accent/20 transition"
                      >
                        Preview
                      </Link>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      {getColorSwatches(template.colors).map((color, i) => (
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
          </div>
        )}

        {/* Regular Templates Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-accent mb-6 text-center">Basic Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularTemplates.map(([id, template]) => (
              <div
                key={id}
                className="bg-white dark:bg-base-dark rounded-xl shadow-md border border-accent/20 overflow-hidden hover:shadow-lg transition"
              >
                <div className="h-56 bg-gray-100 dark:bg-gray-800">
                  <img
                    src={template.preview}
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-primary">{template.name}</h3>
                      <p className="text-sm text-accent/80">{template.category}</p>
                    </div>
                    <Link
                      to={`/templates/${id}`}
                      className="px-3 py-1.5 text-sm rounded-md bg-primary/10 dark:bg-accent/10 text-primary dark:text-accent hover:bg-primary/20 dark:hover:bg-accent/20 transition"
                    >
                      Preview
                    </Link>
                  </div>
                  <div className="mt-3 flex space-x-1.5">
                    {getColorSwatches(template.colors).map((color, i) => (
                      <div
                        key={i}
                        className="w-5 h-5 rounded-full border border-gray-200 dark:border-gray-700"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-text/80 dark:text-text-dark/80 mb-4">
            Don't see what you're looking for? More templates coming soon!
          </p>
          <Link
            to="/inquiry"
            className="inline-block px-6 py-2 rounded-md border border-accent text-accent font-medium hover:bg-accent/10 transition"
          >
            Request a Template
          </Link>
        </div>
      </div>
    </div>
  );
}