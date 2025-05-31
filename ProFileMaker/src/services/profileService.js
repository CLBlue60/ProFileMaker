import { db } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const getProfile = async (userId) => {
  try {
    const profileRef = doc(db, "profiles", userId);
    const profileSnap = await getDoc(profileRef);
    return profileSnap.exists() ? profileSnap.data() : null;
  } catch (error) {
    console.error("Error getting profile:", error);
    return null;
  }
};

export const updateProfile = async (userId, data) => {
  try {
    const profileRef = doc(db, "profiles", userId);
    await setDoc(profileRef, data, { merge: true });
    return true;
  } catch (error) {
    console.error("Error updating profile:", error);
    return false;
  }
};
