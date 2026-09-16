export type Position = 'GOALKEEPER' | 'DEFENDER' | 'MIDFIELDER' | 'FORWARD';

export type PlayerStatus = 'STARTING' | 'EXPECTED_STARTER' | 'ROTATION_RISK' | 'UNAVAILABLE';

export interface FantasyPointBreakdown {
  appearance: number;        // 1 pt for appearance
  minutes60Plus: number;     // 2 pts for 60+ mins on pitch
  goals: number;             // Goal points: GK=6, DEF=6, MID=5, FWD=4
  assists: number;           // Assist points: 3 pts each
  cleanSheet: number;        // Clean sheet: GK=6, DEF=6, MID=0, FWD=0
  hatTrickBonus: number;     // Hat-trick multiplier x1.5 bonus
  basePoints: number;        // Subtotal before captaincy
  captainMultiplier: number; // 2.0 if Captain, 1.0 otherwise
  totalPoints: number;       // Final calculated fantasy points
}

export interface PlayerStatsSummary {
  matchesAnalyzed: number;
  avgRating: number;
  minutesPlayedAvg: number;
  goals: number;
  assists: number;
  chancesCreated: number;
  cleanSheets?: number;
  saves?: number;
  xG?: number;
  xA?: number;
  recentRatings: number[];
}

export interface PlayerPrediction {
  id: string;
  name: string;
  club: string;
  countryOrLeague: string;
  position: Position;
  status: PlayerStatus;
  statusText: string;
  formRating: number; // e.g., 8.4
  projectedPoints: number; // calculated projected fantasy points for this player
  pointBreakdown?: FantasyPointBreakdown;
  projectedMinutes?: number;
  projectedGoals?: number;
  projectedAssists?: number;
  projectedCleanSheet?: boolean;
  projectedHatTrick?: boolean;
  startingProbability: number; // percentage 0-100 (guardrail: >=90% for starting 11)
  fitnessStatus: string;
  upcomingMatch: {
    opponent: string;
    isHome: boolean;
    competition: string;
    kickoffDate?: string;
    kickoffTime?: string;
    difficulty: number; // 1-5
  };
  stats: PlayerStatsSummary;
  isCaptain?: boolean;
  isViceCaptain?: boolean;
  roleOnPitch?: string; // e.g. 'GK', 'CB', 'LB', 'RB', 'CM', 'CAM', 'LW', 'RW', 'ST'
  analysisReason: string;
}

export type SupportedFormation = '4-4-2' | '3-5-2' | '4-3-3' | '3-4-3' | '5-3-2' | '4-5-1';

export interface FormationAnalysis {
  formation: SupportedFormation;
  projectedPoints: number;
  isSelected: boolean;
  lineupStructure: {
    defenders: number;
    midfielders: number;
    forwards: number;
  };
}

export interface FixtureInfo {
  homeTeam: string;
  awayTeam: string;
  competition: string;
  kickoffDate: string;
  kickoffTime: string;
  status: string;
  isLiveOrConfirmed: boolean;
}

export interface UpcomingMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeLogo?: string;
  awayLogo?: string;
  homeScore?: string;
  awayScore?: string;
  league: string;
  country: string;
  countryCode?: string;
  region: 'England' | 'Spain' | 'Italy' | 'Brazil' | 'South America' | 'Asia' | 'Netherlands' | 'Poland' | 'Scotland' | 'Germany' | 'France' | 'Other';
  kickoffDate: string;
  kickoffTime: string; // e.g. "19:45"
  timeFormatted: string; // e.g. "7:45pm"
  versusLabel: string; // e.g. "West Ham United vrs Fulham - 7:45pm"
  status: string; // e.g. "Scheduled" | "Live" | "Upcoming"
  stadium?: string;
  rawKickoffUtc?: string;
  source?: string;
}

export interface UpcomingMatchesResponse {
  success: boolean;
  date: string;
  startTime: string;
  endTime: string;
  totalFound: number;
  filteredCount: number;
  matches: UpcomingMatch[];
  suggestedMatches?: UpcomingMatch[];
  isAiGenerated?: boolean;
  source?: string;
}

export interface ScoringGuardrails {
  starting11Rule: string;
  targetPoints: number;
  scoringMatrix: {
    appearance: number; // 1 pt
    minutes60Plus: number; // 2 pts
    goals: { GK: number; DEF: number; MID: number; FWD: number }; // GK:6, DEF:6, MID:5, FWD:4
    cleanSheets: { GK: number; DEF: number; MID: number; FWD: number }; // GK:6, DEF:6, MID:0, FWD:0
    assists: number; // 3 pts
    hatTrickMultiplier: number; // x1.5
    captainMultiplier: number; // x2.0
  };
  mindset: string;
}

export interface SquadPredictionResponse {
  success: boolean;
  isMockData: boolean;
  dataModeLabel: 'LIVE DATA' | 'MOCK DATA';
  inputTeams: string[];
  fixtures: FixtureInfo[];
  predictedFormation: SupportedFormation;
  projectedPoints: number;
  scoringGuardrails?: ScoringGuardrails;
  captain: PlayerPrediction;
  viceCaptain: PlayerPrediction;
  final15: {
    goalkeepers: PlayerPrediction[]; // exactly 2
    defenders: PlayerPrediction[];   // exactly 5
    midfielders: PlayerPrediction[]; // exactly 5
    forwards: PlayerPrediction[];    // exactly 3
  };
  startingXI: PlayerPrediction[];    // exactly 11 (1 GK, rest outfield)
  bench: PlayerPrediction[];         // exactly 4 (1 GK, 3 outfield)
  formationsTested: FormationAnalysis[];
  analysisBasis: {
    recentForm: string;
    lineup: string;
    fitness: string;
    fixture: string;
    predictionModel: string;
    lastDataUpdate: string;
  };
  disclaimer: string;
}
