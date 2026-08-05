import { useGame } from "@/hooks/useGame.ts";
import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("useGame hook", () => {
  it("get game with rendering page", async () => {
    const gameId = "gameId";
    const mockGame = {
      id: gameId,
      targets: [{ targetId: "targetId" }],
    };
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve({ game: mockGame }),
    } as Response);
    const { result } = renderHook(() => useGame(gameId));

    expect(result.current.gameLoading).toBe(true);
    expect(result.current.gameError).toBe(null);
    await waitFor(() => {
      expect(result.current.gameLoading).toBe(false);
    });
    expect(result.current.gameError).toBe(null);
    expect(result.current.game).toEqual(mockGame);
  });

  it("abort request on unmount", () => {
    const mockAbort = vi.fn();
    vi.stubGlobal(
      "AbortController",
      class {
        signal = {};
        abort = mockAbort;
      },
    );

    const { unmount } = renderHook(() => useGame("gameId"));
    unmount();

    expect(mockAbort).toHaveBeenCalledOnce();
  });
});
