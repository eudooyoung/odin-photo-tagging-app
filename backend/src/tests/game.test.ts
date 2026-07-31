import { app } from "@/app.js";
import type { CreateGameResponse } from "@/types/game.types.js";
import request from "supertest";
import { describe, expect, it } from "vitest";

describe("game api", () => {
  it("create game", async () => {
    const res = await request(app).post("/games");

    expect(res.status).toBe(201);
    expect(res.headers["content-type"]).toMatch(/json/);
    const body = res.body as CreateGameResponse;
    expect(body.gameId).toBeTypeOf("number");
    expect(body.geeks).toHaveLength(5);
  });
});
