import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    techStack: [{ type: String }],
    image: { type: String },
    liveUrl: { type: String },
    githubUrl: { type: String },
    status: { type: String, default: "Ongoing" },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);
