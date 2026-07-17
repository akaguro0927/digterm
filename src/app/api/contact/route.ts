import { NextResponse } from "next/server";

// お問い合わせ受け口。
// ※いまはモック（受け取って ok を返すだけ）。本番では Supabase へ保存 or メール送信する。
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { name?: string; email?: string; category?: string; message?: string };
    if (!body.message || !body.message.trim()) {
      return NextResponse.json({ error: "empty" }, { status: 400 });
    }
    // TODO(本番): Supabase の inquiries テーブルへ insert、または通知メール送信。
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
}
