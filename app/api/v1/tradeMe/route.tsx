import { NextResponse } from "next/server";
// export const dynamic = "force-dynamic";
export async function GET(req, res) {
  return NextResponse.json("Hello 🧨🧨", { status: 200 });
}
