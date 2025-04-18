dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoutes from "./routes/post.routes.js";
import userRoutes from "./routes/user.routes.js";
import { Server, Socket } from "socket.io";
import {createServer} from "http";

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;


const app = express();
const server = new createServer(app);

const io = new Server(server);


app.use(cors());
app.use(express.json());

app.use(postRoutes);
app.use(userRoutes);
app.use(express.static("uploads"));

io.on("connection", (socket)=>{
  console.log("User Connected");
  console.log("Id", socket.id)
})

const start = async () => {
  const connect = await mongoose
    .connect(MONGO_URL)
    .then(() => console.log("Datebase Connected"))
    .catch((err) => console.error(err));

    server.listen(PORT, () => {
    console.log(`Server is running on Port :- ${PORT}`);
  });
};
start();
