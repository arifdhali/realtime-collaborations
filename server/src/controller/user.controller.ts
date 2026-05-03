import { User } from "@/models/User";
import AppError from "@/utils/AppError";
import { success } from "@/utils/response";
import { NextFunction, Request, Response } from "express";

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {

    let { id } = req?.user;
    if(!id){
        return next(new AppError("User ID not found in request", 400));
    }
     try {
        let profile = await User.findById(id).select("-__v -password -createdAt -updatedAt").lean();

        if (!profile) {
            return next(new AppError("User not found", 404));
        }

        success(res, { profile }, "Profile fetched successfully", 200);
    } catch (err) {
        next(err);
    }
}
