import { Router } from "express";
import { asyncHandler } from "../../utils/error handling/asynchandler.js";
import validation from "../../middleware/validation.meddleware.js";
import isAdminAuthenticated from "../../middleware/admin-authentication.middleware.js";
import * as adminService from "./admin.service.js";
import * as adminSchema from "./admin.validation.js";

const router = Router();

/**
 * @route   POST /admin
 * @desc    Create new admin
 * @access  Private (Admin only)
 */
router.post(
  "/",
  isAdminAuthenticated,
  validation(adminSchema.createAdmin),
  asyncHandler(adminService.createAdmin)
);

/**
 * @route   PUT /admin/:id
 * @desc    Update existing admin
 * @access  Private (Admin only)
 */
router.put(
  "/:id",
  isAdminAuthenticated,
  validation(adminSchema.updateAdmin),
  asyncHandler(adminService.updateAdmin)
);

/**
 * @route   DELETE /admin/:id
 * @desc    Delete admin
 * @access  Private (Admin only)
 */
router.delete(
  "/:id",
  isAdminAuthenticated,
  validation(adminSchema.deleteAdmin),
  asyncHandler(adminService.deleteAdmin)
);

/**
 * @route   GET /admin
 * @desc    Get all admins with pagination
 * @access  Private (Admin only)
 */
router.get(
  "/",
  isAdminAuthenticated,
  validation(adminSchema.getAllAdmins),
  asyncHandler(adminService.getAllAdmins)
);

/**
 * @route   GET /admin/:id
 * @desc    Get admin by ID
 * @access  Private (Admin only)
 */
router.get(
  "/:id",
  isAdminAuthenticated,
  validation(adminSchema.getAdminById),
  asyncHandler(adminService.getAdminById)
);

export default router;
