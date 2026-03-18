import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import errorMiddleware from "./middleware/error.middleware";
import v1Routes from "./routes/v1/index.routes";
import AppError from "./utils/AppError";

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// app.use("/game",gameRoutes);

app.use("/api", v1Routes);


app.use((req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Route ${req.originalUrl} not found`, 404));
})


app.use(errorMiddleware)

export default app;