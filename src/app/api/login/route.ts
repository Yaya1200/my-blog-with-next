import { NextResponse,NextRequest } from "next/server";
import { GetData } from "@/app/lib/postgres";
export async function POST(res:NextRequest) {
  const data = await res.json();
  const result = await GetData(data);
  return NextResponse.json(result);
}