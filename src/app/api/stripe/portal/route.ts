import { NextResponse } from "next/server";
import { appOrigin, getStripe } from "@/lib/stripe/server";
import { getServerUser, getSupabaseServerClient } from "@/lib/supabase/server";

// 購読の管理・解約（Stripe カスタマーポータル）。未設定時は demo。
export const runtime = "nodejs";

export async function POST(req: Request) {
  const stripe = getStripe();
  if (!stripe) return NextResponse.json({ demo: true });
  try {
    const [user, supabase] = await Promise.all([getServerUser(), getSupabaseServerClient()]);
    if (!user || !supabase) return NextResponse.json({ error: "login_required" }, { status: 401 });
    // customerIdを本文から受け取ると他人のポータルを開ける。本人のプロフィールからだけ取得する。
    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .maybeSingle();
    if (!profile?.stripe_customer_id) return NextResponse.json({ error: "no_customer" }, { status: 400 });
    const origin = appOrigin(req.url);
    const session = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: `${origin}/vip`,
    });
    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json({ error: "portal_failed" }, { status: 500 });
  }
}
