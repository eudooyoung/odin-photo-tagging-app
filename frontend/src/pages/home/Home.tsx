import styles from "./Home.module.css";

export const Home = () => {
  return (
    <main className={styles.home}>
      <h2>Home</h2>
      <div className={styles.imageWrapper}>
        <button>Start</button>
      </div>
    </main>
  );
};
