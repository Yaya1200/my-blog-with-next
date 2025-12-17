import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  try{
  const body = await request.json(); 
  const client = await clientPromise;
  const db = client.db("my-blog-db");
  await db.collection("blog-data").insertOne({
  title: body.title,
  content : body.content
  });
  return NextResponse.json({ success: true });}
  catch(error){
    return NextResponse.json({success:false, error:"there is an error to create post"},{status:500})
  }
}
export async function GET() {
  try{
  const client = await clientPromise;
  const db = client.db("my-blog-db");
  const data = await db.collection("blog-data").find().toArray();
  return NextResponse.json({success:true, data})}
  catch(error){
    return NextResponse.json({success:false, error: "there is an error fetching the data"}, {status:500})
  }
  
}
export async function DELETE(request:Request, { params }: { params: { id: string }}) {
  try{
    const client = await clientPromise;
    const db = client.db("my-blog-db");
    const data = db.collection("my-blog-db").deleteOne({_id: new ObjectId(params.id)})
    return NextResponse.json({success:true, data})
  }
  catch(error){
    return NextResponse.json({success:false, error:"there is an error deleteing the content"})
  }
  
}