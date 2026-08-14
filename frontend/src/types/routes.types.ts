import type { useAttempt } from "@/hooks/useAttempt.ts";
import type { usePlayer } from "@/hooks/usePlayer.ts";
import type { Game } from "./game.types.ts";
import type { useGame } from "@/hooks/useGame.ts";

export type GameOutletContext = {
  game: Game;
} & Omit<ReturnType<typeof useGame>, "game" | "gameLoading"> &
  ReturnType<typeof useAttempt> &
  ReturnType<typeof usePlayer>;
