import { Router } from "express";
import { ValidateSchema } from "@/middleware/validation.middleware";

const route = Router();


route.get("/user", (req, res) => {
    res.json({ message: "User route" });
});

export default route;