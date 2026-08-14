export type PuzzleBoardProps = {
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
  imageRef: React.RefObject<HTMLImageElement | null>;
  attemptDialogRef: React.RefObject<HTMLDialogElement | null>;
  attemptCoord: { x: number; y: number };
};

export type ResultDialogProps = {
  resultDialogRef: React.RefObject<HTMLDialogElement | null>;
};
