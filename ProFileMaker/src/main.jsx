import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import App from './App';
import './index.css';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Features from './pages/Features';
import Templates from './pages/Templates';
import Pricing from './pages/Pricing';
import TemplateDetail from './components/templates/TemplateDetail';
import ProfileBuilder from './pages/profile-setup/ProFileBuilder';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'signup', element: <Signup /> },
      { path: 'login', element: <Login /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'features', element: <Features /> },
      { path: 'templates', element: <Templates /> },
      { path: 'templates/:templateName', element: <TemplateDetail /> }, // Updated line
      { path: 'pricing', element: <Pricing /> },
      { path: 'profile-builder', element: <ProfileBuilder /> },
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
