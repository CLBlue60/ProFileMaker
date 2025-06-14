import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/UseAuth';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function AuthGuard({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    // Redirect to login page, saving the current location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if profile is complete (optional)
  if (location.pathname !== '/profile-builder' && !user.displayName) {
    return <Navigate to="/profile-builder" state={{ from: location }} replace />;
  }

  return children;
}
