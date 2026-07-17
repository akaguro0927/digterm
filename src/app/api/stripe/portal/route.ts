import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe/server";

// 購読の管理・解約（Stripe カスタマーポータル）。未設定時は demo。
export const runtime = "nodejs";

export async function POST(req: Request) {
  const stripe = getStripe();
  if (!stripe) return NextResponse.json({ demo: true });
  try {
    const { customerId } = (await req.json().catch(() => ({}))) as { customerId?: string };
    if (!customerId) return NextResponse.json({ error: "no_customer" }, { status: 400 });
    const origin = req.headers.get("origin") ?? "http://localhost:3000";
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${origin}/vip`,
    });
    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json({ error: "portal_failed" }, { status: 500 });
  }
}
