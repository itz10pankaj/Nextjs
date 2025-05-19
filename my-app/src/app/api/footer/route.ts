import { NextResponse } from 'next/server';
import links from "@/utlis/footerData.json"
export async function GET() {
  return NextResponse.json(links);
}