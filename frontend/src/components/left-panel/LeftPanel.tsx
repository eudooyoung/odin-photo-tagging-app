import styles from "./LeftPanel.module.css";

export const LeftPanel = () => {
  return (
    <div className={styles.leftPanel}>
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
        <button className={styles.newGameButton}>New Game</button>
        <button className={styles.quitGameButton}>Quit Game</button>
      </div>
    </div>
  );
};
