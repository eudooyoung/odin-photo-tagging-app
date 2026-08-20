import type { RightPanelProps } from "@/types/props.types.ts";
import styles from "./RightPanel.module.css";

export const RightPanel = ({
  game,
  onClickZoomIn,
  onClickZoomOut,
}: RightPanelProps) => {
  return (
    <div className={styles.rightPanel}>
      <ul className={styles.targetList}>
        {game.targets.map((target) => (
          <li
            className={`${styles.targetListItem}  ${target.isFound ? styles.found : ""}`}
            key={target.id}>
            {target.name}
          </li>
        ))}
      </ul>
      <div className={styles.rightPanelButtons}>
        <button onClick={onClickZoomIn} className={styles.zoomInButton}>
          Zoom in
        </button>
        <button onClick={onClickZoomOut} className={styles.zoomOutButton}>
          Zoom out
        </button>
      </div>
    </div>
  );
};
