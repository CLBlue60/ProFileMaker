import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, onSnapshot } from 'firebase/firestore';

export default function Upgrade() {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    const auth = getAuth();
    const db = getFirestore();
    const user = auth.currentUser;

    if (!user) {
      alert('Please log in to upgrade.');
      setLoading(false);
      return;
    }

    try {
      
      const checkoutSessionsRef = collection(db, 'customers', user.uid, 'checkout_sessions');
      const docRef = await addDoc(checkoutSessionsRef, {
        price: 'price_1RZNSNRoaVjKBvKRffgtC31c', 
        mode: 'payment',
        success_url: window.location.origin + '/dashboard?payment=success',
        cancel_url: window.location.origin + '/upgrade?payment=cancel',
      });

      const unsubscribe = onSnapshot(docRef, (snap) => {
        const data = snap.data();
        if (data?.url) {
          window.location.assign(data.url);
          unsubscribe();
        }
        if (data?.error) {
          alert('Stripe error: ' + data.error.message);
          setLoading(false);
          unsubscribe();
        }
      });
    } catch (e) {
      alert('Error creating checkout session: ' + e.message);
      setLoading(false);
    }
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
            disabled={loading}
            className="w-full py-3 px-6 rounded-md bg-gradient-to-r from-primary to-accent text-white font-semibold text-lg hover:shadow-lg transition disabled:opacity-60"
          >
            {loading ? 'Redirecting...' : 'Upgrade with Stripe'}
          </button>
        </div>
        <div className="mt-8 text-center text-sm text-text/60">
          Secure payment powered by Stripe.
        </div>
      </div>
    </div>
  );
}