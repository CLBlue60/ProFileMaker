import { useState, useEffect, useContext, createContext } from "react";
import {
  getCurrentUser,
  isLoggedIn,
  authLogin,
  authLogout,
  authSignup,
  setupAuthListener
} from "../firebase/authHelpers";
import { getUserProfile, updateUserProfile } from "../firebase/firestoreHelpers";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = setupAuthListener(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const profileData = await getUserProfile(currentUser.uid);
          setProfile(profileData);
        } catch (error) {
          console.error("Error loading profile:", error);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    const result = await authLogin(email, password);
    if (result.success) {
      const currentUser = getCurrentUser();
      setUser(currentUser);
      if (currentUser) {
        const profileData = await getUserProfile(currentUser.uid);
        setProfile(profileData);
      }
    }
    setLoading(false);
    return result;
  };

  const signup = async (email, password, displayName) => {
    setLoading(true);
    const result = await authSignup(email, password, displayName);
    if (result.success) {
      const currentUser = getCurrentUser();
      setUser(currentUser);
      if (currentUser) {
        const profileData = await getUserProfile(currentUser.uid);
        setProfile(profileData);
      }
    }
    setLoading(false);
    return result;
  };

  const logout = async () => {
    await authLogout();
    setUser(null);
    setProfile(null);
  };

  const updateProfile = async (updates) => {
  try {
    if (!user) throw new Error("User not authenticated");

    const updatedProfile = { ...profile, ...updates };
    await updateUserProfile(user.uid, updatedProfile);
    setProfile(updatedProfile);
    return { success: true, profile: updatedProfile };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, error: error.message };
  }
};

  const value = {
    user,
    profile,
    loading,
    isAuthenticated: isLoggedIn(),
    login,
    logout,
    signup,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
