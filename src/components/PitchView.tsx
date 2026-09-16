import React from "react";
import { PlayerPrediction, SupportedFormation } from "../types";
import { Shield, Sparkles } from "lucide-react";

interface PitchViewProps {
  formation: SupportedFormation;
  startingXI: PlayerPrediction[];
}

export const PitchView: React.FC<PitchViewProps> = ({ formation, startingXI }) => {
  // Separate players into lines: GK, DEFs, MIDs, FWDs
  const gk = startingXI.filter(p => p.position === 'GOALKEEPER');
  const defs = startingXI.filter(p => p.position === 'DEFENDER');
  const mids = startingXI.filter(p => p.position === 'MIDFIELDER');
  const fwds = startingXI.filter(p => p.position === 'FORWARD');

  return (
    <div id="football-pitch-container" className="w-full max-w-2xl mx-auto my-6">
      {/* Pitch frame */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-b from-emerald-800 via-emerald-700 to-emerald-800 border-4 border-emerald-900/40 shadow-2xl p-4 sm:p-6 text-white select-none">
        {/* Pitch markings */}
        <div className="absolute inset-0 pointer-events-none opacity-25">
          {/* Pitch boundary */}
          <div className="absolute inset-3 border-2 border-white/60 rounded-lg"></div>
          {/* Halfway line */}
          <div className="absolute top-1/2 left-3 right-3 h-0.5 bg-white/60"></div>
          {/* Center circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 border-2 border-white/60 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/70 rounded-full"></div>
          {/* Top penalty area (Opponent/Attack end) */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-48 h-20 border-2 border-t-0 border-white/60"></div>
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-8 border-2 border-t-0 border-white/60"></div>
          {/* Bottom penalty area (GK end) */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-48 h-20 border-2 border-b-0 border-white/60"></div>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-24 h-8 border-2 border-b-0 border-white/60"></div>
        </div>

        {/* Pitch header label */}
        <div className="relative z-10 flex justify-between items-center mb-6 px-2">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-semibold tracking-wider bg-emerald-950/70 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-500/30">
              Starting XI
            </span>
            <span className="text-sm font-bold text-white tracking-wide">
              {formation}
            </span>
          </div>
          <span className="text-xs text-emerald-200/80 font-medium">
            CmionPredicts Pitch
          </span>
        </div>

        {/* Tactical rows on pitch */}
        <div className="relative z-10 flex flex-col justify-between space-y-6 sm:space-y-8 min-h-[460px] py-2">
          {/* FORWARDS ROW (Top) */}
          <div className="flex justify-around items-center px-4">
            {fwds.map((player) => (
              <PlayerPitchPin key={player.id} player={player} />
            ))}
          </div>

          {/* MIDFIELDERS ROW (Middle) */}
          <div className="flex justify-around items-center px-2">
            {mids.map((player) => (
              <PlayerPitchPin key={player.id} player={player} />
            ))}
          </div>

          {/* DEFENDERS ROW */}
          <div className="flex justify-around items-center px-2">
            {defs.map((player) => (
              <PlayerPitchPin key={player.id} player={player} />
            ))}
          </div>

          {/* GOALKEEPER ROW (Bottom) */}
          <div className="flex justify-center items-center">
            {gk.map((player) => (
              <PlayerPitchPin key={player.id} player={player} isGK />
            ))}
          </div>
        </div>

        {/* Goal line label */}
        <div className="relative z-10 text-center mt-3">
          <span className="text-[10px] uppercase font-bold text-emerald-300/70 tracking-widest">
            Goal Line
          </span>
        </div>
      </div>
    </div>
  );
};

interface PlayerPitchPinProps {
  player: PlayerPrediction;
  isGK?: boolean;
}

const PlayerPitchPin: React.FC<PlayerPitchPinProps> = ({ player, isGK }) => {
  const bd = player.pointBreakdown;

  return (
    <div className="relative flex flex-col items-center group cursor-pointer transition-transform duration-150 hover:scale-105">
      {/* Jersey / Kit badge */}
      <div className="relative">
        <div
          className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm shadow-md border-2 ${
            isGK
              ? "bg-amber-400 text-neutral-900 border-amber-200 shadow-amber-900/30"
              : "bg-white text-neutral-900 border-emerald-300 shadow-black/20"
          }`}
        >
          {player.roleOnPitch || (isGK ? "GK" : player.position.slice(0, 3))}
        </div>

        {/* Captain / Vice Captain Badge */}
        {player.isCaptain && (
          <span
            title="Captain (2x Multiplier)"
            className="absolute -top-1.5 -right-2 bg-amber-500 text-neutral-950 font-extrabold text-[10px] px-1.5 py-0.5 rounded-full border border-amber-200 shadow"
          >
            (C)
          </span>
        )}
        {player.isViceCaptain && (
          <span
            title="Vice-Captain"
            className="absolute -top-1.5 -right-3 bg-neutral-900 text-amber-300 font-bold text-[9px] px-1.5 py-0.5 rounded-full border border-amber-400/60 shadow"
          >
            (VC)
          </span>
        )}

        {/* Status dot indicator */}
        <span
          className={`absolute -bottom-1 -left-1 w-3 h-3 rounded-full border border-white ${
            player.status === "STARTING"
              ? "bg-emerald-400"
              : player.status === "EXPECTED_STARTER"
              ? "bg-amber-400"
              : player.status === "ROTATION_RISK"
              ? "bg-orange-500"
              : "bg-red-500"
          }`}
          title={player.statusText}
        />
      </div>

      {/* Name and club label */}
      <div className="mt-1 text-center max-w-[84px] sm:max-w-[104px]">
        <p className="text-[11px] sm:text-xs font-bold leading-tight truncate px-1 py-0.5 bg-black/70 rounded backdrop-blur-xs text-white">
          {player.name.split(" ").slice(-1)[0]}
        </p>
        <div className="mt-0.5 flex items-center justify-center gap-1">
          <span className="text-[9px] font-black tracking-tight px-1.5 py-0.2 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-emerald-300 shadow-xs">
            {player.projectedPoints} pts
          </span>
          {player.isCaptain && (
            <span className="text-[8px] font-bold text-amber-300">
              2x
            </span>
          )}
        </div>
      </div>

      {/* Interactive Hover Breakdown Popover */}
      <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col w-48 bg-neutral-900/95 border border-neutral-700 text-white rounded-xl p-2.5 shadow-2xl z-50 pointer-events-none text-left backdrop-blur-md">
        <div className="flex items-center justify-between pb-1.5 border-b border-neutral-700/70">
          <span className="font-bold text-xs truncate text-emerald-300">{player.name}</span>
          <span className="font-mono text-xs font-black text-amber-400">{player.projectedPoints} pts</span>
        </div>
        <div className="mt-1.5 space-y-1 text-[10px] text-neutral-300">
          <div className="flex justify-between">
            <span>Appearance (1 pt):</span>
            <span className="font-mono text-emerald-400">+{bd?.appearance ?? 1}</span>
          </div>
          <div className="flex justify-between">
            <span>60+ Mins on Pitch (2 pts):</span>
            <span className="font-mono text-emerald-400">+{bd?.minutes60Plus ?? 2}</span>
          </div>
          {Boolean(bd?.goals) && (
            <div className="flex justify-between">
              <span>Goals ({player.position === 'FORWARD' ? '4' : player.position === 'MIDFIELDER' ? '5' : '6'} pts/ea):</span>
              <span className="font-mono text-emerald-400">+{bd?.goals}</span>
            </div>
          )}
          {Boolean(bd?.cleanSheet) && (
            <div className="flex justify-between">
              <span>Clean Sheet (6 pts):</span>
              <span className="font-mono text-emerald-400">+{bd?.cleanSheet}</span>
            </div>
          )}
          {Boolean(bd?.assists) && (
            <div className="flex justify-between">
              <span>Assists (3 pts/ea):</span>
              <span className="font-mono text-emerald-400">+{bd?.assists}</span>
            </div>
          )}
          {Boolean(bd?.hatTrickBonus) && (
            <div className="flex justify-between text-amber-300 font-bold">
              <span>Hat-trick Multiplier:</span>
              <span className="font-mono">x1.5</span>
            </div>
          )}
          {player.isCaptain && (
            <div className="flex justify-between text-amber-300 font-bold pt-1 border-t border-neutral-800">
              <span>Captain Multiplier:</span>
              <span className="font-mono">x2.0</span>
            </div>
          )}
        </div>
        <div className="mt-1.5 pt-1 border-t border-neutral-800 text-[9px] text-neutral-400 italic">
          {player.analysisReason}
        </div>
      </div>
    </div>
  );
};
