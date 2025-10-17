import { generateToken } from "../../utils/token/token.js";
import { Admin } from "../../DB/models/admin.model.js";

export const register = async (req, res, next) => {
  const { email, password } = req.body;

  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    return next(new Error("Admin already exists with this email!"), { cause: 409 });
  }

  const newAdmin = await Admin.create({
    email,
    password,
  });

  return res.status(201).json({
    success: true,
    message: "Admin registered successfully",
  });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  // Find admin by email
  let user = await Admin.findOne({ email });
  if (!user) {
    return next(new Error("Invalid email or password!"), { cause: 401 });
  }

  // Verify password
  const isPasswordValid = compareHash({ plainText: password, hash: user.password });
  if (!isPasswordValid) {
    return next(new Error("Invalid email or password!"), { cause: 401 });
  }

  // Generate token
  const token = generateToken({
    payload: { id: user._id, email: user.email },
  });

  return res.status(200).json({
    success: true,
    message: "Login successful",
    token,
    admin: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};

export const logout = async (req, res, next) => {
  // Logout logic (token invalidation can be handled on client side or using token blacklist)
  return res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};

