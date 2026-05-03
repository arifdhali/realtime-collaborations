import { createRoom, getRoomById, getRooms } from "@/controller/room.controller";
 import { Router } from "express";
const roomRoute = Router();

roomRoute.get("/list", getRooms)
roomRoute.get("/:room_id", getRoomById)
roomRoute.post("/create", createRoom)

export default roomRoute;