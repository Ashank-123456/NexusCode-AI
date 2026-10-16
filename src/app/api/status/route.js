import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    framework: "Next.js 16 (App Router)",
    styling: "Tailwind CSS v4 (Zero-Config CSS Engine)",
    language: "JavaScript (ES2024)",
    nodeEnvironment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
    features: [
      "React Server Components",
      "Turbopack Fast Refresh",
      "CSS @import 'tailwindcss' engine",
      "Native Edge Ready Handlers"
    ]
  });
}
