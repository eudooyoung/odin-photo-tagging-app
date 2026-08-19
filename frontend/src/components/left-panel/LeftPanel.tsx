import { useDeleteGame } from "@/hooks/useDeleteGame.ts";
import styles from "./LeftPanel.module.css";
import { useNavigate, useParams } from "react-router";
import { useCreateGame } from "@/hooks/useCreateGame.ts";

export const LeftPanel = () => {
  const gameId = useParams().gameId as string;
  const navigate = useNavigate();
  const { deleteGame, deleteGameError, deleteGameLoading } =
    useDeleteGame(gameId);
  const { createGame, createGameError, createGameLoading } =
    useCreateGame();

  const quitGameHandler = async () => {
    const success = await deleteGame();
    if (success) {
      navigate("/");
    }
  };

  const createGameHandler = async () => {
    const success = await deleteGame();
    if (!success) {
      return;
    }
    const gameId = await createGame();
    if (!gameId) {
      return;
    }
    navigate(`/games/${gameId}`);
  };

  return (
    <aside aria-label="game sidebar" className={styles.leftPanel}>
      <div className={styles.manual}>
        <p className={styles.manualItem}>
          Click the image and choose the target you found
        </p>
        <p className={styles.manualItem}>
          Press Space key to drag the image
        </p>
        <p className={styles.manualItem}>
          Press + or - to Zoom in or out
        </p>
      </div>
      <div className={styles.leftPanelButtons}>
        <button
          className={styles.newGameButton}
          onClick={createGameHandler}
          disabled={deleteGameLoading || createGameLoading}>
          New Game
        </button>
        {createGameError && <p>{createGameError.message}</p>}
        <button
          className={styles.quitGameButton}
          onClick={quitGameHandler}
          disabled={deleteGameLoading}>
          Quit Game
        </button>
        {deleteGameError && <p>{deleteGameError.message}</p>}
      </div>
    </aside>
  );
};
