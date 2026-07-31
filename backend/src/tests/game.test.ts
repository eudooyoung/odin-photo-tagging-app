import { app } from "@/app.js";
import type {
  CreateGameResponse,
  AttemptResponse,
} from "@/types/game.types.js";
import request, { type Response } from "supertest";
import { describe, expect, it } from "vitest";

const getBody = <T>(res: Response) => res.body as T;

describe("game api", () => {
  it("create game", async () => {
    const res = await request(app).post("/games");
    const body = getBody<CreateGameResponse>(res);

    expect(res.status).toBe(201);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(body.gameId).toBeTypeOf("number");
    expect(body.geeks).toHaveLength(5);
  });

  describe("target attempts", () => {
    it("target attempt successful", async () => {
      const gameRes = await request(app).post("/games");
      const { gameId, geeks } = getBody<CreateGameResponse>(gameRes);
      const res = await request(app)
        .post(`/games/${gameId}/attempts`)
        .send({
          targetId: geeks[0]!.id,
          x: geeks[0]!.x,
          y: geeks[0]!.y,
        });
      const { isAttemptValid } = getBody<AttemptResponse>(res);

      expect(res.status).toBe(200);
      expect(isAttemptValid).toBe(true);
    });
  });
});
