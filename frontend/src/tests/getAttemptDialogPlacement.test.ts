import { getAttemptDialogPlacement } from "@/lib/getAttemptDialogPlacement";
import { describe, expect, it } from "vitest";

describe("getAttemptDialogPlacement", () => {
  const viewportWidth = 1_000;
  const viewportHeight = 800;
  const dialogWidth = 200;
  const dialogHeight = 150;
  const gap = 12;

  const getPlacement = (clickX: number, clickY: number) =>
    getAttemptDialogPlacement({
      clickX,
      clickY,
      viewportWidth,
      viewportHeight,
      dialogWidth,
      dialogHeight,
      gap,
    });

  it("places the dialog at the bottom-right by default", () => {
    expect(getPlacement(100, 100)).toBe("bottom-right");
  });

  it("flips to the bottom-left when there is not enough space on the right", () => {
    expect(getPlacement(850, 100)).toBe("bottom-left");
  });

  it("flips to the top-right when there is not enough space below", () => {
    expect(getPlacement(100, 700)).toBe("top-right");
  });

  it("flips to the top-left when there is not enough space on the right or below", () => {
    expect(getPlacement(850, 700)).toBe("top-left");
  });

  it("keeps the bottom-right placement when the dialog fits exactly", () => {
    expect(getPlacement(788, 638)).toBe("bottom-right");
  });
});
