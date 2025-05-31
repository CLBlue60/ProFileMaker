import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

// Auth actions
export const authSignup = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (displayName) {
      await updateProfile(userCredential.user, { displayName });
    }
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: handleAuthError(error) };
  }
};

export const authLogin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: handleAuthError(error) };
  }
};

export const authLogout = async () => {
  await signOut(auth);
};

export const setupAuthListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Error handling
const handleAuthError = (error) => {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "Email already in use";
    case "auth/invalid-email":
      return "Invalid email address";
    case "auth/weak-password":
      return "Password must be at least 6 characters";
    case "auth/user-not-found":
      return "No account found with this email";
    case "auth/wrong-password":
      return "Incorrect password";
    default:
      return "Authentication failed. Please try again.";
  }
};

// User state
export const getCurrentUser = () => auth.currentUser;
export const isLoggedIn = () => !!auth.currentUser;

export async function signup(email, password, displayName) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (displayName) {
      await updateProfile(userCredential.user, { displayName });
    }
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export const reauthenticate = async (email, password) => {
  const credential = EmailAuthProvider.credential(email, password);
  return await reauthenticateWithCredential(auth.currentUser, credential);
};

export const deleteAuthUser = async () => {
  return await deleteUser(auth.currentUser);
};
