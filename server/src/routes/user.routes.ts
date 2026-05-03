import { Router } from "express";
import { ValidateSchema } from "@/middleware/validation.middleware";
import { getProfile } from "@/controller/user.controller";

const route = Router();


route.get("/profile",getProfile);
route.get("/user", (req, res) => {
    res.json({ message: "User route" });
});

export default route;