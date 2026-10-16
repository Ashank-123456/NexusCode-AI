"use client";

import React, { useState, useEffect, useRef } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Code2,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Info,
} from "lucide-react";

// Helper to decode Google JWT token
function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export default function LoginPage() {
  const { loginWithGoogle, user } = useAuth();
  const router = useRouter();
  const [googleClientReady, setGoogleClientReady] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const googleBtnContainerRef = useRef(null);

  // If already authenticated, redirect straight to IDE workspace
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  // Initialize official Google Identity Services if client ID is configured
  useEffect(() => {
    if (typeof window !== "undefined" && window.google && googleClientId) {
      try {
        window.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: (response) => {
            if (response.credential) {
              const decoded = parseJwt(response.credential);
              if (decoded) {
                loginWithGoogle({
                  sub: decoded.sub,
                  name: decoded.name || decoded.given_name || "Google User",
                  email: decoded.email,
                  picture: decoded.picture,
                });
              }
            }
          },
        });

        if (googleBtnContainerRef.current) {
          window.google.accounts.id.renderButton(googleBtnContainerRef.current, {
            theme: "filled_blue",
            size: "large",
            width: 320,
            shape: "pill",
            text: "continue_with",
          });
        }
        setGoogleClientReady(true);
      } catch (err) {
        console.warn("Google GIS init error:", err);
      }
    }
  }, [googleClientId]);

  const handleOfficialScriptLoad = () => {
    if (window.google && googleClientId) {
      try {
        window.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: (response) => {
            if (response.credential) {
              const decoded = parseJwt(response.credential);
              if (decoded) {
                loginWithGoogle({
                  sub: decoded.sub,
                  name: decoded.name,
                  email: decoded.email,
                  picture: decoded.picture,
                });
              }
            }
          },
        });

        if (googleBtnContainerRef.current) {
          window.google.accounts.id.renderButton(googleBtnContainerRef.current, {
            theme: "filled_blue",
            size: "large",
            width: 320,
            shape: "pill",
            text: "continue_with",
          });
        }
        setGoogleClientReady(true);
      } catch (err) {
        console.warn("Google GIS script load init error:", err);
      }
    }
  };



  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={handleOfficialScriptLoad}
      />

      <div className="min-h-screen w-full flex bg-[#070a12] text-slate-100 overflow-hidden relative font-sans">
        {/* Glowing background mesh */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-sky-600/15 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute top-[40%] left-[30%] w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="w-full flex flex-col lg:flex-row min-h-screen z-10">
          {/* Left Side: Product Showcase */}
          <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 lg:p-16 border-r border-white/5 bg-slate-950/40 backdrop-blur-md relative overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-sky-400 p-[1px] shadow-lg shadow-indigo-500/20">
                <div className="h-full w-full bg-[#080c14] rounded-xl flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-indigo-400" />
                </div>
              </div>
              <div>
                <span className="font-bold text-xl tracking-tight text-white">NexusCode</span>
                <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  AI IDE
                </span>
              </div>
            </div>

            {/* Middle Pitch */}
            <div className="my-auto max-w-lg">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-6">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Next-Gen JavaScript Cloud IDE</span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Empower your development with{" "}
                <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
                  Intelligent AI &amp; Instant Runtime
                </span>
              </h1>

              <p className="mt-4 text-slate-300 text-base leading-relaxed">
                Connect seamlessly with your Google account to access your live JavaScript development workspace, automated bug detection, and AI copilot.
              </p>

              <div className="mt-8 space-y-3.5">
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span>Instant single sign-on with Google Workspace &amp; Personal accounts</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span>Zero passwords to manage &bull; Enterprise OAuth 2.0 verified</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-sky-500/10 text-sky-400 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span>Cloud workspace synchronization &amp; real-time execution sandbox</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>NexusCode AI &bull; JavaScript Edition</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Google OAuth 2.0 Protected</span>
              </span>
            </div>
          </div>

          {/* Right Side: Google Login Panel */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16">
            <div className="w-full max-w-md">
              {/* Mobile Header */}
              <div className="flex lg:hidden items-center gap-3 mb-8">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-sky-400 p-[1px]">
                  <div className="h-full w-full bg-[#080c14] rounded-xl flex items-center justify-center">
                    <Code2 className="w-4 h-4 text-indigo-400" />
                  </div>
                </div>
                <span className="font-bold text-lg text-white">NexusCode AI</span>
              </div>

              {/* Login Card */}
              <div className="glass-card rounded-3xl p-8 sm:p-10 border border-white/10 shadow-2xl relative">
                <div className="text-center mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/10">
                    <Lock className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Sign in to your IDE
                  </h2>
                  <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-xs mx-auto">
                    Authenticate securely with your Google account to launch your JavaScript workspace.
                  </p>
                </div>

                {/* Google Sign-In Button */}
                <div className="space-y-4">
                  {/* Official Google GIS rendered button */}
                  <div
                    ref={googleBtnContainerRef}
                    id="google-signin-btn-container"
                    className="flex justify-center"
                  />

                  {/* Security Notice */}
                  <div className="flex items-center justify-center gap-2 pt-4 text-xs text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Protected by Google Identity &amp; SSL 256-bit encryption</span>
                  </div>
                </div>

                {/* Deployment Config Helper Pill */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <button
                    onClick={() => setShowConfigModal(!showConfigModal)}
                    className="w-full flex items-center justify-between text-left p-3 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-white/5 hover:border-white/10 text-xs text-slate-400 hover:text-slate-300 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Info className="w-3.5 h-3.5 text-sky-400" />
                      <span>Deployment &amp; Google Client ID setup</span>
                    </span>
                    <span className="text-[10px] text-indigo-400 font-mono">
                      {googleClientId ? "Configured" : "Docs"}
                    </span>
                  </button>

                  {showConfigModal && (
                    <div className="mt-3 p-3.5 rounded-xl bg-slate-950/80 border border-white/10 text-[11px] text-slate-300 space-y-2 font-mono">
                      <div className="text-slate-400 font-semibold font-sans">
                        To connect your own Google OAuth app:
                      </div>
                      <div>
                        1. Visit{" "}
                        <a
                          href="https://console.cloud.google.com/apis/credentials"
                          target="_blank"
                          rel="noreferrer"
                          className="text-indigo-400 hover:underline"
                        >
                          Google Cloud Console
                        </a>
                      </div>
                      <div>2. Create an &quot;OAuth 2.0 Web Client ID&quot;</div>
                      <div>
                        3. Add your deployment domain to authorized JavaScript origins
                      </div>
                      <div>
                        4. Add env variable:
                        <code className="block bg-black/60 p-2 rounded mt-1 text-emerald-400 overflow-x-auto">
                          NEXT_PUBLIC_GOOGLE_CLIENT_ID=&lt;your-client-id&gt;
                        </code>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  );
}
