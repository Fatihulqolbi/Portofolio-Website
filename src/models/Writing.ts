import mongoose from "mongoose";

const WritingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true }, // e.g., "Essay", "Karya Tulis Ilmiah", "Lainnya"
    date: { type: String },
    excerpt: { type: String, required: true },
    link: { type: String },
    imageSrc: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Writing || mongoose.model("Writing", WritingSchema);
