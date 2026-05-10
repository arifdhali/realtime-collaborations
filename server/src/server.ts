import app from "./app";
import { createServer } from "http";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { initSocket } from "./socket";
import connectDB from "./config/db";
  
dotenv.config();
const PORT = process.env.PORT;
connectDB();
console.log(process.env.CLIENT_URL);
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        credentials: true
    }
});

initSocket(io);



server.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
})

server.on("error", (err: Error) => {
    console.log(err)
})