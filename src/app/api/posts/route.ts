import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const body = await request.json(); 
  console.log(body)
  const client = await clientPromise;
  const db = client.db("my-blog-db");
  await db.collection("blog-data").insertOne({
  title: body.title,
  content : body.content
  });
  return NextResponse.json({ success: true });
}
