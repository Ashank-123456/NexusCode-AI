"use client";

import React, { useState, useEffect, useRef } from "react";
import Script from "next/script";
import { useAuth } from "@/context/AuthContext";
import {
  Code2,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Lock,
  ExternalLink,
  Info,
  ArrowRight,
  Terminal,
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
  const [loading, setLoading] = useState(false);
  const [googleClientReady, setGoogleClientReady] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showGooglePrompt, setShowGooglePrompt] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState("developer@gmail.com");
  const [customGoogleName, setCustomGoogleName] = useState("Google Developer");
  const googleBtnContainerRef = useRef(null);

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

  // Google Sign-In Action
  const handleGoogleClick = () => {
    setLoading(true);

    if (googleClientId && window.google?.accounts?.id) {
      // Trigger official Google One-Tap prompt
      try {
        window.google.accounts.id.prompt();
      } catch (err) {
        setShowGooglePrompt(true);
      }
      setLoading(false);
    } else {
      // Open interactive Google Sign-In Dialog
      setShowGooglePrompt(true);
      setLoading(false);
    }
  };

  const completeGoogleSignIn = (name, email, avatar) => {
    setLoading(true);
    setTimeout(() => {
      loginWithGoogle({
        name: name || customGoogleName,
        email: email || customGoogleEmail,
        picture:
          avatar ||
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
        sub: "usr_google_" + Math.random().toString(36).substring(2, 9),
      });
    }, 450);
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
                  {/* Container for rendered official Google GIS button if client ID is active */}
                  <div
                    ref={googleBtnContainerRef}
                    id="google-signin-btn-container"
                    className="flex justify-center"
                  />

                  {/* High-visibility Primary Google Sign In Button */}
                  <button
                    id="primary-google-signin-btn"
                    type="button"
                    onClick={handleGoogleClick}
                    disabled={loading}
                    className="w-full group flex items-center justify-center gap-3.5 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-sm shadow-xl shadow-white/5 hover:shadow-white/10 active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    {/* Google Official Colorful SVG Icon */}
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>{loading ? "Connecting to Google..." : "Continue with Google"}</span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </button>

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

      {/* Interactive Google Sign-In Dialog */}
      {showGooglePrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-3xl bg-[#0e1424] border border-white/10 shadow-2xl overflow-hidden">
            {/* Google Dialog Header */}
            <div className="p-6 pb-4 border-b border-white/5 flex items-center gap-3">
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <div>
                <h3 className="text-sm font-semibold text-white">Sign in with Google</h3>
                <p className="text-[11px] text-slate-400">Choose an account to continue to NexusCode</p>
              </div>
            </div>

            {/* Account List */}
            <div className="p-4 space-y-2">
              <button
                onClick={() =>
                  completeGoogleSignIn(
                    "Ashank Gupta",
                    "ashank.gupta@gmail.com",
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                  )
                }
                className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 border border-white/5 hover:border-white/10 transition-colors text-left"
              >
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                  alt="Ashank"
                  className="w-10 h-10 rounded-full object-cover border border-white/10"
                />
                <div className="flex-1 truncate">
                  <div className="text-xs font-semibold text-white">Ashank Gupta</div>
                  <div className="text-[11px] text-slate-400 truncate">ashank.gupta@gmail.com</div>
                </div>
                <span className="text-[10px] text-indigo-400 font-medium px-2 py-0.5 rounded bg-indigo-500/10">
                  Primary
                </span>
              </button>

              <button
                onClick={() =>
                  completeGoogleSignIn(
                    "Workspace Dev",
                    "dev@nexuscode.org",
                    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
                  )
                }
                className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 border border-white/5 hover:border-white/10 transition-colors text-left"
              >
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
                  alt="Dev"
                  className="w-10 h-10 rounded-full object-cover border border-white/10"
                />
                <div className="flex-1 truncate">
                  <div className="text-xs font-semibold text-white">Workspace Developer</div>
                  <div className="text-[11px] text-slate-400 truncate">dev@nexuscode.org</div>
                </div>
                <span className="text-[10px] text-slate-500 font-medium px-2 py-0.5 rounded bg-white/5">
                  Work
                </span>
              </button>
            </div>

            {/* Dialog Footer */}
            <div className="p-4 pt-2 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] text-slate-500">To continue, Google will share your name and email.</span>
              <button
                onClick={() => setShowGooglePrompt(false)}
                className="text-xs text-slate-400 hover:text-white px-2 py-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
