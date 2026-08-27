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
    it("returns separate width and height percentages for a square image", () => {
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
      expect(result.width).toBeCloseTo(6.71);
      expect(result.height).toBeCloseTo(6.71);
    });

    it("uses each image dimension for percentages on a 2500 by 1775 image", () => {
      const result = imageToRelativeMarkerCoords(
        { x: 1000, y: 500, width: 75, height: 100 },
        { width: 2500, height: 1775 },
      );

      expect(result.left).toBeCloseTo(39);
      expect(result.top).toBeCloseTo(27.4648);
      expect(result.width).toBeCloseTo(5);
      expect(result.height).toBeCloseTo(7.0423);
    });

    it("produces equal pixel width and height for the marker", () => {
      const imageSize = { width: 2500, height: 1775 };
      const result = imageToRelativeMarkerCoords(
        { x: 1000, y: 500, width: 75, height: 100 },
        imageSize,
      );
      const markerWidth = (result.width / 100) * imageSize.width;
      const markerHeight = (result.height / 100) * imageSize.height;

      expect(markerWidth).toBeCloseTo(125);
      expect(markerHeight).toBeCloseTo(125);
      expect(markerWidth).toBeCloseTo(markerHeight);
    });

    it("keeps the marker center aligned with the target center", () => {
      const target = { x: 1000, y: 500, width: 75, height: 100 };
      const imageSize = { width: 2500, height: 1775 };
      const result = imageToRelativeMarkerCoords(target, imageSize);
      const markerLeft = (result.left / 100) * imageSize.width;
      const markerTop = (result.top / 100) * imageSize.height;
      const markerWidth = (result.width / 100) * imageSize.width;
      const markerHeight = (result.height / 100) * imageSize.height;

      expect(markerLeft + markerWidth / 2).toBeCloseTo(
        target.x + target.width / 2,
      );
      expect(markerTop + markerHeight / 2).toBeCloseTo(
        target.y + target.height / 2,
      );
    });
  });
});
