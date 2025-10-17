import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
  {
    section: {
      type: String,
      required: true,
    },
    key: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["text", "image", "number"],
      default: "text",
    },
    value: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    translations: {
      en: { type: String },
      ar: { type: String },
      zh: { type: String },
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Content = mongoose.model("Content", contentSchema);
