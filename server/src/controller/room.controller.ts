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

export const getRooms = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.user;
        let rooms = await Room.find(
            { createdBy: id, status: true }
        ).populate("createdBy", "name -_id").select("-__v -createdAt -updatedAt").lean();

        if (rooms.length >= 1) {
            success(res, { rooms }, "Rooms fetched successfully", 200);
        } else {

            success(res, {}, "No rooms available", 200);
        }

    } catch (err) {
        console.log(err)
        next(err);
    }
}

export const getRoomById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { room_id } = req.params;
        const room = await Room.findOne({ roomId: room_id, status: true });
        if (room) {
            success(res, { room }, "Room fetched successfully", 200);
        } else {
            success(res, {}, "No room found", 200);
        }



    } catch (err) {
        next(err);
    }
}


export const joinRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        

        

    } catch (err) {
        next(err);

    }
}

export const playGround = async (req: Request, res: Response, next: NextFunction) => {

    let { room_id } = req.query;
    try {

        let room = await Room.findOne({
            roomId: room_id,
            status: true
        }).populate("users.user_id","name -_id").select(
            "-__v -createdAt -updatedAt"
        ).lean();

        console.log(room)

        return success(res, {}, "Playground route is working", 200);

    } catch (err) {
        next(err);
    }
}