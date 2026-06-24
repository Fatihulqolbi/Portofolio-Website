import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Writing from "@/models/Writing";

export async function GET() {
  try {
    await connectToDatabase();
    const writings = await Writing.find({}).sort({ createdAt: -1 });
    return NextResponse.json(writings);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch writings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const newWriting = await Writing.create(data);
    return NextResponse.json(newWriting, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
