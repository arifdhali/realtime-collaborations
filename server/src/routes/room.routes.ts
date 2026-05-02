import { createRoom } from "@/controller/room.controller";
import { AuthorizationMiddleware } from "@/middleware/authrizations.middleware";
import { Router } from "express";
const roomRoute = Router();

roomRoute.post("/create", AuthorizationMiddleware, createRoom)

export default roomRoute;