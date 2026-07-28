import express from "express";
import errorHandler from "./errors/errorHandler.js";
import path from "node:path";
import flash from "express-flash";
import { session } from "./config/session.config.js";
import { passport } from "./config/passport.config.js";

export const createApp = () => {
  const app = express();

  app
    .set("views", path.join(import.meta.dirname, "views"))
    .set("view engine", "ejs")

    .use(express.static(path.join(import.meta.dirname, "public")))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))

    .use(session)
    .use(flash())
    .use(passport.session());

  app.use(errorHandler);

  return app;
};
