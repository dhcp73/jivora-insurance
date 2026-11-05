import { NextResponse } from "next/server";
import { estimateMotor } from "@/lib/calculators";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = estimateMotor(body);
    return NextResponse.json({ ok: true, result });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Failed" }, { status: 400 });
  }
}
