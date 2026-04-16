import { Server } from "socket.io"


export const initSocket = (io: Server) => {

    io.on("connection", (socket) => {
        console.log('a user is connected', socket.id);

        socket.on("disconnect", () => {
            console.log('a user is disconnected', socket.id);
        })
    })    
}