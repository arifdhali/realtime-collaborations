import { Router } from "express";
import { Sign_in_Schema, Sing_up_schema } from "@/utils/validations/Auth";
import { createAccount, forgotPassword, Singin, logout } from "@/controller/auth.controller";
import { ValidateSchema } from "@/middleware/validation.middleware";

const authRoutes = Router();


authRoutes.post("/sign-in", ValidateSchema(Sign_in_Schema), Singin);
authRoutes.post("/sign-up", ValidateSchema(Sing_up_schema), createAccount);
authRoutes.post("/forgot", forgotPassword)
authRoutes.post("/logout", logout);


export default authRoutes;