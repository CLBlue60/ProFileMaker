import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const savePortfolio = async (userId, data) => {
  await setDoc(doc(db, "portfolios", userId), data);
};

export const getPortfolio = async (userId) => {
  const docSnap = await getDoc(doc(db, "portfolios", userId));
  return docSnap.exists() ? docSnap.data() : null;
};
export const saveUserData = async (userId, data) => {
  await setDoc(doc(db, "users", userId), data);
};
export const getUserData = async (userId) => {
  const docSnap = await getDoc(doc(db, "users", userId));
  return docSnap.exists() ? docSnap.data() : null;
};
export const saveUserSettings = async (userId, data) => {
  await setDoc(doc(db, "settings", userId), data);
};
export const getUserSettings = async (userId) => {
  const docSnap = await getDoc(doc(db, "settings", userId));
  return docSnap.exists() ? docSnap.data() : null;
};
export const saveUserProfile = async (userId, data) => {
  await setDoc(doc(db, "profiles", userId), data);
};
export const getUserProfile = async (userId) => {
  const docSnap = await getDoc(doc(db, "profiles", userId));
  return docSnap.exists() ? docSnap.data() : null;
};
