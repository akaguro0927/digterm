import Stripe from "stripe";

// Stripe（サーバー専用）。キー未設定なら null＝デモ扱いにして、アプリを壊さない。
let cached: Stripe | null | undefined;

export function getStripe(): Stripe | null {
  if (cached !== undefined) return cached;
  const key = process.env.STRIPE_SECRET_KEY;
  cached = key && key.startsWith("sk_") ? new Stripe(key) : null;
  return cached;
}

/** 決済フローを本番稼働できる状態か（キー＋商品価格ID） */
export function isStripeConfigured(): boolean {
  return !!getStripe() && !!process.env.STRIPE_PRICE_ID;
}

export const VIP_PRICE_LABEL = "月額 ¥480（予定）";
