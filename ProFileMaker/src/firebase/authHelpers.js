import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";

export const login = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
  return signOut(auth);
};
export const isLoggedIn = () => {
  return auth.currentUser !== null;
};
export const getCurrentUser = () => {
  return auth.currentUser;
};
export const getUserEmail = () => {
  const user = getCurrentUser();
  return user ? user.email : null;
};
export const getUserId = () => {
  const user = getCurrentUser();
  return user ? user.uid : null;
};
export const getUserDisplayName = () => {
  const user = getCurrentUser();
  return user ? user.displayName : null;
};
