import mongoose, { Types } from "mongoose";

const settingsSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: Types.Mixed,
    required: true,
  },
  updatedBy: {
    type: Types.ObjectId,
    ref: "User",
  },
}, { timestamps: true });

export const Settings = mongoose.model("Settings", settingsSchema);
