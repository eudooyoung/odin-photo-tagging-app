import { app } from "@/app.js";
import type {
  CreateGameResponse,
  AttemptResponse,
  GetTargetsResponse,
  GetGameResponse,
} from "@/types/game.types.js";
import request, { type Response } from "supertest";
import { describe, expect, it } from "vitest";

const getBody = <T>(res: Response) => res.body as T;

const createGame = async (): Promise<number> => {
  const res = await request(app).post("/games");
  const { gameId } = getBody<CreateGameResponse>(res);
  return gameId;
};

describe("game api", () => {
  it("create game", async () => {
    const res = await request(app).post("/games");
    const body = getBody<CreateGameResponse>(res);

    expect(res.status).toBe(201);
    expect(res.headers["content-type"]).toMatch(/json/);
    expect(body.gameId).toBeTypeOf("number");
  });

  it("get game", async () => {
    const gameId = await createGame();
    const res = await request(app).get(`/games/${gameId}`);
    const { game } = getBody<GetGameResponse>(res);

    expect(res.status).toBe(200);
    expect(game).toEqual(expect.objectContaining({ id: gameId }));
  });

  it("get game targets", async () => {
    const gameId = await createGame();
    const res = await request(app).get(`/games/${gameId}/targets`);
    const { targets } = getBody<GetTargetsResponse>(res);

    expect(res.status).toBe(200);
    expect(targets).toHaveLength(5);
  });

  it("target attempt successful", async () => {
    const gameId = await createGame();
    const targetsRes = await request(app).get(
      `/games/${gameId}/targets`,
    );
    const { targets } = getBody<GetTargetsResponse>(targetsRes);
    const res = await request(app)
      .post(`/games/${gameId}/attempts`)
      .send({
        targetId: targets[0]!.id,
        x: targets[0]!.x,
        y: targets[0]!.y,
      });
    const { isAttemptValid, targetId, isGameEnded } =
      getBody<AttemptResponse>(res);

    expect(res.status).toBe(200);
    expect(isAttemptValid).toBe(true);
    expect(targetId).toBe(targets[0]!.id);
    expect(isGameEnded).toBe(false);
  });

  it("target attempt successful with game ends", async () => {
    const gameId = await createGame();
    const targetsRes = await request(app).get(
      `/games/${gameId}/targets`,
    );
    const { targets } = getBody<GetTargetsResponse>(targetsRes);
    for (let i = 0; i < 4; i++) {
      await request(app).post(`/games/${gameId}/attempts`).send({
        targetId: targets[i]!.id,
        x: targets[i]!.x,
        y: targets[i]!.y,
      });
    }
    const res = await request(app)
      .post(`/games/${gameId}/attempts`)
      .send({
        targetId: targets[4]!.id,
        x: targets[4]!.x,
        y: targets[4]!.y,
      });
    const { isGameEnded } = getBody<AttemptResponse>(res);

    expect(isGameEnded).toBe(true);
  });

  it("target attempt fails", async () => {
    const gameId = await createGame();
    const targetsRes = await request(app).get(
      `/games/${gameId}/targets`,
    );
    const { targets } = getBody<GetTargetsResponse>(targetsRes);
    const res = await request(app)
      .post(`/games/${gameId}/attempts`)
      .send({
        targetId: targets[0]!.id,
        x: targets[0]!.x + targets[0]!.width + 1,
        y: targets[0]!.y + targets[0]!.height + 1,
      });
    const { isAttemptValid, isGameEnded } =
      getBody<AttemptResponse>(res);

    expect(res.status).toBe(200);
    expect(isAttemptValid).toBe(false);
    expect(isGameEnded).toBe(false);
  });
});
