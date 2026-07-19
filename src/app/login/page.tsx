"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { useAuth } from "@/lib/supabase/AuthProvider";
import { Icon, type IconName } from "@/components/icons";
import AuthCity from "@/components/AuthCity";
import Confetti from "@/components/Confetti";

type Mode = "login" | "signup";

// モードごとに“見た目そのもの”を変えて、ログインと新規登録を取り違えないようにする
const THEME: Record<
  Mode,
  {
    title: string;
    sub: string;
    icon: IconName;
    iconWrap: string;
    tabActive: string;
    btn: string;
    edge: string;
    submit: string;
    ring: string;
  }
> = {
  login: {
    title: "おかえりなさい",
    sub: "ログインして、記録を続きから",
    icon: "user",
    iconWrap: "bg-brand-50 text-brand-600",
    tabActive: "bg-white text-brand-700 shadow-[0_2px_0_#d2f9e0]",
    btn: "bg-brand-500",
    edge: "#12a854",
    submit: "ログインする",
    ring: "ring-brand-200",
  },
  signup: {
    title: "はじめまして！",
    sub: "アカウントを作って、記録を保存しよう",
    icon: "heart",
    iconWrap: "bg-violet-50 text-violet-600",
    tabActive: "bg-white text-violet-700 shadow-[0_2px_0_#ede9fe]",
    btn: "bg-violet-600",
    edge: "#6d28d9",
    submit: "アカウントを作る",
    ring: "ring-violet-200",
  },
};

const SIGNUP_PERKS = ["複数の端末で同期", "お気に入りを保存", "学習の記録が残る"];

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sentEmail, setSentEmail] = useState(false);
  const [peeking, setPeeking] = useState(false); // パスワード入力中はキャラが目をかくす
  const [celebrating, setCelebrating] = useState(false); // 成功時：2秒喜んでから遷移

  const t = THEME[mode];

  // 成功したら「喜ぶエフェクト」を約2秒見せてから画面遷移する
  const finishTo = (path: string) => {
    setCelebrating(true);
    setTimeout(() => router.replace(path), 2000);
  };

  // すでにログイン済みならマイページへ
  useEffect(() => {
    if (!loading && user) router.replace("/mypage");
  }, [loading, user, router]);

  const configured = isSupabaseConfigured();

  const switchMode = (m: Mode) => {
    setMode(m);
    setError(null);
    setConfirm("");
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (mode === "signup" && password !== confirm) {
      setError("確認用パスワードが一致しません。");
      return;
    }
    const sb = getSupabaseClient();
    if (!sb) {
      setError("いま認証が使えません（設定を確認してください）。");
      return;
    }
    setBusy(true);
    try {
      if (mode === "signup") {
        const { data, error } = await sb.auth.signUp({ email, password });
        if (error) throw error;
        if (!data.session) {
          setSentEmail(true);
        } else {
          finishTo("/mypage");
        }
      } else {
        const { error } = await sb.auth.signInWithPassword({ email, password });
        if (error) throw error;
        finishTo("/mypage");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (/Invalid login credentials/i.test(msg)) setError("メールアドレスかパスワードが違います。");
      else if (/already registered|already exists/i.test(msg)) setError("このメールアドレスは登録済みです。「ログイン」に切り替えてください。");
      else if (/Password should be at least/i.test(msg)) setError("パスワードは6文字以上にしてください。");
      else setError(msg);
    } finally {
      setBusy(false);
    }
  };

  // 確認メール送信後の画面
  if (sentEmail) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 py-10 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-violet-50 text-violet-600">
          <Icon name="bell" className="h-8 w-8" />
        </span>
        <h1 className="font-display mt-4 text-2xl font-extrabold">確認メールを送りました</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          <span className="font-bold text-slate-700">{email}</span> 宛のメールを開いて、リンクをクリックすると登録が完了します。
        </p>
        <Link href="/" className="mt-6 text-sm font-bold text-brand-600 hover:underline">
          ホームにもどる
        </Link>
      </div>
    );
  }

  // 成功時の「喜ぶ」演出（約2秒）→ このあと finishTo が遷移する
  if (celebrating) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-white/85 px-4 text-center backdrop-blur-sm">
        <Confetti count={36} />
        <div className="animate-pop-in relative flex flex-col items-center">
          <AuthCity mode={mode} peeking={false} celebrating />
          <h1 className="font-display mt-4 text-2xl font-extrabold text-slate-800">ようこそ、Co-Cre へ！</h1>
          <p className="mt-1 text-sm text-slate-500">
            {mode === "signup" ? "登録できたよ。さっそくはじめよう！" : "ログインできたよ！"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto grid min-h-[80vh] max-w-4xl items-center gap-8 px-4 py-10 md:grid-cols-2">
      {/* 左：カーソルで動く相棒キャラ（パスワード入力中は目をかくす） */}
      <div
        className={`relative order-1 overflow-hidden rounded-3xl border-2 px-6 py-8 text-center transition-colors duration-500 ${
          mode === "login" ? "border-brand-100 bg-gradient-to-br from-brand-50 to-white" : "border-violet-100 bg-gradient-to-br from-violet-50 to-white"
        }`}
      >
        <div className="bg-dots pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden />
        <AuthCity mode={mode} peeking={peeking} />
        <h2 className="font-display mt-2 text-xl font-extrabold text-slate-800">
          {mode === "login" ? "おかえり、まってたよ" : "いっしょに、はじめよう"}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          {peeking
            ? "パスワードは のぞかないよ"
            : mode === "login"
              ? "つづきから記録を再開しよう"
              : "アカウントを作れば、記録がずっと残るよ"}
        </p>
      </div>

      {/* 右：フォーム */}
      <div className="order-2 w-full max-w-md justify-self-center md:justify-self-end">
      {/* モード切り替えタブ（大きく・色で区別） */}
      <div className="mb-4 flex rounded-full bg-slate-100 p-1.5">
        <button
          type="button"
          onClick={() => switchMode("login")}
          className={`font-display flex flex-1 items-center justify-center gap-1.5 rounded-full py-2.5 text-sm font-extrabold transition ${
            mode === "login" ? THEME.login.tabActive : "text-slate-400 hover:text-slate-500"
          }`}
        >
          <Icon name="user" className="h-4 w-4" />
          ログイン
        </button>
        <button
          type="button"
          onClick={() => switchMode("signup")}
          className={`font-display flex flex-1 items-center justify-center gap-1.5 rounded-full py-2.5 text-sm font-extrabold transition ${
            mode === "signup" ? THEME.signup.tabActive : "text-slate-400 hover:text-slate-500"
          }`}
        >
          <Icon name="heart" className="h-4 w-4" />
          新規登録
        </button>
      </div>

      <div className={`card-pop overflow-hidden p-0`}>
        {/* モードで色が変わるヘッダー帯 */}
        <div
          className={`flex flex-col items-center px-7 pb-6 pt-7 text-center ${
            mode === "login" ? "bg-brand-50/50" : "bg-violet-50/50"
          }`}
        >
          <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${t.iconWrap}`}>
            <Icon name={t.icon} className="h-7 w-7" />
          </span>
          <h1 className="font-display mt-3 text-2xl font-extrabold">{t.title}</h1>
          <p className="mt-1 text-sm text-slate-500">{t.sub}</p>

          {/* 新規登録のときだけ「できること」を出す＝ひと目で別画面とわかる */}
          {mode === "signup" && (
            <div className="mt-4 flex flex-wrap justify-center gap-1.5">
              {SIGNUP_PERKS.map((p) => (
                <span
                  key={p}
                  className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[11px] font-bold text-violet-700 ring-1 ring-violet-100"
                >
                  <Icon name="check" className="h-3 w-3" strokeWidth={3} />
                  {p}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="px-7 pb-8 pt-6 sm:px-8">
          {!configured && (
            <p className="mb-5 rounded-2xl bg-amber-50 px-4 py-3 text-xs text-amber-700 ring-1 ring-amber-200">
              現在ログイン機能は準備中です。図鑑・問題集は登録なしで使えます。
            </p>
          )}

          <form onSubmit={submit} className="space-y-3">
            <label className="block">
              <span className="text-xs font-bold text-slate-500">メールアドレス</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className={`mt-1 w-full rounded-xl bg-slate-50 px-4 py-3 text-sm outline-none ring-1 ring-slate-200 transition focus:bg-white focus:ring-2 ${
                  mode === "login" ? "focus:ring-brand-500" : "focus:ring-violet-500"
                }`}
              />
            </label>
            <label className="block">
              <span className="text-xs font-bold text-slate-500">パスワード</span>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPeeking(true)}
                onBlur={() => setPeeking(false)}
                placeholder="6文字以上"
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                className={`mt-1 w-full rounded-xl bg-slate-50 px-4 py-3 text-sm outline-none ring-1 ring-slate-200 transition focus:bg-white focus:ring-2 ${
                  mode === "login" ? "focus:ring-brand-500" : "focus:ring-violet-500"
                }`}
              />
            </label>

            {/* 新規登録だけ「確認用パスワード」＝フォームの見た目も変わる */}
            {mode === "signup" && (
              <label className="block">
                <span className="text-xs font-bold text-slate-500">パスワード（確認）</span>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  onFocus={() => setPeeking(true)}
                  onBlur={() => setPeeking(false)}
                  placeholder="もう一度入力"
                  autoComplete="new-password"
                  className="mt-1 w-full rounded-xl bg-slate-50 px-4 py-3 text-sm outline-none ring-1 ring-slate-200 transition focus:bg-white focus:ring-2 focus:ring-violet-500"
                />
              </label>
            )}

            {error && (
              <p className="flex items-start gap-1.5 rounded-xl bg-rose-50 px-3 py-2 text-xs text-rose-600 ring-1 ring-rose-200">
                <Icon name="x" className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={3} />
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy || !configured}
              className={`btn-3d font-display flex w-full items-center justify-center gap-1.5 rounded-full py-3.5 text-sm font-extrabold text-white disabled:opacity-50 ${t.btn}`}
              style={{ ["--edge" as string]: t.edge }}
            >
              {busy ? "処理中…" : t.submit}
              {!busy && <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2.5} />}
            </button>
          </form>

          {/* 反対モードへの控えめな導線（メインはタブ） */}
          <div className="mt-5 text-center text-sm text-slate-500">
            {mode === "login" ? (
              <>
                アカウントがまだ？{" "}
                <button onClick={() => switchMode("signup")} className="font-bold text-violet-600 hover:underline">
                  新規登録へ
                </button>
              </>
            ) : (
              <>
                すでに登録済み？{" "}
                <button onClick={() => switchMode("login")} className="font-bold text-brand-600 hover:underline">
                  ログインへ
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-slate-400">
        <Image src="/logo_mark.png" alt="Co-Cre" width={397} height={195} className="h-4 w-auto opacity-60" />
        登録なしでも図鑑・問題集は使えます。
        <Link href="/" className="font-bold text-brand-600 hover:underline">
          あとで
        </Link>
      </div>
      </div>
    </div>
  );
}
