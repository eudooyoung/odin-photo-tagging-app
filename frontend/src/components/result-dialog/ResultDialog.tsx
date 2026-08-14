import { Link, useNavigate, useParams } from "react-router";
import styles from "./ResultDialog.module.css";
import { formatRecord } from "@/lib/formatRecord.ts";
import { useEffect, useState, type SubmitEventHandler } from "react";
import { useCreateGame } from "@/hooks/useCreateGame.ts";
import type { ResultDialogProps } from "@/types/props.types.ts";
import { usePlayer } from "@/hooks/usePlayer.ts";

export const ResultDialog = ({
  game,
  resultDialogRef,
}: ResultDialogProps) => {
  const gameId = useParams().gameId as string;
  const { createGame, createGameError, createGameLoading } =
    useCreateGame();
  const { setPlayer, playerError, playerLoading } = usePlayer(gameId);
  const navigate = useNavigate();
  const [playerInput, setPlayerInput] = useState("");
  const [isPlayerSet, setIsPlayerSet] = useState(game.player !== null);
  const isGameEnded = game.record !== null;
  const record = game.record && formatRecord(game.record);

  const setPlayerHandler: SubmitEventHandler = async (e) => {
    e.preventDefault();
    const success = await setPlayer(playerInput);
    if (success) {
      setIsPlayerSet(true);
    }
  };

  const newGameHandler = async () => {
    const gameId = await createGame();
    if (gameId) {
      resultDialogRef.current?.close();
      navigate(`/games/${gameId}`);
    }
  };

  useEffect(() => {
    if (isGameEnded) {
      resultDialogRef.current?.showModal();
    }
  }, [isGameEnded, resultDialogRef]);

  return (
    <dialog
      ref={resultDialogRef}
      aria-labelledby="result-title"
      onCancel={(e) => e.preventDefault()}
      className={styles.resultDialog}>
      <h2 id="result-title" className={styles.resultTitle}>
        Game result
      </h2>
      <div className={styles.record}>
        Record:{" "}
        {record &&
          `${record.hours}:${record.minutes}:${record.seconds}.${record.milliseconds}`}
      </div>
      <form onSubmit={setPlayerHandler} className={styles.playerForm}>
        {!isPlayerSet && (
          <>
            <label className="visuallyHidden" htmlFor="player">
              player
            </label>
            <input
              type="text"
              name="player"
              id="player"
              value={playerInput}
              onChange={(e) => setPlayerInput(e.target.value)}
              placeholder="Enter player name"
              className={styles.playerInput}
            />
            <button disabled={playerLoading}>Submit</button>
          </>
        )}
        <button onClick={newGameHandler} disabled={createGameLoading}>
          New Game
        </button>
        {playerError && <p className="error">{playerError.message}</p>}
        {createGameError && (
          <p className="error">{createGameError.message}</p>
        )}
      </form>
      <Link className={styles.leaderboardLink} to={"/leaderboard"}>
        See leaderboard
      </Link>
    </dialog>
  );
};
