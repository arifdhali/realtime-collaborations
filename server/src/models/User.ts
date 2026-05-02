import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    address: {
        type: String,
    },
    device_type: {
        type: String,
        enum: ["web", "mobile"],
        required: true,
        default: "web"
    },
    last_access: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default:true,
    }
}, { timestamps: true });
export const User = mongoose.model("User", userSchema);