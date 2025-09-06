// src/hooks/useAuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { checkAuth } from "../services/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState(null);

  const refreshAuth = async () => {
    try {
      const user = await checkAuth();
      if (user) {
        setIsAuthenticated(true);
        setProfile(user);
      } else {
        setIsAuthenticated(false);
        setProfile(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setIsAuthenticated(false);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  const login = (userData) => {
    setIsAuthenticated(true);
    setProfile(userData);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setProfile(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        isAuthenticated,
        profile,
        login,
        logout,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
