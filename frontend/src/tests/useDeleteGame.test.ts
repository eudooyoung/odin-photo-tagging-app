import { useDeleteGame } from "@/hooks/useDeleteGame";
import { env } from "@/lib/env.ts";
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("useDelete hook", () => {
  it("delete game", async () => {
    const spyFetch = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      status: 204,
    } as Response);
    const { result } = renderHook(() => useDeleteGame("gameId"));

    expect(result.current.deleteGameLoading).toBe(false);
    expect(result.current.deleteGameError).toBe(null);
    await act(async () => await result.current.deleteGame());
    expect(spyFetch).toHaveBeenCalledExactlyOnceWith(
      `${env.apiBaseURL}/games/gameId`,
      {
        method: "DELETE",
      },
    );
    expect(result.current.deleteGameLoading).toBe(false);
    expect(result.current.deleteGameError).toBe(null);
  });
});
