import Joi from "joi";

/**
 * Create admin validation schema
 */
export const createAdmin = Joi.object({
  name: Joi.string().min(2).required().messages({
    "string.min": "Name must be at least 2 characters",
    "any.required": "Name is required",
  }),
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
 * Update admin validation schema
 */
export const updateAdmin = Joi.object({
  name: Joi.string().min(2),
  email: Joi.string().email(),
  password: Joi.string().min(6),
}).min(1).required();

/**
 * Get admin by ID validation schema
 */
export const getAdminById = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    "string.hex": "Invalid admin ID format",
    "string.length": "Invalid admin ID format",
    "any.required": "Admin ID is required",
  }),
}).required();

/**
 * Delete admin validation schema
 */
export const deleteAdmin = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    "string.hex": "Invalid admin ID format",
    "string.length": "Invalid admin ID format",
    "any.required": "Admin ID is required",
  }),
}).required();

/**
 * Get all admins validation schema
 */
export const getAllAdmins = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  search: Joi.string().allow(""),
}).unknown(true);
