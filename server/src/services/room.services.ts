import { Room } from "@/models/Room";
import AppError from "@/utils/AppError";

interface JoinRoomParams {
    room_id: string;
    user_id: string;
}

export const joinRoomService = async ({ room_id, user_id }: JoinRoomParams) => {


    try {
        let room = await Room.findOne({
            roomId: room_id,
            status: true
        });

        if (!room) {
            throw new AppError("Room not found", 404)
        }


        let isLimitExceed = room.users.length >= room.limit_users;
        if (isLimitExceed) {
            throw new AppError("Room is full", 400)
        }

        // already joined
        let isAlreadyJoined = room.users.some((user: any) => user.user_id == user_id);
        if (isAlreadyJoined) {
            throw new AppError("User already joined the room", 409)
        }

        await Room.findOneAndUpdate({
            roomId: room_id,
            status: true
        }, {
            $addToSet: {

                users: {
                    user_id: user_id
                }
            }
        })

        return room;

    } catch (err) {
        throw err;
    }

}