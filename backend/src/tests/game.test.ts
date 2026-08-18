import { app } from "@/app.js";
import { prisma } from "@/lib/prisma.js";
import { findGameByPublicId } from "@/repositories/game.repository.js";
import {
  type CreateGameResponse,
  type AttemptResponse,
  type GetGameResponse,
  type GetLeaderboardResponse,
} from "@/types/game.types.js";
import request, { type Response } from "supertest";
import { describe, expect, it } from "vitest";

const getBody = <T>(res: Response) => res.body as T;

const createGame = async () => {
  const res = await request(app).post("/games");
  const { publicId } = getBody<CreateGameResponse>(res);
  return publicId;
};

const getGameResponseBody = async (
  gameId: string,
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
    expect(body.publicId).toBeTypeOf("string");
  });

  it("get game", async () => {
    const publicId = await createGame();
    const res = await request(app).get(`/games/${publicId}`);
    const { game } = getBody<GetGameResponse>(res);

    expect(res.status).toBe(200);
    expect(game).toEqual(expect.objectContaining({ publicId }));
    expect(game.targets).toHaveLength(5);
  });

  it("target attempt successful", async () => {
    const publicId = await createGame();
    const { targets } = await findGameByPublicId(publicId);
    const res = await request(app)
      .post(`/games/${publicId}/attempts`)
      .send({
        targetId: targets[0]!.id,
        x: targets[0]!.x,
        y: targets[0]!.y,
      });
    const { isAttemptValid } = getBody<AttemptResponse>(res);

    expect(res.status).toBe(200);
    expect(isAttemptValid).toBe(true);
  });

  it("target attempt fails", async () => {
    const publicId = await createGame();
    const { targets } = await findGameByPublicId(publicId);
    const res = await request(app)
      .post(`/games/${publicId}/attempts`)
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
    const publicId = await createGame();
    const { targets } = await findGameByPublicId(publicId);

    for (let i = 0; i < 5; i++) {
      await request(app).post(`/games/${publicId}/attempts`).send({
        targetId: targets[i]!.id,
        x: targets[i]!.x,
        y: targets[i]!.y,
      });
    }
    const res = await getGameResponseBody(publicId);

    expect(res.game.finishedAt).toBeTruthy();
    expect(res.game.record).toBeTruthy();
  });

  it("set player", async () => {
    const publicId = await createGame();
    const { targets } = await findGameByPublicId(publicId);
    for (let i = 0; i < 5; i++) {
      await request(app).post(`/games/${publicId}/attempts`).send({
        targetId: targets[i]!.id,
        x: targets[i]!.x,
        y: targets[i]!.y,
      });
    }
    const res = await request(app)
      .patch(`/games/${publicId}/player`)
      .send({
        player: "Test Player",
      });

    expect(res.status).toBe(201);
  });

  it("get leaderboard", async () => {
    await prisma.game.createMany({
      data: [
        {
          publicId: "game-1",
          player: "player-1",
          finishedAt: new Date(),
          record: 1000,
        },
        {
          publicId: "game-2",
          player: "player-2",
          finishedAt: new Date(),
          record: 500,
        },
      ],
    });
    const res = await request(app).get("/games/leaderboard");
    const { leaderboard } = getBody<GetLeaderboardResponse>(res);

    expect(leaderboard).toEqual([
      { rank: 1, player: "player-2", record: 500 },
      { rank: 2, player: "player-1", record: 1000 },
    ]);
  });

  it("delete game", async () => {
    const gameId = await createGame();
    const res = await request(app).delete(`/games/${gameId}`);
    expect(res.status).toBe(204);
  });

  it("delete unfinished games created more than a day ago when create a new game", async () => {
    const { publicId: oldGameId } = await prisma.game.create({
      data: { createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    });
    await createGame();
    expect(
      await prisma.game.findUnique({
        where: { publicId: oldGameId },
      }),
    ).toBeNull();
  });
});
