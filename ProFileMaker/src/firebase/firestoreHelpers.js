import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

// Unified user document operations
export const getUserDocument = async (userId) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

export const createUserDocument = async (userId, data) => {
  await setDoc(doc(db, "users", userId), {
    createdAt: new Date(),
    ...data
  });
};

export const updateUserDocument = async (userId, data) => {
  await updateDoc(doc(db, "users", userId), data);
};

// Portfolio-specific operations
export const savePortfolio = async (userId, portfolioData) => {
  await updateUserDocument(userId, {
    portfolio: portfolioData,
    updatedAt: new Date()
  });
};

export const getPortfolio = async (userId) => {
  const userDoc = await getUserDocument(userId);
  return userDoc?.portfolio || null;
};
