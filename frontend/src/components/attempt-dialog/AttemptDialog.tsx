import { useParams } from "react-router";
import styles from "./AttemptDialog.module.css";
import type { AttemptDialogProps } from "@/types/props.types.ts";
import { useAttempt } from "@/hooks/useAttempt.ts";
import type { MouseEventHandler } from "react";
import { useTranslation } from "react-i18next";

export const AttemptDialog = ({
  game,
  refetchGame,
  imageRef,
  attemptDialogRef,
  attemptCoord,
  onAttemptDialogClose,
}: AttemptDialogProps) => {
  const { i18n } = useTranslation();
  const gameId = useParams().gameId as string;
  const { createAttempt, attemptError, attemptLoading } =
    useAttempt(gameId);

  const createAttemptHandler = (targetId: number) => async () => {
    if (!imageRef.current) {
      return;
    }

    const { x, y } = attemptCoord;
    const { isAttemptValid } = await createAttempt({ targetId, x, y });
    if (isAttemptValid) {
      await refetchGame();
    }

    attemptDialogRef.current?.close();
  };

  const closeDialogHandler: MouseEventHandler<HTMLDialogElement> = (
    e,
  ) => {
    if (e.target === e.currentTarget) {
      e.currentTarget.close();
    }
  };

  return (
    <dialog
      ref={attemptDialogRef}
      closedby="any"
      className={styles.attemptDialog}
      onClose={onAttemptDialogClose}
      onClick={closeDialogHandler}>
      <p className={styles.error}>
        {attemptError && attemptError.message}
      </p>
      <ul className={styles.targetList}>
        {game.targets
          .filter((target) => !target.isFound)
          .map((target) => (
            <li className={styles.targetListItem} key={target.id}>
              <button
                onClick={createAttemptHandler(target.id)}
                disabled={attemptLoading}
                className={styles.targetAttemptButton}>
                {i18n.resolvedLanguage === "ko"
                  ? target.nameKo
                  : target.name}
              </button>
            </li>
          ))}
      </ul>
    </dialog>
  );
};
