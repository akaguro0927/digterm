"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "@/components/icons";
import AccountMenu from "@/components/AccountMenu";

interface NavItem {
  href: string;
  label: string;
  icon: IconName;
  tour: string;
  badge?: { text: string; className: string };
}

const LINKS: NavItem[] = [
  { href: "/qa", label: "質問", icon: "message", tour: "nav-qa", badge: { text: "NEW", className: "bg-accent-400" } },
  { href: "/zukan", label: "図鑑", icon: "book-open", tour: "nav-zukan" },
  { href: "/learn", label: "レッスン", icon: "flag", tour: "nav-learn" },
  { href: "/ai", label: "AI", icon: "zap", tour: "nav-ai", badge: { text: "β", className: "bg-indigo-500" } },
  { href: "/quiz", label: "問題集", icon: "pencil", tour: "nav-quiz" },
  { href: "/mypage", label: "マイページ", icon: "heart", tour: "nav-mypage" },
];

export default function MainNav() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <div className="flex min-w-0 items-center gap-1">
      {/* リンクだけを横スクロール領域に。メニューは外に出す（overflowでドロップダウンが隠れるのを防ぐ） */}
      <nav className="no-scrollbar flex min-w-0 items-center gap-0.5 overflow-x-auto py-0.5 sm:gap-1">
        {LINKS.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            data-tour={item.tour}
            aria-current={active ? "page" : undefined}
            className={`group flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-2 text-sm font-bold transition sm:px-3 ${
              active ? "bg-brand-50 text-brand-700" : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
            }`}
          >
            <Icon
              name={item.icon}
              className={`h-4 w-4 transition ${active ? "text-brand-500" : "text-slate-400 group-hover:text-slate-500"}`}
            />
            <span className="whitespace-nowrap">{item.label}</span>
            {item.badge && (
              <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-extrabold leading-none text-white ${item.badge.className}`}>
                {item.badge.text}
              </span>
            )}
          </Link>
          );
        })}
      </nav>
      <span className="mx-0.5 h-5 w-px shrink-0 bg-slate-200" />
      <AccountMenu />
    </div>
  );
}
