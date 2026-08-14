import {
  imageToRelativeMarkerCoords,
  screenToImageCoords,
} from "@/lib/coordConverters";
import type { MouseEvent } from "react";
import { describe, expect, it, vi } from "vitest";

describe("coordConverters", () => {
  describe("screen to image coordinates", () => {
    const originalX = 50;
    const originalY = 50;
    const image = document.createElement("img");
    Object.defineProperties(image, {
      naturalWidth: { value: 500 },
      naturalHeight: { value: 500 },
    });

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

      const { x, y } = screenToImageCoords(event, image);
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

      const { x, y } = screenToImageCoords(event, image);
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

      const { x, y } = screenToImageCoords(event, image);
      expect(x).toBe(originalX);
      expect(y).toBe(originalY);
    });
  });

  describe("image coordinates to percentage", () => {
    it("convert image coordinates to percentage", () => {
      const { originalX, originalY, originalWidth, originalHeight } = {
        originalX: 100,
        originalY: 50,
        originalWidth: 30,
        originalHeight: 15,
      };

      const imageSize = { width: 500, height: 500 };
      const result = imageToRelativeMarkerCoords(
        {
          x: originalX,
          y: originalY,
          width: originalWidth,
          height: originalHeight,
        },
        imageSize,
      );

      expect(result.left).toBeCloseTo(19.65);
      expect(result.top).toBeCloseTo(8.15);
      expect(result.diameter).toBeCloseTo(6.71);
    });
  });
});
