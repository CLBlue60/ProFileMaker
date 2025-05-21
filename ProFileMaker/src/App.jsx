import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const { user } = useAuth();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-base text-text">
      <Navbar />

      <main className="pt-16"> {/* Navbar offset */}
        {!user && window.location.pathname === '/' ? (
          <HeroSection loaded={loaded} />
        ) : (
          <Outlet />
        )}
      </main>

      <Footer />
    </div>
  );
}

const HeroSection = ({ loaded }) => {
  return (
    <section className="relative overflow-hidden">
      {/* Animated gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-base transition-all duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className={`text-center space-y-8 transition-all duration-700 delay-150 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent leading-tight">
            Craft Your <span className="italic">Standout</span> Dev Profile
          </h1>

          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-text/80">
            Transform your skills into a stunning portfolio that gets you noticed by recruiters and clients alike.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <a
              href="/signup"
              className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold hover:shadow-lg transition-all hover:scale-105"
            >
              Get Started Free
            </a>
            <a
              href="/templates"
              className="px-8 py-3 rounded-full border-2 border-accent text-accent font-semibold hover:bg-accent/10 transition-all"
            >
              View Templates
            </a>
          </div>
        </div>

        {/* Animated mockup preview */}
        <div className={`mt-16 md:mt-24 mx-auto max-w-4xl transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
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
};

const Footer = () => {
  return (
    <footer className="border-t border-accent/10 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-primary text-2xl font-bold mb-4 md:mb-0">
            ProFileMaker
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-text hover:text-accent transition">Terms</a>
            <a href="#" className="text-text hover:text-accent transition">Privacy</a>
            <a href="#" className="text-text hover:text-accent transition">Contact</a>
          </div>
        </div>
        <div className="mt-8 text-center text-text/60 text-sm">
          © {new Date().getFullYear()} ProFileMaker. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
