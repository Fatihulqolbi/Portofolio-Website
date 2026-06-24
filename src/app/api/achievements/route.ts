import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Achievement from "@/models/Achievement";

export async function GET() {
  try {
    await connectToDatabase();
    const achievements = await Achievement.find({}).sort({ createdAt: -1 });
    return NextResponse.json(achievements);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch achievements" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const newAchievement = await Achievement.create(data);
    return NextResponse.json(newAchievement, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
