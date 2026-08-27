import type {
  AttemptDialogPlacement,
  AttemptDialogPlacementParams,
} from "@/types/attempt-dialog.types.ts";

export const getAttemptDialogPlacement = ({
  clickX,
  clickY,
  viewportWidth,
  viewportHeight,
  dialogWidth,
  dialogHeight,
  gap,
}: AttemptDialogPlacementParams): AttemptDialogPlacement => {
  const verticalDirection =
    clickY + gap + dialogHeight <= viewportHeight ? "bottom" : "top";
  const horizontalDirection =
    clickX + gap + dialogWidth <= viewportWidth ? "right" : "left";

  return `${verticalDirection}-${horizontalDirection}`;
};
