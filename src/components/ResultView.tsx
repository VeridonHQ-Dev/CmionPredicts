import React, { useState } from "react";
import {
  SquadPredictionResponse,
  PlayerPrediction,
  Position,
  PlayerStatus
} from "../types";
import { PitchView } from "./PitchView";
import {
  RotateCcw,
  Sparkles,
  Info,
  Calendar,
  Layers,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Award
} from "lucide-react";

interface ResultViewProps {
  prediction: SquadPredictionResponse;
  onNewPrediction: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  prediction,
  onNewPrediction
}) => {
  const [showFormationBreakdown, setShowFormationBreakdown] = useState(false);
  const [showFixtures, setShowFixtures] = useState(false);

  const {
    predictedFormation,
    projectedPoints,
    captain,
    viceCaptain,
    final15,
    startingXI,
    bench,
    formationsTested,
    analysisBasis,
    disclaimer,
    fixtures,
    isMockData,
    dataModeLabel
  } = prediction;

  const renderStatusBadge = (status: PlayerStatus, statusText?: string) => {
    switch (status) {
      case "STARTING":
        return (
          <span
            title={statusText || "Starting"}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2 py-0.5 rounded-full"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>STARTING</span>
          </span>
        );
      case "EXPECTED_STARTER":
        return (
          <span
            title={statusText || "Expected Starter"}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 px-2 py-0.5 rounded-full"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>EXPECTED STARTER</span>
          </span>
        );
      case "ROTATION_RISK":
        return (
          <span
            title={statusText || "Rotation Risk"}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-800 px-2 py-0.5 rounded-full"
          >
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            <span>ROTATION RISK</span>
          </span>
        );
      case "UNAVAILABLE":
        return (
          <span
            title={statusText || "Unavailable"}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 px-2 py-0.5 rounded-full"
          >
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            <span>UNAVAILABLE</span>
          </span>
        );
    }
  };

  const renderPlayerRow = (player: PlayerPrediction, index: number, keyPrefix: string = "player") => {
    const isCap = player.isCaptain || player.id === captain.id;
    const isVc = player.isViceCaptain || player.id === viceCaptain.id;

    return (
      <div
        key={`${keyPrefix}-${player.id || index}`}
        className="flex flex-col sm:flex-row sm:items-center justify-between py-3 px-3.5 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800/60 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-700 transition-colors gap-2"
      >
        <div className="flex items-start sm:items-center gap-3">
          <span className="font-mono text-xs font-bold text-neutral-400 dark:text-neutral-500 w-5">
            {index}.
          </span>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-neutral-900 dark:text-white text-sm sm:text-base">
                {player.name}
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-normal">
                — {player.countryOrLeague}, {player.club}
              </span>

              {isCap && (
                <span className="bg-amber-400 text-neutral-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-amber-300 shadow-2xs">
                  (C)
                </span>
              )}
              {isVc && (
                <span className="bg-neutral-800 text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-neutral-700 shadow-2xs">
                  (VC)
                </span>
              )}
            </div>

            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Form: {typeof player.formRating === "number" ? player.formRating.toFixed(1) : player.formRating}/10 • Recent 5:{" "}
              {player.stats?.recentRatings?.length ? player.stats.recentRatings.join(", ") : "Consistent"} • Projected: ~{player.projectedPoints} pts
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:self-center pl-8 sm:pl-0">
          {renderStatusBadge(player.status, player.statusText)}
        </div>
      </div>
    );
  };

  return (
    <div id="prediction-result" className="w-full max-w-3xl mx-auto px-4 py-8 sm:py-12">
      {/* Top Brand Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-1">
          CmionPredicts
        </h1>
        <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-emerald-700 dark:text-emerald-400">
          YOUR PREDICTED FANTASY TEAM
        </p>

        {/* Data Mode Banner (LIVE vs MOCK) */}
        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase border border-neutral-200 dark:border-neutral-800">
          {isMockData ? (
            <div className="bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 flex items-center gap-1.5 px-2 py-0.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              <span>{dataModeLabel} (CALIBRATED SAMPLE ENGINE)</span>
            </div>
          ) : (
            <div className="bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 px-2 py-0.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>{dataModeLabel} (REAL-TIME MODEL)</span>
            </div>
          )}
        </div>
      </div>

      {/* Primary Prediction Summary Card */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-neutral-100 dark:divide-neutral-800">
          {/* Formation & Score */}
          <div className="flex flex-col justify-center sm:pr-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-1">
              PREDICTED FORMATION
            </span>
            <div className="text-3xl font-extrabold text-neutral-900 dark:text-white">
              {predictedFormation}
            </div>

            <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                PROJECTED POINTS
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-4xl font-black text-emerald-600 dark:text-emerald-400">
                  {projectedPoints}
                </span>
                <span className="text-xs text-neutral-400 dark:text-neutral-500 font-medium">
                  / 150 target
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-1 italic">
                Projected points — not guaranteed.
              </p>
            </div>
          </div>

          {/* Captain & Vice-Captain */}
          <div className="flex flex-col justify-center sm:pl-6 pt-4 sm:pt-0 space-y-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                <Award className="w-4 h-4 text-amber-500" />
                <span>CAPTAIN</span>
              </div>
              <p className="font-bold text-neutral-900 dark:text-white text-base mt-0.5">
                {captain.name}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {captain.countryOrLeague}, {captain.club}
              </p>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium mt-0.5">
                Highest projected output (~{captain.projectedPoints * 2} pts with double)
              </p>
            </div>

            <div className="pt-3 border-t border-neutral-100 dark:border-neutral-800">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                <Sparkles className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
                <span>VICE-CAPTAIN</span>
              </div>
              <p className="font-bold text-neutral-900 dark:text-white text-base mt-0.5">
                {viceCaptain.name}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {viceCaptain.countryOrLeague}, {viceCaptain.club}
              </p>
            </div>
          </div>
        </div>

        {/* Formation Optimization Dropdown */}
        <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800">
          <button
            type="button"
            onClick={() => setShowFormationBreakdown(!showFormationBreakdown)}
            className="flex items-center justify-between w-full text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Formation Optimization Comparison (Tested 6 Formations)
            </span>
            {showFormationBreakdown ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {showFormationBreakdown && (
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
              {formationsTested.map((f) => (
                <div
                  key={f.formation}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    f.isSelected
                      ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200 font-bold shadow-2xs"
                      : "bg-neutral-50/70 dark:bg-neutral-800/60 border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 font-medium"
                  }`}
                >
                  <div className="text-xs font-bold">
                    {f.formation} {f.isSelected && "★ BEST"}
                  </div>
                  <div className="text-sm mt-0.5">
                    {f.projectedPoints} pts
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* STARTING XI SECTION */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            STARTING XI
          </h2>
          <span className="text-xs font-bold text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-full border border-neutral-200 dark:border-neutral-700">
            Formation: {predictedFormation}
          </span>
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">
          Visual pitch representation based on form, availability, and optimal tactical shape.
        </p>

        {/* Pitch component */}
        <PitchView
          formation={predictedFormation}
          startingXI={startingXI}
        />
      </div>

      {/* FINAL 15 PLAYERS BREAKDOWN */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm mb-8 divide-y divide-neutral-200 dark:divide-neutral-800">
        <div className="pb-4">
          <h2 className="text-xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            THE FINAL 15 SQUAD
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
            Exactly 2 Goalkeepers, 5 Defenders, 5 Midfielders, 3 Forwards.
          </p>
        </div>

        {/* GOALKEEPERS — 2 */}
        <div className="py-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
              GOALKEEPERS — 2
            </h3>
            <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-500">
              {final15.goalkeepers.length} Selected
            </span>
          </div>
          <div className="space-y-1">
            {final15.goalkeepers.map((p, idx) => renderPlayerRow(p, idx + 1, "gk"))}
          </div>
        </div>

        {/* DEFENDERS — 5 */}
        <div className="py-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
              DEFENDERS — 5
            </h3>
            <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-500">
              {final15.defenders.length} Selected
            </span>
          </div>
          <div className="space-y-1">
            {final15.defenders.map((p, idx) => renderPlayerRow(p, idx + 1, "def"))}
          </div>
        </div>

        {/* MIDFIELDERS — 5 */}
        <div className="py-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
              MIDFIELDERS — 5
            </h3>
            <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-500">
              {final15.midfielders.length} Selected
            </span>
          </div>
          <div className="space-y-1">
            {final15.midfielders.map((p, idx) => renderPlayerRow(p, idx + 1, "mid"))}
          </div>
        </div>

        {/* FORWARDS — 3 */}
        <div className="py-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
              FORWARDS — 3
            </h3>
            <span className="text-xs font-semibold text-neutral-400 dark:text-neutral-500">
              {final15.forwards.length} Selected
            </span>
          </div>
          <div className="space-y-1">
            {final15.forwards.map((p, idx) => renderPlayerRow(p, idx + 1, "fwd"))}
          </div>
        </div>

        {/* BENCH (4 PLAYERS) */}
        <div className="pt-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              BENCH RESERVES — 4
            </h3>
            <span className="text-xs text-neutral-400 dark:text-neutral-500">
              1 GK + 3 Outfield Substitutes
            </span>
          </div>
          <div className="space-y-1">
            {bench.map((p, idx) => renderPlayerRow(p, idx + 1, "bench"))}
          </div>
        </div>
      </div>

      {/* FIXTURES ACCORDION */}
      {fixtures && fixtures.length > 0 && (
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-5 shadow-sm mb-8">
          <button
            type="button"
            onClick={() => setShowFixtures(!showFixtures)}
            className="flex items-center justify-between w-full text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Upcoming Fixtures Analyzed ({fixtures.length})
            </span>
            {showFixtures ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {showFixtures && (
            <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 space-y-2">
              {fixtures.map((f, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-800/70 border border-neutral-100 dark:border-neutral-800 text-xs gap-1"
                >
                  <div className="font-semibold text-neutral-800 dark:text-neutral-200">
                    {f.homeTeam} <span className="text-neutral-400 dark:text-neutral-500">vs</span> {f.awayTeam}
                  </div>
                  <div className="text-neutral-500 dark:text-neutral-400 flex items-center gap-2">
                    <span>{f.competition}</span>
                    <span>•</span>
                    <span>{f.kickoffDate} {f.kickoffTime}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* DATA TRANSPARENCY SECTION */}
      <div className="bg-neutral-100/70 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 text-xs text-neutral-600 dark:text-neutral-300 space-y-4 mb-8">
        <div className="flex items-center gap-2 text-neutral-900 dark:text-white font-bold uppercase tracking-wider text-xs">
          <Info className="w-4 h-4 text-neutral-700 dark:text-neutral-300" />
          <span>ANALYSIS BASIS</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-neutral-600 dark:text-neutral-300">
          <div>
            <span className="font-semibold text-neutral-800 dark:text-neutral-100">Recent form:</span>{" "}
            {analysisBasis.recentForm}
          </div>
          <div>
            <span className="font-semibold text-neutral-800 dark:text-neutral-100">Lineup:</span>{" "}
            {analysisBasis.lineup}
          </div>
          <div>
            <span className="font-semibold text-neutral-800 dark:text-neutral-100">Fitness:</span>{" "}
            {analysisBasis.fitness}
          </div>
          <div>
            <span className="font-semibold text-neutral-800 dark:text-neutral-100">Fixture:</span>{" "}
            {analysisBasis.fixture}
          </div>
          <div>
            <span className="font-semibold text-neutral-800 dark:text-neutral-100">Prediction:</span>{" "}
            {analysisBasis.predictionModel}
          </div>
          <div>
            <span className="font-semibold text-neutral-800 dark:text-neutral-100">Last data update:</span>{" "}
            {analysisBasis.lastDataUpdate}
          </div>
        </div>

        <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 text-[11px] leading-relaxed flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <span>{disclaimer}</span>
        </div>
      </div>

      {/* Prominent NEW PREDICTION Button */}
      <div className="flex justify-center pb-8">
        <button
          type="button"
          id="new-prediction-btn"
          onClick={onNewPrediction}
          className="px-8 py-3.5 bg-neutral-900 dark:bg-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-base rounded-xl shadow-md hover:shadow-lg transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
        >
          <RotateCcw className="w-4 h-4" />
          <span>NEW PREDICTION</span>
        </button>
      </div>
    </div>
  );
};
