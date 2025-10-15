import { Router } from "express";
import { asyncHandler } from "../../utils/error handling/asynchandler.js";
import validation from "../../middleware/validation.meddleware.js";
import isAdminAuthenticated from "../../middleware/admin-authentication.middleware.js";
import { uploadCloud } from "../../utils/file uploading/multerCloud.js";
import * as worksService from "./works.service.js";
import * as worksSchema from "./works.validation.js";

const router = Router();

/**
 * @route   POST /works
 * @desc    Create new work with image upload
 * @access  Private (Admin only)
 */
router.post(
  "/",
  isAdminAuthenticated,
  uploadCloud().single("image"),
  validation(worksSchema.createWork),
  asyncHandler(worksService.createWork)
);

/**
 * @route   PUT /works/:id
 * @desc    Update existing work
 * @access  Private (Admin only)
 */
router.put(
  "/:id",
  isAdminAuthenticated,
  uploadCloud().single("image"),
  validation(worksSchema.updateWork),
  asyncHandler(worksService.updateWork)
);

/**
 * @route   DELETE /works/:id
 * @desc    Delete work
 * @access  Private (Admin only)
 */
router.delete(
  "/:id",
  isAdminAuthenticated,
  validation(worksSchema.deleteWork),
  asyncHandler(worksService.deleteWork)
);

/**
 * @route   GET /works
 * @desc    Get all works with pagination
 * @access  Private (Admin only)
 */
router.get(
  "/",
  isAdminAuthenticated,
  validation(worksSchema.getAllWorks),
  asyncHandler(worksService.getAllWorks)
);

/**
 * @route   GET /works/:id
 * @desc    Get work by ID
 * @access  Private (Admin only)
 */
router.get(
  "/:id",
  isAdminAuthenticated,
  validation(worksSchema.getWorkById),
  asyncHandler(worksService.getWorkById)
);

export default router;
