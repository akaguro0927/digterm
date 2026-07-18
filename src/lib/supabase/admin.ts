import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// service_role キーを使うサーバー専用クライアント。RLS を越えて書き込めるので
// Stripe Webhook からの課金状態の反映などに使う。
// ※このキーは絶対にクライアントへ出さない（NEXT_PUBLIC_ を付けない）。
// 未設定なら null を返し、呼び出し側は安全にスキップする（アプリを壊さない）。
let admin: SupabaseClient | null | undefined;

export function getSupabaseAdmin(): SupabaseClient | null {
  if (admin !== undefined) return admin;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  admin =
    url && serviceKey
      ? createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } })
      : null;
  return admin;
}

/** service_role が設定済みか（Webhookが Supabase に書き込める状態か） */
export function isSupabaseAdminConfigured(): boolean {
  return getSupabaseAdmin() !== null;
}
