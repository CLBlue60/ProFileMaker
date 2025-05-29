import { Link, useParams } from 'react-router-dom';
import { TEMPLATE_METADATA } from '../../features/index';

const TEMPLATES = Object.values(TEMPLATE_METADATA);

export default function TemplateDetail() {
  const { templateName } = useParams();

  const template = TEMPLATES.find(t =>
    t.name.toLowerCase().replace(/\s+/g, '-') === templateName
  );

  if (!template) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-primary mb-4">Template not found</h2>
        <Link
          to="/templates"
          className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition"
        >
          Back to Templates
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-base-dark rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="h-96 bg-gray-100 dark:bg-gray-800">
            <img
              src={template.preview}
              alt={template.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-primary">{template.name}</h1>
                <p className="text-accent/80 mt-1 sm:mt-2">{template.category}</p>
              </div>
              <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3">
                <Link
                  to="/profile-builder"
                  state={{ template }}
                  className="px-6 py-2 bg-primary text-white text-center rounded-md hover:bg-primary/90 transition"
                >
                  Use This Template
                </Link>
                <Link
                  to="/templates"
                  className="px-6 py-2 border border-primary text-primary text-center rounded-md hover:bg-primary/10 transition"
                >
                  Back to Templates
                </Link>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium text-primary mb-3">Color Palette</h3>
              <div className="flex flex-wrap gap-2">
                {template.colors.map((color, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center"
                    style={{ backgroundColor: color }}
                    title={`Color ${i+1}: ${color}`}
                  >
                    <span className="text-xs text-white mix-blend-difference">{i+1}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium text-primary mb-3">Template Details</h3>
              <p className="text-gray-700 dark:text-gray-300">
                This template features a {template.category.toLowerCase()} design perfect for your needs.
                The color palette has been carefully selected for visual harmony and professional appeal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
