export type Game = {
  id: string;
  player: string | null;
  createdAt: Date;
  finishedAt: Date | null;
  record: number | null;

  targets: {
    name: string;
    id: number;
    isFound: boolean;
  }[];
};

export type AttemptRequest = {
  targetId: number;
  x: number;
  y: number;
};

export type AttemptResponse = {
  isAttemptValid: boolean;
  targetId?: number;
};

export type Leaderboard = LeaderboardEntry[];

export type LeaderboardEntry = {
  rank: number;
  player: string;
  record: number;
};
