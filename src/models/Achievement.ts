import mongoose from "mongoose";

const AchievementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true }, // e.g., "High School", "University"
    organizer: { type: String, required: true },
    description: { type: String, required: true },
    imageSrc: { type: String },
    link: { type: String },
    imageClassName: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Achievement || mongoose.model("Achievement", AchievementSchema);
