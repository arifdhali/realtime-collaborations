import { Router } from "express";
import { Sign_in_Schema } from "@/utils/validations/Auth";
import { createAccount, forgotPassword, Singin, logout } from "@/controller/auth.controller";
import { ValidateSchema } from "@/middleware/validation.middleware";

const authRoutes = Router();


authRoutes.post("/sign-in", ValidateSchema(Sign_in_Schema), Singin);
authRoutes.post("/sign-up", createAccount);
authRoutes.post("/forgot", forgotPassword)
authRoutes.post("/logout", logout);


export default authRoutes;