import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, context: { params: { id: string } }) {
 
  const params = await context.params; 

  if (!params?.id) {
    return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("my-blog-db");

    const result = await db
      .collection("blog-data")
      .deleteOne({ _id: new ObjectId(params.id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, deletedId: params.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Error deleting post" }, { status: 500 });
  }
}
