import { Router } from "express";
import { asyncHandler } from "../../utils/error handling/asynchandler.js";
import validation from "../../middleware/validation.meddleware.js";
import * as authService from "./auth.service.js";
import * as authSchema from "./auth.validation.js";

const router = Router();

export default router;
