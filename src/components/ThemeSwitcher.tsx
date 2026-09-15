import React from "react";
import { Sun, Moon } from "lucide-react";

export type ThemeMode = "light" | "dark";

interface ThemeSwitcherProps {
  theme: ThemeMode;
  onToggle: () => void;
  onSelect?: (theme: ThemeMode) => void;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  theme,
  onToggle,
  onSelect
}) => {
  const isDark = theme === "dark";

  return (
    <div
      id="theme-switcher-container"
      className="inline-flex items-center p-1 rounded-full bg-neutral-200/70 dark:bg-neutral-800 border border-neutral-300/80 dark:border-neutral-700/80 shadow-2xs transition-colors duration-200"
      role="radiogroup"
      aria-label="Theme switcher"
    >
      {/* Light option */}
      <button
        type="button"
        id="theme-btn-light"
        onClick={() => (onSelect ? onSelect("light") : isDark && onToggle())}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
          !isDark
            ? "bg-white text-neutral-900 shadow-xs"
            : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
        }`}
        role="radio"
        aria-checked={!isDark}
        aria-label="Switch to Light Theme"
        title="Switch to Light Theme"
      >
        <Sun className={`w-3.5 h-3.5 ${!isDark ? "text-amber-500 fill-amber-400/30" : "text-neutral-400"}`} />
        <span className="hidden sm:inline text-[11px]">Light</span>
      </button>

      {/* Dark option */}
      <button
        type="button"
        id="theme-btn-dark"
        onClick={() => (onSelect ? onSelect("dark") : !isDark && onToggle())}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
          isDark
            ? "bg-neutral-900 text-white shadow-xs dark:bg-emerald-600 dark:text-white"
            : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
        }`}
        role="radio"
        aria-checked={isDark}
        aria-label="Switch to Dark Theme"
        title="Switch to Dark Theme"
      >
        <Moon className={`w-3.5 h-3.5 ${isDark ? "text-amber-300 fill-amber-300/30" : "text-neutral-400"}`} />
        <span className="hidden sm:inline text-[11px]">Dark</span>
      </button>
    </div>
  );
};
