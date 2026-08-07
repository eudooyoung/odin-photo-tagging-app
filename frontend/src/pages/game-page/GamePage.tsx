import PuzzleImage from "@/assets/geeks_in_the_hall.png";
import { useAttempt } from "@/hooks/useAttempt.ts";
import { useGame } from "@/hooks/useGame.ts";
import { usePlayer } from "@/hooks/usePlayer.ts";
import { coordConverter } from "@/lib/coordConverter.ts";
import {
  useEffect,
  useRef,
  useState,
  type MouseEventHandler,
  type SubmitEventHandler,
} from "react";
import { useParams } from "react-router";

export const GamePage = () => {
  const gameId = useParams().gameId as string;
  const { game, gameError, gameLoading, refetchGame } = useGame(gameId);
  const { createAttempt, attemptError, attemptLoading } =
    useAttempt(gameId);
  const { setPlayer, playerError, playerLoading } = usePlayer(gameId);
  const [attemptCoord, setAttemptCoord] = useState({
    x: -1,
    y: -1,
  });
  const [playerInput, setPlayerInput] = useState("");
  const [isPlayerSet, setIsPlayerSet] = useState(false);
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const resultDialogRef = useRef<HTMLDialogElement | null>(null);
  const isGameEnded = game?.finishedAt !== null;

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

    const { x, y } = coordConverter(e, image);
    setAttemptCoord({ x, y });
    modal.showModal();
    const { width: modalWidth, height: modalHeight } =
      modal.getBoundingClientRect();
    const left = Math.min(e.clientX, window.innerWidth - modalWidth);
    const right = Math.min(e.clientY, window.innerHeight - modalHeight);
    modal.style.left = `${left}px`;
    modal.style.top = `${right}px`;
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
  };

  const setPlayerHandler: SubmitEventHandler = async (e) => {
    e.preventDefault();
    const success = await setPlayer(playerInput);
    if (success) {
      setIsPlayerSet(true);
    }
  };

  if (gameLoading) {
    return <>game loading...</>;
  }

  if (!game) {
    return <>game not found</>;
  }

  return (
    <>
      <h2 hidden>Game Page</h2>
      {gameError && gameError.message}
      <div>
        <img
          src={PuzzleImage}
          alt="puzzle image"
          onMouseDown={imgClickHandler}
          ref={imageRef}
        />
        {game.targets
          .filter((target) => target.isFound)
          .map((target) => (
            <div
              key={target.id}
              data-testid={`target-marker-${target.id}`}
            />
          ))}
      </div>
      <dialog ref={modalRef} closedby="any">
        <ul>
          {game.targets.map((target) => (
            <li key={target.id}>
              <button
                onClick={createAttemptHandler(target.id)}
                disabled={attemptLoading}>
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
        onCancel={(e) => e.preventDefault()}>
        <h2 id="result-title">Game result</h2>
        <div>record: {game.record}</div>
        <form onSubmit={setPlayerHandler}>
          {!isPlayerSet && (
            <>
              <label htmlFor="player">player</label>
              <input
                type="text"
                name="player"
                id="player"
                value={playerInput}
                onChange={(e) => setPlayerInput(e.target.value)}
              />
              <button>Submit</button>
            </>
          )}
          <button>New Game</button>
        </form>
      </dialog>
    </>
  );
};
