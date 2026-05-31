import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import errorMiddleware from "./middleware/error.middleware";
import routes from "./routes/index.routes";
import AppError from "./utils/AppError";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
dotenv.config();
const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true
}));


app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "/upload")))

// app.use("/game",gameRoutes);

app.use("/api", routes);
 

app.use((req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Route ${req.originalUrl} not found`, 404));
})


app.use(errorMiddleware)

export default app;