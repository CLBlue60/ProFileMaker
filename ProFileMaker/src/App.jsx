import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useEffect } from 'react';

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
