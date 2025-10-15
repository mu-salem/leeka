import Joi from "joi";

/**
 * Create content validation schema
 */
export const createContent = Joi.object({
  section: Joi.string().required().messages({
    "any.required": "Section is required",
  }),
  key: Joi.string().required().messages({
    "any.required": "Key is required",
  }),
  type: Joi.string().valid("text", "image", "number").default("text"),
  value: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
  translations: Joi.object({
    en: Joi.string().required().messages({
      "any.required": "English translation is required",
    }),
    ar: Joi.string().required().messages({
      "any.required": "Arabic translation is required",
    }),
    fr: Joi.string().required().messages({
      "any.required": "French translation is required",
    }),
  }).required().messages({
    "any.required": "All translations (en, ar, fr) are required",
  }),
}).required();

/**
 * Update content validation schema
 */
export const updateContent = Joi.object({
  section: Joi.string(),
  key: Joi.string(),
  type: Joi.string().valid("text", "image", "number"),
  value: Joi.alternatives().try(Joi.string(), Joi.number()),
  translations: Joi.object({
    en: Joi.string().required().messages({
      "any.required": "English translation is required",
    }),
    ar: Joi.string().required().messages({
      "any.required": "Arabic translation is required",
    }),
    fr: Joi.string().required().messages({
      "any.required": "French translation is required",
    }),
  }).messages({
    "any.required": "All translations (en, ar, fr) must be provided when updating translations",
  }),
}).min(1).required();

/**
 * Get content by ID validation schema
 */
export const getContentById = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    "string.hex": "Invalid content ID format",
    "string.length": "Invalid content ID format",
    "any.required": "Content ID is required",
  }),
}).required();

/**
 * Delete content validation schema
 */
export const deleteContent = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    "string.hex": "Invalid content ID format",
    "string.length": "Invalid content ID format",
    "any.required": "Content ID is required",
  }),
}).required();

/**
 * Get all content validation schema
 */
export const getAllContent = Joi.object({
  section: Joi.string().allow(""),
  type: Joi.string().valid("text", "image", "number", "all").default("all"),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
}).unknown(true);
