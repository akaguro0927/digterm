"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@/components/icons";
import AccountMenu from "@/components/AccountMenu";

interface Sub {
  label: string;
  href: string;
}
interface NavItem {
  href: string;
  label: string;
  icon: IconName;
  tour: string;
  badge?: { text: string; className: string };
  submenu?: Sub[];
}

const LINKS: NavItem[] = [
  { href: "/qa", label: "質問", icon: "message", tour: "nav-qa", badge: { text: "NEW", className: "bg-accent-400" } },
  {
    href: "/zukan",
    label: "図鑑",
    icon: "book-open",
    tour: "nav-zukan",
    submenu: [
      { label: "図鑑トップ", href: "/zukan" },
      { label: "UI部品", href: "/zukan?category=ui" },
      { label: "レイアウト", href: "/zukan?category=layout" },
      { label: "HTML / CSS", href: "/zukan?category=htmlcss" },
      { label: "開発用語", href: "/zukan?category=dev" },
      { label: "バックエンド", href: "/zukan?category=backend" },
      { label: "フラッシュカードで暗記", href: "/flashcards" },
    ],
  },
  {
    href: "/learn",
    label: "レッスン",
    icon: "flag",
    tour: "nav-learn",
    submenu: [
      { label: "学習の道のり", href: "/learn" },
      { label: "初級コース", href: "/curriculum#beginner" },
      { label: "中級コース", href: "/curriculum#intermediate" },
      { label: "上級コース", href: "/curriculum#advanced" },
      { label: "コース目次（全章）", href: "/curriculum" },
      { label: "道具とAIガイド", href: "/tools" },
    ],
  },
  { href: "/ai", label: "AI", icon: "zap", tour: "nav-ai", badge: { text: "β", className: "bg-indigo-500" } },
  {
    href: "/quiz",
    label: "問題集",
    icon: "pencil",
    tour: "nav-quiz",
    submenu: [
      { label: "問題集トップ", href: "/quiz" },
      { label: "初心者モード", href: "/quiz/beginner" },
      { label: "中級者モード", href: "/quiz/intermediate" },
      { label: "上級者モード", href: "/quiz/advanced" },
      { label: "実力試験", href: "/quiz/exam" },
      { label: "苦手を復習", href: "/quiz/review" },
    ],
  },
  {
    href: "/mypage",
    label: "マイページ",
    icon: "heart",
    tour: "nav-mypage",
    submenu: [
      { label: "マイページ", href: "/mypage" },
      { label: "プロフィール編集", href: "/profile" },
      { label: "ヘルプ・使い方", href: "/help" },
    ],
  },
];

function pillCls(active: boolean) {
  return `group flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-2 text-sm font-bold transition sm:px-3 ${
    active ? "bg-brand-50 text-brand-700" : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
  }`;
}
function iconCls(active: boolean) {
  return `h-4 w-4 transition ${active ? "text-brand-500" : "text-slate-400 group-hover:text-slate-500"}`;
}

function NavLink({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const active = pathname === item.href || pathname.startsWith(item.href + "/");
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ left: 0, top: 0 });
  const wrapRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openNow = () => {
    if (timer.current) clearTimeout(timer.current);
    const r = wrapRef.current?.getBoundingClientRect();
    if (r) {
      const vw = typeof window !== "undefined" ? window.innerWidth : 400;
      setPos({ left: Math.max(8, Math.min(r.left, vw - 232)), top: r.bottom + 6 });
    }
    setOpen(true);
  };
  const closeSoon = () => {
    timer.current = setTimeout(() => setOpen(false), 130);
  };

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const badge = item.badge && (
    <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-extrabold leading-none text-white ${item.badge.className}`}>{item.badge.text}</span>
  );

  // サブメニュー無し = ふつうのリンク
  if (!item.submenu) {
    return (
      <Link href={item.href} data-tour={item.tour} aria-current={active ? "page" : undefined} className={pillCls(active)}>
        <Icon name={item.icon} className={iconCls(active)} />
        <span className="whitespace-nowrap">{item.label}</span>
        {badge}
      </Link>
    );
  }

  // サブメニュー有り = ホバー／タップでショートカットを開く
  return (
    <div ref={wrapRef} className="relative shrink-0" onMouseEnter={openNow} onMouseLeave={closeSoon}>
      <button
        type="button"
        data-tour={item.tour}
        aria-expanded={open}
        onClick={() => (open ? setOpen(false) : openNow())}
        className={pillCls(active)}
      >
        <Icon name={item.icon} className={iconCls(active)} />
        <span className="whitespace-nowrap">{item.label}</span>
        {badge}
        <Icon name="chevron-right" className={`h-3 w-3 text-slate-300 transition-transform ${open ? "rotate-[270deg]" : "rotate-90"}`} />
      </button>
      {open && (
        <div
          className="fixed z-[60] w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white py-1 shadow-xl"
          style={{ left: pos.left, top: pos.top }}
          onMouseEnter={openNow}
          onMouseLeave={closeSoon}
        >
          {item.submenu.map((s, i) => {
            const sActive = pathname === s.href;
            return (
              <Link
                key={s.href + s.label}
                href={s.href}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2.5 text-sm transition hover:bg-slate-50 ${
                  i === 0 ? "border-b border-slate-100 font-bold text-slate-800" : sActive ? "text-brand-700" : "text-slate-600"
                }`}
              >
                {s.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function MainNav() {
  return (
    <div className="flex min-w-0 items-center gap-1">
      <nav className="no-scrollbar flex min-w-0 items-center gap-0.5 overflow-x-auto py-0.5 sm:gap-1">
        {LINKS.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
      </nav>
      <span className="mx-0.5 h-5 w-px shrink-0 bg-slate-200" />
      <AccountMenu />
    </div>
  );
}
