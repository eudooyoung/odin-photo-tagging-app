import { prisma } from "@/lib/prisma.js";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import expressSession from "express-session";
import { env } from "./env.config.js";

export const session = expressSession({
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
  },
  secret: env.sessionSecret,
  resave: false,
  saveUninitialized: false,
  store: new PrismaSessionStore(prisma, {
    checkPeriod: 2 * 60 * 1000,
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: (sessionId) => sessionId,
  }),
});
