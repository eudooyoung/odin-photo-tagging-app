import { GamePage } from "@/pages/game-page/GamePage.tsx";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockUseGame, defaultUseGame, mockUseAttempt, defaultUseAttempt } =
  vi.hoisted(() => {
    const defaultUseGame = {
      game: {
        id: "gameId",
        targets: [{ id: 1, name: "target-1", isFound: false }],
        finishedAt: null as Date | null,
      },
      gameLoading: false,
      gameError: null as Error | null,
      refetchGame: vi.fn(),
    };
    const defaultUseAttempt = {
      createAttempt: vi.fn(),
      attemptError: null as Error | null,
      attemptLoading: false,
    };

    return {
      mockUseGame: vi.fn(() => defaultUseGame),
      defaultUseGame,
      mockUseAttempt: vi.fn(() => defaultUseAttempt),
      defaultUseAttempt,
    };
  });

vi.mock("@/hooks/useGame.ts", () => ({
  useGame: mockUseGame,
}));

vi.mock("@/hooks/useAttempt.ts", () => ({
  useAttempt: mockUseAttempt,
}));

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
    render(
      <MemoryRouter>
        <GamePage />,
      </MemoryRouter>,
    );

    const puzzleImage = screen.getByRole("img", { name: /puzzle/i });
    await user.click(puzzleImage);
    expect(screen.getByText("target-1")).toBeInTheDocument();
  });

  it("show loading while fetching game", () => {
    mockUseGame.mockReturnValue({
      ...defaultUseGame,
      gameLoading: true,
    });
    render(
      <MemoryRouter>
        <GamePage />
      </MemoryRouter>,
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("show game error message when exists", () => {
    mockUseGame.mockReturnValue({
      ...defaultUseGame,
      gameError: new Error("fetch game failed"),
    });
    render(
      <MemoryRouter>
        <GamePage />
      </MemoryRouter>,
    );
    expect(screen.getByText(/failed/i)).toBeInTheDocument();
  });

  it("refetch game when hits", async () => {
    const user = userEvent.setup();
    const mockRefetchGame = vi.fn();
    mockUseGame.mockReturnValue({
      ...defaultUseGame,
      refetchGame: mockRefetchGame,
    });
    const mockCreateAttempt = vi.fn().mockResolvedValue({
      isAttemptValid: true,
    });
    mockUseAttempt.mockReturnValue({
      ...defaultUseAttempt,
      createAttempt: mockCreateAttempt,
    });
    render(
      <MemoryRouter>
        <GamePage />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("img", { name: /puzzle/i }));
    await user.click(screen.getByRole("button", { name: /target-1/i }));
    expect(mockCreateAttempt).toHaveBeenCalled();
    expect(mockRefetchGame).toHaveBeenCalled();
  });

  it("disable targets when attempt loading", async () => {
    const user = userEvent.setup();
    mockUseAttempt.mockReturnValue({
      ...defaultUseAttempt,
      attemptLoading: true,
    });
    render(
      <MemoryRouter>
        <GamePage />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("img", { name: /puzzle/i }));
    const targetButton = screen.getByRole("button", {
      name: /target/i,
    });
    expect(targetButton).toBeDisabled();
  });

  it("show attempt error when exists", () => {
    mockUseAttempt.mockReturnValue({
      ...defaultUseAttempt,
      attemptError: new Error("attempt error"),
    });
    render(
      <MemoryRouter>
        <GamePage />
      </MemoryRouter>,
    );

    expect(screen.getByText(/attempt error/i)).toBeInTheDocument();
  });

  it("render marks when targets found", () => {
    mockUseGame.mockReturnValue({
      ...defaultUseGame,
      game: {
        id: "gameId",
        targets: [{ id: 1, name: "target-1", isFound: true }],
        finishedAt: null,
      },
    });
    render(
      <MemoryRouter>
        <GamePage />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("target-marker-1")).toBeInTheDocument();
  });

  it("show result dialog when game ends", () => {
    mockUseGame.mockReturnValue({
      ...defaultUseGame,
      game: {
        id: "gameId",
        targets: [{ id: 1, name: "target-1", isFound: true }],
        finishedAt: new Date(),
      },
    });
    render(
      <MemoryRouter>
        <GamePage />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("dialog", { name: /game result/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /player/i }),
    ).toBeInTheDocument();
  });
});
