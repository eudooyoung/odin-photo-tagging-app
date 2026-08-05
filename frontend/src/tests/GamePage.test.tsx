import { GamePage } from "@/pages/game-page/GamePage.tsx";
import type { AttemptResponse } from "@/types/game.types.ts";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockUseGame, mockUseAttempt } = vi.hoisted(() => ({
  mockUseGame: vi.fn(),
  mockUseAttempt: vi.fn(),
}));

vi.mock("@/hooks/useGame.ts", () => ({
  useGame: mockUseGame,
}));

vi.mock("@/hooks/useAttempt.ts", () => ({
  useAttempt: mockUseAttempt,
}));

const mockGame = {
  id: "gameId",
  targets: [{ id: "targetId", name: "target-1" }],
};

describe("game page", () => {
  beforeEach(() => {
    HTMLDialogElement.prototype.showModal = vi.fn(function (
      this: HTMLDialogElement,
    ) {
      this.open = true;
    });
  });

  it("click picture shows targets", async () => {
    const user = userEvent.setup();
    mockUseGame.mockReturnValue({
      game: mockGame,
      gameLoading: false,
      gameError: null,
    });
    render(
      <MemoryRouter>
        <GamePage />
      </MemoryRouter>,
    );

    const puzzleImage = screen.getByRole("img", { name: /puzzle/i });
    await user.click(puzzleImage);
    expect(screen.getByText("target-1")).toBeInTheDocument();
  });

  it("show loading while fetching game", () => {
    mockUseGame.mockReturnValue({
      gameLoading: true,
    });
    render(
      <MemoryRouter>
        <GamePage />
      </MemoryRouter>,
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("show error message when exists", () => {
    mockUseGame.mockReturnValue({
      gameError: new Error("fetch game failed"),
    });
    render(
      <MemoryRouter>
        <GamePage />
      </MemoryRouter>,
    );
    expect(screen.getByText(/failed/i)).toBeInTheDocument();
  });

  it("mark the target when hits", async () => {
    const user = userEvent.setup();
    mockUseGame.mockReturnValue({
      game: mockGame,
      gameLoading: false,
      gameError: null,
    });
    const mockCreateAttempt = vi.fn().mockResolvedValue({
      targetId: 1,
      isAttemptValid: true,
    });
    mockUseAttempt.mockReturnValue({
      createAttempt: mockCreateAttempt,
      attemptError: null,
      attemptLoading: false,
    });
    render(
      <MemoryRouter>
        <GamePage />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("img", { name: /puzzle/i }));
    await user.click(screen.getByRole("button", { name: /target-1/i }));
  });
});
