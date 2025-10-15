import { Router } from "express";
import { asyncHandler } from "../../utils/error handling/asynchandler.js";
import validation from "../../middleware/validation.meddleware.js";
import isAdminAuthenticated from "../../middleware/admin-authentication.middleware.js";
import * as contentService from "./content.service.js";
import * as contentSchema from "./content.validation.js";

const router = Router();

/**
 * @route   POST /content
 * @desc    Create new content with multilingual translations
 * @access  Private (Admin only)
 */
router.post(
  "/",
  isAdminAuthenticated,
  validation(contentSchema.createContent),
  asyncHandler(contentService.createContent)
);

/**
 * @route   PUT /content/:id
 * @desc    Update existing content
 * @access  Private (Admin only)
 */
router.put(
  "/:id",
  isAdminAuthenticated,
  validation(contentSchema.updateContent),
  asyncHandler(contentService.updateContent)
);

/**
 * @route   DELETE /content/:id
 * @desc    Delete content
 * @access  Private (Admin only)
 */
router.delete(
  "/:id",
  isAdminAuthenticated,
  validation(contentSchema.deleteContent),
  asyncHandler(contentService.deleteContent)
);

/**
 * @route   GET /content
 * @desc    Get all content with pagination
 * @access  Private (Admin only)
 */
router.get(
  "/",
  isAdminAuthenticated,
  validation(contentSchema.getAllContent),
  asyncHandler(contentService.getAllContent)
);

/**
 * @route   GET /content/:id
 * @desc    Get content by ID
 * @access  Private (Admin only)
 */
router.get(
  "/:id",
  isAdminAuthenticated,
  validation(contentSchema.getContentById),
  asyncHandler(contentService.getContentById)
);

/**
 * @route   GET /content/section/:section
 * @desc    Get content by section
 * @access  Private (Admin only)
 */
router.get(
  "/section/:section",
  isAdminAuthenticated,
  asyncHandler(contentService.getContentBySection)
);

export default router;
