import { imageToRelativeMarkerCoords } from "@/lib/coordConverters.ts";
import styles from "./TargetMarker.module.css";
import HandDrawnCircle from "@/assets/hand-drawn-circle.svg?react";
import type { TargetMarkerProps } from "@/types/props.types.ts";
import type { TargetPosition } from "@/types/game.types.ts";

export const TargetMarker = ({
  target,
  imageSize,
}: TargetMarkerProps) => {
  const { x, y, width, height } = target as TargetPosition;
  const position = imageSize
    ? imageToRelativeMarkerCoords({ x, y, width, height }, imageSize)
    : undefined;
  return (
    <HandDrawnCircle
      key={target.id}
      data-testid={`target-marker-${target.id}`}
      className={styles.marker}
      style={
        position && {
          left: `${position.left}%`,
          top: `${position.top}%`,
          width: `${position.diameter}%`,
          height: `${position.diameter}%`,
        }
      }
    />
  );
};
