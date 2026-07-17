"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon, type IconName } from "@/components/icons";
import { useAuth } from "@/lib/supabase/AuthProvider";
import { getSupabaseClient } from "@/lib/supabase/client";
import { usePlan, setPlan } from "@/lib/plan";

// ヘッダー右の「ハンバーガー」メニュー。プロフィール編集・支払い・解約・問い合わせ・ログアウト等をまとめる。
export default function AccountMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user } = useAuth();
  const plan = usePlan();

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const openPortal = async () => {
    setOpen(false);
    try {
      const res = await fetch("/api/stripe/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url as string;
        return;
      }
      router.push("/vip"); // 未設定（デモ）→VIPページへ
    } catch {
      router.push("/vip");
    }
  };

  const logout = async () => {
    setOpen(false);
    const sb = getSupabaseClient();
    await sb?.auth.signOut();
    setPlan("free");
    router.push("/");
  };

  const openHelp = () => {
    setOpen(false);
    window.dispatchEvent(new Event("cocre:open-tutorial"));
  };

  const linkItems: { icon: IconName; label: string; href: string }[] = [
    { icon: "user", label: "プロフィール編集", href: "/profile" },
    { icon: "mail", label: "お問い合わせ", href: "/contact" },
    { icon: "trophy", label: "会員プラン", href: "/vip" },
  ];
  const actionItems: { icon: IconName; label: string; onClick: () => void }[] = [
    { icon: "credit-card", label: "支払方法の変更", onClick: openPortal },
    { icon: "shield", label: "会員を解約", onClick: openPortal },
    { icon: "info", label: "使い方をもう一度", onClick: openHelp },
  ];

  return (
    <div ref={ref} className="relative shrink-0">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="メニュー"
        aria-expanded={open}
        className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
          open ? "bg-slate-100 text-slate-800" : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
        }`}
      >
        <Icon name="menu" className="h-5 w-5" />
      </button>

      {open && (
        <div className="animate-pop-in absolute right-0 top-11 z-50 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          <div className="border-b border-slate-100 bg-slate-50/60 px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">アカウント</p>
            <p className="truncate text-sm font-bold text-slate-700">{user?.email ?? "ゲスト（未ログイン）"}</p>
            <span
              className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${
                plan === "vip" ? "bg-amber-100 text-amber-700" : "bg-slate-200/70 text-slate-500"
              }`}
            >
              {plan === "vip" ? "VIP会員" : "無料プラン"}
            </span>
          </div>

          <div className="py-1">
            {linkItems.map((it) => (
              <Link
                key={it.label}
                href={it.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50"
              >
                <Icon name={it.icon} className="h-4 w-4 text-slate-400" />
                {it.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-slate-100 py-1">
            {actionItems.map((it) => (
              <button
                key={it.label}
                onClick={it.onClick}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-slate-600 transition hover:bg-slate-50"
              >
                <Icon name={it.icon} className="h-4 w-4 text-slate-400" />
                {it.label}
              </button>
            ))}
          </div>

          <div className="border-t border-slate-100 py-1">
            {user ? (
              <button
                onClick={logout}
                className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm font-bold text-rose-500 transition hover:bg-rose-50"
              >
                <Icon name="log-out" className="h-4 w-4" />
                ログアウト
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-bold text-brand-600 transition hover:bg-brand-50"
              >
                <Icon name="log-out" className="h-4 w-4" />
                ログイン / 新規登録
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
