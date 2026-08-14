import { useLeaderboard } from "@/hooks/useLeaderboard.ts";
import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("useLeaderboard hook", () => {
  it("get leaderboard", async () => {
    const mockLeaderboard = [
      {
        player: "player-1",
        record: 100,
      },
      {
        player: "player-2",
        record: 150,
      },
    ];
    const spyFetch = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      status: 200,
      json: () =>
        Promise.resolve({
          leaderboard: mockLeaderboard,
        }),
    } as Response);
    const { result } = renderHook(() => useLeaderboard());

    expect(result.current.leaderboardLoading).toBe(true);
    expect(result.current.leaderboardError).toBe(null);
    expect(result.current.leaderboard).toBe(null);
    await waitFor(() => {
      expect(result.current.leaderboardLoading).toBe(false);
      expect(result.current.leaderboardError).toBe(null);
      expect(result.current.leaderboard).toEqual(mockLeaderboard);
    });
    expect(spyFetch).toHaveBeenCalledOnce();
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
    const { unmount } = renderHook(() => useLeaderboard());

    unmount();
    expect(mockAbort).toHaveBeenCalledOnce();
  });
});
