import { Outlet, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useEffect } from 'react';
import Logo from './components/Logo';
import Footer from "./components/Footer";

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
