import { useCreateGame } from "@/hooks/useCreateGame.ts";
import { renderHook } from "@testing-library/react";
import { act } from "react";
import { describe, expect, it, vi } from "vitest";

describe("useCreateGame hook", () => {
  it("create game", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      status: 201,
      json: () => Promise.resolve({ gameId: "mock-gameId" }),
    } as Response);
    const { result } = renderHook(() => useCreateGame());

    expect(result.current.createGameLoading).toBe(false);
    expect(result.current.createGameError).toBe(null);
    let gameId: string | undefined;
    await act(async () => {
      gameId = await result.current.createGame();
    });
    expect(result.current.createGameLoading).toBe(false);
    expect(result.current.createGameError).toBe(null);
    expect(gameId).toBe("mock-gameId");
  });
});
