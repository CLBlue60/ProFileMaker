import { useState, useEffect, useContext, createContext } from "react";
import {
  getCurrentUser,
  isLoggedIn,
  login as authLogin,
  logout as authLogout,
  signup as authSignup,
} from "../firebase/authHelpers";

// Create auth context
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const currentUser = getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    const result = await authLogin(email, password);
    setUser(getCurrentUser());
    setLoading(false);
    return result;
  };

  const signup = async (email, password, displayName) => {
    setLoading(true);
    const result = await authSignup(email, password, displayName);
    setUser(getCurrentUser());
    setLoading(false);
    return result;
  };

  const logout = async () => {
    await authLogout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated: isLoggedIn(),
    login,
    logout,
    signup,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
