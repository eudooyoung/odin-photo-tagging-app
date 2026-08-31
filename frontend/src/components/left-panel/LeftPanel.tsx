import { useDeleteGame } from "@/hooks/useDeleteGame.ts";
import styles from "./LeftPanel.module.css";
import { useNavigate, useParams } from "react-router";
import { useCreateGame } from "@/hooks/useCreateGame.ts";
import { useTranslation } from "react-i18next";

export const LeftPanel = () => {
  const { t } = useTranslation();
  const gameId = useParams().gameId as string;
  const navigate = useNavigate();
  const { deleteGame, deleteGameError, deleteGameLoading } =
    useDeleteGame(gameId);
  const { createGame, createGameError, createGameLoading } =
    useCreateGame();
  const actionError = deleteGameError ?? createGameError;

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
    <aside aria-label={t("game.sidebarLabel")} className={styles.leftPanel}>
      <div className={styles.manual}>
        <p className={styles.manualItem}>
          {t("game.instructions.selectTarget")}
        </p>
        <p className={styles.manualItem}>
          {t("game.instructions.dragImage")}
        </p>
        <p className={styles.manualItem}>
          {t("game.instructions.zoomImage")}
        </p>
      </div>
      <div className={styles.buttonContainer}>
        <div className={styles.buttonWrapper}>
          <button
            className={`${styles.button} ${styles.newGame}`}
            onClick={createGameHandler}
            disabled={deleteGameLoading || createGameLoading}>
            {t("common.newGame")}
          </button>
          <button
            className={`${styles.button} ${styles.quitGame}`}
            onClick={quitGameHandler}
            disabled={deleteGameLoading}>
            {t("game.quit")}
          </button>
        </div>
        <p className={styles.error}>
          {actionError && actionError.message}
        </p>
      </div>
    </aside>
  );
};
