import { useParams } from 'react-router-dom';
import { useEffect, useState, Suspense } from 'react';
import { getPublishedProfile } from '../../firestoreHelpers';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import ErrorMessage from '../../components/ui/ErrorMessage';
import { getTemplateComponent } from '../../features/templates';
import ErrorBoundary from '../../components/ErrorBoundary';

export default function PublicProfile() {
  const { domain } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profileData = await getPublishedProfile(domain);
        setProfile(profileData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [domain]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!profile) return <ErrorMessage message="Profile not found" />;

  const TemplateComponent = getTemplateComponent(profile.template);

  return (
    <div className="template-wrapper">
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <TemplateComponent profile={profile} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
