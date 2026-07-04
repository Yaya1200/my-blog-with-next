import clientPromise from "@/app/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body?.title || !body?.content) {
      return NextResponse.json({ success: false, error: "Missing title or content" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("my-blog-db");
    const res = await db.collection("blog-data").insertOne({
      title: body.title,
      content: body.content,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, insertedId: res.insertedId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Error creating post" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("my-blog-db");
    const data = await db.collection("blog-data").find().toArray();
    return NextResponse.json({ success: true, data: data || [] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Error fetching posts" }, { status: 500 });
  }
}
