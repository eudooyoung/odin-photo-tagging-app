import { LeaderboardPage } from "@/pages/LeaderboardPage.tsx";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, expect, it } from "vitest";

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

  it("leaderboard displays up to 10", () => {
    render(
      <MemoryRouter>
        <LeaderboardPage />
      </MemoryRouter>,
    );
    const rankingHeaders = screen.getAllByRole("rowheader", {});
    expect(rankingHeaders.length).toBe(10);
    for (let i = 0; i < 10; i++) {
      expect(rankingHeaders[i].textContent).toBe(String(i + 1));
    }
  });
});
