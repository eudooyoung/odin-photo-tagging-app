import PuzzleImage from "@/assets/geeks_in_the_hall.png";
import { useGame } from "@/hooks/useGame.ts";
import { useRef, type MouseEventHandler } from "react";
import { useParams } from "react-router";

export const GamePage = () => {
  const { gameId } = useParams();
  const { game, gameError, gameLoading } = useGame(gameId as string);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const imgClickHandler: MouseEventHandler = (e) => {
    const xCoord = e.nativeEvent.clientX - 2;
    const yCoord = e.nativeEvent.clientY - 2;
    if (modalRef.current) {
      modalRef.current.showModal();
      modalRef.current.style = `top: ${yCoord}px; left: ${xCoord}px`;
    }
  };

  if (gameLoading) {
    return <>game loading...</>;
  }

  return (
    <>
      <h2 hidden>Game Page</h2>
      {gameError && gameError.message}
      <img
        src={PuzzleImage}
        alt="puzzle image"
        onMouseDown={imgClickHandler}
      />
      <dialog ref={modalRef} closedby="any">
        <ul>
          {game &&
            game.targets.map((target) => (
              <li key={target.id}>{target.name}</li>
            ))}
        </ul>
      </dialog>
    </>
  );
};
