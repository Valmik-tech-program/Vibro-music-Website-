import { signup, Login, logout } from "../controllers/user.controllers.js";
import {
  googleLogin,
  googleCallback,
} from "../controllers/user.controllers.js";
import express from "express"

const router = express.Router()

router.post("/signup", signup)
router.post("/login", Login)
router.get("/google", googleLogin);

router.get(
  "/google/callback",
  googleCallback
);
router.post("/logout", logout)

export default router