import { StoreData } from "@/app/lib/postgres";
import { NextRequest, NextResponse } from "next/server";
export async function POST(response:NextRequest){
  const Data = await response.json();
  const result = await StoreData(Data);
  return NextResponse.json(result)

}