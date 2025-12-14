import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const body = await request.json(); 
  const client = await clientPromise;
  const db = client.db("my-blog-db");
  await db.collection("blog-data").insertOne({          
    title: body.name,
    content: body.content,
  });
  return NextResponse.json({ success: true });
}
