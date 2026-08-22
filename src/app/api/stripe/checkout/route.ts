import { NextResponse } from "next/server";
import { appOrigin, getStripe, priceIdForPlan, checkoutModeForPlan } from "@/lib/stripe/server";
import { getServerUser } from "@/lib/supabase/server";

// 申し込み（VIPサブスク or 買い切り）→ Stripe Checkout セッションを作成して URL を返す。
// 未設定時は { demo:true } を返し、フロントはデモ（ローカル切替）にフォールバックする。
export const runtime = "nodejs";

export async function POST(req: Request) {
  const stripe = getStripe();
  const body = (await req.json().catch(() => ({}))) as {
    plan?: "vip" | "lifetime";
  };
  const plan = body.plan === "lifetime" ? "lifetime" : "vip";
  const price = priceIdForPlan(plan);
  if (!stripe || !price) {
    return NextResponse.json({ demo: true, plan });
  }
  // 課金を他人のアカウントに紐付けられないよう、本文のuserId/emailは受け取らない。
  // CookieセッションをAuthサーバーで検証した本人だけがCheckoutを開始できる。
  const user = await getServerUser();
  if (!user) {
    return NextResponse.json({ error: "login_required" }, { status: 401 });
  }
  try {
    const origin = appOrigin(req.url);
    const mode = checkoutModeForPlan(plan);
    // Webhook が「誰の・どのプランの支払いか」を特定できるよう、検証済みのIDだけを持たせる。
    const meta = { plan, userId: user.id };
    const session = await stripe.checkout.sessions.create({
      mode,
      line_items: [{ price, quantity: 1 }],
      customer_email: user.email || undefined,
      client_reference_id: user.id,
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
