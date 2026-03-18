import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import { success } from "@/utils/response";

export const createAccount = (req: Request, res: Response, next: NextFunction) => {
    res.send("createAccount");
    try {

    } catch (err) {
        next(err);
    }
}
export const Singin = (req: Request, res: Response, next: NextFunction) => {
    try {





        success(res, {}, "Success", 200);
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
