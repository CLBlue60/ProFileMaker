import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { saveTemplateSelection } from '../firestoreHelpers';
import { TEMPLATES } from '../features/templates';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { Button } from '../components/ui/Button';

export default function TemplatePreview() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const template = TEMPLATES.find(t => t.id === id);

  const handleSelect = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      await saveTemplateSelection(user.uid, id);
      navigate('/profile-setup/publish');
    } catch (error) {
      console.error("Template selection failed:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!template) {
    return <div>Template not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-base-dark rounded-xl shadow-lg overflow-hidden">
        <div className="h-96 bg-gray-100 dark:bg-gray-800">
          <img
            src={template.preview}
            alt={template.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-primary">{template.name}</h1>
              <p className="text-lg text-accent/80">{template.category}</p>
            </div>
            <Button
              onClick={handleSelect}
              loading={loading}
              variant="primary"
              className="px-6 py-3"
            >
              {loading ? 'Selecting...' : 'Select This Template'}
            </Button>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Color Palette</h2>
            <div className="flex gap-3">
              {template.colors.map((color, i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-700"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Features</h2>
            <ul className="list-disc pl-5 space-y-2">
              {template.features?.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}