import { LeaderboardPage } from "@/pages/leaderboard-page/LeaderboardPage";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it, vi } from "vitest";

const { mockUseLeaderboard, defaultUseLeaderboard } = vi.hoisted(() => {
  const defaultUseLeaderboard = {
    leaderboard: [
      { rank: 1, player: "player-2", record: 300 },
      { rank: 2, player: "player-1", record: 500 },
    ],
    leaderboardError: null as Error | null,
    leaderboardLoading: false,
  };
  return {
    mockUseLeaderboard: vi.fn(() => defaultUseLeaderboard),
    defaultUseLeaderboard,
  };
});

vi.mock("@/hooks/useLeaderboard.ts", () => ({
  useLeaderboard: mockUseLeaderboard,
}));

describe("Leaderboard Page", () => {
  it("display leaderboard table", () => {
    render(
      <MemoryRouter>
        <LeaderboardPage />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole("table", { name: /leaderboard/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /ranking/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /player/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /record/i }),
    ).toBeInTheDocument();
  });

  it("displays player records", () => {
    render(
      <MemoryRouter>
        <LeaderboardPage />
      </MemoryRouter>,
    );
    expect(
      screen.getByRole("row", { name: "1 player-2 300" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("row", { name: "2 player-1 500" }),
    ).toBeInTheDocument();
  });

  it("show leaderboard error when exists", () => {
    mockUseLeaderboard.mockReturnValue({
      ...defaultUseLeaderboard,
      leaderboardError: new Error("leaderboard error"),
    });
    render(
      <MemoryRouter>
        <LeaderboardPage />
      </MemoryRouter>,
    );
    expect(screen.getByText(/leaderboard error/i)).toBeInTheDocument();
  });
});
