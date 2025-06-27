import { Link } from "react-router-dom";
import FirebaseAuthUI from '../components/FirebaseAuthUI';

export default function Signup() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white dark:bg-base-dark p-8 rounded-xl shadow-lg border border-accent/20">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary dark:text-accent">
          Create Account
        </h2>
        <FirebaseAuthUI />
        <div className="mt-4 text-center text-sm text-text dark:text-black">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-accent hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

