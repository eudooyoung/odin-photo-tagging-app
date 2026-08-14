import PuzzleImage from "@/assets/geeks_in_the_hall.png";
import { useAttempt } from "@/hooks/useAttempt.ts";
import { useCreateGame } from "@/hooks/useCreateGame.ts";
import { useGame } from "@/hooks/useGame.ts";
import { usePlayer } from "@/hooks/usePlayer.ts";
import {
  imageToRelativeMarkerCoords,
  screenToImageCoords,
} from "@/lib/coordConverters";
import {
  useEffect,
  useRef,
  useState,
  type MouseEventHandler,
  type ReactEventHandler,
  type SubmitEventHandler,
} from "react";
import { Link, useNavigate, useParams } from "react-router";
import styles from "./GamePage.module.css";
import type { Target, TargetPosition } from "@/types/game.types.ts";
import HandDrwanCircle from "@/assets/hand-drawn-circle.svg?react";
import { recordConverter } from "@/lib/recordConverter.ts";

export const GamePage = () => {
  const gameId = useParams().gameId as string;
  const navigate = useNavigate();
  const { game, gameError, gameLoading, refetchGame } = useGame(gameId);
  const { createAttempt, attemptError, attemptLoading } =
    useAttempt(gameId);
  const { setPlayer, playerError, playerLoading } = usePlayer(gameId);
  const { createGame, createGameError, createGameLoading } =
    useCreateGame();
  const [attemptCoord, setAttemptCoord] = useState({
    x: -1,
    y: -1,
  });
  const [playerInput, setPlayerInput] = useState("");
  const [isPlayerSet, setIsPlayerSet] = useState(false);
  const [imageSize, setImageSize] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const resultDialogRef = useRef<HTMLDialogElement | null>(null);
  const isGameEnded = game?.record != null;
  const record = game?.record && recordConverter(game.record);

  useEffect(() => {
    if (isGameEnded) {
      resultDialogRef.current?.showModal();
    }
  }, [isGameEnded]);

  const imgClickHandler: MouseEventHandler = (e) => {
    if (!imageRef.current || !modalRef.current) {
      return;
    }
    const image = imageRef.current;
    const modal = modalRef.current;

    const { x, y } = screenToImageCoords(e, image);
    setAttemptCoord({ x, y });
    modal.showModal();
    const { width: modalWidth, height: modalHeight } =
      modal.getBoundingClientRect();
    const left = Math.min(e.clientX, window.innerWidth - modalWidth);
    const right = Math.min(e.clientY, window.innerHeight - modalHeight);
    modal.style.left = `${left - 5}px`;
    modal.style.top = `${right - 5}px`;
  };

  const createAttemptHandler = (targetId: number) => async () => {
    if (!imageRef.current) {
      return;
    }

    const { x, y } = attemptCoord;
    const { isAttemptValid } = await createAttempt({ targetId, x, y });
    if (isAttemptValid) {
      await refetchGame();
    }

    modalRef.current?.close();
  };

  const setPlayerHandler: SubmitEventHandler = async (e) => {
    e.preventDefault();
    const success = await setPlayer(playerInput);
    if (success) {
      setIsPlayerSet(true);
    }
  };

  const newGameHandler = async () => {
    const gameId = await createGame();
    if (gameId) {
      setPlayerInput("");
      setIsPlayerSet(false);
      setAttemptCoord({ x: -1, y: -1 });
      resultDialogRef.current?.close();
      navigate(`/games/${gameId}`);
    }
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

  if (!game && gameLoading) {
    return <>game loading...</>;
  }

  if (!game) {
    return <>game not found</>;
  }

  return (
    <main className={styles.main}>
      <h2 className={styles.visuallyHidden}>Game Page</h2>
      <p className={styles.error}>{gameError && gameError.message}</p>
      <div className={styles.imageWrapper}>
        <img
          src={PuzzleImage}
          alt="puzzle image"
          onMouseDown={imgClickHandler}
          ref={imageRef}
          className={styles.puzzleImage}
          onLoad={imageLoadHandler}
        />
        {game.targets
          .filter((target) => target.isFound)
          .map(renderMarker)}
      </div>
      <dialog
        ref={modalRef}
        closedby="any"
        className={styles.attemptDialog}>
        <ul className={styles.targetList}>
          {game.targets.map((target) => (
            <li className={styles.targetListItem} key={target.id}>
              <button
                onClick={createAttemptHandler(target.id)}
                disabled={attemptLoading || target.isFound}
                className={`${styles.targetAttemptButton} ${target.isFound ? styles.found : ""}`}>
                {target.name}
              </button>
              {attemptError && <>{attemptError.message}</>}
            </li>
          ))}
        </ul>
      </dialog>
      <dialog
        ref={resultDialogRef}
        aria-labelledby="result-title"
        onCancel={(e) => e.preventDefault()}
        className={styles.resultDialog}>
        <h2 id="result-title" className={styles.resultTitle}>
          Game result
        </h2>
        <div className={styles.record}>
          Record:{" "}
          {record &&
            `${record.hours}:${record.minutes}:${record.seconds}.${record.milliseconds}`}
        </div>
        <form onSubmit={setPlayerHandler} className={styles.playerForm}>
          {!isPlayerSet && (
            <>
              <label
                className={styles.visuallyHidden}
                htmlFor="player"></label>
              <input
                type="text"
                name="player"
                id="player"
                value={playerInput}
                onChange={(e) => setPlayerInput(e.target.value)}
                placeholder="Enter player name"
                className={styles.playerInput}
              />
              <button disabled={playerLoading}>Submit</button>
            </>
          )}
          <button onClick={newGameHandler} disabled={createGameLoading}>
            New Game
          </button>
          {playerError && (
            <p className={styles.error}>{playerError.message}</p>
          )}
          {createGameError && (
            <p className={styles.error}>{createGameError.message}</p>
          )}
        </form>
        <Link className={styles.leaderboardLink} to={"/leaderboard"}>
          See leaderboard
        </Link>
      </dialog>
    </main>
  );
};
