import { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../authHelpers";

export default function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    displayName: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.email.includes("@")) newErrors.email = "Invalid email";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (formData.displayName.length < 2) newErrors.displayName = "Name too short";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const { success, error } = await signup(
      formData.email,
      formData.password,
      formData.displayName
    );

    if (!success) {
      setErrors({ auth: error });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base text-text p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">
          Create Account
        </h2>

        {errors.auth && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {errors.auth}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={formData.displayName}
              onChange={(e) => setFormData({...formData, displayName: e.target.value})}
              className={`w-full p-2 rounded border ${errors.displayName ? 'border-red-500' : 'border-text'}`}
            />
            {errors.displayName && <p className="text-red-500 text-xs mt-1">{errors.displayName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className={`w-full p-2 rounded border ${errors.email ? 'border-red-500' : 'border-text'}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className={`w-full p-2 rounded border ${errors.password ? 'border-red-500' : 'border-text'}`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-6 py-2 px-4 rounded font-medium ${loading ? 'bg-gray-400' : 'bg-primary hover:bg-accent'} text-white transition`}
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-accent hover:underline">
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
}
