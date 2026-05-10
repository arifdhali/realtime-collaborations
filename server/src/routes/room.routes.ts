import { createRoom, getRoomById, getRooms, joinRoom, playGround } from "@/controller/room.controller";
 import { Router } from "express";
const roomRoute = Router();

roomRoute.get("/list", getRooms)
roomRoute.get("/:room_id", getRoomById)
roomRoute.post("/:room_id/join", joinRoom)
roomRoute.post("/create", createRoom);

roomRoute.get("/play-ground",playGround)

export default roomRoute;