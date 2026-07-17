import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe/server";

// VIP申し込み → Stripe Checkout セッションを作成して URL を返す。
// 未設定時は { demo:true } を返し、フロントはデモ（ローカル切替）にフォールバック。
export const runtime = "nodejs";

export async function POST(req: Request) {
  const stripe = getStripe();
  const price = process.env.STRIPE_PRICE_ID;
  if (!stripe || !price) {
    return NextResponse.json({ demo: true });
  }
  try {
    const { email } = (await req.json().catch(() => ({}))) as { email?: string };
    const origin = req.headers.get("origin") ?? "http://localhost:3000";
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price, quantity: 1 }],
      customer_email: email || undefined,
      success_url: `${origin}/vip?success=1`,
      cancel_url: `${origin}/vip?canceled=1`,
      allow_promotion_codes: true,
    });
    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json({ error: "checkout_failed" }, { status: 500 });
  }
}
