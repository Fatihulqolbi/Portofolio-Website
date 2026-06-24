import mongoose from "mongoose";

const PhotoSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    className: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Photo || mongoose.model("Photo", PhotoSchema);
