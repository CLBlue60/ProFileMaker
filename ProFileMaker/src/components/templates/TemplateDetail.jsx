import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/UseAuth';
import { saveTemplateSelection } from '../../firebase/firestoreHelpers';
import { TEMPLATE_METADATA } from '../../features/index';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ProfilePreview from '../../components/ProfilePreview';

export default function TemplateDetail() {
  const { templateId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const template = TEMPLATE_METADATA[templateId]; 

  const handleSelect = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      await saveTemplateSelection(user.uid, templateId);
      navigate('/dashboard'); 
    } catch (error) {
      console.error("Template selection failed:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!template) {
    return <div className="text-center py-12">Template not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-base-dark rounded-xl shadow-lg overflow-hidden">
        {/* Profile Preview */}
        <ProfilePreview template={template} />

        {/* Template Info */}
        <div className="p-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div>
              <h1 className="text-3xl font-bold text-primary">{template.name}</h1>
              <p className="text-lg text-accent/80 mt-2">{template.category}</p>
              {template.advanced && (
                <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold bg-accent/10 text-accent rounded-full">
                  Advanced Template
                </span>
              )}
            </div>
            
            <button
              onClick={handleSelect}
              disabled={loading}
              className="w-full md:w-auto px-8 py-3 text-lg rounded bg-primary text-white hover:bg-primary/80 transition disabled:opacity-60"
            >
              {loading ? 'Selecting...' : 'Use This Template'}
            </button>
          </div>

          {/* Color Palette */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Color Palette</h2>
            <div className="flex flex-wrap gap-3">
              {Object.values(template.colors).map((color, i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Features */}
          {template.features && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Template Features</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {template.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <svg className="h-5 w-5 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}