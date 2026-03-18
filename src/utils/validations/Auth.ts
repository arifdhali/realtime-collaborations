import Joi from "joi";

export const Sign_in_Schema = Joi.object({
    email: Joi.string().email().required().lowercase().messages(
        {
            "string.any": "Email is required",
            "string.email": "Enter valid email",
            "string.empty": "Email is required",
            "string.required": "Email is required",
        }
    ),
    password: Joi.string().trim().required().lowercase().messages(
        {
            "string.any": "Password is required",
            "string.empty": "Password is required",
            "string.required": "Password is required",
        }
    )
}).unknown(false);