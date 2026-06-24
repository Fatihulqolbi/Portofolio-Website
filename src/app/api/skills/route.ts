import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Skill from "@/models/Skill";

export async function GET() {
  try {
    await connectToDatabase();
    const skills = await Skill.find({}).sort({ createdAt: 1 });
    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const newSkill = await Skill.create(data);
    return NextResponse.json(newSkill, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
