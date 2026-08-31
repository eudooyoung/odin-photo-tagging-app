import { LandingPage } from "@/pages/landing-page/LandingPage.tsx";
import { LanguageSwitcher } from "@/components/language-switcher/LanguageSwitcher.tsx";
import i18n from "@/i18n.ts";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockUseCreateGame } = vi.hoisted(() => ({
  mockUseCreateGame: vi.fn(),
}));

vi.mock("@/hooks/useCreateGame.ts", () => ({
  useCreateGame: mockUseCreateGame,
}));

const renderLanguageSwitcher = () => {
  render(
    <MemoryRouter>
      <LanguageSwitcher />
      <LandingPage />
    </MemoryRouter>,
  );
};

describe("LanguageSwitcher", () => {
  beforeEach(async () => {
    await i18n.changeLanguage("en");
    mockUseCreateGame.mockReturnValue({
      createGame: vi.fn(),
      createGameError: null,
      createGameLoading: false,
    });
  });

  it("shows English as the current language by default", () => {
    renderLanguageSwitcher();

    expect(screen.getByRole("button", { name: "English" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "한국어" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("changes to Korean and immediately updates translated UI", async () => {
    const user = userEvent.setup();
    renderLanguageSwitcher();

    await user.click(screen.getByRole("button", { name: "한국어" }));

    await waitFor(() => {
      expect(i18n.resolvedLanguage).toBe("ko");
      expect(screen.getByRole("button", { name: "시작" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "한국어" })).toHaveAttribute(
        "aria-pressed",
        "true",
      );
    });
  });

  it("changes back to English", async () => {
    const user = userEvent.setup();
    await i18n.changeLanguage("ko");
    renderLanguageSwitcher();

    await user.click(screen.getByRole("button", { name: "English" }));

    await waitFor(() => {
      expect(i18n.resolvedLanguage).toBe("en");
      expect(screen.getByRole("button", { name: "Start" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "English" })).toHaveAttribute(
        "aria-pressed",
        "true",
      );
    });
  });
});
