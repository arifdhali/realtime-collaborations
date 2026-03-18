import { NextFunction, Request, Response } from "express"
import { error } from "../utils/response";

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {


    if (err.isJoi) {
        let validationError = err.details.map((e: any) => {
            return {
                field: e.path.join(),
                message: e.message
            }
        })

        return error(res, validationError, "Validation failed", 400);
    }

    return error(
        res,
        err.errors || [],
        err.message || "Internal server error",
        err.status || 500
    );

}


export default errorMiddleware;