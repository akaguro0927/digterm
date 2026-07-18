"use client";

import { useEffect } from "react";
import { useAuth } from "@/lib/supabase/AuthProvider";
import { getSupabaseClient } from "@/lib/supabase/client";
import { setPlan } from "@/lib/plan";

// ログイン中、Supabase の“実際の課金状態”を読んでプランに反映する（本番の権利付与）。
//   subscriptions.status = 'active' → vip
//   purchases.status     = 'paid'  → lifetime
// 権利が確認できたときだけ引き上げる（ダウングレードはしない）。これにより
//   ・テーブル未作成 / 未ログイン → 何もしない（ローカルのデモ切替や free を尊重）
//   ・Webhook 実装前でも安全（失敗は握りつぶす）
// ※本当の出し分けは本番でサーバー側でも判定すること（ここは表示制御の同期）。
export default function PlanSync() {
  const { user } = useAuth();

  useEffect(() => {
    const sb = getSupabaseClient();
    if (!sb || !user) return;
    let cancelled = false;

    (async () => {
      try {
        const [subRes, buyRes] = await Promise.all([
          sb.from("subscriptions").select("status").eq("user_id", user.id).maybeSingle(),
          sb.from("purchases").select("status").eq("user_id", user.id).eq("status", "paid").limit(1),
        ]);
        if (cancelled) return;
        const active = subRes.data?.status === "active";
        const bought = (buyRes.data?.length ?? 0) > 0;
        if (active) setPlan("vip");
        else if (bought) setPlan("lifetime");
        // どちらも無ければ触らない（デモ切替や free をそのまま）
      } catch {
        // テーブル未作成・RLS・ネットワーク等は無視（デモ動作を維持）
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [user]);

  return null;
}
