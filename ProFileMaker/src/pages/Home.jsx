import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Home() {
  const { user } = useAuth();

  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-64px)] flex items-center">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-base"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="space-y-8">
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Craft Your <span className="italic">Standout</span> Dev Profile
          </h1>

          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-text/80">
            Transform your skills into a stunning portfolio that gets you noticed.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            {user ? (
              <Link
                to="/dashboard"
                className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold hover:shadow-lg transition-all hover:scale-105"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold hover:shadow-lg transition-all hover:scale-105"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/templates"
                  className="px-8 py-3 rounded-full border-2 border-accent text-accent font-semibold hover:bg-accent/10 transition-all"
                >
                  View Templates
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mockup preview */}
        <div className="mt-16 md:mt-24 mx-auto max-w-4xl">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-accent/20">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/10"></div>
            <img
              src="https://placehold.co/800x500/0F172A/FFFFFF/png?text=Profile+Preview"
              alt="Profile Preview"
              className="relative w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
