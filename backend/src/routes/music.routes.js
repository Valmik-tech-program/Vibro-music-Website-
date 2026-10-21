import { addSong, getAllSongs, getDeleteSong, getSongsByLanguage, getsong, updateSong } from "../controllers/music.controller.js";
import express from "express"
import multer from "multer";
import { isArtist, isUser } from "../middleware/auth.middleware.js";
const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router()

router.post("/addsong", isArtist, upload.fields([{name:'url', maxCount: 1},{name:'songbanner', maxCount: 1}]), addSong)

router.get("/getsongs/language/:language", getSongsByLanguage)

router.get("/getsongs", getAllSongs)//, isUser

router.delete("/delete/:id", getDeleteSong)//, isArtist

router.get("/getsong/:id", getsong) //, isUser

router.patch("/update/:id", isArtist,upload.single('url'),updateSong )

export default router