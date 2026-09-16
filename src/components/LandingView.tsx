import React, { useState } from "react";
import { Sparkles, ArrowRight, ShieldCheck, Calendar, Globe2 } from "lucide-react";

interface LandingViewProps {
  onPredict: (rawText: string) => void;
  onOpenUpcomingMatches?: () => void;
  isMockDataMode?: boolean;
}

const SAMPLE_INPUTS = [
  {
    label: "Prompt Example",
    text: `Manchester United
Slavia Praha
Lens
Sabah
Como
RB Leipzig
FC Bayern
Bodo/Glimt`
  },
  {
    label: "Match Fixtures (vs)",
    text: `Manchester United vs Slavia Prague
Lens vs Sabah
Como vs RB Leipzig
Bayern Munich vs Bodo/Glimt`
  },
  {
    label: "European Giants",
    text: `Real Madrid, Barcelona, Liverpool, Arsenal, Chelsea, Inter Milan, Juventus, FC Bayern`
  }
];

export const LandingView: React.FC<LandingViewProps> = ({
  onPredict,
  onOpenUpcomingMatches,
  isMockDataMode
}) => {
  const [inputText, setInputText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onPredict(inputText);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl+Enter or Cmd+Enter submits
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      if (inputText.trim()) {
        onPredict(inputText);
      }
    }
  };

  return (
    <div id="landing-view" className="w-full max-w-2xl mx-auto px-4 py-8 sm:py-16 flex flex-col items-center">
      {/* Brand Header */}
      <div className="text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 mb-4 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Fantasy Squad Predictor</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-2.5">
          CmionPredicts
        </h1>

        <p className="text-lg sm:text-xl font-medium text-neutral-500 dark:text-neutral-400 tracking-tight">
          Predict. Analyze. Select.
        </p>
      </div>

      {/* Main Input Card - Google / ChatGPT Search style */}
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600 focus-within:border-emerald-600 dark:focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/15 rounded-2xl shadow-sm transition-all duration-200">
          <textarea
            id="matches-input"
            rows={5}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Paste upcoming matches or team names here..."
            className="w-full px-5 py-4 text-base sm:text-lg text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 bg-transparent border-0 resize-none focus:outline-none focus:ring-0 leading-relaxed font-normal"
          />

          {/* Bottom Bar inside input box */}
          <div className="flex items-center justify-between px-4 py-3 bg-neutral-50/70 dark:bg-neutral-900/90 border-t border-neutral-100 dark:border-neutral-800 rounded-b-2xl text-xs text-neutral-500 dark:text-neutral-400">
            <span className="hidden sm:inline-flex items-center gap-1">
              Press <kbd className="px-1.5 py-0.5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded font-mono text-[10px] text-neutral-600 dark:text-neutral-300">⌘+Enter</kbd> to predict
            </span>
            <span className="sm:hidden text-[11px] text-neutral-400 dark:text-neutral-500">
              Paste clubs or fixtures
            </span>

            {inputText.trim().length > 0 && (
              <button
                type="button"
                onClick={() => setInputText("")}
                className="text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Large PREDICT Button */}
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="submit"
            id="predict-btn"
            disabled={!inputText.trim()}
            className="w-full sm:w-auto min-w-[200px] px-8 py-3.5 bg-neutral-900 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 disabled:bg-neutral-200 dark:disabled:bg-neutral-800 disabled:text-neutral-400 dark:disabled:text-neutral-600 disabled:cursor-not-allowed text-white font-bold text-base sm:text-lg rounded-xl shadow-md hover:shadow-lg transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <span>PREDICT</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          {onOpenUpcomingMatches && (
            <button
              type="button"
              id="open-upcoming-btn"
              onClick={onOpenUpcomingMatches}
              className="w-full sm:w-auto px-6 py-3.5 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-100 font-bold text-sm sm:text-base rounded-xl border border-neutral-300 dark:border-neutral-700 hover:border-emerald-500 dark:hover:border-emerald-500 shadow-sm transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Upcoming Matches</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-semibold">
                Time Filter
              </span>
            </button>
          )}
        </div>
      </form>

      {/* Quick Example Inputs */}
      <div className="w-full mt-8 pt-6 border-t border-neutral-200/80 dark:border-neutral-800/80">
        <p className="text-xs font-semibold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider text-center mb-3">
          Quick sample inputs
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {SAMPLE_INPUTS.map((sample) => (
            <button
              key={sample.label}
              type="button"
              onClick={() => setInputText(sample.text)}
              className="text-xs font-medium px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200/80 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors border border-neutral-200/60 dark:border-neutral-800 cursor-pointer"
            >
              {sample.label}
            </button>
          ))}
        </div>
      </div>

      {/* Engine Transparency Footer */}
      <div className="mt-8 flex items-center gap-2 text-xs text-neutral-400 dark:text-neutral-500">
        <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        <span>Strict form & availability engine • 150-point target model</span>
      </div>
    </div>
  );
};
