import { config } from "dotenv";

config();

export const env = {
  port: Number(process.env.PORT),
  dbURL: process.env.DATABASE_URL,
  debug: process.env.APP_DEBUG === "true",
  sessionSecret: process.env.SESSION_SECRET,
};
