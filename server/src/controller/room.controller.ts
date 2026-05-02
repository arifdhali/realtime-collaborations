import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { success } from "@/utils/response";
import { Room } from "@/models/Room";

export const createRoom = async (req: Request, res: Response, next: NextFunction) => {

    const roomid = uuidv4();

    try {
        const { language } = req.body;
        await Room.create({
            roomId: roomid,
            createdBy: {
                userId: 121,
                username: "Ayat afri"
            },
            language
        })
        success(res, { roomId: roomid }, "Room created successfully", 201);
    } catch (err) {
        next(err);
    }



}