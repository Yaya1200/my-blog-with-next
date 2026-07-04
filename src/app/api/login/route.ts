import { NextResponse, NextRequest } from "next/server";
import { GetData } from "@/app/lib/postgres";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (!data?.username || !data?.password) {
      return NextResponse.json({ success: false, message: "Missing username or password" }, { status: 400 });
    }

    const result = await GetData(data);
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}