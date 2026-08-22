import Stripe from "stripe";

// Stripe（サーバー専用）。キー未設定なら null＝デモ扱いにして、アプリを壊さない。
let cached: Stripe | null | undefined;

export function getStripe(): Stripe | null {
  if (cached !== undefined) return cached;
  const key = process.env.STRIPE_SECRET_KEY;
  cached = key && key.startsWith("sk_") ? new Stripe(key) : null;
  return cached;
}

/** サブスク（VIP）を本番稼働できる状態か（キー＋サブスク価格ID） */
export function isStripeConfigured(): boolean {
  return !!getStripe() && !!process.env.STRIPE_PRICE_ID;
}

/** 買い切り（lifetime）を本番稼働できる状態か（キー＋買い切り価格ID） */
export function isLifetimeConfigured(): boolean {
  return !!getStripe() && !!process.env.STRIPE_LIFETIME_PRICE_ID;
}

/** プランに対応する Stripe 価格ID。未設定なら undefined。 */
export function priceIdForPlan(plan: "vip" | "lifetime"): string | undefined {
  return plan === "lifetime" ? process.env.STRIPE_LIFETIME_PRICE_ID : process.env.STRIPE_PRICE_ID;
}

/** プランに対応する Checkout モード（サブスク or 一回課金）。 */
export function checkoutModeForPlan(plan: "vip" | "lifetime"): "subscription" | "payment" {
  return plan === "lifetime" ? "payment" : "subscription";
}

/**
 * Stripeから戻す先は、公開時に固定したアプリURLだけを使う。
 * Host/Originヘッダーを信じると攻撃者のURLへCheckout完了後を飛ばせるため、本番では未設定を拒否する。
 */
export function appOrigin(requestUrl: string): string {
  const configured = process.env.APP_URL;
  if (configured) {
    const origin = new URL(configured).origin;
    if (origin === "null") throw new Error("invalid_app_url");
    return origin;
  }
  if (process.env.NODE_ENV === "production") throw new Error("app_url_required");
  return new URL(requestUrl).origin;
}

export const VIP_PRICE_LABEL = "月額 ¥480（予定）";
