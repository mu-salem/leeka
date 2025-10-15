import { Router } from "express";
import { asyncHandler } from "../../utils/error handling/asynchandler.js";
import validation from "../../middleware/validation.meddleware.js";
import isAdminAuthenticated from "../../middleware/admin-authentication.middleware.js";
import * as authService from "./auth.service.js";
import * as authSchema from "./auth.validation.js";

const router = Router();

/**
 * @route   POST /auth/login
 * @desc    Authenticate admin and get token
 * @access  Public
 */
router.post(
  "/login",
  validation(authSchema.login),
  asyncHandler(authService.login)
);

/**
 * @route   POST /auth/logout
 * @desc    Logout admin
 * @access  Private
 */
router.post(
  "/logout",
  isAdminAuthenticated,
  validation(authSchema.logout),
  asyncHandler(authService.logout)
);

export default router;
