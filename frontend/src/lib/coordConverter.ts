import type { MouseEvent } from "react";

export const coordConverter = (
  e: MouseEvent,
  image: HTMLImageElement,
) => {
  const rect = image.getBoundingClientRect();

  const currentX = e.clientX - rect.left;
  const currentY = e.clientY - rect.top;

  const originalX = currentX * (image.naturalWidth / rect.width);
  const originalY = currentY * (image.naturalHeight / rect.height);

  return { x: originalX, y: originalY };
};
