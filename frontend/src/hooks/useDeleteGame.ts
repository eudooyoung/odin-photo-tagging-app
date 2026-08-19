import { env } from "@/lib/env.ts";
import { useState } from "react";

export const useDeleteGame = (gameId: string) => {
  const [deleteGameError, setDeleteGameError] = useState<Error | null>(
    null,
  );
  const [deleteGameLoading, setDeleteGameLoading] = useState(false);

  const deleteGame = async () => {
    // initialize error and loading state
    setDeleteGameError(null);
    setDeleteGameLoading(true);

    try {
      // maker server request
      const response = await fetch(`${env.apiBaseURL}/games/${gameId}`, {
        method: "DELETE",
      });
      // handler serverside error
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      // return true to indicate request succeeded
      return true;
    } catch (error) {
      // set error
      if (error instanceof Error) {
        setDeleteGameError(error);
      }
      // return false to indicate request failed
      return false;
    } finally {
      // set loading state as false whether it succeeds or not
      setDeleteGameLoading(false);
    }
  };

  return { deleteGame, deleteGameError, deleteGameLoading };
};
