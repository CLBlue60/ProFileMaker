import { useParams } from 'react-router-dom';
import { TEMPLATE_METADATA } from '../../features/index';
import ProfilePreview from '../ProfilePreview';

export default function TemplateDetail() {
  const { templateName } = useParams();
  const template = Object.values(TEMPLATE_METADATA).find(
    t => t.name.toLowerCase().replace(/\s+/g, '-') === templateName
  );

  if (!template) {
    return <div className="text-center py-16">Template not found.</div>;
  }

  return (
    <div className="py-12 px-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">{template.name} Preview</h1>
      <ProfilePreview template={template} />
    </div>
  );
}
