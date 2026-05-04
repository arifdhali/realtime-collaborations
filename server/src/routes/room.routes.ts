import { createRoom, getRoomById, getRooms, joinRoom } from "@/controller/room.controller";
 import { Router } from "express";
const roomRoute = Router();

roomRoute.get("/list", getRooms)
roomRoute.get("/:room_id", getRoomById)
roomRoute.post("/:room_id/join", joinRoom)
roomRoute.post("/create", createRoom)

export default roomRoute;