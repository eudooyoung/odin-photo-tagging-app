import { env } from "@/lib/env.ts";
import type { AttemptRequest } from "@/types/game.types.ts";
import { useState } from "react";

export const useAttempt = (gameId: string) => {
  const [attemptError, setAttemptError] = useState<Error | null>(null);
  const [attemptLoading, setAttemptLoading] = useState(false);

  const createAttempt = async (attempt: AttemptRequest) => {
    setAttemptError(null);
    setAttemptLoading(true);
    try {
      const response = await fetch(
        `${env.apiBaseURL}/games/${gameId}/attempts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(attempt),
        },
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        setAttemptError(error);
      }
    } finally {
      setAttemptLoading(false);
    }
  };

  return { createAttempt, attemptError, attemptLoading };
};
