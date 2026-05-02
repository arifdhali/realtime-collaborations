import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    roomId: {
        type: String,
        unique: true,
        required: true
    },
    code: {
        type: String,
        default: "// Start coding"
    },
    language: {
        type: String,
        enum: ["javascript", "python", "java", "c++"],
        default: "javascript"
    },
    createdBy: {
        userId: Number,
        username: String
    },
    users: [
        {
            socketId: String,
            username: String
        }
    ]
}, { timestamps: true })
export const Room = mongoose.model("Room", roomSchema)