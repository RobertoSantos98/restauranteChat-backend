import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const httpServer = createServer(app);


const io = new Server(httpServer, {
    cors: { origin: "*", methods: ["GET", "POST"] }
});

io.on("connection", (socket) => {
    console.log("Cozinha conectada:", socket.id);

    socket.on("disconnect", () => {
        console.log("Cozinha desconectada:", socket.id);
    })
})


export { io, httpServer, app } ;