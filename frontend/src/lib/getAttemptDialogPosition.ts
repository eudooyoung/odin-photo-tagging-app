import type {
  AttemptDialogPosition,
  AttemptDialogPositionParams,
} from "@/types/attempt-dialog.types.ts";

export const getAttemptDialogPosition = ({
  clickX,
  clickY,
  dialogWidth,
  dialogHeight,
  gap,
  placement,
}: AttemptDialogPositionParams): AttemptDialogPosition => {
  const left = placement.endsWith("right")
    ? clickX + gap
    : clickX - gap - dialogWidth;
  const top = placement.startsWith("bottom")
    ? clickY + gap
    : clickY - gap - dialogHeight;

  return { left, top };
};
