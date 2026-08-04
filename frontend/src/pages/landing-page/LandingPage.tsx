import { useNavigate } from "react-router";
import styles from "./LandingPage.module.css";
import { useCreateGame } from "@/hooks/useCreateGame.ts";

export const LandingPage = () => {
  const { createGame, createGameError, createGameLoading } =
    useCreateGame();
  const navigate = useNavigate();

  const startButtonHandler = async () => {
    const gameId = await createGame();
    if (gameId) {
      navigate(`/games/${gameId}`);
    }
  };

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Find Geeks</h1>
          <button
            onClick={startButtonHandler}
            disabled={createGameLoading}>
            Start
          </button>
          {createGameError && createGameError.message}
        </div>
      </div>
    </section>
  );
};
