import AppError from "@/utils/AppError";
import jwt from "jsonwebtoken";

export const SocketAuthorizationMiddleware = async (socket: any, next: any) => {
    try {
        const rawCookies = socket.handshake.headers.cookie || "";

        const token = rawCookies.split("auth_token=")[1];

        if (!token) {
            return next(new AppError("Unauthorized: No token provided", 403));
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
        socket.data.user = decoded;
        next();

    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return next(new AppError("Token expired", 403));

        }

        next(new AppError("Unauthorized", 403));


    }

}