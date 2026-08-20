import { Outlet, useParams } from "react-router";

export const GameRouter = () => {
  const gameId = useParams().gameId as string;

  return <Outlet key={gameId} />;
};
