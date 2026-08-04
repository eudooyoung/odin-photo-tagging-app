import { app } from "@/app.js";
import {
  type CreateGameResponse,
  type AttemptResponse,
  type GetGameResponse,
  type GetLeaderboardResponse,
} from "@/types/game.types.js";
import request, { type Response } from "supertest";
import { describe, expect, it } from "vitest";

const getBody = <T>(res: Response) => res.body as T;

const createGame = async (): Promise<number> => {
  const res = await request(app).post("/games");
  const { gameId } = getBody<CreateGameResponse>(res);
  return gameId;
};

const getGameResponseBody = async (
  gameId: number,
): Promise<GetGameResponse> => {
  const res = await request(app).get(`/games/${gameId}`);
  return getBody<GetGameResponse>(res);
};

describe("game api", () => {
  it("create game", async () => {
    const res = await request(app).post("/games");
    const body = getBody<CreateGameResponse>(res);

    expect(res.status).toBe(201);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(body.gameId).toBeTypeOf("string");
  });

  it("get game", async () => {
    const gameId = await createGame();
    const res = await request(app).get(`/games/${gameId}`);
    const { game, isGameEnded } = getBody<GetGameResponse>(res);

    expect(res.status).toBe(200);
    expect(game).toEqual(
      expect.objectContaining({ publicId: gameId }),
    );
    expect(game.targets).toHaveLength(5);
    expect(isGameEnded).toBe(false);
  });

  it("target attempt successful", async () => {
    const gameId = await createGame();
    const { game } = await getGameResponseBody(gameId);
    const { targets } = game;
    const res = await request(app)
      .post(`/games/${gameId}/attempts`)
      .send({
        targetId: targets[0]!.id,
        x: targets[0]!.x,
        y: targets[0]!.y,
      });
    const { isAttemptValid, targetId } =
      getBody<AttemptResponse>(res);

    expect(res.status).toBe(200);
    expect(isAttemptValid).toBe(true);
    expect(targetId).toBe(targets[0]!.id);
  });

  it("target attempt fails", async () => {
    const gameId = await createGame();
    const { game } = await getGameResponseBody(gameId);
    const { targets } = game;
    const res = await request(app)
      .post(`/games/${gameId}/attempts`)
      .send({
        targetId: targets[0]!.id,
        x: targets[0]!.x + targets[0]!.width + 1,
        y: targets[0]!.y + targets[0]!.height + 1,
      });
    const { isAttemptValid } = getBody<AttemptResponse>(res);

    expect(res.status).toBe(200);
    expect(isAttemptValid).toBe(false);
  });

  it("target attempt successful with game ends", async () => {
    const gameId = await createGame();
    let gameResponse = await getGameResponseBody(gameId);
    const { targets } = gameResponse.game;
    for (let i = 0; i < 5; i++) {
      await request(app).post(`/games/${gameId}/attempts`).send({
        targetId: targets[i]!.id,
        x: targets[i]!.x,
        y: targets[i]!.y,
      });
    }

    gameResponse = await getGameResponseBody(gameId);

    const res = gameResponse;
    expect(res.isGameEnded).toBe(true);
    expect(res.game.record).not.toBe(null);
  });

  it("create score", async () => {
    const gameId = await createGame();
    const { game } = await getGameResponseBody(gameId);
    const { targets } = game;
    for (let i = 0; i < 5; i++) {
      await request(app).post(`/games/${gameId}/attempts`).send({
        targetId: targets[i]!.id,
        x: targets[i]!.x,
        y: targets[i]!.y,
      });
    }
    const res = await request(app)
      .patch(`/games/${gameId}/player`)
      .send({
        player: "Test Player",
      });

    expect(res.status).toBe(201);
  });

  it("get leaderboard", async () => {
    const res = await request(app).get("/games/leaderboard");
    const { leaderboard } = getBody<GetLeaderboardResponse>(res);

    expect(Array.isArray(leaderboard)).toBe(true);
  });
});
