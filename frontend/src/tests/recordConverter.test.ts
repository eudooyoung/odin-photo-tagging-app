import { recordConverter } from "@/lib/recordConverter.ts";
import { describe, expect, it } from "vitest";

describe("record converter", () => {
  it("convert milliseconds", () => {
    expect(recordConverter(0).milliseconds).toBe(0);
    expect(recordConverter(1).milliseconds).toBe(1);
    expect(recordConverter(10).milliseconds).toBe(10);
    expect(recordConverter(100).milliseconds).toBe(100);
  });

  it("convert seconds", () => {
    expect(recordConverter(1_000).seconds).toBe(1);
    expect(recordConverter(10_000).seconds).toBe(10);
    expect(recordConverter(60_000).seconds).toBe(0);
    expect(recordConverter(61_000).seconds).toBe(1);

    expect(recordConverter(1_123).seconds).toBe(1);
    expect(recordConverter(1_123).milliseconds).toBe(123);
    expect(recordConverter(60_123).seconds).toBe(0);
    expect(recordConverter(60_123).milliseconds).toBe(123);
  });

  it("convert minutes", () => {
    expect(recordConverter(60_000).minutes).toBe(1);
    expect(recordConverter(120_000).minutes).toBe(2);
    expect(recordConverter(3_600_000).minutes).toBe(0);
    expect(recordConverter(3_660_000).minutes).toBe(1);

    expect(recordConverter(3_661_234).minutes).toBe(1);
    expect(recordConverter(3_661_234).seconds).toBe(1);
    expect(recordConverter(3_661_234).milliseconds).toBe(234);
  });

  it("convert hours", () => {
    expect(recordConverter(3_600_000).hours).toBe(1);
    expect(recordConverter(7_200_000).hours).toBe(2);

    expect(recordConverter(13_358_792).hours).toBe(3);
    expect(recordConverter(13_358_792).minutes).toBe(42);
    expect(recordConverter(13_358_792).seconds).toBe(38);
    expect(recordConverter(13_358_792).milliseconds).toBe(792);
  });
});
