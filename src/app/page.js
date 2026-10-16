"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import IdeWorkspace from "@/components/ide/IdeWorkspace";
import LoginPage from "@/app/login/page";

export default function Home() {
  const { user, loading } = useAuth();

  // Loading state while verifying session
  if (loading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#070a12] text-slate-400">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
        <span className="text-xs font-mono">Initializing NexusCode AI Workspace...</span>
      </div>
    );
  }

  // First time visitor or unauthenticated user -> show Login / Sign Up Page
  if (!user) {
    return <LoginPage />;
  }

  // Authenticated user -> show the Cloud IDE
  return <IdeWorkspace />;
}
