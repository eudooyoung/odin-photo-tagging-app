import { getAttemptDialogShift } from "@/lib/getAttemptDialogShift";
import { describe, expect, it } from "vitest";

describe("getAttemptDialogShift", () => {
  const dialogWidth = 200;
  const dialogHeight = 150;
  const viewportWidth = 1_000;
  const viewportHeight = 800;
  const viewportMargin = 16;

  const getShift = (left: number, top: number) =>
    getAttemptDialogShift({
      left,
      top,
      dialogWidth,
      dialogHeight,
      viewportWidth,
      viewportHeight,
      viewportMargin,
    });

  it("does not shift a dialog that is inside the viewport margin", () => {
    expect(getShift(100, 100)).toEqual({ shiftX: 0, shiftY: 0 });
  });

  it("shifts right by the minimum amount when the dialog overflows the left edge", () => {
    expect(getShift(5, 100)).toEqual({ shiftX: 11, shiftY: 0 });
  });

  it("shifts left by the minimum amount when the dialog overflows the right edge", () => {
    expect(getShift(800, 100)).toEqual({ shiftX: -16, shiftY: 0 });
  });

  it("shifts down by the minimum amount when the dialog overflows the top edge", () => {
    expect(getShift(100, 6)).toEqual({ shiftX: 0, shiftY: 10 });
  });

  it("shifts up by the minimum amount when the dialog overflows the bottom edge", () => {
    expect(getShift(100, 650)).toEqual({ shiftX: 0, shiftY: -16 });
  });

  it("shifts both axes independently when the dialog overflows at a corner", () => {
    expect(getShift(-10, 760)).toEqual({ shiftX: 26, shiftY: -126 });
  });

  it("does not shift a dialog that exactly meets the viewport margin", () => {
    expect(getShift(16, 16)).toEqual({ shiftX: 0, shiftY: 0 });
    expect(getShift(784, 634)).toEqual({ shiftX: 0, shiftY: 0 });
  });
});
