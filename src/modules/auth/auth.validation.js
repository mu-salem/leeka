import Joi from "joi";

/**
 * Login validation schema
 */
export const login = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters",
    "any.required": "Password is required",
  }),
}).required();

/**
 * Logout validation schema
 */
export const logout = Joi.object({}).unknown(true);
