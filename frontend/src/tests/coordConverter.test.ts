import { coordConverter } from "@/lib/coordConverter.ts";
import type { MouseEvent } from "react";
import { describe, expect, it, vi } from "vitest";

const originalX = 50;
const originalY = 50;
const image = document.createElement("img");
Object.defineProperties(image, {
  naturalWidth: { value: 500 },
  naturalHeight: { value: 500 },
});

describe("coordConverter", () => {
  it("return original coordinate when image not scaled", () => {
    const event = {
      clientX: 50,
      clientY: 50,
    } as MouseEvent;
    vi.spyOn(image, "getBoundingClientRect").mockReturnValue({
      left: 0,
      top: 0,
      width: 500,
      height: 500,
    } as DOMRect);

    const { x, y } = coordConverter(event, image);
    expect(x).toBe(originalX);
    expect(y).toBe(originalY);
  });

  it("return original coordinate when image scaled", () => {
    const event = {
      clientX: 25,
      clientY: 25,
    } as MouseEvent;
    vi.spyOn(image, "getBoundingClientRect").mockReturnValue({
      left: 0,
      top: 0,
      width: 250,
      height: 250,
    } as DOMRect);

    const { x, y } = coordConverter(event, image);
    expect(x).toBe(originalX);
    expect(y).toBe(originalY);
  });

  it("return original coordinate when image scaled and offset", () => {
    const event = {
      clientX: 30,
      clientY: 30,
    } as MouseEvent;

    vi.spyOn(image, "getBoundingClientRect").mockReturnValue({
      left: 5,
      top: 5,
      width: 250,
      height: 250,
    } as DOMRect);

    const { x, y } = coordConverter(event, image);
    expect(x).toBe(originalX);
    expect(y).toBe(originalY);
  });
});
