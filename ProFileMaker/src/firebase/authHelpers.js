import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "firebase/auth";
import { auth } from "./firebaseConfig";

// Auth actions
export const signup = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: handleAuthError(error) };
  }
};

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: handleAuthError(error) };
  }
};

export const logout = async () => {
  await signOut(auth);
};

// Error handling
export const handleAuthError = (error) => {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'Email already in use';
    case 'auth/invalid-email':
      return 'Invalid email address';
    case 'auth/weak-password':
      return 'Password must be at least 6 characters';
    case 'auth/user-not-found':
      return 'No account found with this email';
    case 'auth/wrong-password':
      return 'Incorrect password';
    default:
      return 'Authentication failed. Please try again.';
  }
};

// User state
export const getCurrentUser = () => auth.currentUser;
export const isLoggedIn = () => !!auth.currentUser;
export const getUserEmail = () => getCurrentUser()?.email;
export const getUserId = () => getCurrentUser()?.uid;
export const getUserDisplayName = () => getCurrentUser()?.displayName;
