import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/UseAuth';
import { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import Logo from './Logo';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const navigation = [
    { name: 'Portfolio', href: '/dashboard/portfolio' },
    { name: 'Features', href: '/features' },
    { name: 'Templates', href: '/templates' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/inquiry' }
  ];

  // Initialize dark mode
  useEffect(() => {
    const isDark = localStorage.theme === 'dark' ||
                  (!('theme' in localStorage) &&
                   window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.theme = newMode ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', newMode);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="fixed w-full z-50 bg-white/80 dark:bg-base/80 backdrop-blur-md border-b border-gray-200 dark:border-accent/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 dark:text-text hover:text-accent transition-colors"
              >
                {item.name}
              </Link>
            ))}

            <button
              onClick={toggleDarkMode}
              className="p-2 ml-4 rounded-full text-gray-700 dark:text-text hover:bg-gray-100 dark:hover:bg-accent/10"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>

            {user ? (
              <div className="flex items-center space-x-4 ml-4">
                <Link
                  to="/dashboard"
                  className="px-4 py-2 rounded-md bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg transition-all"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 dark:text-text hover:text-accent transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4 ml-4">
                <Link to="/login" className="text-gray-700 dark:text-text hover:text-accent transition-colors">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-md bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg transition-all"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-700 dark:text-text"
            >
              {darkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-text"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <Dialog as="div" className="md:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-base px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:sm:ring-accent/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
              <span className="text-xl font-bold text-primary dark:text-accent">ProFileMaker</span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-text"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-12 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10 dark:divide-accent/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-text hover:bg-gray-50 dark:hover:bg-accent/10"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 dark:text-text hover:bg-gray-50 dark:hover:bg-accent/10"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 dark:text-text hover:bg-gray-50 dark:hover:bg-accent/10 w-full text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 dark:text-text hover:bg-gray-50 dark:hover:bg-accent/10"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Log in
                    </Link>
                    <Link
                      to="/signup"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 bg-gradient-to-r from-primary to-accent text-white mt-2 hover:shadow-lg"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
