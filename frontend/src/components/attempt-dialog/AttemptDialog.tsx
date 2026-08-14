import { useParams } from "react-router";
import styles from "./AttemptDialog.module.css";
import type { AttemptDialogProps } from "@/types/props.types.ts";
import { useAttempt } from "@/hooks/useAttempt.ts";

export const AttemptDialog = ({
  game,
  refetchGame,
  imageRef,
  attemptDialogRef,
  attemptCoord,
}: AttemptDialogProps) => {
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

  return (
    <dialog
      ref={attemptDialogRef}
      closedby="any"
      className={styles.attemptDialog}>
      <ul className={styles.targetList}>
        {game.targets.map((target) => (
          <li className={styles.targetListItem} key={target.id}>
            <button
              onClick={createAttemptHandler(target.id)}
              disabled={attemptLoading || target.isFound}
              className={`${styles.targetAttemptButton} ${target.isFound ? styles.found : ""}`}>
              {target.name}
            </button>
            {attemptError && <>{attemptError.message}</>}
          </li>
        ))}
      </ul>
    </dialog>
  );
};
