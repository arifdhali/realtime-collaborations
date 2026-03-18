import { NextFunction, Request, Response } from "express"
import { ObjectSchema } from "joi"

export const ValidateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = await schema.validateAsync(req.body, {
                abortEarly: false,
                convert: true
            })
            next();
        } catch (err) {
            next(err)
        }
    }
}

