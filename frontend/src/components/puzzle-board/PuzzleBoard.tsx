import PuzzleImage from "@/assets/geeks_in_the_hall.png";
import styles from "./PuzzleBoard.module.css";
import {
  useState,
  type MouseEventHandler,
  type ReactEventHandler,
} from "react";
import {
  imageToRelativeMarkerCoords,
  screenToImageCoords,
} from "@/lib/coordConverters.ts";
import type { Target, TargetPosition } from "@/types/game.types.ts";
import HandDrwanCircle from "@/assets/hand-drawn-circle.svg?react";
import type { PuzzleBoardProps } from "@/types/props.types.ts";

export const PuzzleBoard = ({
  game,
  imageRef,
  attemptDialogRef,
  setAttemptCoord,
}: PuzzleBoardProps) => {
  const [imageSize, setImageSize] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [zoom, setZoom] = useState(1);

  const imgClickHandler: MouseEventHandler = (e) => {
    if (!imageRef.current || !attemptDialogRef.current) {
      return;
    }
    const image = imageRef.current;
    const attemptDialog = attemptDialogRef.current;

    const { x, y } = screenToImageCoords(e, image);
    setAttemptCoord({ x, y });
    attemptDialog.showModal();
    const { width: modalWidth, height: modalHeight } =
      attemptDialog.getBoundingClientRect();
    const left = Math.min(e.clientX, window.innerWidth - modalWidth);
    const right = Math.min(e.clientY, window.innerHeight - modalHeight);
    attemptDialog.style.left = `${left - 5}px`;
    attemptDialog.style.top = `${right - 5}px`;
  };

  const imageLoadHandler: ReactEventHandler<HTMLImageElement> = (e) => {
    setImageSize({
      width: e.currentTarget.naturalWidth,
      height: e.currentTarget.naturalHeight,
    });
  };

  const renderMarker = (target: Target) => {
    const { x, y, width, height } = target as TargetPosition;
    const position = imageSize
      ? imageToRelativeMarkerCoords({ x, y, width, height }, imageSize)
      : undefined;
    return (
      <HandDrwanCircle
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

  const zoomInHandler = () => {
    setZoom((prev) => prev * 1.1);
  };

  const zoomOutHandler = () => {
    setZoom((prev) => prev / 1.1);
  };

  return (
    <div className={styles.board}>
      <div className={styles.viewPort}>
        <div
          style={{ width: `${zoom * 100}%` }}
          className={styles.imageWrapper}>
          <img
            src={PuzzleImage}
            alt="puzzle image"
            onMouseDown={imgClickHandler}
            ref={imageRef}
            onLoad={imageLoadHandler}
            className={styles.puzzleImage}
          />
          {game.targets
            .filter((target) => target.isFound)
            .map(renderMarker)}
        </div>
      </div>
      <div className={styles.zoomButtons}>
        <button onClick={zoomInHandler} className={styles.zoomInButton}>
          Zoom in
        </button>
        <button onClick={zoomOutHandler} className={styles.zoomOutButton}>
          Zoom out
        </button>
      </div>
    </div>
  );
};
