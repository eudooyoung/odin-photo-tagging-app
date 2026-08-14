import type { Game } from "./game.types.ts";

export type PuzzleBoardProps = {
  game: Game;
  imageRef: React.RefObject<HTMLImageElement | null>;
  attemptDialogRef: React.RefObject<HTMLDialogElement | null>;
  setAttemptCoord: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
    }>
  >;
};

export type AttemptDialogProps = {
  game: Game;
  refetchGame: () => Promise<void>;
  imageRef: React.RefObject<HTMLImageElement | null>;
  attemptDialogRef: React.RefObject<HTMLDialogElement | null>;
  attemptCoord: { x: number; y: number };
};

export type ResultDialogProps = {
  game: Game;
  resultDialogRef: React.RefObject<HTMLDialogElement | null>;
};
