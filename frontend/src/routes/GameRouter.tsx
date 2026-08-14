import { useAttempt } from "@/hooks/useAttempt.ts";
import { useGame } from "@/hooks/useGame.ts";
import { usePlayer } from "@/hooks/usePlayer.ts";
import { Outlet, useParams } from "react-router";

export const GameRouter = () => {
  const gameId = useParams().gameId as string;
  const { game, gameError, gameLoading, refetchGame } = useGame(gameId);
  const { createAttempt, attemptError, attemptLoading } =
    useAttempt(gameId);
  const { setPlayer, playerError, playerLoading } = usePlayer(gameId);

  if (!game && gameLoading) {
    return <>game loading...</>;
  }

  if (!game) {
    return <>game not found</>;
  }

  return (
    <Outlet
      context={{
        game,
        gameError,
        refetchGame,
        createAttempt,
        attemptError,
        attemptLoading,
        setPlayer,
        playerError,
        playerLoading,
      }}
    />
  );
};
