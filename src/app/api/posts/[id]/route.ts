import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";


type Params = { id: string };

export async function DELETE(
  request: NextRequest,
  context: { params: Params | Promise<Params> }
) {
  
  const params = await context.params;
  const { id } = params;

  if (!id) {
    return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("my-blog-db");

    const result = await db.collection("blog-data").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, deletedId: id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Error deleting post" }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Params | Promise<Params> }
) {
  const params = await context.params; 
  const { id } = params;

  if (!id) {
    return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("my-blog-db");

    const { title, content } = await request.json();

    const result = await db.collection("blog-data").updateOne(
      { _id: new ObjectId(id) },
      { $set: { title, content } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Error editing the content" }, { status: 500 });
  }
}
