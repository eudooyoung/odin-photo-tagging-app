import { env } from "@/lib/env.ts";
import type { Leaderboard } from "@/types/game.types.ts";
import { useEffect, useState } from "react";

export const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<Leaderboard | null>(
    null,
  );
  const [leaderboardError, setLeaderboardError] = useState<Error | null>(
    null,
  );
  const [leaderboardLoading, setLeaderboardLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    void (async () => {
      try {
        const response = await fetch(`${env.apiBaseURL}/leaderboard`);

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const { leaderboard } = await response.json();
        setLeaderboard(leaderboard);
      } catch (error) {
        if (signal.aborted) {
          return;
        }
        if (error instanceof Error) {
          setLeaderboardError(error);
        }
      } finally {
        if (!signal.aborted) {
          setLeaderboardLoading(false);
        }
      }
    })();

    return () => {
      abortController.abort();
    };
  }, []);

  return { leaderboard, leaderboardError, leaderboardLoading };
};
