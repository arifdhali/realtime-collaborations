import { createRoom } from "@/controller/room.controller";
import { Router } from "express";
const roomRoute = Router();

roomRoute.post("/create", createRoom)

export default roomRoute;