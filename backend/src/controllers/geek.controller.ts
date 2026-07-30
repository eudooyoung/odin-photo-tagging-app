import { findAllGeeks } from "@/repositories/geek.repository.js";
import type { RequestHandler } from "express";

export const getGeeks: RequestHandler = async (req, res) => {
  const geeks = await findAllGeeks();
  return res.json(geeks);
};
