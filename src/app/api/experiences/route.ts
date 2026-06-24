import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Experience from "@/models/Experience";

export async function GET() {
  try {
    await connectToDatabase();
    const experiences = await Experience.find({}).sort({ createdAt: -1 });
    return NextResponse.json(experiences);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch experiences" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const newExperience = await Experience.create(data);
    return NextResponse.json(newExperience, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
