import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    url: {
      secure_url: String,
      public_id: String,
    },
    type: {
      type: String,
      enum: ["image", "video", "document"],
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    altText: String,
    size: Number,
  },
  { timestamps: true }
);

export const Media = mongoose.model("Media", mediaSchema);
