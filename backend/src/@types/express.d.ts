import type { AuthUser } from "@/types/auth.types.js";

declare global {
  namespace Express {
    interface User extends AuthUser {}
  }
}

export {};
