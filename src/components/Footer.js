import { Code2, ExternalLink, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#070a12] py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Code2 className="w-4 h-4" />
            </div>
            <span className="font-semibold text-slate-200 text-sm">
              NextStack JavaScript Edition
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              Next.js <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://tailwindcss.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              Tailwind CSS <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://react.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              React 19 <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="text-slate-500">
            Bootstrap Complete &bull; Server Ready
          </div>
        </div>
      </div>
    </footer>
  );
}
