import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-[calc(100vh-64px)] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary dark:text-accent">
            Welcome, {user?.displayName || 'User'}!
          </h1>
          <button
            onClick={logout}
            className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white transition"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Link
            to="/profile"
            className="bg-white dark:bg-base-dark p-6 rounded-xl shadow-md border border-accent/20 hover:shadow-lg transition"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-accent/10 flex items-center justify-center">
                <span className="text-primary dark:text-accent text-xl">👤</span>
              </div>
              <h2 className="text-xl font-semibold text-text dark:text-text-dark">My Profile</h2>
            </div>
            <p className="mt-3 text-text/80 dark:text-text-dark/80">
              View and edit your public profile
            </p>
          </Link>

          {/* Portfolio Card */}
          <Link
            to="/portfolio"
            className="bg-white dark:bg-base-dark p-6 rounded-xl shadow-md border border-accent/20 hover:shadow-lg transition"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-accent/10 flex items-center justify-center">
                <span className="text-primary dark:text-accent text-xl">💼</span>
              </div>
              <h2 className="text-xl font-semibold text-text dark:text-text-dark">My Portfolio</h2>
            </div>
            <p className="mt-3 text-text/80 dark:text-text-dark/80">
              Manage your projects and work samples
            </p>
          </Link>

          {/* Settings Card */}
          <Link
            to="/settings"
            className="bg-white dark:bg-base-dark p-6 rounded-xl shadow-md border border-accent/20 hover:shadow-lg transition"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-accent/10 flex items-center justify-center">
                <span className="text-primary dark:text-accent text-xl">⚙️</span>
              </div>
              <h2 className="text-xl font-semibold text-text dark:text-text-dark">Settings</h2>
            </div>
            <p className="mt-3 text-text/80 dark:text-text-dark/80">
              Configure your account preferences
            </p>
          </Link>
        </div>

        <div className="mt-8 bg-white dark:bg-base-dark p-6 rounded-xl shadow-md border border-accent/20">
          <h2 className="text-xl font-semibold mb-4 text-text dark:text-text-dark">
            Quick Actions
          </h2>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/profile/edit"
              className="px-4 py-2 rounded-md bg-primary/10 dark:bg-accent/10 text-primary dark:text-accent hover:bg-primary/20 dark:hover:bg-accent/20 transition"
            >
              Edit Profile
            </Link>
            <Link
              to="/portfolio/new"
              className="px-4 py-2 rounded-md bg-primary/10 dark:bg-accent/10 text-primary dark:text-accent hover:bg-primary/20 dark:hover:bg-accent/20 transition"
            >
              Add Project
            </Link>
            <Link
              to="/templates"
              className="px-4 py-2 rounded-md bg-primary/10 dark:bg-accent/10 text-primary dark:text-accent hover:bg-primary/20 dark:hover:bg-accent/20 transition"
            >
              Change Template
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
