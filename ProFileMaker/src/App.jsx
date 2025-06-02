import { Outlet, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useEffect } from 'react';
import Logo from './components/Logo';

export default function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-base text-text">
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

const Footer = () => {
  return (
    <footer className="border-t border-accent/10 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Logo />
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-text hover:text-accent transition">Terms</a>
            <a href="#" className="text-text hover:text-accent transition">Privacy</a>
            <Link to="/inquiry" className="text-text hover:text-accent transition">Contact</Link>
          </div>
        </div>
        <div className="mt-8 text-center text-text/60 text-sm">
          © {new Date().getFullYear()} ProFileMaker. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
