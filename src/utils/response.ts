import { Response } from "express";

export const success = (res: Response, data = {}, message: string = "success", status: number) => {

    return res.status(status).json({
        success: true,
        message: message,
        data
    })

}


export const error = (res: Response, errors: [], message: string = "Error", status: number) => {

    return res.status(status).json({
        success: false,
        message: message,
        errors
    })


}