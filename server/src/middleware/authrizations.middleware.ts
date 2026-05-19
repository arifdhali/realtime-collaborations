import authRoutes from "@/routes/auth.routes";
import AppError from "@/utils/AppError";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const AuthorizationMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.cookie;
    let token;
    // if (req.headers.authorization.startsWith("Bearer ")) {
    //     token = req.headers.authorization.split(" ")[1];
    // }

    if (!token && authHeader) {
        token = req.cookies.auth_token;
    }
    if (!token) {
        return next(new AppError("Unauthorized: No token", 403))
    }
    try {
        let decode = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as any;
        req.user = decode;
        next();
    } catch (err: any) {
        if (err.name === "TokenExpiredError") {
            return next(new AppError("Token expired. Please login again.", 403));
        }
        return next(new AppError("Unauthorized: Invalid or expired token", 403));
    }


}