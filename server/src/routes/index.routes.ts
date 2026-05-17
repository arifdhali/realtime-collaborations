import { Router } from "express";
import authRoutes from "@/routes/auth.routes";
import userRoutes from "@/routes/user.routes";
import roomRoute from "@/routes/room.routes";
import { AuthorizationMiddleware } from "@/middleware/authrizations.middleware";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", AuthorizationMiddleware, userRoutes);
router.use("/room", AuthorizationMiddleware, roomRoute);

export default router;