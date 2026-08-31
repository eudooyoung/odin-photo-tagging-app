import type { RightPanelProps } from "@/types/props.types.ts";
import styles from "./RightPanel.module.css";
import { useTranslation } from "react-i18next";

export const RightPanel = ({
  game,
  onClickZoomIn,
  onClickZoomOut,
}: RightPanelProps) => {
  const { t, i18n } = useTranslation();

  return (
    <div className={styles.rightPanel}>
      <ul className={styles.targetList}>
        {game.targets.map((target) => (
          <li
            className={`${styles.targetListItem}  ${target.isFound ? styles.found : ""}`}
            key={target.id}>
            {i18n.resolvedLanguage === "ko" ? target.nameKo : target.name}
          </li>
        ))}
      </ul>
      <div className={styles.rightPanelButtons}>
        <button onClick={onClickZoomIn} className={styles.zoomInButton}>
          {t("game.zoomIn")}
        </button>
        <button onClick={onClickZoomOut} className={styles.zoomOutButton}>
          {t("game.zoomOut")}
        </button>
      </div>
    </div>
  );
};
