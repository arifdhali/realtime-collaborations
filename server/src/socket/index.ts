import { SocketAuthorizationMiddleware } from "@/middleware/socketAuth.middleware";
import { Room } from "@/models/Room";
import { joinRoomService } from "@/services/room.services";
import AppError from "@/utils/AppError";
import { Server } from "socket.io"


export const initSocket = (io: Server) => {


    io.use(SocketAuthorizationMiddleware);

    io.on("connection", (socket) => {
        console.log('a user is connected', socket.id);

        let user_id = socket.data.user.id;

        
        
        socket.on("initial_page", (data) => {
            let alreadyJoined = Room.findOne({
                roomId: data.room_id,
                users: {
                    $elemMatch: {
                        user_id
                    }
                }
            });
            if (alreadyJoined) {
                socket.join(data.room_id);
                socket.emit("room_joined", {
                    message: "Joined room successfully",
                    status: true,
                    room_id: data.room_id
                })

            }
        })

        socket.on("join_room", async (data) => {

            try {
                let room = await joinRoomService({
                    room_id: data.room_id,
                    user_id
                })
                if (!room) {
                    throw new AppError("Room not found", 404)
                }
                socket.join(data.room_id);
                socket.emit("room_joined", {
                    message: "Joined room successfully",
                    status: true,
                    room_id: data.room_id
                })


            } catch (err) {
                return socket.emit("room_error", {
                    message: err.message,
                    status: false,
                    statusCode: err.status || 500
                })
            }
        })



        socket.on("disconnect", () => {
            console.log('a user is disconnected', socket.id);
        })
    })
    return io;
}

