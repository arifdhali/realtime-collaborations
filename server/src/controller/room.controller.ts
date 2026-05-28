import { NextFunction, Request, Response } from "express";
import { success } from "@/utils/response";
import { Room } from "@/models/Room";
import { User } from "@/models/User";
import AppError from "@/utils/AppError";
import crypto from "crypto";
import mongoose from "mongoose";

export const createRoom = async (req: Request, res: Response, next: NextFunction) => {



    try {
        const { language } = req.body;
        const { id } = req.user;
        if (!id) {
            return next(new AppError("User id not found", 401));
        }

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

        const { room_id } = req.body;

        if (room_id !== req.params.room_id) {
            throw new AppError("Enter correct room id", 404);
        }

        let room = await Room.findOne({ roomId: room_id, status: true });

        if (!room) {
            throw new AppError("Room not found", 404);
        }
        let totalUsersIn = room.users.length;

        if (totalUsersIn >= room.limit_users) {
            throw new AppError("Room members limit reached, contact Room creator", 409);
        }


        let { id } = req.user;
        // let isAlreadyIn = room.users.some((v) => v.user_id?.toString() == id);

        // if (isAlreadyIn) {
        //     throw new AppError("User already joined", 409);

        // }

        let inserted = await Room.updateOne(
            {
                roomId: room_id,
                status: true
            },
            {
                $addToSet: {
                    users: {
                        user_id: new mongoose.Types.ObjectId(id)
                    }
                }

            }
        )

        success(res, room, "Room joined successful", 200);

    } catch (err) {
        next(err);

    }
}

export const playGround = async (req: Request, res: Response, next: NextFunction) => {

    let { room_id } = req.params;
    if (!room_id || typeof room_id !== "string") {
        return next(new AppError("Room id is required", 400));
    }
    try {

        let room = await Room.findOne({
            roomId: room_id,
            status: true
        }).populate("users.user_id", "name _id").select(
            "-__v -createdAt -updatedAt"
        ).lean();

        room.users = room.users.map((u) => ({
            user_id: {
                id: u.user_id._id,
                name: u.user_id.name
            }
        }));
        
        if (!room) {
            return next(new AppError("Room not found", 404));

        }
        room.total_users = room.users.length;

        return success(res, room, "Playground retrived successful", 200);

    } catch (err) {
        next(err);
    }
}