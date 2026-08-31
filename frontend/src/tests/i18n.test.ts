import { beforeEach, describe, expect, it, vi } from "vitest";

describe("i18n", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.lang = "";
    vi.resetModules();
  });

  it("uses English when no supported language is stored", async () => {
    localStorage.setItem("language", "unsupported");

    const { default: i18n } = await import("@/i18n.ts");

    expect(i18n.resolvedLanguage).toBe("en");
    expect(i18n.t("landing.start")).toBe("Start");
    expect(document.documentElement.lang).toBe("en");
  });

  it("uses a supported language from localStorage", async () => {
    localStorage.setItem("language", "ko");

    const { default: i18n } = await import("@/i18n.ts");

    expect(i18n.resolvedLanguage).toBe("ko");
    expect(i18n.t("landing.start")).toBe("시작");
    expect(document.documentElement.lang).toBe("ko");
  });

  it("persists and applies language changes", async () => {
    const { default: i18n } = await import("@/i18n.ts");

    await i18n.changeLanguage("ko");

    expect(localStorage.getItem("language")).toBe("ko");
    expect(document.documentElement.lang).toBe("ko");
  });
});
