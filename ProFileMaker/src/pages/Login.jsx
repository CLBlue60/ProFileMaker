import { Link } from "react-router-dom";
import FirebaseAuthUI from '../components/FirebaseAuthUI';

export default function Login() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-base-dark p-8 rounded-xl shadow-lg border border-accent/20">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary dark:text-accent">
          Welcome Back
        </h2>
        <FirebaseAuthUI />
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
      </div>
    </div>
  );
}
