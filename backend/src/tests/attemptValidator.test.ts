import { attemptValidator } from "@/lib/attemptValidator.js";
import { describe, expect, it } from "vitest";

describe("attemptValidator", () => {
  it("return true when an attempt is valid", () => {
    const mockAttempt = { targetId: 1, x: 25, y: 25 };
    const mockTargets = [
      {
        id: 1,
        name: "target1",
        x: 0,
        y: 0,
        width: 50,
        height: 50,
        isFound: false,
      },
    ];
    const result = attemptValidator(mockAttempt, mockTargets);
    expect(result).toBe(true);
  });

  it("return false when an attempt is invalid", () => {
    const mockAttempt = { targetId: 1, x: 75, y: 75 };
    const mockTargets = [
      {
        id: 1,
        name: "target1",
        x: 0,
        y: 0,
        width: 50,
        height: 50,
        isFound: false,
      },
    ];
    const result = attemptValidator(mockAttempt, mockTargets);
    expect(result).toBe(false);
  });
});
