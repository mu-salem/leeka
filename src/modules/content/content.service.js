import { Content } from "../../DB/models/content.model.js";

export const createContent = async (req, res, next) => {
  const { section, key, type, value, translations } = req.body;

  // Validate that all three languages are provided
  if (!translations || !translations.en || !translations.ar || !translations.fr) {
    return next(
      new Error("All translations (English, Arabic, French) are required!"),
      { cause: 400 }
    );
  }

  const existingContent = await Content.findOne({ section, key });
  if (existingContent) {
    return next(
      new Error("Content with this section and key already exists!"),
      { cause: 409 }
    );
  }

  const content = await Content.create({
    section,
    key,
    type: type || "text",
    value,
    translations,
    updatedBy: req.admin._id,
  });

  return res.status(201).json({
    success: true,
    message: "Content created successfully",
    data: content,
  });
};

export const updateContent = async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  const content = await Content.findById(id);
  if (!content) {
    return next(new Error("Content not found!"), { cause: 404 });
  }

  if (updateData.translations) {
    if (
      !updateData.translations.en ||
      !updateData.translations.ar ||
      !updateData.translations.fr
    ) {
      return next(
        new Error("All translations (English, Arabic, French) must be provided!"),
        { cause: 400 }
      );
    }
  }

  updateData.updatedBy = req.admin._id;
  const updatedContent = await Content.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  return res.status(200).json({
    success: true,
    message: "Content updated successfully",
    data: updatedContent,
  });
};

export const deleteContent = async (req, res, next) => {
  const { id } = req.params;

  const content = await Content.findById(id);
  if (!content) {
    return next(new Error("Content not found!"), { cause: 404 });
  }

  await Content.findByIdAndDelete(id);

  return res.status(200).json({
    success: true,
    message: "Content deleted successfully",
  });
};

export const getAllContent = async (req, res, next) => {
  const { page = 1, limit = 10, section = "", type = "all" } = req.query;

  // Build query
  const query = {};
  if (section) {
    query.section = section;
  }
  if (type !== "all") {
    query.type = type;
  }

  const total = await Content.countDocuments(query);

  const content = await Content.find(query)
    .populate("updatedBy", "name email")
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ section: 1, key: 1 })
    .lean();

  return res.status(200).json({
    success: true,
    data: content,
    pagination: {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      pages: Math.ceil(total / limit),
    },
  });
};

export const getContentById = async (req, res, next) => {
  const { id } = req.params;

  const content = await Content.findById(id)
    .populate("updatedBy", "name email")
    .lean();

  if (!content) {
    return next(new Error("Content not found!"), { cause: 404 });
  }

  return res.status(200).json({
    success: true,
    data: content,
  });
};

export const getContentBySection = async (req, res, next) => {
  const { section } = req.params;

  const content = await Content.find({ section })
    .populate("updatedBy", "name email")
    .sort({ key: 1 })
    .lean();

  return res.status(200).json({
    success: true,
    data: content,
  });
};
