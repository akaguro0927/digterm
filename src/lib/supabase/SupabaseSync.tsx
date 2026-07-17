"use client";

import { useEffect } from "react";
import { useAuth } from "@/lib/supabase/AuthProvider";
import { getSupabaseClient } from "@/lib/supabase/client";
import {
  getFavoritesNow,
  getQuizAttemptsNow,
  replaceFavorites,
  replaceQuizAttempts,
  setRemoteHook,
  type QuizAttempt,
} from "@/lib/userStore";

// クイズ1件の同一判定キー（日時+モード+スコアで重複排除）
function quizKey(a: Pick<QuizAttempt, "takenAt" | "mode" | "score" | "total">) {
  return `${a.takenAt}|${a.mode}|${a.score}|${a.total}`;
}

const swallow = () => {}; // 同期失敗はUIを止めない（ローカルは常に正）

/**
 * ログイン中、お気に入り・クイズ成績を Supabase と同期する。
 * - 初回ログイン時: ローカルとリモートをマージ（和集合）してローカルへ反映＋不足分をリモートへ送る
 * - 以降の更新: userStore の書き込みフック経由で Supabase にも反映
 * ※ 既読(seen)はまだ専用テーブルが無いためローカルのみ（今後テーブル追加で同期予定）
 */
export default function SupabaseSync() {
  const { user } = useAuth();

  useEffect(() => {
    const sb = getSupabaseClient();
    if (!sb || !user) {
      setRemoteHook(null);
      return;
    }
    let cancelled = false;
    const uid = user.id;

    // 書き込みフック（ローカル更新の直後に Supabase へ反映）
    setRemoteHook({
      favorite: (slug, on) => {
        if (on) {
          sb.from("favorites")
            .upsert({ user_id: uid, term_slug: slug }, { onConflict: "user_id,term_slug" })
            .then(swallow, swallow);
        } else {
          sb.from("favorites").delete().eq("user_id", uid).eq("term_slug", slug).then(swallow, swallow);
        }
      },
      quiz: (a) => {
        sb.from("quiz_results")
          .insert({
            user_id: uid,
            mode: a.mode,
            score: a.score,
            total: a.total,
            wrong_slugs: a.wrongSlugs,
            taken_at: new Date(a.takenAt).toISOString(),
          })
          .then(swallow, swallow);
      },
    });

    // 初回プル＆マージ
    (async () => {
      // --- お気に入り ---
      const favRes = await sb.from("favorites").select("term_slug");
      if (cancelled) return;
      const remoteFav = (favRes.data ?? []).map((r) => r.term_slug as string);
      const localFav = [...getFavoritesNow()];
      replaceFavorites([...new Set([...remoteFav, ...localFav])]);
      const remoteFavSet = new Set(remoteFav);
      const favToPush = localFav.filter((s) => !remoteFavSet.has(s)).map((s) => ({ user_id: uid, term_slug: s }));
      if (favToPush.length) {
        sb.from("favorites").upsert(favToPush, { onConflict: "user_id,term_slug" }).then(swallow, swallow);
      }

      // --- クイズ成績 ---
      const qRes = await sb.from("quiz_results").select("mode,score,total,wrong_slugs,taken_at");
      if (cancelled) return;
      const remoteQuiz: QuizAttempt[] = (qRes.data ?? []).map((r) => ({
        mode: r.mode,
        score: r.score,
        total: r.total,
        wrongSlugs: (r.wrong_slugs as string[]) ?? [],
        takenAt: new Date(r.taken_at as string).getTime(),
      }));
      const localQuiz = [...getQuizAttemptsNow()];
      const remoteKeys = new Set(remoteQuiz.map(quizKey));
      const localOnly = localQuiz.filter((a) => !remoteKeys.has(quizKey(a)));
      replaceQuizAttempts([...remoteQuiz, ...localOnly]);
      if (localOnly.length) {
        sb.from("quiz_results")
          .insert(
            localOnly.map((a) => ({
              user_id: uid,
              mode: a.mode,
              score: a.score,
              total: a.total,
              wrong_slugs: a.wrongSlugs,
              taken_at: new Date(a.takenAt).toISOString(),
            }))
          )
          .then(swallow, swallow);
      }
    })();

    return () => {
      cancelled = true;
      setRemoteHook(null);
    };
  }, [user]);

  return null;
}
