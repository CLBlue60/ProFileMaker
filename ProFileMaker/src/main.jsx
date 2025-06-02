import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './hooks/UseAuth';
import App from './App';
import './index.css';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';

// Pages
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Features from './pages/Features';
import Templates from './pages/Templates';
import Pricing from './pages/Pricing';
import ProfileBuilder from './pages/profile-setup/ProfileBuilder';
import Inquiry from './pages/Inquiry';

// Dashboard Pages
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/dashboard/ProfilePage';
import EditProfilePage from './pages/dashboard/EditProfilePage';
import PortfolioPage from './pages/dashboard/PortfolioPage';
import NewProjectPage from './pages/dashboard/NewProjectPage';
import SettingsPage from './pages/dashboard/SettingsPage';
import TemplateDetail from './components/templates/TemplateDetail';

// Components
import AuthGuard from './auth/AuthGuard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'signup', element: <Signup /> },
      { path: 'login', element: <Login /> },
      { path: 'features', element: <Features /> },
      { path: 'templates', element: <Templates /> },
      { path: 'templates/:templateName', element: <TemplateDetail /> },
      { path: 'pricing', element: <Pricing /> },
      { path: 'profile-builder', element: <ProfileBuilder /> },
      { path: 'inquiry', element: <Inquiry /> },

      // Protected Dashboard Routes
      {
        path: 'dashboard',
        element: (
          <AuthGuard>
            <DashboardLayout />
          </AuthGuard>
        ),
        children: [
          { index: true, element: <Dashboard /> },
          { path: 'profile', element: <ProfilePage /> },
          { path: 'profile/edit', element: <EditProfilePage /> },
          { path: 'portfolio', element: <PortfolioPage /> },
          { path: 'portfolio/new', element: <NewProjectPage /> },
          { path: 'settings', element: <SettingsPage /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
