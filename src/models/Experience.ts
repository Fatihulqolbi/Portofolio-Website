import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    organization: { type: String, required: true },
    period: { type: String, required: true },
    type: { type: String, required: true }, // "Academic" | "Non-Academic"
    description: { type: String, required: true },
    highlights: [{ type: String }],
    imageSrc: { type: String },
    logoSrc: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Experience || mongoose.model("Experience", ExperienceSchema);
