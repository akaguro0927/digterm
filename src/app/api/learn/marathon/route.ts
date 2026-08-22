import { NextResponse } from "next/server";
import { marathonQuestionSet } from "@/lib/journey/questions";
import { getServerEntitlement } from "@/lib/supabase/server";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const scope = new URL(req.url).searchParams.get("scope") ?? "all";
  if (scope !== "all" && scope !== "beginner" && scope !== "intermediate" && scope !== "advanced") return NextResponse.json({ error: "invalid_scope" }, { status: 400 });
  const { hasPaidAccess } = await getServerEntitlement();
  return NextResponse.json({ questions: marathonQuestionSet(scope, hasPaidAccess) }, { headers: { "Cache-Control": "private, no-store" } });
}
