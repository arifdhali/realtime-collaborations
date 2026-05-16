import { NextFunction, Request, Response } from "express";
import AppError from "@/utils/AppError";
import { success } from "@/utils/response";
import { User } from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createAccount = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, mobile } = req.body;

    try {

        const user = await User.findOne({
            $or: [
                { email },
                { mobile }
            ]
        });
        if (user) {
            return next(new AppError("User already exists", 400));
        }
        let hashedPass = await bcrypt.hash(password, parseInt(process.env.SALT_ROUND as any));

        let newUser = await User.create({
            name,
            email,
            password: hashedPass,
            mobile,
            device_type: "web",
        });


        success(res, {}, "Account created successfully", 201);


    } catch (err) {
        next(err);
    }
}
export const Singin = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {


        const user = await User.findOne({ email, status: true });

        if (!user) {
            return next(new AppError("User is not exists", 404))
        }

        let comparedPass = await bcrypt.compare(password, user.password);

        if (!comparedPass) {
            return next(new AppError("Entered credentials not valid", 401))
        };
        let payload = {
            id: user._id,
            name: user.name,
            email: user.email,
        }

        let token = jwt.sign(payload, process.env.JWT_SECRET_KEY as string, {
            expiresIn: "7d"
        });


        await User?.updateOne(
            { _id: user.id },
            { $set: { last_access: new Date() } }
        )
        res.cookie("auth_token", token, {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1 * 24 * 60 * 60 * 1000
        })

        success(res, { token }, "Login successful", 200);

    } catch (err) {
        next(err);
    }
}
export const forgotPassword = (req: Request, res: Response, next: NextFunction) => {
    res.send("forgotPassword");
    try {

    } catch (err) {
        next(err);
    }
}
export const logout = (req: Request, res: Response, next: NextFunction) => {
    res.send("login");
    try {

    } catch (err) {
        next(err);
    }
}
