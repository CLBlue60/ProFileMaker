import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

// Domain Operations
export const checkDomainAvailable = async (domain) => {
  if (!domain || domain.length < 3) return false;
  const domainDoc = await getDoc(doc(db, "domains", domain));
  return !domainDoc.exists();
};

export const publishProfile = async (userId, domain) => {
  // Validate domain format
  if (!/^[a-z0-9-]{3,20}$/.test(domain)) {
    throw new Error(
      "Domain can only contain lowercase letters, numbers, and hyphens (3-20 chars)"
    );
  }

  // Check availability
  const isAvailable = await checkDomainAvailable(domain);
  if (!isAvailable) {
    throw new Error("Domain is already taken");
  }

  // Reserve domain and update profile
  await Promise.all([
    setDoc(doc(db, "domains", domain), {
      userId,
      claimedAt: serverTimestamp(),
    }),
    updateDoc(doc(db, "profiles", userId), {
      isPublished: true,
      domain,
      publishedAt: serverTimestamp(),
      liveUrl: `${domain}.profilemaker.com`,
    }),
  ]);

  return {
    success: true,
    url: `${domain}.profilemaker.com`,
  };
};

// Get published profile data
export const getPublishedProfile = async (domain) => {
  const domainDoc = await getDoc(doc(db, "domains", domain));
  if (!domainDoc.exists()) throw new Error("Profile not found");

  const profileDoc = await getDoc(doc(db, "profiles", domainDoc.data().userId));
  if (!profileDoc.exists()) throw new Error("Profile data not found");

  return {
    ...profileDoc.data(),
    domain: domain,
    id: profileDoc.id,
  };
};
