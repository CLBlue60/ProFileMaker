import { useAuth } from '../hooks/UseAuth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Upgrade() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Placeholder for Stripe checkout logic
  const handleUpgrade = async () => {
    setLoading(true);
    // TODO: Integrate Stripe checkout session creation here
    setTimeout(() => {
      setLoading(false);
      alert('Stripe integration coming soon!');
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white dark:bg-base-dark p-8 rounded-xl shadow-lg border border-accent/20">
        <h2 className="text-3xl font-bold mb-4 text-center text-primary dark:text-accent">
          Upgrade to Advanced
        </h2>
        <p className="text-center text-lg text-text/80 mb-8">
          Unlock all templates, advanced customization, unlimited projects, enhanced analytics, and custom domain support.
        </p>
        <div className="flex flex-col items-center">
          <div className="text-5xl font-bold text-accent mb-2">$19.99</div>
          <div className="text-accent/80 mb-6">One-time payment</div>
          <button
            onClick={handleUpgrade}
            disabled={loading || !user}
            className="w-full py-3 px-6 rounded-md bg-gradient-to-r from-primary to-accent text-white font-semibold text-lg hover:shadow-lg transition disabled:opacity-60"
          >
            {loading ? 'Redirecting...' : 'Upgrade with Stripe'}
          </button>
          {!user && (
            <p className="mt-4 text-red-500 text-center">
              Please <a href="/login" className="underline text-accent">log in</a> to upgrade your account.
            </p>
          )}
        </div>
        <div className="mt-8 text-center text-sm text-text/60">
          Secure payment powered by Stripe.
        </div>
      </div>
    </div>
  );
}