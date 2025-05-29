import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.email.includes('@')) newErrors.email = 'Invalid email';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const { success, error } = await login(formData.email, formData.password);

    if (success) {
      navigate('/dashboard');
    } else {
      setErrors({ auth: error });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white dark:bg-base-dark p-8 rounded-xl shadow-lg border border-accent/20">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary dark:text-accent">
          Welcome Back
        </h2>

        {errors.auth && (
          <div className="mb-4 p-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded">
            {errors.auth}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-text dark:text-text-dark">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full p-2 rounded border bg-white dark:bg-white text-text dark:text-black ${errors.email ? 'border-red-500' : 'border-text/30 dark:border-text-dark/30'}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-text dark:text-text-dark">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={`w-full p-2 rounded border bg-white dark:bg-white text-text dark:text-black ${errors.password ? 'border-red-500' : 'border-text/30 dark:border-text-dark/30'}`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-6 py-2 px-4 rounded font-medium ${loading ? 'bg-gray-400' : 'bg-gradient-to-r from-primary to-accent'} text-white transition`}
        >
          {loading ? 'Logging In...' : 'Log In'}
        </button>

        <div className="mt-4 text-center text-sm text-text dark:text-black">
          <p>
            Don't have an account?{' '}
            <Link to="/signup" className="text-accent hover:underline">
              Sign Up
            </Link>
          </p>
          <p className="mt-2">
            <Link to="/forgot-password" className="text-accent hover:underline">
              Forgot password?
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
