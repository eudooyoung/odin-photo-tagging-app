import { env } from "@/lib/env.ts";
import { useState } from "react";

export const useCreateGame = () => {
  const [createGameError, setCreateGameError] = useState<Error | null>(
    null,
  );
  const [createGameLoading, setCreateGameLoading] = useState(false);

  const createGame = async () => {
    setCreateGameError(null);
    setCreateGameLoading(true);
    try {
      const response = await fetch(`${env.apiBaseURL}/games`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const { publicId: gameId } = await response.json();
      return gameId;
    } catch (error) {
      if (error instanceof Error) {
        setCreateGameError(error);
      }
    } finally {
      setCreateGameLoading(false);
    }
  };
  return { createGame, createGameError, createGameLoading };
};
