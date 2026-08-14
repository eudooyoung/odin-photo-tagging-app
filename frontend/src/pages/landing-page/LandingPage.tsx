import { Link, useNavigate } from "react-router";
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
          <h1 className={styles.heroTitle}>Find Geeks</h1>
          <button
            className={styles.heroButton}
            onClick={startButtonHandler}
            disabled={createGameLoading}>
            Start
          </button>
          <p className={styles.heroError}>
            {createGameError && createGameError.message}
          </p>
          <Link className={styles.heroLink} to={"/leaderboard"}>
            See Leaderboard
          </Link>
        </div>
      </div>
    </section>
  );
};
