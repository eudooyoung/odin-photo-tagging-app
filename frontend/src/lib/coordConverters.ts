import type { TargetPosition } from "@/types/game.types.ts";
import type { MouseEvent } from "react";

export const screenToImageCoords = (
  e: MouseEvent,
  image: HTMLImageElement,
) => {
  const rect = image.getBoundingClientRect();

  const screenX = e.clientX - rect.left;
  const screenY = e.clientY - rect.top;

  const imageX = screenX * (image.naturalWidth / rect.width);
  const imageY = screenY * (image.naturalHeight / rect.height);

  return { x: imageX, y: imageY };
};

export const imageToRelativeMarkerCoords = (
  targetPosition: TargetPosition,
  imageSize: { width: number; height: number },
) => {
  const { width, height } = imageSize;
  const { x: tX, y: tY, width: tW, height: tH } = targetPosition;
  const diameter = Math.hypot(tW, tH);
  const centerX = tX + tW / 2 - diameter / 2;
  const centerY = tY + tH / 2 - diameter / 2;

  return {
    left: (centerX / width) * 100,
    top: (centerY / height) * 100,
    diameter: (diameter / width) * 100,
  };
};
