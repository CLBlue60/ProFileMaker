import React, { useEffect, useRef } from 'react';
import { getAuth, GoogleAuthProvider, EmailAuthProvider } from 'firebase/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import app from '../firebase/firebaseConfig';

export default function FirebaseAuthUI() {
  const uiRef = useRef(null);

  useEffect(() => {
    const auth = getAuth(app);

    const uiConfig = {
      signInSuccessUrl: '/dashboard',
      signInFlow: 'popup',
      signInOptions: [
        GoogleAuthProvider.PROVIDER_ID,
        'microsoft.com',
        'yahoo.com',
        {
          provider: EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: false
        }
      ],
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,
      tosUrl: '/terms',
      privacyPolicyUrl: '/privacy',
    };

    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(auth);

    ui.start(uiRef.current, uiConfig);

    return () => ui.reset();
  }, []);

  return <div ref={uiRef} />;
}