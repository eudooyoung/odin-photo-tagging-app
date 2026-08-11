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

export const imageToRelativeCoords = (
  targetPosition: TargetPosition,
  imageSize: { width: number; height: number },
) => {
  const { width, height } = imageSize;
  return {
    left: (targetPosition.x / width) * 100,
    top: (targetPosition.y / height) * 100,
    width: (targetPosition.width / width) * 100,
    height: (targetPosition.height / height) * 100,
  };
};
