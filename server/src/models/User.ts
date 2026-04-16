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
        required: true,
        enum: ["user", "admin"]
    },
    address: {
        type: String,
    },
    device_type: {
        type: String,
        required: true
    },
    last_access: {
        type: Date,
        default: Date.now
    },

}, { timestamps: true });
export const User = mongoose.model("User", userSchema);