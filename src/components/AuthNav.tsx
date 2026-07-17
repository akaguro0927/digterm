"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/supabase/AuthProvider";
import { getSupabaseClient } from "@/lib/supabase/client";
import { Icon } from "@/components/icons";

// ヘッダーのログイン/ログアウト。ログイン状態はクライアントで判定するので client component。
export default function AuthNav() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // 判定前は何も出さない（サーバー描画と一致させてチラつき/不一致を防ぐ）
  if (loading) return null;

  if (!user) {
    return (
      <Link
        href="/login"
        className="font-display rounded-full bg-gradient-to-r from-brand-500 to-brand-600 px-4 py-1.5 text-sm font-bold text-white transition hover:brightness-105"
      >
        ログイン
      </Link>
    );
  }

  return (
    <button
      onClick={async () => {
        const sb = getSupabaseClient();
        await sb?.auth.signOut();
        router.push("/");
      }}
      className="flex items-center gap-1 text-sm font-medium text-slate-500 transition hover:text-brand-600"
      title={user.email ?? undefined}
    >
      <Icon name="user" className="h-3.5 w-3.5" />
      ログアウト
    </button>
  );
}
