import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";

export const createAccount = (req: Request, res: Response, next: NextFunction) => {
    res.send("createAccount");
    try {

    } catch (err) {
        next(err);
    }
}
export const Singin = (req: Request, res: Response, next: NextFunction) => {
    try {
        // throw new AppError("Hellow", 404, []);

        console.log(req.body);

    } catch (err) {
        next(err);
    }
}
export const forgotPassword = (req: Request, res: Response, next: NextFunction) => {
    res.send("forgotPassword");
    try {

    } catch (err) {
        next(err);
    }
}
export const logout = (req: Request, res: Response, next: NextFunction) => {
    res.send("login");
    try {

    } catch (err) {
        next(err);
    }
}
