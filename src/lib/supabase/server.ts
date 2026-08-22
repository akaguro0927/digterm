import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { SupabaseClient, User } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** Route Handler / Server Component用。ブラウザと同じCookieセッションを使う。 */
export async function getSupabaseServerClient(): Promise<SupabaseClient | null> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;

  const cookieStore = await cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        // Server ComponentはCookieを書き換えられない。更新はmiddlewareが担当する。
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // 読み取り専用のレンダリング中は正常な経路。
        }
      },
    },
  });
}

/** Cookie内のトークンをSupabase Authへ照会して本人を返す。未ログインはnull。 */
export async function getServerUser(): Promise<User | null> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return null;
  const { data, error } = await supabase.auth.getUser();
  return error ? null : data.user;
}

export interface ServerEntitlement {
  configured: boolean;
  user: User | null;
  hasPaidAccess: boolean;
}

/**
 * 有料コンテンツ用の唯一のサーバー側判定。
 * subscriptions / purchases はRLSで本人の行だけを読めるため、クライアント申告を信用しない。
 */
export async function getServerEntitlement(): Promise<ServerEntitlement> {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return { configured: false, user: null, hasPaidAccess: false };

  const { data, error } = await supabase.auth.getUser();
  const user = error ? null : data.user;
  if (!user) return { configured: true, user: null, hasPaidAccess: false };

  try {
    const [subscription, purchases] = await Promise.all([
      supabase.from("subscriptions").select("status").eq("user_id", user.id).maybeSingle(),
      supabase.from("purchases").select("id").eq("user_id", user.id).eq("status", "paid").limit(1),
    ]);
    return {
      configured: true,
      user,
      hasPaidAccess: subscription.data?.status === "active" || (purchases.data?.length ?? 0) > 0,
    };
  } catch {
    // DBの一時障害時に権利を推測して開放しない（安全側にロック）。
    return { configured: true, user, hasPaidAccess: false };
  }
}
