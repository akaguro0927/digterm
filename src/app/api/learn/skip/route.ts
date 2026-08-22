import { NextResponse } from "next/server";
import { skipQuestionSet } from "@/lib/journey/questions";
import { getServerEntitlement } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const level = new URL(req.url).searchParams.get("level");
  if (level !== "beginner" && level !== "intermediate" && level !== "advanced") return NextResponse.json({ error: "invalid_level" }, { status: 400 });
  const { hasPaidAccess } = await getServerEntitlement();
  const data = skipQuestionSet(level, hasPaidAccess);
  if (!data) return NextResponse.json({ error: "paid_access_required" }, { status: 403 });
  return NextResponse.json(data, { headers: { "Cache-Control": "private, no-store" } });
}
