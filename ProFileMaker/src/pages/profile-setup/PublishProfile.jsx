import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { publishProfile } from '../../firestoreHelpers';
import DomainInput from '../../components/profile/DomainInput';

export default function PublishProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [domain, setDomain] = useState('');
  const [isDomainAvailable, setIsDomainAvailable] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [error, setError] = useState(null);

  const handlePublish = async () => {
    if (!isDomainAvailable) return;

    setIsPublishing(true);
    setError(null);

    try {
      const result = await publishProfile(user.uid, domain);
      if (result.success) {
        navigate(`/profile/${domain}`); // Redirect to the new profile
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Publish Your Profile</h1>

      <div className="space-y-6">
        <DomainInput
          value={domain}
          onChange={setDomain}
          onAvailabilityChange={setIsDomainAvailable}
        />

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-semibold text-yellow-800 mb-2">Before you publish:</h3>
          <ul className="list-disc list-inside text-yellow-700 space-y-1">
            <li>Complete your profile information</li>
            <li>Add at least 3 projects to showcase</li>
            <li>Select a template design</li>
          </ul>
        </div>

        <button
          onClick={handlePublish}
          disabled={!isDomainAvailable || isPublishing}
          className={`px-6 py-3 rounded-lg text-white ${
            isDomainAvailable && !isPublishing
              ? 'bg-primary hover:bg-primary/90'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {isPublishing ? 'Publishing...' : 'Publish Now'}
        </button>
      </div>
    </div>
  );
}
