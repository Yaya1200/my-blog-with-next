import { StoreData } from "@/app/lib/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    if (!data?.username || !data?.password) {
      return NextResponse.json({ success: false, message: "Missing username or password" }, { status: 400 });
    }

    const result = await StoreData(data);
    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

