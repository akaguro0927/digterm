// Supabase ブラウザクライアント。
// .env.local に接続情報が入っていれば本物のクライアントを返し、無ければ null（未設定）を返す。
// UI 側は isSupabaseConfigured() を見て、未設定ならローカル保存（src/lib/userStore.ts）に
// フォールバックできる。
//
// 【有効化の手順】
//   1. supabase.com で無料プロジェクトを作成
//   2. supabase/schema.sql を SQL Editor で実行
//   3. .env.local に下記2つを設定（.env.example 参照）
//        NEXT_PUBLIC_SUPABASE_URL=...
//        NEXT_PUBLIC_SUPABASE_ANON_KEY=...

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** Supabase の接続情報が .env に揃っているか */
export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

let browserClient: SupabaseClient | null = null;

/**
 * ブラウザ用の Supabase クライアント（シングルトン）。
 * 未設定なら null を返す（呼び出し側でローカル保存にフォールバック）。
 */
export function getSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  if (!browserClient) {
    browserClient = createBrowserClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
      auth: {
        persistSession: true, // ログイン状態をブラウザに保持
        autoRefreshToken: true,
        detectSessionInUrl: true, // OAuth（Google等）のリダイレクト後にセッションを拾う
      },
    });
  }
  return browserClient;
}
