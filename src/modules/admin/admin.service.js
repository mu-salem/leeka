import { Admin } from "../../DB/models/admin.model.js";
import bcrypt from "bcrypt";

/**
 * Create new admin
 */
export const createAdmin = async (req, res, next) => {
  const { name, email, password } = req.body;

  // Check if admin already exists
  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    return next(new Error("Admin with this email already exists!"), { cause: 409 });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create admin
  const admin = await Admin.create({
    name,
    email,
    password: hashedPassword,
  });

  return res.status(201).json({
    success: true,
    message: "Admin created successfully",
    data: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
    },
  });
};

/**
 * Update admin
 */
export const updateAdmin = async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  // Find admin
  const admin = await Admin.findById(id);
  if (!admin) {
    return next(new Error("Admin not found!"), { cause: 404 });
  }

  // If email is being updated, check if it's already taken
  if (updateData.email && updateData.email !== admin.email) {
    const existingAdmin = await Admin.findOne({ email: updateData.email });
    if (existingAdmin) {
      return next(new Error("Email already in use!"), { cause: 409 });
    }
  }

  // If password is being updated, hash it
  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }

  // Update admin
  const updatedAdmin = await Admin.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).select("-password");

  return res.status(200).json({
    success: true,
    message: "Admin updated successfully",
    data: updatedAdmin,
  });
};

/**
 * Delete admin
 */
export const deleteAdmin = async (req, res, next) => {
  const { id } = req.params;

  // Prevent deleting self
  if (id === req.admin._id.toString()) {
    return next(new Error("You cannot delete your own account!"), { cause: 400 });
  }

  // Find admin
  const admin = await Admin.findById(id);
  if (!admin) {
    return next(new Error("Admin not found!"), { cause: 404 });
  }

  // Delete admin
  await Admin.findByIdAndDelete(id);

  return res.status(200).json({
    success: true,
    message: "Admin deleted successfully",
  });
};

/**
 * Get all admins with pagination
 */
export const getAllAdmins = async (req, res, next) => {
  const { page = 1, limit = 10, search = "" } = req.query;

  // Build query
  const query = {};
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  // Get total count
  const total = await Admin.countDocuments(query);

  // Get admins
  const admins = await Admin.find(query)
    .select("-password")
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 })
    .lean();

  return res.status(200).json({
    success: true,
    data: admins,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(total / limit),
    },
  });
};

/**
 * Get admin by ID
 */
export const getAdminById = async (req, res, next) => {
  const { id } = req.params;

  const admin = await Admin.findById(id).select("-password").lean();

  if (!admin) {
    return next(new Error("Admin not found!"), { cause: 404 });
  }

  return res.status(200).json({
    success: true,
    data: admin,
  });
};
