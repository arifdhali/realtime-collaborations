import { createRoom, getRoomById, getRooms, joinRoom, playGround, runCode } from "@/controller/room.controller";
 import { Router } from "express";
const roomRoute = Router();

roomRoute.get("/list", getRooms)
// roomRoute.get("/:room_id", getRoomById)
roomRoute.post("/:room_id/join", joinRoom)
roomRoute.post("/create", createRoom);
roomRoute.post("/run-code",runCode);

roomRoute.get("/play-ground/:room_id",playGround)

export default roomRoute;