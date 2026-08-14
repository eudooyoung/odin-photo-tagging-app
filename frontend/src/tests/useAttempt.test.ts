import { useAttempt } from "@/hooks/useAttempt.ts";
import type {
  AttemptRequest,
  AttemptResponse,
} from "@/types/game.types.ts";
import { renderHook } from "@testing-library/react";
import { act } from "react";
import { describe, expect, it, vi } from "vitest";

describe("useAttempt hook", () => {
  it("attempt hits the target", async () => {
    const mockAttempt = {
      targetId: 1,
    } as AttemptRequest;
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      status: 200,
      json: () =>
        Promise.resolve({
          isAttemptValid: true,
          targetId: mockAttempt.targetId,
        }),
    } as Response);
    const { result } = renderHook(() => useAttempt("gameId"));

    expect(result.current.attemptLoading).toBe(false);
    expect(result.current.attemptError).toBe(null);
    let response: AttemptResponse | undefined;
    await act(async () => {
      response = await result.current.createAttempt(mockAttempt);
    });
    expect(result.current.attemptLoading).toBe(false);
    expect(result.current.attemptError).toBe(null);
    expect(response).toEqual({
      targetId: mockAttempt.targetId,
      isAttemptValid: true,
    });
  });

  it("attempt misses the target", async () => {
    const mockAttempt = {
      targetId: 1,
    } as AttemptRequest;
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      status: 200,
      json: () =>
        Promise.resolve({
          isAttemptValid: false,
          targetId: mockAttempt.targetId,
        }),
    } as Response);
    const { result } = renderHook(() => useAttempt("gameId"));

    expect(result.current.attemptLoading).toBe(false);
    expect(result.current.attemptError).toBe(null);
    let response: AttemptResponse | undefined;
    await act(async () => {
      response = await result.current.createAttempt(mockAttempt);
    });
    expect(result.current.attemptLoading).toBe(false);
    expect(result.current.attemptError).toBe(null);
    expect(response).toEqual({
      targetId: mockAttempt.targetId,
      isAttemptValid: false,
    });
  });
});
