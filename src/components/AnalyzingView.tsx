import React, { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";

interface AnalyzingViewProps {
  onComplete?: () => void;
}

const STEPS = [
  "Identifying teams",
  "Finding upcoming fixtures",
  "Checking expected lineups",
  "Checking player availability",
  "Analyzing recent performances",
  "Ranking players",
  "Building the best 15",
  "Selecting Captain",
  "Selecting Vice-Captain",
  "Predicting formation"
];

export const AnalyzingView: React.FC<AnalyzingViewProps> = () => {
  const [completedIndex, setCompletedIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCompletedIndex((prev) => {
        if (prev < STEPS.length) {
          return prev + 1;
        }
        return prev;
      });
    }, 280);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="analyzing-view" className="w-full max-w-lg mx-auto py-12 px-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 mb-4 animate-pulse">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">
          CmionPredicts is analyzing...
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          Evaluating expected lineups, recent form, and optimal squad chemistry
        </p>
      </div>

      {/* Checklist box */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm space-y-3">
        {STEPS.map((step, idx) => {
          const isDone = idx < completedIndex;
          const isCurrent = idx === completedIndex;

          return (
            <div
              key={step}
              className={`flex items-center gap-3 text-sm transition-all duration-200 ${
                isDone
                  ? "text-emerald-800 dark:text-emerald-400 font-medium"
                  : isCurrent
                  ? "text-neutral-900 dark:text-white font-semibold"
                  : "text-neutral-400 dark:text-neutral-600"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-xs transition-colors duration-200 ${
                  isDone
                    ? "bg-emerald-500 text-white"
                    : isCurrent
                    ? "border-2 border-emerald-500 text-emerald-500"
                    : "border border-neutral-300 dark:border-neutral-700 text-transparent"
                }`}
              >
                {isDone ? (
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                ) : isCurrent ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                ) : null}
              </div>
              <span>{step}</span>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-6 text-sm font-medium text-neutral-500 dark:text-neutral-400 animate-pulse">
        Preparing your prediction...
      </div>
    </div>
  );
};
