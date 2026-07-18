import { NextResponse } from "next/server";
import { getStripe, priceIdForPlan, checkoutModeForPlan } from "@/lib/stripe/server";

// 申し込み（VIPサブスク or 買い切り）→ Stripe Checkout セッションを作成して URL を返す。
// 未設定時は { demo:true } を返し、フロントはデモ（ローカル切替）にフォールバックする。
export const runtime = "nodejs";

export async function POST(req: Request) {
  const stripe = getStripe();
  const body = (await req.json().catch(() => ({}))) as {
    email?: string;
    userId?: string;
    plan?: "vip" | "lifetime";
  };
  const plan = body.plan === "lifetime" ? "lifetime" : "vip";
  const price = priceIdForPlan(plan);
  if (!stripe || !price) {
    return NextResponse.json({ demo: true, plan });
  }
  try {
    const origin = req.headers.get("origin") ?? "http://localhost:3000";
    const mode = checkoutModeForPlan(plan);
    // Webhook が「誰の・どのプランの支払いか」を特定できるよう userId/plan を持たせる
    const meta = { plan, userId: body.userId ?? "" };
    const session = await stripe.checkout.sessions.create({
      mode,
      line_items: [{ price, quantity: 1 }],
      customer_email: body.email || undefined,
      client_reference_id: body.userId || undefined,
      metadata: meta,
      // サブスクの更新/解約イベントにも userId を載せておく（後追いで状態同期するため）
      ...(mode === "subscription"
        ? { subscription_data: { metadata: meta } }
        : { payment_intent_data: { metadata: meta } }),
      success_url: `${origin}/vip?success=1`,
      cancel_url: `${origin}/vip?canceled=1`,
      allow_promotion_codes: true,
    });
    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json({ error: "checkout_failed" }, { status: 500 });
  }
}
