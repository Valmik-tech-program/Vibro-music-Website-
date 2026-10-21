import express from "express"
import dotenv from "dotenv"
import connectDb from "./src/db/index.js"
import cors from "cors"
import cookieParser from "cookie-parser"
dotenv.config()

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(cookieParser())

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

import userRoutes from "./src/routes/user.routes.js"
app.use("/api/v1",userRoutes)

import musicRoutes from "./src/routes/music.routes.js"
app.use("/api/v1", musicRoutes)

import favoriteRoutes from "./src/routes/favorite.routes.js";
import artistRoutes from "./src/routes/artist.routes.js";

import chatbotRoutes from "./src/routes/chatbot.routes.js";
app.use("/api/v1", chatbotRoutes);

app.use("/api/v1/favorites", favoriteRoutes);
app.use("/api/v1/artist", artistRoutes);


connectDb()
app.listen(port, ()=>{
    console.log(`Server run on ${port}`)
})