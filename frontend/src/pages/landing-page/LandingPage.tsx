import { NavLink } from "react-router";
import styles from "./LandingPage.module.css";
import { LeaderBoard } from "@/components/leader-board/LeaderBoard.tsx";

export const LandingPage = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Find Geeks</h1>
          <NavLink to="/game">
            <button>Start</button>
          </NavLink>
          <LeaderBoard />
        </div>
      </div>
    </section>
  );
};
