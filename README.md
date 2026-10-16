# NexusCode AI — Intelligent JavaScript Cloud IDE

An AI-powered Cloud IDE tailored specifically for modern JavaScript development. Built with **Next.js 16 (App Router)**, **Tailwind CSS v4**, and **React 19**, featuring a real-time execution sandbox and AI copilot.

---

## ⚡ Features

- **In-Browser JavaScript Runtime**: Execute JavaScript code in real time with console interception (`console.log`, `warn`, `error`, and returned values).
- **AI Copilot**:
  - Code Explanation with time/space complexity analysis
  - Automated Bug Inspection & Instant Auto-Patching
  - Algorithmic Performance Optimization
  - Automated Unit Test Generation
- **Google OAuth 2.0 Single Sign-On**: Streamlined, secure authentication powered by Google Identity Services.
- **Modern JavaScript Stack**: Native ES2024 features, zero-configuration Tailwind CSS v4 styling, and glassmorphic UI.
- **Multi-File Workspace**: Manage multiple JS scripts with built-in templates (Algorithms, Async Tasks, Utilities).

---

## 🚀 Quick Start

### 1. Prerequisites

- **Node.js**: v20 or higher
- **npm**: v10 or higher

### 2. Installation

```bash
git clone https://github.com/Ashank-123456/NexusCode-AI.git
cd NexusCode-AI
npm install --legacy-peer-deps
```

### 3. Environment Variables (Optional for Google OAuth)

Copy the example configuration:

```bash
cp .env.example .env.local
```

Add your Google OAuth Client ID obtained from [Google Cloud Console](https://console.cloud.google.com/apis/credentials):

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
├── public/                 # Static assets
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── ai/         # AI Copilot Route Handler
│   │   │   └── status/     # Health check API Route
│   │   ├── login/          # Google Sign-In Authentication Page
│   │   ├── globals.css     # Tailwind CSS v4 design tokens & animations
│   │   ├── layout.js       # Root Layout & Metadata
│   │   └── page.js         # IDE Workspace Page
│   ├── components/
│   │   └── ide/            # IDE Header, Editor, Console, Copilot & Sidebar
│   └── context/
│       └── AuthContext.js  # Google Authentication & Session State
├── .env.example            # Environment variable template
└── package.json            # Project scripts & dependencies
```

---

## 🚢 Deployment

Deploy directly to [Vercel](https://vercel.com):

1. Push your repository to GitHub.
2. Import the repository into Vercel.
3. Under **Environment Variables**, add `NEXT_PUBLIC_GOOGLE_CLIENT_ID`.
4. Click **Deploy**.

---

## 📄 License

MIT &copy; 2026 NexusCode AI
