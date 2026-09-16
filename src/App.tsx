import React, { useState, useEffect } from "react";
import { LandingView } from "./components/LandingView";
import { AnalyzingView } from "./components/AnalyzingView";
import { ResultView } from "./components/ResultView";
import { UpcomingMatchesView } from "./components/UpcomingMatchesView";
import { ThemeSwitcher, ThemeMode } from "./components/ThemeSwitcher";
import { SquadPredictionResponse } from "./types";
import { AlertCircle, Calendar, Sparkles } from "lucide-react";

export default function App() {
  const [appState, setAppState] = useState<"LANDING" | "UPCOMING_MATCHES" | "ANALYZING" | "RESULT">("LANDING");
  const [prediction, setPrediction] = useState<SquadPredictionResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);

  // Theme state with localStorage persistence and system preference detection
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const saved = window.localStorage.getItem("cmion_theme");
        if (saved === "light" || saved === "dark") return saved;
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
          return "dark";
        }
      }
    } catch {
      // Ignore storage/iframe security restrictions
    }
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem("cmion_theme", theme);
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleSelectTheme = (newTheme: ThemeMode) => {
    setTheme(newTheme);
  };

  // Check health endpoint on mount
  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.hasGeminiApiKey) {
          setHasApiKey(true);
        }
      })
      .catch((err) => console.log("Health check non-blocking:", err));
  }, []);

  const handlePredict = async (rawInput: string) => {
    setAppState("ANALYZING");
    setErrorMessage(null);

    const startTime = Date.now();
    const MIN_ANALYSIS_MS = 2800; // Allow the 10-step checklist to be enjoyed

    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawInput })
      });

      if (!res.ok) {
        let message = `Server error (${res.status}). Please check matches and try again.`;
        try {
          const rawText = await res.text();
          try {
            const errorData = JSON.parse(rawText);
            if (errorData.error) message = errorData.error;
            else if (errorData.details) message = `${errorData.error || "Error"}: ${errorData.details}`;
          } catch {
            if (rawText && rawText.length < 300 && !rawText.includes("<!DOCTYPE")) {
              message = `Server (${res.status}): ${rawText}`;
            }
          }
        } catch {
          // fallback
        }
        throw new Error(message);
      }

      const data: SquadPredictionResponse = await res.json();

      // Ensure min elapsed time for checklist animation
      const elapsed = Date.now() - startTime;
      const delayRemaining = Math.max(0, MIN_ANALYSIS_MS - elapsed);

      setTimeout(() => {
        setPrediction(data);
        setAppState("RESULT");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, delayRemaining);
    } catch (err: any) {
      console.warn("Prediction attempt resulted in error:", err);
      setTimeout(() => {
        setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
        setAppState("LANDING");
      }, 1000);
    }
  };

  const handleNewPrediction = () => {
    setPrediction(null);
    setErrorMessage(null);
    setAppState("LANDING");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-white transition-colors duration-200">
      {/* Minimal Top Header */}
      <header className="w-full border-b border-neutral-200/70 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md sticky top-0 z-50 transition-colors duration-200">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <button
            type="button"
            onClick={handleNewPrediction}
            className="flex items-center gap-2 text-left group cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-emerald-700 dark:bg-emerald-600 text-white flex items-center justify-center font-black text-xs group-hover:bg-emerald-600 dark:group-hover:bg-emerald-500 transition-colors shadow-2xs">
              CP
            </div>
            <div>
              <span className="font-extrabold text-neutral-900 dark:text-white text-sm tracking-tight block leading-tight">
                CmionPredicts
              </span>
              <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-medium block leading-none">
                Predict. Analyze. Select.
              </span>
            </div>
          </button>

          {/* Center Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800/80 p-1 rounded-xl border border-neutral-200 dark:border-neutral-700/60">
            <button
              type="button"
              id="nav-tab-predictor"
              onClick={() => {
                if (appState === "UPCOMING_MATCHES") {
                  setAppState(prediction ? "RESULT" : "LANDING");
                }
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                appState !== "UPCOMING_MATCHES"
                  ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-2xs"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Squad Predictor</span>
            </button>

            <button
              type="button"
              id="nav-tab-upcoming"
              onClick={() => setAppState("UPCOMING_MATCHES")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                appState === "UPCOMING_MATCHES"
                  ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-2xs"
                  : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Upcoming Matches</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                Live
              </span>
            </button>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Tab Toggle for small screens */}
            <button
              type="button"
              onClick={() => setAppState(appState === "UPCOMING_MATCHES" ? "LANDING" : "UPCOMING_MATCHES")}
              className="md:hidden p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 text-xs font-bold flex items-center gap-1"
            >
              {appState === "UPCOMING_MATCHES" ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Predictor</span>
                </>
              ) : (
                <>
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Upcoming</span>
                </>
              )}
            </button>

            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase border ${
                hasApiKey
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300"
                  : "bg-neutral-100 border-neutral-200 text-neutral-600 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  hasApiKey ? "bg-emerald-500" : "bg-neutral-400"
                }`}
              />
              <span className="hidden sm:inline">{hasApiKey ? "LIVE AI ENGINE" : "CALIBRATED MODEL"}</span>
              <span className="sm:hidden">{hasApiKey ? "LIVE" : "ENGINE"}</span>
            </span>

            {/* Theme switcher */}
            <ThemeSwitcher
              theme={theme}
              onToggle={toggleTheme}
              onSelect={handleSelectTheme}
            />

            {appState === "RESULT" && (
              <button
                type="button"
                onClick={handleNewPrediction}
                className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white px-2.5 sm:px-3 py-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-center">
        {errorMessage && (
          <div className="max-w-md mx-auto mt-4 px-4">
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 rounded-xl text-red-800 dark:text-red-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600 dark:text-red-400" />
              <span>{errorMessage}</span>
            </div>
          </div>
        )}

        {appState === "LANDING" && (
          <LandingView
            onPredict={handlePredict}
            onOpenUpcomingMatches={() => setAppState("UPCOMING_MATCHES")}
            isMockDataMode={!hasApiKey}
          />
        )}

        {appState === "UPCOMING_MATCHES" && (
          <UpcomingMatchesView
            onSelectForPrediction={(fixturesText, autoPredict) => {
              if (autoPredict) {
                handlePredict(fixturesText);
              } else {
                setAppState("LANDING");
              }
            }}
            onNavigateToPredictor={() => setAppState("LANDING")}
          />
        )}

        {appState === "ANALYZING" && <AnalyzingView />}

        {appState === "RESULT" && prediction && (
          <ResultView
            prediction={prediction}
            onNewPrediction={handleNewPrediction}
          />
        )}
      </main>

      {/* Minimal Footer */}
      <footer className="w-full py-4 border-t border-neutral-200/60 dark:border-neutral-800/80 bg-white/40 dark:bg-neutral-900/40 text-center text-xs text-neutral-400 dark:text-neutral-500 transition-colors duration-200">
        <p>CP | CmionPredicts • Football Fantasy Squad Optimization Engine</p>
      </footer>
    </div>
  );
}
