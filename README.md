# CP | CmionPredicts

> **Predict. Analyze. Select.** — An AI-powered sports analytics and fantasy football squad recommendation engine.

CmionPredicts evaluates upcoming football fixtures, player form curves, injury/availability status, and tactical synergy to produce the mathematically optimal **15-player fantasy squad** (2 Goalkeepers, 5 Defenders, 5 Midfielders, 3 Forwards) along with an optimal **Starting XI**, tactical pitch board, and captaincy picks targeting a 150-point benchmark.

---

## ✨ Features

- **Fixture & Club Recognition**: Paste raw text with upcoming matches (e.g. `Arsenal vs Chelsea`, `Bayern vs Real Madrid`) or a list of club names.
- **Rule-Compliant 15-Player Squad**: Strictly enforces standard fantasy football squad limits:
  - 2 Goalkeepers (1 starter, 1 backup)
  - 5 Defenders (3–5 starters, remainder on bench)
  - 5 Midfielders (2–5 starters, remainder on bench)
  - 3 Forwards (1–3 starters, remainder on bench)
  - 4-player bench (1 GK + 3 outfield substitutes ordered by priority)
- **Starting XI Tactical Pitch Board**: Visual representation of the starting lineup in their designated tactical shape.
- **6-Formation Optimization Matrix**: Simultaneously evaluates and compares projected point outputs across `4-3-3`, `3-5-2`, `4-4-2`, `3-4-3`, `5-3-2`, and `4-5-1` to select the highest-scoring tactical configuration.
- **Captain & Vice-Captain Designations**: Identifies the primary armband candidate (2x score multiplier) and safety vice-captain based on projected outputs and match difficulty.
- **Light & Dark Theme Switcher**: Instant theme switching with preference persistence in `localStorage` and system color scheme detection.
- **Multi-Model Resilient AI Pipeline**: Uses the official `@google/genai` SDK with automatic multi-model failover (`gemini-3.1-flash-lite` → `gemini-3.8-flash` → `gemini-flash-latest`) and an integrated statistical engine fallback so users never experience downtime.
- **Server-Side API Security**: Protects `GEMINI_API_KEY` behind Express backend routes (`/api/*`), ensuring credentials are never exposed to client browsers.

---

## 🛠️ Tech Stack

- **Client**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React, Motion
- **Server**: Express, Node.js (ESM), `@google/genai` SDK
- **Bundler & Build**: Vite (frontend client) + esbuild (compiled server bundle at `dist/server.cjs`)
- **Linting & Types**: TypeScript strict type-checking (`tsc --noEmit`)

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/your-username/cmionpredicts.git
cd cmionpredicts
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Edit `.env` and set your Gemini API key:
```env
GEMINI_API_KEY="your_gemini_api_key_here"
```
*(Get a free API key at [Google AI Studio](https://aistudio.google.com/))*

### 4. Run in Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Build & Deployment

### Deploying to Vercel (Recommended)
This repository is configured out-of-the-box for **Vercel**:
1. Push your repository to GitHub.
2. In the [Vercel Dashboard](https://vercel.com/new), click **Add New Project** and import your GitHub repository.
3. Vercel automatically detects Vite and the `vercel.json` configuration.
4. Under **Environment Variables**, add:
   - **Key**: `GEMINI_API_KEY`
   - **Value**: Your Google AI Studio API key.
5. Click **Deploy**. Vercel will host both the frontend and the `/api/predict` serverless functions.

### Deploying with Node.js / Docker / Cloud Run
To compile both the Vite frontend client and the backend server into a standalone container or Node runtime:

```bash
npm run build
npm start
```

- `npm run build`: Compiles static web assets to `dist/` and bundles `server.ts` into a standalone CommonJS bundle at `dist/server.cjs`.
- `npm start`: Runs `node dist/server.cjs` serving both the API routes and static production assets.

---

## 📁 Project Structure

```
├── .env.example               # Template for environment variables (no secrets)
├── .gitignore                 # Comprehensive Git ignore rules
├── index.html                 # HTML entry point with metadata & fonts
├── metadata.json              # App configuration & permissions
├── package.json               # Dependencies & scripts
├── server.ts                  # Express backend & Vite middleware server
├── tsconfig.json              # TypeScript configuration
├── vite.config.ts             # Vite build configuration
├── src/
│   ├── main.tsx               # Client entry point
│   ├── App.tsx                # Main container, theme state, & routing
│   ├── index.css              # Tailwind CSS styles & dark mode definitions
│   ├── types.ts               # Shared TypeScript schemas & interfaces
│   ├── components/
│   │   ├── LandingView.tsx    # Clean input box, quick sample buttons
│   │   ├── AnalyzingView.tsx  # Animated multi-step analysis progress
│   │   ├── ResultView.tsx     # Squad breakdown, formation comparison, fixtures
│   │   ├── PitchView.tsx      # Tactical football pitch layout
│   │   └── ThemeSwitcher.tsx  # Light/Dark mode toggle
│   └── server/
│       └── footballEngine.ts  # Multi-model AI prediction & statistical engine
```

---

## 🔒 Security Audit Checklist

- [x] No sensitive API keys or passwords hardcoded in repository files.
- [x] `.gitignore` ignores `.env*` while preserving `.env.example`.
- [x] Backend API proxy hides `GEMINI_API_KEY` from client browser DevTools.
- [x] Zero build warnings or TypeScript compilation errors.
- [x] Input sanitization and payload limits configured on server endpoints.

---

## ⚖️ Disclaimer

CmionPredicts provides statistical projections based on available performance data, historical ratings, and predictive modeling. Form ratings and point projections are analytical estimates and do not guarantee actual matchday outcomes.
