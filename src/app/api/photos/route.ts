import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Photo from "@/models/Photo";

export async function GET() {
  try {
    await connectToDatabase();
    const photos = await Photo.find({});
    return NextResponse.json(photos);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch photos" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const newPhoto = await Photo.create(data);
    return NextResponse.json(newPhoto, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
