import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

// Domain validation regex
const DOMAIN_REGEX = /^[a-z0-9-]{3,20}$/;
const RESERVED_DOMAINS = ["www", "app", "admin"];

// Domain Operations
export const checkDomainAvailability = async (domain) => {
  if (!domain || !DOMAIN_REGEX.test(domain)) {
    throw new Error("Invalid domain format");
  }

  if (RESERVED_DOMAINS.includes(domain)) {
    throw new Error("This domain is reserved");
  }

  const domainDoc = await getDoc(doc(db, "domains", domain));
  return {
    available: !domainDoc.exists(),
    existingDomain: domainDoc.exists() ? domainDoc.data() : null,
  };
};

export const publishProfile = async (userId, domain, profileData) => {
  // Validate input
  if (!userId || !domain || !profileData) {
    throw new Error("Missing required parameters");
  }

  // Check domain availability
  const { available } = await checkDomainAvailability(domain);
  if (!available) {
    throw new Error("Domain is already taken");
  }

  // Use batch write for atomic operations
  const batch = writeBatch(db);

  // Reserve domain
  batch.set(doc(db, "domains", domain), {
    userId,
    claimedAt: serverTimestamp(),
    profileName: profileData.displayName || "",
  });

  // Update profile
  batch.update(doc(db, "profiles", userId), {
    isPublished: true,
    domain,
    publishedAt: serverTimestamp(),
    lastUpdated: serverTimestamp(),
    liveUrl: `https://${domain}.profilemaker.com`,
  });

  try {
    await batch.commit();
    return {
      success: true,
      url: `https://${domain}.profilemaker.com`,
      domain,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Publish failed:", error);
    throw new Error("Failed to publish profile");
  }
};

// Profile Operations
export const getPublishedProfile = async (domain) => {
  const domainDoc = await getDoc(doc(db, "domains", domain));
  if (!domainDoc.exists()) {
    throw new Error("Profile not found");
  }

  const profileDoc = await getDoc(doc(db, "profiles", domainDoc.data().userId));
  if (!profileDoc.exists()) {
    throw new Error("Profile data not found");
  }

  return {
    meta: {
      domain,
      claimedAt: domainDoc.data().claimedAt?.toDate() || null,
      publishedAt: profileDoc.data().publishedAt?.toDate() || null,
    },
    profile: {
      ...profileDoc.data(),
      id: profileDoc.id,
    },
  };
};

export const saveUserProfile = async (userId, profileData) => {
  if (!userId || !profileData) {
    throw new Error("Invalid parameters");
  }

  try {
    await setDoc(
      doc(db, "profiles", userId),
      {
        ...profileData,
        lastUpdated: serverTimestamp(),
      },
      { merge: true }
    );
    return { success: true, userId };
  } catch (error) {
    console.error("Failed to save profile:", error);
    throw new Error("Profile save failed");
  }
};

export const updateUserProfile = async (userId, updates) => {
  if (!userId || !updates) {
    throw new Error("Invalid parameters");
  }
  try {
    await updateDoc(doc(db, "profiles", userId), {
      ...updates,
      lastUpdated: serverTimestamp(),
    });
    return { success: true, userId };
  } catch (error) {
    console.error("Failed to update profile:", error);
    throw new Error("Profile update failed");
  }
};

// Additional Helpers
export const getUserProfile = async (userId) => {
  const profileDoc = await getDoc(doc(db, "profiles", userId));
  return profileDoc.exists() ? profileDoc.data() : null;
};

export const updateProfileVisibility = async (userId, isPublished) => {
  await updateDoc(doc(db, "profiles", userId), {
    isPublished,
    lastUpdated: serverTimestamp(),
  });
};

export const deleteUserData = async (userId) => {
  const batch = writeBatch(db);


  batch.delete(doc(db, "profiles", userId));

  await batch.commit();
};
