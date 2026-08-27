import { getAttemptDialogPosition } from "@/lib/getAttemptDialogPosition";
import { describe, expect, it } from "vitest";

describe("getAttemptDialogPosition", () => {
  const clickX = 400;
  const clickY = 300;
  const dialogWidth = 200;
  const dialogHeight = 150;
  const gap = 12;

  it("positions the dialog at the bottom-right of the click", () => {
    expect(
      getAttemptDialogPosition({
        clickX,
        clickY,
        dialogWidth,
        dialogHeight,
        gap,
        placement: "bottom-right",
      }),
    ).toEqual({ left: 412, top: 312 });
  });

  it("positions the dialog at the bottom-left of the click", () => {
    expect(
      getAttemptDialogPosition({
        clickX,
        clickY,
        dialogWidth,
        dialogHeight,
        gap,
        placement: "bottom-left",
      }),
    ).toEqual({ left: 188, top: 312 });
  });

  it("positions the dialog at the top-right of the click", () => {
    expect(
      getAttemptDialogPosition({
        clickX,
        clickY,
        dialogWidth,
        dialogHeight,
        gap,
        placement: "top-right",
      }),
    ).toEqual({ left: 412, top: 138 });
  });

  it("positions the dialog at the top-left of the click", () => {
    expect(
      getAttemptDialogPosition({
        clickX,
        clickY,
        dialogWidth,
        dialogHeight,
        gap,
        placement: "top-left",
      }),
    ).toEqual({ left: 188, top: 138 });
  });
});
