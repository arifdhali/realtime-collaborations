import mongoose, { Schema } from "mongoose";

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
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
        index: true
    },
    users: [
        {
            socketId: String,
            user_id: {
                type:Schema.Types.ObjectId,
                ref: "User"
            }
        }
    ],
    status: {
        type: Boolean,
        default: true
    },
    limit_users:{
        type:Number,
        default: 5
    }
}, { timestamps: true })
export const Room = mongoose.model("Room", roomSchema)