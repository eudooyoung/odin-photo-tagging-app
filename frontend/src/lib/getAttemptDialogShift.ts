import type {
  AttemptDialogShift,
  AttemptDialogShiftParams,
} from "@/types/attempt-dialog.types.ts";

export const getAttemptDialogShift = ({
  left,
  top,
  dialogWidth,
  dialogHeight,
  viewportWidth,
  viewportHeight,
  viewportMargin,
}: AttemptDialogShiftParams): AttemptDialogShift => {
  let shiftX = 0;
  let shiftY = 0;

  if (left < viewportMargin) {
    shiftX = viewportMargin - left;
  } else if (left + dialogWidth > viewportWidth - viewportMargin) {
    shiftX = viewportWidth - viewportMargin - (left + dialogWidth);
  }

  if (top < viewportMargin) {
    shiftY = viewportMargin - top;
  } else if (top + dialogHeight > viewportHeight - viewportMargin) {
    shiftY = viewportHeight - viewportMargin - (top + dialogHeight);
  }

  return { shiftX, shiftY };
};
