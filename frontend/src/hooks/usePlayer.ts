import { env } from "@/lib/env.ts";
import { useState } from "react";

export const usePlayer = (gameId: string) => {
  const [playerError, setPlayerError] = useState<Error | null>(null);
  const [playerLoading, setPlayerLoading] = useState(false);

  const setPlayer = async (player: string) => {
    setPlayerLoading(true);
    setPlayerError(null);
    try {
      const response = await fetch(`${env.apiBaseURL}/${gameId}/player`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ player }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      return true;
    } catch (error) {
      if (error instanceof Error) {
        setPlayerError(error);
      }
    } finally {
      setPlayerLoading(false);
    }
  };

  return { setPlayer, playerError, playerLoading };
};
