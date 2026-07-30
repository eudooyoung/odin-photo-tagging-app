import { getGeeks } from "@/controllers/geek.controller.js";
import { Router } from "express";

export const geekRouter = Router();

geekRouter.get("/", getGeeks);
