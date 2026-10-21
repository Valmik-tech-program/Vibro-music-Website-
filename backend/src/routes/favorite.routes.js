import express from "express";

import {
  addFavorite,
  removeFavorite,
  getFavorites,
} from "../controllers/favorite.controller.js";

import { isUser  } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/:songId",
  isUser,
  addFavorite
);

router.delete(
  "/:songId",
  isUser,
  removeFavorite
);

router.get(
  "/",
  isUser,
  getFavorites
);

export default router;