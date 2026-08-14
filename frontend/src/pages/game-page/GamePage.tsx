import { useRef, useState } from "react";
import styles from "./GamePage.module.css";
import { PuzzleBoard } from "@/components/puzzle-board/PuzzleBoard";
import { AttemptDialog } from "@/components/attempt-dialog/AttemptDialog.tsx";
import { ResultDialog } from "@/components/result-dialog/ResultDialog.tsx";

export const GamePage = () => {
  const [attemptCoord, setAttemptCoord] = useState({
    x: -1,
    y: -1,
  });
  const imageRef = useRef<HTMLImageElement | null>(null);
  const attemptDialogRef = useRef<HTMLDialogElement | null>(null);
  const resultDialogRef = useRef<HTMLDialogElement | null>(null);

  return (
    <main className={styles.main}>
      <h2 className="visuallyHidden">Game Page</h2>
      <PuzzleBoard
        imageRef={imageRef}
        attemptDialogRef={attemptDialogRef}
        setAttemptCoord={setAttemptCoord}
      />
      <AttemptDialog
        imageRef={imageRef}
        attemptDialogRef={attemptDialogRef}
        attemptCoord={attemptCoord}
      />
      <ResultDialog resultDialogRef={resultDialogRef} />
    </main>
  );
};
