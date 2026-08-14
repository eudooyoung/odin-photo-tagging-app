import { usePlayer } from "@/hooks/usePlayer";
import { renderHook } from "@testing-library/react";
import { act } from "react";
import { describe, expect, it, vi } from "vitest";

describe("useSetPlayer hook", () => {
  it("set player success", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      status: 201,
    } as Response);
    const { result } = renderHook(() => usePlayer("gameId"));

    expect(result.current.playerLoading).toBe(false);
    expect(result.current.playerError).toBe(null);
    let setPlayerResult: boolean | undefined;
    await act(async () => {
      setPlayerResult = await result.current.setPlayer("player");
    });
    expect(result.current.playerLoading).toBe(false);
    expect(result.current.playerError).toBe(null);
    expect(setPlayerResult).toBe(true);
  });
});
