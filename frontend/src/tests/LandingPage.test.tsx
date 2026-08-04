import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { LandingPage } from "@/pages/landing-page/LandingPage.tsx";
import { MemoryRouter } from "react-router";

const { mockUseCreateGame, mockNavigate } = vi.hoisted(() => ({
  mockUseCreateGame: vi.fn(),
  mockNavigate: vi.fn(),
}));

vi.mock("@/hooks/useCreateGame.ts", () => ({
  useCreateGame: mockUseCreateGame,
}));

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("landing page", () => {
  it("create game success", async () => {
    const user = userEvent.setup();
    const mockCreateGame = vi.fn().mockResolvedValue("gameId");
    mockUseCreateGame.mockReturnValue({
      createGame: mockCreateGame,
      createGameError: null,
      createGameLoading: false,
    });
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>,
    );

    const startButton = screen.getByRole("button", {
      name: /start/i,
    });
    await user.click(startButton);
    expect(mockCreateGame).toHaveBeenCalledOnce();
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/games/gameId");
    });
  });
});
