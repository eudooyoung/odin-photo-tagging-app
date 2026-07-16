import PuzzleImage from "@/assets/geeks_in_the_hall.png";
import { useRef, type MouseEventHandler } from "react";

export const GamePage = () => {
  const geeks = [
    { id: 1, name: "geek-1" },
    { id: 2, name: "geek-2" },
    { id: 3, name: "geek-3" },
  ];

  const modalRef = useRef<HTMLDialogElement | null>(null);

  const imgClickHandler: MouseEventHandler = (e) => {
    const xCoord = e.nativeEvent.clientX - 2;
    const yCoord = e.nativeEvent.clientY - 2;
    if (modalRef.current) {
      modalRef.current.showModal();
      modalRef.current.style = `top: ${yCoord}px; left: ${xCoord}px`;
    }
  };

  return (
    <>
      <h2 hidden>Game Page</h2>
      <img src={PuzzleImage} alt="puzzle image" onMouseDown={imgClickHandler} />
      <dialog ref={modalRef} closedby="any">
        <ul>
          {geeks.map((geek) => (
            <li>{geek.name}</li>
          ))}
        </ul>
      </dialog>
    </>
  );
};
