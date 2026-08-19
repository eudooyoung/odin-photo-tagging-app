import { GamePage } from "@/pages/game-page/GamePage.tsx";
import { GameRouter } from "@/routes/GameRouter.tsx";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  mockUseGame,
  defaultUseGame,
  mockUseAttempt,
  defaultUseAttempt,
  mockUsePlayer,
  defaultUsePlayer,
  mockUseCreateGame,
  defaultUseCreateGame,
  mockNavigate,
  mockUseDeleteGame,
  defaultUseDeleteGame,
} = vi.hoisted(() => {
  const defaultUseGame = {
    game: {
      id: "gameId",
      targets: [{ id: 1, name: "target-1", isFound: false }],
      record: null as number | null,
      player: null as string | null,
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

  const defaultUsePlayer = {
    setPlayer: vi.fn(),
    playerError: null as Error | null,
    playerLoading: false,
  };

  const defaultUseCreateGame = {
    createGame: vi.fn(),
    createGameError: null as Error | null,
    createGameLoading: false,
  };

  const defaultUseDeleteGame = {
    deleteGame: vi.fn(),
    deleteGameError: null as Error | null,
    deleteGameLoading: false,
  };

  return {
    mockUseGame: vi.fn(() => defaultUseGame),
    defaultUseGame,
    mockUseAttempt: vi.fn(() => defaultUseAttempt),
    defaultUseAttempt,
    mockUsePlayer: vi.fn(() => defaultUsePlayer),
    defaultUsePlayer,
    mockUseCreateGame: vi.fn(() => defaultUseCreateGame),
    defaultUseCreateGame,
    mockNavigate: vi.fn(),
    mockUseDeleteGame: vi.fn(() => defaultUseDeleteGame),
    defaultUseDeleteGame,
  };
});

vi.mock("@/hooks/useGame.ts", () => ({
  useGame: mockUseGame,
}));

vi.mock("@/hooks/useAttempt.ts", () => ({
  useAttempt: mockUseAttempt,
}));

vi.mock("@/hooks/usePlayer.ts", () => ({
  usePlayer: mockUsePlayer,
}));

vi.mock("@/hooks/useCreateGame.ts", () => ({
  useCreateGame: mockUseCreateGame,
}));

vi.mock("@/hooks/useDeleteGame.ts", () => ({
  useDeleteGame: mockUseDeleteGame,
}));

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderGamePage = () => {
  render(
    <MemoryRouter initialEntries={["/games/gameId"]}>
      <Routes>
        <Route path="games/:gameId" element={<GameRouter />}>
          <Route index element={<GamePage />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
};

describe("game page", () => {
  beforeEach(() => {
    HTMLDialogElement.prototype.showModal = vi.fn(function (
      this: HTMLDialogElement,
    ) {
      this.open = true;
    });

    HTMLDialogElement.prototype.close = vi.fn(function (
      this: HTMLDialogElement,
    ) {
      this.open = false;
    });

    HTMLElement.prototype.setPointerCapture = vi.fn();
    HTMLElement.prototype.releasePointerCapture = vi.fn();
  });

  describe("puzzle board", () => {
    it("show game loading while fetching game", () => {
      mockUseGame.mockReturnValue({
        ...defaultUseGame,
        game: null!,
        gameLoading: true,
      });
      renderGamePage();
      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it("show game error message when exists", () => {
      mockUseGame.mockReturnValue({
        ...defaultUseGame,
        gameError: new Error("fetch game failed"),
      });
      renderGamePage();
      expect(screen.getByText(/failed/i)).toBeInTheDocument();
    });

    it("click picture shows targets", async () => {
      const user = userEvent.setup();
      renderGamePage();

      const puzzleImage = screen.getByRole("img", { name: /puzzle/i });
      await user.click(puzzleImage);
      expect(
        screen.getByRole("button", { name: /target-1/i }),
      ).toBeInTheDocument();
    });

    it("render marks when targets found", () => {
      mockUseGame.mockReturnValue({
        ...defaultUseGame,
        game: {
          id: "gameId",
          targets: [{ id: 1, name: "target-1", isFound: true }],
          record: null,
          player: null,
        },
      });
      renderGamePage();
      expect(screen.getByTestId("target-marker-1")).toBeInTheDocument();
    });

    it("delete game when quit game", async () => {
      const user = userEvent.setup();
      const mockDeleteGame = vi.fn().mockResolvedValue(true);
      mockUseDeleteGame.mockReturnValue({
        ...defaultUseDeleteGame,
        deleteGame: mockDeleteGame,
      });
      renderGamePage();

      await user.click(
        screen.getByRole("button", { name: /quit game/i }),
      );
      expect(mockDeleteGame).toHaveBeenCalled();
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledExactlyOnceWith("/");
      });
    });

    it("disable quit button when loading", () => {
      mockUseDeleteGame.mockReturnValue({
        ...defaultUseDeleteGame,
        deleteGameLoading: true,
      });
      renderGamePage();
      expect(
        screen.getByRole("button", { name: /quit game/i }),
      ).toBeDisabled();
    });

    it("show error when occured during deleting game", () => {
      mockUseDeleteGame.mockReturnValue({
        ...defaultUseDeleteGame,
        deleteGameError: new Error("Delete Game fails"),
      });
      renderGamePage();
      expect(screen.getByText(/delete game fails/i)).toBeInTheDocument();
    });

    it("delete and create new game when clicking new game button", async () => {
      const user = userEvent.setup();
      const mockCreateGame = vi.fn().mockResolvedValue("gameId");
      const mockDeleteGame = vi.fn().mockResolvedValue(true);
      mockUseCreateGame.mockReturnValue({
        ...defaultUseCreateGame,
        createGame: mockCreateGame,
      });
      mockUseDeleteGame.mockReturnValue({
        ...defaultUseDeleteGame,
        deleteGame: mockDeleteGame,
      });
      renderGamePage();
      await user.click(screen.getByRole("button", { name: /new game/i }));
      expect(mockDeleteGame).toHaveBeenCalledOnce();
      expect(mockCreateGame).toHaveBeenCalledOnce();
      expect(mockNavigate).toHaveBeenCalledExactlyOnceWith(
        "/games/gameId",
      );
    });

    it("disable new game button when create game or delete game requests being proccessed", () => {
      mockUseCreateGame.mockReturnValue({
        ...defaultUseCreateGame,
        createGameLoading: true,
      });
      mockUseDeleteGame.mockReturnValue({
        ...defaultUseDeleteGame,
        deleteGameLoading: true,
      });
      renderGamePage();
      expect(
        screen.getByRole("button", { name: /new game/i }),
      ).toBeDisabled();
    });

    it("show any error when occured during deleting game or creating game", () => {
      mockUseDeleteGame.mockReturnValue({
        ...defaultUseDeleteGame,
        deleteGameError: new Error("Delete Game fails"),
      });
      mockUseCreateGame.mockReturnValue({
        ...defaultUseCreateGame,
        createGameError: new Error("Create Game fails"),
      });
      renderGamePage();
      const leftPanel = screen.getByRole("complementary", {
        name: /game sidebar/i,
      });
      expect(
        within(leftPanel).getByText(/delete game fails/i),
      ).toBeInTheDocument();
      expect(
        within(leftPanel).getByText(/create game fails/i),
      ).toBeInTheDocument();
    });
  });

  describe("attempt dialog", () => {
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
      renderGamePage();

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
      renderGamePage();

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
      renderGamePage();

      expect(screen.getByText(/attempt error/i)).toBeInTheDocument();
    });
  });

  describe("result dialog", () => {
    it("show result dialog when game ends", () => {
      mockUseGame.mockReturnValue({
        ...defaultUseGame,
        game: {
          id: "gameId",
          targets: [{ id: 1, name: "target-1", isFound: true }],
          record: 13_358_792,
          player: null,
        },
      });
      renderGamePage();

      const resultDialog = screen.getByRole("dialog", {
        name: /game result/i,
      });
      const inResultDialog = within(resultDialog);
      expect(resultDialog).toBeInTheDocument();
      expect(
        inResultDialog.getByText(/03:42:38.792/i),
      ).toBeInTheDocument();
      expect(
        inResultDialog.getByRole("textbox", { name: /player/i }),
      ).toBeInTheDocument();
      expect(
        inResultDialog.getByRole("button", { name: /submit/i }),
      ).toBeInTheDocument();
      expect(
        inResultDialog.getByRole("button", {
          name: /new game/i,
        }),
      ).toBeInTheDocument();
      expect(
        inResultDialog.getByRole("link", { name: /see leaderboard/i }),
      ).toHaveAttribute("href", "/leaderboard");
    });

    it("hide player and submit button when setPlayer succeeds", async () => {
      const user = userEvent.setup();
      mockUseGame.mockReturnValue({
        ...defaultUseGame,
        game: {
          id: "gameId",
          targets: [{ id: 1, name: "target-1", isFound: true }],
          record: 123,
          player: null,
        },
      });
      const mockSetPlayer = vi.fn().mockResolvedValue(true);
      mockUsePlayer.mockReturnValue({
        ...defaultUsePlayer,
        setPlayer: mockSetPlayer,
      });
      renderGamePage();

      const playerInput = screen.getByRole("textbox", {
        name: /player/i,
      });
      const submitButton = screen.getByRole("button", {
        name: /submit/i,
      });
      await user.type(playerInput, "testPlayer");
      await user.click(submitButton);
      await waitFor(() => {
        expect(playerInput).not.toBeInTheDocument();
        expect(submitButton).not.toBeInTheDocument();
      });
      expect(mockSetPlayer).toHaveBeenCalledOnce();
    });

    it("disable player submit button while loading", async () => {
      mockUseGame.mockReturnValue({
        ...defaultUseGame,
        game: {
          id: "gameId",
          targets: [{ id: 1, name: "target-1", isFound: true }],
          record: 123,
          player: null,
        },
      });
      mockUsePlayer.mockReturnValue({
        ...defaultUsePlayer,
        playerLoading: true,
      });
      renderGamePage();

      expect(
        screen.getByRole("button", { name: /submit/i }),
      ).toBeDisabled();
    });

    it("show player error message when exists", async () => {
      mockUseGame.mockReturnValue({
        ...defaultUseGame,
        game: {
          id: "gameId",
          targets: [{ id: 1, name: "target-1", isFound: true }],
          record: 123,
          player: null,
        },
      });
      mockUsePlayer.mockReturnValue({
        ...defaultUsePlayer,
        playerError: new Error("Player Error"),
      });
      renderGamePage();

      expect(screen.getByText(/player error/i)).toBeInTheDocument();
    });

    it("create new game when new game button clicked", async () => {
      const user = userEvent.setup();
      mockUseGame.mockReturnValue({
        ...defaultUseGame,
        game: {
          id: "gameId",
          targets: [{ id: 1, name: "target-1", isFound: true }],
          record: 123,
          player: "player",
        },
      });
      const mockCreateGame = vi.fn().mockResolvedValue("newGameId");
      mockUseCreateGame.mockReturnValue({
        ...defaultUseCreateGame,
        createGame: mockCreateGame,
      });
      renderGamePage();
      await user.click(
        within(
          screen.getByRole("dialog", { name: /game result/i }),
        ).getByRole("button", { name: /new game/i }),
      );
      expect(mockCreateGame).toHaveBeenCalled();
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledExactlyOnceWith(
          "/games/newGameId",
        );
      });
    });

    it("disable new game button when loading", async () => {
      mockUseGame.mockReturnValue({
        ...defaultUseGame,
        game: {
          id: "gameId",
          targets: [{ id: 1, name: "target-1", isFound: true }],
          record: 123,
          player: "player",
        },
      });
      mockUseCreateGame.mockReturnValue({
        ...defaultUseCreateGame,
        createGameLoading: true,
      });
      renderGamePage();
      expect(
        within(
          screen.getByRole("dialog", { name: /game result/i }),
        ).getByRole("button", { name: /new game/i }),
      ).toBeDisabled();
    });

    it("show create game error if exists", async () => {
      mockUseGame.mockReturnValue({
        ...defaultUseGame,
        game: {
          id: "gameId",
          targets: [{ id: 1, name: "target-1", isFound: true }],
          record: 123,
          player: "player",
        },
      });
      mockUseCreateGame.mockReturnValue({
        ...defaultUseCreateGame,
        createGameError: new Error("create game error"),
      });
      renderGamePage();
      const resultDialog = screen.getByRole("dialog", {
        name: /game result/i,
      });
      expect(
        within(resultDialog).getByText(/create game error/i),
      ).toBeInTheDocument();
    });
  });
});
