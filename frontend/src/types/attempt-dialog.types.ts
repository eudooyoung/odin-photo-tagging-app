export type AttemptDialogPlacement =
  | "bottom-right"
  | "bottom-left"
  | "top-right"
  | "top-left";

export type AttemptDialogPlacementParams = {
  clickX: number;
  clickY: number;
  viewportWidth: number;
  viewportHeight: number;
  dialogWidth: number;
  dialogHeight: number;
  gap: number;
};

export type AttemptDialogPositionParams = {
  clickX: number;
  clickY: number;
  dialogWidth: number;
  dialogHeight: number;
  gap: number;
  placement: AttemptDialogPlacement;
};

export type AttemptDialogPosition = {
  left: number;
  top: number;
};

export type AttemptDialogShiftParams = AttemptDialogPosition & {
  dialogWidth: number;
  dialogHeight: number;
  viewportWidth: number;
  viewportHeight: number;
  viewportMargin: number;
};

export type AttemptDialogShift = {
  shiftX: number;
  shiftY: number;
};
