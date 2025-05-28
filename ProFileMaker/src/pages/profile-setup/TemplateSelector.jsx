// src/pages/TemplateSelector.jsx
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { saveUserSettings } from '../firestoreHelpers';

const templates = [
  { id: 'minimal', name: 'Minimalist', preview: '/templates/minimal.jpg' },
  { id: 'bold', name: 'Bold', preview: '/templates/bold.jpg' },
  { id: 'professional', name: 'Professional', preview: '/templates/pro.jpg' },
];

export default function TemplateSelector() {
  const { user } = useAuth();
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const applyTemplate = async () => {
    if (selectedTemplate) {
      await saveUserSettings(user.uid, { template: selectedTemplate });
      alert('Template applied successfully!');
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Choose Your Template</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`border-2 rounded-lg overflow-hidden transition-all ${
              selectedTemplate === template.id ? 'border-accent ring-2 ring-accent/30' : 'border-transparent'
            }`}
          >
            <div className="h-64 bg-gray-100">
              <img
                src={template.preview}
                alt={template.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 bg-white">
              <h3 className="text-xl font-semibold">{template.name}</h3>
              <button
                onClick={() => setSelectedTemplate(template.id)}
                className={`mt-3 w-full py-2 rounded ${
                  selectedTemplate === template.id
                    ? 'bg-accent text-white'
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {selectedTemplate === template.id ? 'Selected' : 'Select'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={applyTemplate}
          disabled={!selectedTemplate}
          className={`px-6 py-3 rounded-lg text-white ${
            selectedTemplate
              ? 'bg-primary hover:bg-primary/90'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Apply Template
        </button>
      </div>
    </div>
  );
}
