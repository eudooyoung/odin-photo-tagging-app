import { useRef, useState } from "react";
import styles from "./GamePage.module.css";
import { PuzzleBoard } from "@/components/puzzle-board/PuzzleBoard";
import { AttemptDialog } from "@/components/attempt-dialog/AttemptDialog.tsx";
import { ResultDialog } from "@/components/result-dialog/ResultDialog.tsx";
import { useGame } from "@/hooks/useGame.ts";
import { useParams } from "react-router";
import { useTranslation } from "react-i18next";

export const GamePage = () => {
  const { t } = useTranslation();
  const gameId = useParams().gameId as string;
  const { game, gameError, gameLoading, refetchGame } = useGame(gameId);
  const [attemptCoord, setAttemptCoord] = useState({
    x: -1,
    y: -1,
  });
  const [isAttemptDialogOpen, setIsAttemptDialogOpen] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const attemptDialogRef = useRef<HTMLDialogElement | null>(null);
  const resultDialogRef = useRef<HTMLDialogElement | null>(null);

  if (!game && gameLoading) {
    return <main className={styles.main}>{t("game.loading")}</main>;
  }

  if (!game) {
    return (
      <main className={styles.main}>
        <p className={styles.error}>game not found</p>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <h2 className="visuallyHidden">{t("game.pageTitle")}</h2>
      <p className="error">{gameError && gameError.message}</p>
      <PuzzleBoard
        game={game}
        imageRef={imageRef}
        attemptDialogRef={attemptDialogRef}
        attemptCoord={attemptCoord}
        isAttemptDialogOpen={isAttemptDialogOpen}
        setAttemptCoord={setAttemptCoord}
        onAttemptDialogOpen={() => setIsAttemptDialogOpen(true)}
      />
      <AttemptDialog
        game={game}
        refetchGame={refetchGame}
        imageRef={imageRef}
        attemptDialogRef={attemptDialogRef}
        attemptCoord={attemptCoord}
        onAttemptDialogClose={() => setIsAttemptDialogOpen(false)}
      />
      <ResultDialog game={game} resultDialogRef={resultDialogRef} />
    </main>
  );
};
