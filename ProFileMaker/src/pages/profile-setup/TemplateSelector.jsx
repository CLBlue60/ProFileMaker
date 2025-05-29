import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { saveTemplateSelection } from '../../../firestoreHelpers';
import { TEMPLATES } from '../../../features/templates';
import LoadingSpinner from '../../../components/ui/LoadingSpinner';

export default function TemplateSelector() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSelect = async (templateId) => {
    setLoading(true);
    try {
      await saveTemplateSelection(user.uid, templateId);
      navigate('/profile-setup/publish');
    } catch (error) {
      console.error("Template selection failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="template-selector">
      <h2 className="text-3xl font-bold mb-8">Choose Your Template</h2>

      {loading && <LoadingSpinner fullPage />}

      <div className="template-grid">
        {TEMPLATES.map(template => (
          <div
            key={template.id}
            className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
            onClick={() => setSelectedTemplate(template.id)}
          >
            <div
              className="template-preview"
              style={{ backgroundImage: `url(${template.preview})` }}
            />
            <div className="template-info">
              <h3>{template.name}</h3>
              <p>{template.category}</p>
              <div className="color-palette">
                {template.colors.map((color, i) => (
                  <span
                    key={i}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => handleSelect(selectedTemplate)}
        disabled={!selectedTemplate || loading}
        className="confirm-button"
      >
        {loading ? 'Saving...' : 'Confirm Selection'}
      </button>
    </div>
  );
}
