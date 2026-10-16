import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NexusCode AI | Intelligent JavaScript Cloud IDE",
  description: "Next-generation AI-powered Cloud IDE tailored for JavaScript. Features live execution sandbox, smart copilot refactoring, bug fixing, and modern development tools.",
  keywords: ["AI IDE", "JavaScript IDE", "Next.js", "Tailwind CSS", "Code Editor", "AI Copilot"],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#080c14] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
