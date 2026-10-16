import React from "react";
import { Zap, Layers, Palette, Terminal, ShieldCheck, Sparkles, Server, Cpu } from "lucide-react";

export default function FeatureGrid() {
  const features = [
    {
      icon: Layers,
      title: "Next.js App Router",
      description: "Full support for React 19 Server Components, nested layouts, parallel routes, and instant streaming.",
      color: "text-indigo-400",
      badge: "Architecture"
    },
    {
      icon: Palette,
      title: "Tailwind CSS v4",
      description: "Next-generation CSS-first engine. No bulky config files, native CSS variables, and zero build overhead.",
      color: "text-sky-400",
      badge: "Styling"
    },
    {
      icon: Cpu,
      title: "Turbopack Bundler",
      description: "Rust-powered bundler for ultra-fast local development and instant hot module replacement (HMR).",
      color: "text-emerald-400",
      badge: "Performance"
    },
    {
      icon: Terminal,
      title: "Modern JavaScript",
      description: "Clean, idiomatic ES2024 JavaScript with seamless JSX, module aliases, and zero TypeScript compile steps.",
      color: "text-amber-400",
      badge: "Language"
    },
    {
      icon: Server,
      title: "Edge API Handlers",
      description: "Lightweight route handlers inside app/api supporting standard Request and Response web standards.",
      color: "text-purple-400",
      badge: "Backend"
    },
    {
      icon: Sparkles,
      title: "Glassmorphic Aesthetics",
      description: "Engineered with curated dark tones, fluid mesh gradients, and accessible interactive states.",
      color: "text-pink-400",
      badge: "Design"
    }
  ];

  return (
    <section id="features" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold mb-3 border border-indigo-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Modern Web Stack</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Engineered for Speed & Elegance
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Every layer of this application is tuned for optimal developer experience and blistering browser speed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, index) => {
            const IconComponent = feat.icon;
            return (
              <div
                key={index}
                className="glass-card rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <IconComponent className={`w-6 h-6 ${feat.color}`} />
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/5 text-slate-400 border border-white/5">
                    {feat.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
