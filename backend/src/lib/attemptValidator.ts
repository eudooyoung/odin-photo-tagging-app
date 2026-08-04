import type { AttemptRequest, Target } from "@/types/game.types.js";

export const attemptValidator = (
  attempt: AttemptRequest,
  targets: Target[],
) => {
  const target = targets.find((t) => t.id === attempt.targetId);
  if (target) {
    // console.log(target);
    // console.log(target.x);
    // console.log(attempt.x);
    const isXValid =
      target.x <= attempt.x && attempt.x <= target.x + target.width;
    // console.log(isXValid);
    const isYValid =
      target.y <= attempt.y && attempt.y <= target.y + target.height;
    // console.log(isYValid);

    if (isXValid && isYValid) {
      return true;
    }
  }
  return false;
};
