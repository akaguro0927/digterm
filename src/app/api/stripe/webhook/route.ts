import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

// Stripe からのイベント受け口。署名を検証し、課金状態を Supabase に反映する。
// - 署名シークレット未設定 → 安全にスキップ（{skipped:true}）
// - service_role 未設定 or テーブル未作成 → 反映は行わず received だけ返す（アプリを壊さない）
// ※本番: Stripe ダッシュボードで Webhook エンドポイント（/api/stripe/webhook）を登録し、
//   STRIPE_WEBHOOK_SECRET と SUPABASE_SERVICE_ROLE_KEY を設定すること。
export const runtime = "nodejs";

export async function POST(req: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) {
    return NextResponse.json({ ok: true, skipped: true });
  }
  const sig = req.headers.get("stripe-signature") ?? "";
  const body = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch {
    return NextResponse.json({ error: "bad_signature" }, { status: 400 });
  }

  const admin = getSupabaseAdmin();
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const s = event.data.object as Stripe.Checkout.Session;
        const userId = s.metadata?.userId || s.client_reference_id || null;
        if (admin && userId) {
          if (s.customer) {
            await admin.from("profiles").update({ stripe_customer_id: String(s.customer) }).eq("id", userId);
          }
          if (s.mode === "subscription") {
            await admin.from("subscriptions").upsert(
              { user_id: userId, stripe_subscription_id: s.subscription ? String(s.subscription) : null, status: "active" },
              { onConflict: "user_id" },
            );
          } else if (s.mode === "payment") {
            // 買い切り（lifetime）は purchases に1行。session id で冪等化。
            await admin.from("purchases").upsert(
              { user_id: userId, stripe_session_id: s.id, product: "lifetime", status: "paid" },
              { onConflict: "stripe_session_id" },
            );
          }
        }
        break;
      }
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const userId = sub.metadata?.userId || null;
        const status =
          sub.status === "active" || sub.status === "trialing"
            ? "active"
            : sub.status === "past_due"
              ? "past_due"
              : "canceled";
        // current_period_end は Stripe APIバージョンで Subscription直下 or items 配下に分かれる。
        // どちらでも拾えるよう緩く取得する（無ければ null）。
        const anySub = sub as unknown as {
          current_period_end?: number;
          items?: { data?: Array<{ current_period_end?: number }> };
        };
        const periodEndUnix = anySub.current_period_end ?? anySub.items?.data?.[0]?.current_period_end;
        if (admin && userId) {
          await admin.from("subscriptions").upsert(
            {
              user_id: userId,
              stripe_subscription_id: sub.id,
              status,
              current_period_end: periodEndUnix ? new Date(periodEndUnix * 1000).toISOString() : null,
            },
            { onConflict: "user_id" },
          );
        }
        break;
      }
      default:
        break;
    }
  } catch {
    // テーブル未作成・ネットワーク等の失敗は握りつぶす（Stripe には received を返して再送を防ぐ）。
  }
  return NextResponse.json({ received: true });
}
