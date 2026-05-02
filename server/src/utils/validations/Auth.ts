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

export const Sing_up_schema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages({
        "string.base": "Name must be a string",
        "string.empty": "Name is required",
        "string.min": "Name must be at least 3 characters",
        "any.required": "Name is required"
    }),

    email: Joi.string().email().required().messages({
        "string.email": "Invalid email format",
        "string.empty": "Email is required",
        "any.required": "Email is required"
    }),

    password: Joi.string().min(6).required().messages({
        "string.min": "Password must be at least 6 characters",
        "string.empty": "Password is required",
        "any.required": "Password is required"
    }),

    mobile: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
        "string.pattern.base": "Mobile must be 10 digits",
        "string.empty": "Mobile is required",
        "any.required": "Mobile is required"
    })
})