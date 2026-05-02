import { NextFunction, Request, Response } from "express";
import { success } from "@/utils/response";
import { Room } from "@/models/Room";
import { User } from "@/models/User";
import AppError from "@/utils/AppError";
import crypto from "crypto";

export const createRoom = async (req: Request, res: Response, next: NextFunction) => {


    
    try {
        const { language } = req.body;
        const { id } = req.user;
        const isActiveUser = await User.findOne({ _id: id, status: true })

        if (!isActiveUser) {
            return next(new AppError("User is not active", 401));
        };
        let roomID = crypto.randomUUID();

        let room = await Room.create({
            roomId: roomID,
            language,
            createdBy: id
        });

        if (!room) {
            return next(new AppError("Room is not created", 401));
        }
        success(res, {}, "Room created successfully", 201);
    } catch (err) {
        next(err);
    }



}