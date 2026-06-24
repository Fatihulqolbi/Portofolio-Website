import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Project from "@/models/Project";
import Experience from "@/models/Experience";
import Achievement from "@/models/Achievement";
import Writing from "@/models/Writing";
import Skill from "@/models/Skill";
import Photo from "@/models/Photo";

export async function GET() {
  try {
    await connectToDatabase();

    // Only seed the generic Coming Soon project if projects are empty
    const existingProjects = await Project.countDocuments();
    if (existingProjects === 0) {
      const comingSoonProject = {
        title: "Coming Soon",
        category: "All",
        description: "My latest works are currently being refined. Please check back later!",
        status: "Ongoing",
        techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
        liveUrl: "",
        image: "",
      };
      await Project.create(comingSoonProject);
    }

    return NextResponse.json({ message: "Database verified successfully!" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
