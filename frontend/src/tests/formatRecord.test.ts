import { formatRecord } from "@/lib/formatRecord.ts";
import { describe, expect, it } from "vitest";

describe("record converter", () => {
  it("convert milliseconds", () => {
    expect(formatRecord(0).milliseconds).toBe("000");
    expect(formatRecord(1).milliseconds).toBe("001");
    expect(formatRecord(10).milliseconds).toBe("010");
    expect(formatRecord(100).milliseconds).toBe("100");
  });

  it("convert seconds", () => {
    expect(formatRecord(1_000).seconds).toBe("01");
    expect(formatRecord(10_000).seconds).toBe("10");
    expect(formatRecord(60_000).seconds).toBe("00");
    expect(formatRecord(61_000).seconds).toBe("01");

    expect(formatRecord(1_123).seconds).toBe("01");
    expect(formatRecord(1_123).milliseconds).toBe("123");
    expect(formatRecord(60_123).seconds).toBe("00");
    expect(formatRecord(60_123).milliseconds).toBe("123");
  });

  it("convert minutes", () => {
    expect(formatRecord(60_000).minutes).toBe("01");
    expect(formatRecord(120_000).minutes).toBe("02");
    expect(formatRecord(3_600_000).minutes).toBe("00");
    expect(formatRecord(3_660_000).minutes).toBe("01");

    expect(formatRecord(3_661_234).minutes).toBe("01");
    expect(formatRecord(3_661_234).seconds).toBe("01");
    expect(formatRecord(3_661_234).milliseconds).toBe("234");
  });

  it("convert hours", () => {
    expect(formatRecord(3_600_000).hours).toBe("01");
    expect(formatRecord(7_200_000).hours).toBe("02");

    expect(formatRecord(13_358_792).hours).toBe("03");
    expect(formatRecord(13_358_792).minutes).toBe("42");
    expect(formatRecord(13_358_792).seconds).toBe("38");
    expect(formatRecord(13_358_792).milliseconds).toBe("792");
  });
});
