import { env } from "@/lib/env.ts";
import type { Game } from "@/types/game.types.ts";
import { useEffect, useState } from "react";

export const useGame = (id: string) => {
  const [game, setGame] = useState<Game | null>(null);
  const [gameError, setGameError] = useState<Error | null>(null);
  const [gameLoading, setGameLoading] = useState(true);

  const fetchGame = async (signal?: AbortSignal) => {
    const response = await fetch(`${env.apiBaseURL}/games/${id}`, {
      method: "GET",
      signal,
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    return await response.json();
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    void (async () => {
      try {
        const { game } = await fetchGame(signal);
        setGame(game);
      } catch (error) {
        if (signal.aborted) {
          return;
        }
        if (error instanceof Error) {
          setGameError(error);
        }
      } finally {
        if (!signal.aborted) {
          setGameLoading(false);
        }
      }
    })();

    return () => {
      abortController.abort();
    };
  });

  return { game, gameError, gameLoading };
};
