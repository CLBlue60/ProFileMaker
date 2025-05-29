import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import ProfilePreview from '../components/ProfilePreview';
import { motion } from 'framer-motion';

export default function Home() {
  const { user } = useAuth();

  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-64px)] flex items-center flex-col">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-base"></div>

      {/* Hero Section */}
      <div className="relative z-10 w-full">
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
        </div>
      </div>

      {/* Animated Profile Preview Section */}
      <section className="relative z-10 py-12 w-full">
        <div className="max-w-7xl mx-auto text-center mb-12 px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            See Our Templates in Action
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Interactive preview of different template styles
          </motion.p>
        </div>
        <ProfilePreview />
      </section>
    </section>
  );
}
