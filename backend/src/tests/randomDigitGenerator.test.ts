import { randomDigitsGenerator } from "@/lib/randomDigitGenerater.js";
import { describe, expect, it } from "vitest";

describe("random digit generator", () => {
  it("return 5 length array", () => {
    const result = randomDigitsGenerator();
    expect(result.length).toBe(5);
  });

  it("generate randin digits without duplicate", () => {
    const result = randomDigitsGenerator();
    expect(result.filter((digit) => digit === result.at(0))).toHaveLength(1);
  });
});
