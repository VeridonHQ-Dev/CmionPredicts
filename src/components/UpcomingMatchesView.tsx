import React, { useState, useEffect, useMemo } from "react";
import {
  Clock,
  Globe2,
  Search,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  RefreshCw,
  SlidersHorizontal,
  CheckSquare,
  Square,
  Radio,
  Layers,
  MapPin
} from "lucide-react";
import { UpcomingMatch, UpcomingMatchesResponse } from "../types";

interface UpcomingMatchesViewProps {
  onSelectForPrediction: (fixturesText: string, autoPredict?: boolean) => void;
  onNavigateToPredictor?: () => void;
}

const REGION_OPTIONS = [
  { label: "All Regions", value: "All", flag: "🌍" },
  { label: "England", value: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { label: "Spain", value: "Spain", flag: "🇪🇸" },
  { label: "Italy", value: "Italy", flag: "🇮🇹" },
  { label: "Brazil", value: "Brazil", flag: "🇧🇷" },
  { label: "South America", value: "South America", flag: "🌎" },
  { label: "Asia", value: "Asia", flag: "🌏" },
  { label: "Europe", value: "Europe", flag: "🇪🇺" },
  { label: "Netherlands", value: "Netherlands", flag: "🇳🇱" },
  { label: "Poland", value: "Poland", flag: "🇵🇱" },
  { label: "Scotland", value: "Scotland", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
  { label: "Germany", value: "Germany", flag: "🇩🇪" },
  { label: "France", value: "France", flag: "🇫🇷" },
];

const TIME_PRESETS = [
  { label: "Prime Time (7:45pm - 11:45pm)", start: "7:45pm", end: "11:45pm" },
  { label: "Evening (5:00pm - 8:00pm)", start: "5:00pm", end: "8:00pm" },
  { label: "Afternoon (12:00pm - 5:00pm)", start: "12:00pm", end: "5:00pm" },
  { label: "Late / Americas (10:00pm - 4:00am)", start: "10:00pm", end: "4:00am" },
  { label: "All Day (12:00am - 11:59pm)", start: "12:00am", end: "11:59pm" },
];

export const UpcomingMatchesView: React.FC<UpcomingMatchesViewProps> = ({
  onSelectForPrediction,
  onNavigateToPredictor,
}) => {
  // Timezone detection
  const detectedTz = useMemo(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || "Europe/London";
    } catch {
      return "Europe/London";
    }
  }, []);

  // Filter States
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [startTime, setStartTime] = useState("7:45pm");
  const [endTime, setEndTime] = useState("11:45pm");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [includeNextMatchdays, setIncludeNextMatchdays] = useState(false);
  const [selectedTimeZone, setSelectedTimeZone] = useState(detectedTz);

  // Data States
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState<UpcomingMatch[]>([]);
  const [selectedMatchIds, setSelectedMatchIds] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [activePreset, setActivePreset] = useState("Prime Time (7:45pm - 11:45pm)");
  const [dataSourceLabel, setDataSourceLabel] = useState("ESPN Live API");
  const [totalFoundInWorld, setTotalFoundInWorld] = useState(0);

  // Fetch fixtures from backend
  const fetchFixtures = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        date: selectedDate,
        startTime: startTime.trim(),
        endTime: endTime.trim(),
        region: selectedRegion,
        includeNextMatchdays: includeNextMatchdays ? "true" : "false",
        timeZone: selectedTimeZone,
      });

      const res = await fetch(`/api/fixtures?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch fixtures");
      const data: UpcomingMatchesResponse = await res.json();
      if (data.matches) {
        setMatches(data.matches);
        setTotalFoundInWorld(data.totalFound || data.matches.length);
        if (data.source) setDataSourceLabel(data.source);
        // Default select all matches in the time window
        setSelectedMatchIds(new Set(data.matches.map((m) => m.id)));
      }
    } catch (err) {
      // Non-blocking fallback for fixture loading
      console.warn("Notice: Fixtures loaded with fallback data:", err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
      // fallback
    }
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    fetchFixtures();
  }, [selectedDate, startTime, endTime, selectedRegion, includeNextMatchdays, selectedTimeZone]);

  // Client-side search filtering
  const displayedMatches = useMemo(() => {
    if (!searchQuery.trim()) return matches;
    const query = searchQuery.toLowerCase().trim();
    return matches.filter(
      (m) =>
        m.homeTeam.toLowerCase().includes(query) ||
        m.awayTeam.toLowerCase().includes(query) ||
        m.league.toLowerCase().includes(query) ||
        m.country.toLowerCase().includes(query) ||
        m.versusLabel.toLowerCase().includes(query)
    );
  }, [matches, searchQuery]);

  // Toggle selection
  const handleToggleSelect = (id: string) => {
    setSelectedMatchIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSelectAll = () => {
    if (selectedMatchIds.size === displayedMatches.length) {
      setSelectedMatchIds(new Set());
    } else {
      setSelectedMatchIds(new Set(displayedMatches.map((m) => m.id)));
    }
  };

  // Copy single fixture in Versus mode: "West Ham United vrs Fulham - 7:45pm"
  const handleCopySingle = async (match: UpcomingMatch) => {
    await copyToClipboard(match.versusLabel);
    setCopiedId(match.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Copy all selected matches in Versus mode
  const handleCopySelected = async () => {
    const selectedList = displayedMatches.filter((m) => selectedMatchIds.has(m.id));
    const textToCopy = (selectedList.length > 0 ? selectedList : displayedMatches)
      .map((m) => m.versusLabel)
      .join("\n");
    await copyToClipboard(textToCopy);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  // Predict using selected matches
  const handlePredictSelected = () => {
    const selectedList = displayedMatches.filter((m) => selectedMatchIds.has(m.id));
    const targetMatches = selectedList.length > 0 ? selectedList : displayedMatches;
    if (targetMatches.length === 0) return;

    // Send formatted match fixtures text e.g. "West Ham United vs Fulham\nArsenal vs Chelsea"
    const fixturesText = targetMatches.map((m) => `${m.homeTeam} vs ${m.awayTeam}`).join("\n");
    onSelectForPrediction(fixturesText, true);
  };

  // Single match prediction
  const handlePredictSingle = (match: UpcomingMatch) => {
    const fixtureText = `${match.homeTeam} vs ${match.awayTeam}`;
    onSelectForPrediction(fixtureText, true);
  };

  const handleApplyPreset = (preset: typeof TIME_PRESETS[0]) => {
    setActivePreset(preset.label);
    setStartTime(preset.start);
    setEndTime(preset.end);
  };

  return (
    <div id="upcoming-matches-view" className="w-full max-w-5xl mx-auto px-4 py-6 sm:py-10">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300">
              <Radio className="w-3 h-3 text-emerald-600 dark:text-emerald-400 animate-pulse" />
              <span>Real-Time Football Fixtures</span>
            </span>

            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700">
              <Globe2 className="w-3 h-3 text-emerald-500" />
              <span>{dataSourceLabel}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Upcoming Matches
          </h1>
          <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 mt-1">
            Live and scheduled fixtures across Asia, Brazil, England, Italy, Netherlands, Poland, Scotland, South America, Spain & worldwide.
          </p>
        </div>

        {/* Action Button to Predictor */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {displayedMatches.length > 0 && (
            <button
              type="button"
              id="predict-selected-top-btn"
              onClick={handlePredictSelected}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-sm flex items-center gap-2 transition-all cursor-pointer active:scale-98"
            >
              <Sparkles className="w-4 h-4" />
              <span>Predict Selected ({selectedMatchIds.size || displayedMatches.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Scope Toggles: Today Only vs Next Matchdays */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 bg-neutral-100 dark:bg-neutral-800/60 p-2 rounded-xl border border-neutral-200 dark:border-neutral-700/60">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIncludeNextMatchdays(false)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              !includeNextMatchdays
                ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-2xs"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            <Radio className="w-3 h-3 text-emerald-600" />
            <span>Today's Fixtures ({totalFoundInWorld})</span>
          </button>

          <button
            type="button"
            onClick={() => setIncludeNextMatchdays(true)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              includeNextMatchdays
                ? "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white shadow-2xs"
                : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            <Layers className="w-3 h-3 text-emerald-600" />
            <span>Include Upcoming Matchdays</span>
          </button>
        </div>

        {/* Timezone Switcher */}
        <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
          <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span className="font-medium hidden sm:inline">Timezone:</span>
          <select
            value={selectedTimeZone}
            onChange={(e) => setSelectedTimeZone(e.target.value)}
            className="bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 rounded-lg px-2 py-1 text-xs font-medium focus:outline-none cursor-pointer"
          >
            <option value="Europe/London">UK / London (BST/GMT)</option>
            <option value="Africa/Lagos">West Africa / Lagos (WAT)</option>
            <option value="Europe/Paris">Central Europe (CET)</option>
            <option value="America/New_York">US Eastern (EDT)</option>
            <option value="America/Sao_Paulo">Brazil / São Paulo (BRT)</option>
            <option value="Asia/Riyadh">Saudi Arabia (AST)</option>
            <option value="Asia/Tokyo">Japan (JST)</option>
            <option value="UTC">UTC (Universal)</option>
            {detectedTz !== "Europe/London" && (
              <option value={detectedTz}>Detected ({detectedTz})</option>
            )}
          </select>
        </div>
      </div>

      {/* Filter Control Box */}
      <div className="mt-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 sm:p-5 shadow-sm">
        <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2 text-sm font-bold text-neutral-800 dark:text-neutral-200">
            <SlidersHorizontal className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Time & League Filters</span>
          </div>
          <button
            type="button"
            onClick={fetchFixtures}
            disabled={loading}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-emerald-600" : ""}`} />
            <span>Refresh Live Data</span>
          </button>
        </div>

        {/* Date and Time Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {/* Date Picker */}
          <div>
            <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 uppercase tracking-wider mb-1.5">
              Match Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm font-medium text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Start Time Filter */}
          <div>
            <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>Starting From</span>
              <span className="text-[11px] font-normal text-emerald-600 dark:text-emerald-400">e.g. 7:45pm</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={startTime}
                onChange={(e) => {
                  setStartTime(e.target.value);
                  setActivePreset("");
                }}
                placeholder="7:45pm or 19:45"
                className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm font-semibold text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* End Time Filter */}
          <div>
            <label className="block text-xs font-bold text-neutral-600 dark:text-neutral-300 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>End Time</span>
              <span className="text-[11px] font-normal text-emerald-600 dark:text-emerald-400">e.g. 11:45pm</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={endTime}
                onChange={(e) => {
                  setEndTime(e.target.value);
                  setActivePreset("");
                }}
                placeholder="11:45pm or 23:45"
                className="w-full px-3.5 py-2.5 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm font-semibold text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Quick Time Presets */}
        <div className="mt-3.5 pt-3 border-t border-neutral-100 dark:border-neutral-800">
          <p className="text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-2">
            Quick Time Presets
          </p>
          <div className="flex flex-wrap gap-1.5">
            {TIME_PRESETS.map((preset) => {
              const isSelected = activePreset === preset.label;
              return (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  className={`text-xs px-2.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                    isSelected
                      ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 shadow-2xs font-semibold"
                      : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200/70 dark:hover:bg-neutral-700"
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Region & League Selector Pills */}
        <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800">
          <p className="text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-2">
            Filter Worldwide League / Country
          </p>
          <div className="flex flex-wrap gap-1.5">
            {REGION_OPTIONS.map((reg) => {
              const isSelected = selectedRegion === reg.value;
              return (
                <button
                  key={reg.value}
                  type="button"
                  onClick={() => setSelectedRegion(reg.value)}
                  className={`text-xs px-2.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? "bg-emerald-600 text-white font-semibold shadow-2xs"
                      : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200/70 dark:hover:bg-neutral-700"
                  }`}
                >
                  <span>{reg.flag}</span>
                  <span>{reg.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 dark:text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search club name or league (e.g. Everton, Manchester United, Barcelona, Milan)..."
              className="w-full pl-10 pr-4 py-2 bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Fixtures Action Bar (Select All / Copy All / Summary) */}
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-neutral-50 dark:bg-neutral-800/50 p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSelectAll}
            className="inline-flex items-center gap-2 text-xs font-bold text-neutral-700 dark:text-neutral-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
          >
            {selectedMatchIds.size === displayedMatches.length && displayedMatches.length > 0 ? (
              <CheckSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Square className="w-4 h-4 text-neutral-400" />
            )}
            <span>
              {selectedMatchIds.size === displayedMatches.length && displayedMatches.length > 0
                ? "Deselect All"
                : "Select All"}
            </span>
          </button>

          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            Showing <strong className="text-neutral-900 dark:text-white">{displayedMatches.length}</strong> matches{" "}
            ({selectedMatchIds.size} selected)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Copy All Button in Versus Mode */}
          <button
            type="button"
            onClick={handleCopySelected}
            disabled={displayedMatches.length === 0}
            className="px-3 py-1.5 text-xs font-semibold bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copiedAll ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600">Copied Versus List!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Versus List</span>
              </>
            )}
          </button>

          {/* Predict Selected CTA */}
          <button
            type="button"
            onClick={handlePredictSelected}
            disabled={displayedMatches.length === 0}
            className="px-4 py-1.5 text-xs font-bold bg-neutral-900 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white rounded-lg flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer active:scale-98"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Predict Selection</span>
          </button>
        </div>
      </div>

      {/* Versus Mode Fixture List */}
      <div className="mt-4 space-y-2.5">
        {loading ? (
          <div className="py-16 text-center bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl">
            <RefreshCw className="w-8 h-8 mx-auto text-emerald-600 animate-spin mb-3" />
            <p className="text-base font-bold text-neutral-800 dark:text-neutral-200">
              Fetching Real Live Matches...
            </p>
            <p className="text-xs text-neutral-400 mt-1">
              Querying ESPN Live Scoreboard across England, Spain, Italy, Brazil, South America, Asia, Europe & more
            </p>
          </div>
        ) : displayedMatches.length === 0 ? (
          <div className="py-16 text-center bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl px-4">
            <Clock className="w-10 h-10 mx-auto text-neutral-300 dark:text-neutral-600 mb-3" />
            <h3 className="text-base font-bold text-neutral-800 dark:text-neutral-200">
              No matches found in this time window
            </h3>
            <p className="text-xs text-neutral-400 mt-1 max-w-md mx-auto">
              No live fixtures between <span className="font-semibold text-neutral-700 dark:text-neutral-300">{startTime}</span> and <span className="font-semibold text-neutral-700 dark:text-neutral-300">{endTime}</span> on {selectedDate} ({selectedRegion}).
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={() => handleApplyPreset(TIME_PRESETS[0])}
                className="px-3 py-1.5 text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 rounded-lg border border-emerald-200 dark:border-emerald-800 cursor-pointer"
              >
                Reset to Prime Time (7:45pm - 11:45pm)
              </button>
              <button
                type="button"
                onClick={() => setIncludeNextMatchdays(true)}
                className="px-3 py-1.5 text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-lg cursor-pointer"
              >
                View Upcoming Matchdays
              </button>
            </div>
          </div>
        ) : (
          displayedMatches.map((match) => {
            const isSelected = selectedMatchIds.has(match.id);
            const isCopied = copiedId === match.id;
            const hasScore = match.homeScore !== undefined && match.awayScore !== undefined;

            return (
              <div
                key={match.id}
                className={`group relative bg-white dark:bg-neutral-900 border rounded-xl p-3.5 sm:p-4 transition-all duration-150 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isSelected
                    ? "border-emerald-500/80 bg-emerald-50/20 dark:bg-emerald-950/10 shadow-2xs"
                    : "border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700"
                }`}
              >
                {/* Left Side: Checkbox + Versus Mode Display + Logos */}
                <div className="flex items-start sm:items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleToggleSelect(match.id)}
                    aria-label="Select match"
                    className="mt-1 sm:mt-0 text-neutral-400 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
                  >
                    {isSelected ? (
                      <CheckSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <Square className="w-5 h-5" />
                    )}
                  </button>

                  <div>
                    {/* The prominent Versus Mode Headline: West Ham United vrs Fulham - 7:45pm */}
                    <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                      {/* Home Team */}
                      <div className="flex items-center gap-1.5">
                        {match.homeLogo && (
                          <img
                            src={match.homeLogo}
                            alt=""
                            className="w-5 h-5 object-contain shrink-0"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                        )}
                        <span className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
                          {match.homeTeam}
                        </span>
                        {hasScore && (
                          <span className="text-sm font-extrabold text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">
                            {match.homeScore}
                          </span>
                        )}
                      </div>

                      {/* Versus pill */}
                      <span className="text-xs sm:text-sm font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
                        vrs
                      </span>

                      {/* Away Team */}
                      <div className="flex items-center gap-1.5">
                        {hasScore && (
                          <span className="text-sm font-extrabold text-neutral-900 dark:text-white bg-neutral-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded">
                            {match.awayScore}
                          </span>
                        )}
                        <span className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
                          {match.awayTeam}
                        </span>
                        {match.awayLogo && (
                          <img
                            src={match.awayLogo}
                            alt=""
                            className="w-5 h-5 object-contain shrink-0"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                        )}
                      </div>

                      {/* Time pill */}
                      <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-extrabold text-neutral-900 dark:text-neutral-100 px-2.5 py-0.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700">
                        <Clock className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                        <span>{match.timeFormatted}</span>
                      </span>
                    </div>

                    {/* League, Country, Venue & Status Metadata */}
                    <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                      <span className="font-semibold text-neutral-700 dark:text-neutral-300">
                        {match.country}
                      </span>
                      <span>•</span>
                      <span>{match.league}</span>
                      {match.stadium && (
                        <>
                          <span>•</span>
                          <span className="inline-flex items-center gap-1 text-neutral-400 dark:text-neutral-500">
                            <MapPin className="w-3 h-3" />
                            <span>{match.stadium}</span>
                          </span>
                        </>
                      )}
                      {match.status && (
                        <>
                          <span>•</span>
                          <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.2 rounded-full border border-emerald-200 dark:border-emerald-900">
                            {match.status}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Side Actions: Copy Versus String & Predict This Match */}
                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  {/* Copy Individual Versus Format */}
                  <button
                    type="button"
                    onClick={() => handleCopySingle(match)}
                    title="Copy match in Versus mode (e.g. West Ham United vrs Fulham - 7:45pm)"
                    className="p-2 text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-100 bg-neutral-100 hover:bg-neutral-200/70 dark:bg-neutral-800 dark:hover:bg-neutral-700 rounded-lg transition-colors cursor-pointer"
                  >
                    {isCopied ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  {/* Single Match Predict */}
                  <button
                    type="button"
                    onClick={() => handlePredictSingle(match)}
                    className="px-3 py-1.5 bg-neutral-900 hover:bg-emerald-600 dark:bg-neutral-800 dark:hover:bg-emerald-600 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Predict</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Floating Sticky Bottom Bar when matches are selected */}
      {selectedMatchIds.size > 0 && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 bg-neutral-900/95 dark:bg-neutral-800/95 backdrop-blur-md text-white px-5 py-3 rounded-2xl shadow-xl border border-neutral-700 flex items-center gap-4 max-w-lg w-[92%] sm:w-auto justify-between sm:justify-start">
          <div className="text-xs sm:text-sm font-medium">
            <strong className="text-emerald-400 font-bold">{selectedMatchIds.size}</strong> match
            {selectedMatchIds.size > 1 ? "es" : ""} selected
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopySelected}
              className="px-3 py-1.5 text-xs font-semibold bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg border border-neutral-700 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy Versus</span>
            </button>

            <button
              type="button"
              onClick={handlePredictSelected}
              className="px-4 py-1.5 text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-neutral-950 rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-1.5 active:scale-98"
            >
              <Sparkles className="w-3.5 h-3.5 text-neutral-950" />
              <span>Predict Squad</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
