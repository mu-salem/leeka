import { Router } from "express";
import { asyncHandler } from "../../utils/error handling/asynchandler.js";
import validation from "../../middleware/validation.meddleware.js";
import * as authService from "./auth.service.js";
import * as authSchema from "./auth.validation.js";

const router = Router();

/**
 * @route   POST /auth/register
 * @desc    Register a new admin
 * @access  Public
 */
router.post(
  "/register",
  validation(authSchema.register),
  asyncHandler(authService.register)
);

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

export default router;
