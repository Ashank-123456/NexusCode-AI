"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("nexus_user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Error reading stored user:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  // Google Sign-In Handler
  const loginWithGoogle = (googleData) => {
    const newUser = {
      id: googleData?.sub || "usr_google_" + Math.random().toString(36).substring(2, 8),
      name: googleData?.name || "Google Developer",
      email: googleData?.email || "developer@gmail.com",
      avatar:
        googleData?.picture ||
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      tier: "Pro Developer",
      role: "JavaScript Engineer",
      provider: "google",
      authenticatedAt: new Date().toISOString(),
    };

    setUser(newUser);
    try {
      localStorage.setItem("nexus_user", JSON.stringify(newUser));
    } catch (e) {
      console.error("Error saving user:", e);
    }
    router.push("/");
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("nexus_user");
    } catch (e) {
      console.error("Error clearing user:", e);
    }
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithGoogle,
        logout,
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
