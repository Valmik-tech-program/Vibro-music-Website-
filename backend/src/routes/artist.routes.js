import express from "express";

import {
    getMySongs,
} from "../controllers/artist.controller.js";

import { isArtist } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
    "/my-songs",
    isArtist,
    getMySongs
);

export default router;