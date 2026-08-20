import PuzzleImage from "@/assets/geeks_in_the_hall.png";
import styles from "./PuzzleBoard.module.css";
import {
  useEffect,
  useRef,
  useState,
  type MouseEventHandler,
  type PointerEventHandler,
  type ReactEventHandler,
} from "react";
import { screenToImageCoords } from "@/lib/coordConverters.ts";
import type { PuzzleBoardProps } from "@/types/props.types.ts";
import { TargetMarker } from "../target-marker/TargetMarker.tsx";
import { LeftPanel } from "../left-panel/LeftPanel.tsx";
import { RightPanel } from "../right-panel/RightPanel.tsx";

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
  const viewPortRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const scrollStartRef = useRef({ left: 0, top: 0 });
  const didDragRef = useRef(false);
  const spacePressedRef = useRef(false);

  const keyDownHandler = (e: KeyboardEvent) => {
    if (e.code === "Space") {
      spacePressedRef.current = true;
      viewPortRef.current?.classList.add(styles.dragging);
      e.preventDefault();
    }

    if (e.key === "+") {
      setZoom((prev) => prev * 1.1);
    }
  };

  const keyUpHandler = (e: KeyboardEvent) => {
    if (e.code === "Space") {
      spacePressedRef.current = false;
      viewPortRef.current?.classList.remove(styles.dragging);
    }

    if (e.key === "-") {
      setZoom((prev) => prev / 1.1);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);
    window.addEventListener("keyup", keyUpHandler);

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
      window.removeEventListener("keyup", keyUpHandler);
    };
  }, []);

  const pointerDownHandler: PointerEventHandler = (e) => {
    didDragRef.current = false;

    if (
      !viewPortRef.current ||
      (e.pointerType === "mouse" && !spacePressedRef.current)
    ) {
      return;
    }
    const viewPort = viewPortRef.current;

    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    scrollStartRef.current = {
      left: viewPort.scrollLeft,
      top: viewPort.scrollTop,
    };

    viewPort.setPointerCapture(e.pointerId);
  };

  const pointerMoveHandler: PointerEventHandler = (e) => {
    if (!isDraggingRef.current || !viewPortRef.current) {
      return;
    }
    const viewPort = viewPortRef.current;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;

    viewPort.scrollLeft = scrollStartRef.current.left - deltaX;
    viewPort.scrollTop = scrollStartRef.current.top - deltaY;

    if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
      didDragRef.current = true;
    }
  };

  const pointerUpHandler: PointerEventHandler = (e) => {
    if (!viewPortRef.current) {
      return;
    }
    const viewPort = viewPortRef.current;

    isDraggingRef.current = false;
    viewPort.releasePointerCapture(e.pointerId);
  };

  const imgClickHandler: MouseEventHandler = (e) => {
    if (
      !imageRef.current ||
      !attemptDialogRef.current ||
      didDragRef.current
    ) {
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

  const zoomInHandler = () => {
    setZoom((prev) => prev * 1.1);
  };

  const zoomOutHandler = () => {
    setZoom((prev) => prev / 1.1);
  };

  return (
    <div className={styles.board}>
      <LeftPanel />
      <div
        className={styles.viewPort}
        ref={viewPortRef}
        onPointerDown={pointerDownHandler}
        onPointerMove={pointerMoveHandler}
        onPointerUp={pointerUpHandler}
        onPointerCancel={pointerUpHandler}>
        <div
          style={{ width: `${zoom * 100}%` }}
          className={styles.imageWrapper}>
          <img
            src={PuzzleImage}
            alt="puzzle image"
            onClick={imgClickHandler}
            onLoad={imageLoadHandler}
            ref={imageRef}
            className={styles.puzzleImage}
            draggable={false}
          />
          {game.targets
            .filter((target) => target.isFound)
            .map((target) => (
              <TargetMarker
                key={target.id}
                target={target}
                imageSize={imageSize}
              />
            ))}
        </div>
      </div>
      <RightPanel
        game={game}
        onClickZoomIn={zoomInHandler}
        onClickZoomOut={zoomOutHandler}
      />
    </div>
  );
};
