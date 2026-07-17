import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe/server";

// Stripe からのイベント受け口。署名を検証し、購読状態を反映する。
// ※本番では Supabase の subscriptions テーブルへ書き込む（service role キー使用）。
//   キー未設定時は安全にスキップ（アプリを壊さない）。
export const runtime = "nodejs";

export async function POST(req: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) {
    return NextResponse.json({ ok: true, skipped: true });
  }
  const sig = req.headers.get("stripe-signature") ?? "";
  const body = await req.text();
  let event: import("stripe").Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch {
    return NextResponse.json({ error: "bad_signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed":
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
      // TODO(本番): event から user を特定し、Supabase subscriptions に status を upsert。
      //   例: active/canceled を保存し、アプリ側はそれを見て VIP 判定する。
      break;
    default:
      break;
  }
  return NextResponse.json({ received: true });
}
