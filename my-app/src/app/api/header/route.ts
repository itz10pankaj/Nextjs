import { NextResponse } from 'next/server';
import links from "@/utlis/headerData.json";
export async function GET() {
  return NextResponse.json(links);
}