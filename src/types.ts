export type Position = 'GOALKEEPER' | 'DEFENDER' | 'MIDFIELDER' | 'FORWARD';

export type PlayerStatus = 'STARTING' | 'EXPECTED_STARTER' | 'ROTATION_RISK' | 'UNAVAILABLE';

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
  startingProbability: number; // percentage 0-100
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

export interface SquadPredictionResponse {
  success: boolean;
  isMockData: boolean;
  dataModeLabel: 'LIVE DATA' | 'MOCK DATA';
  inputTeams: string[];
  fixtures: FixtureInfo[];
  predictedFormation: SupportedFormation;
  projectedPoints: number;
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
