"use client";

import { Fragment, useEffect, useState, type ReactNode } from "react";
import type { Category } from "@/data/terms";
import { categoryTheme } from "@/lib/categoryTheme";
import { codeSnippets } from "@/data/codeSnippets";
import CodeBlock from "@/components/CodeBlock";
import { Icon, type IconName } from "@/components/icons";

// 用語ごとの「実物ミニデモ」。画像の代わりに本物のUIを触って覚えてもらう。
// 本番ではスクリーンショット画像（term_images）と併用する想定。

function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex h-44 w-full items-center justify-center overflow-hidden rounded-lg bg-slate-100">
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
      >
        モーダルを開く
      </button>
      {open && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <div className="w-56 rounded-xl bg-white p-4 shadow-xl">
            <p className="mb-3 text-sm font-bold">これがモーダルです</p>
            <button
              onClick={() => setOpen(false)}
              className="w-full rounded-lg bg-slate-200 py-1.5 text-sm hover:bg-slate-300"
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ToastDemo() {
  const [show, setShow] = useState(false);
  const fire = () => {
    setShow(true);
    setTimeout(() => setShow(false), 2000);
  };
  return (
    <div className="relative flex h-44 w-full items-center justify-center overflow-hidden rounded-lg bg-slate-100">
      <button
        onClick={fire}
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
      >
        保存する
      </button>
      {show && (
        <div className="absolute bottom-3 right-3 rounded-lg bg-slate-800 px-4 py-2 text-sm text-white shadow-lg">
          ✓ 保存しました
        </div>
      )}
    </div>
  );
}

function TabDemo() {
  const tabs = ["詳細", "レビュー", "Q&A"];
  const [active, setActive] = useState(0);
  return (
    <div className="w-full max-w-xs rounded-lg bg-white p-3 shadow-sm ring-1 ring-slate-200">
      <div className="flex border-b border-slate-200">
        {tabs.map((t, i) => (
          <button
            key={t}
            onClick={() => setActive(i)}
            className={`px-4 py-2 text-sm ${
              i === active
                ? "border-b-2 border-blue-600 font-bold text-blue-600"
                : "text-slate-500"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <p className="p-4 text-sm text-slate-600">「{tabs[active]}」の内容がここに表示されます</p>
    </div>
  );
}

function CarouselDemo() {
  const slides = [
    "bg-gradient-to-br from-violet-400 to-purple-500",
    "bg-gradient-to-br from-sky-400 to-cyan-500",
    "bg-gradient-to-br from-rose-400 to-pink-500",
  ];
  const [i, setI] = useState(0);
  return (
    <div className="w-full max-w-xs">
      <div className={`flex h-28 items-center justify-center rounded-lg text-2xl font-black text-white/90 transition-colors duration-300 ${slides[i]}`}>
        スライド {i + 1}
      </div>
      <div className="mt-2 flex items-center justify-center gap-3">
        <button onClick={() => setI((i + slides.length - 1) % slides.length)} className="rounded-full bg-slate-200 px-3 py-1 text-sm hover:bg-slate-300">←</button>
        <div className="flex gap-1.5">
          {slides.map((_, d) => (
            <span key={d} className={`h-2 w-2 rounded-full ${d === i ? "bg-blue-600" : "bg-slate-300"}`} />
          ))}
        </div>
        <button onClick={() => setI((i + 1) % slides.length)} className="rounded-full bg-slate-200 px-3 py-1 text-sm hover:bg-slate-300">→</button>
      </div>
    </div>
  );
}

function HamburgerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative h-44 w-full max-w-xs overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-200">
      <div className="flex items-center justify-between border-b border-slate-200 px-3 py-2">
        <span className="text-sm font-bold">サイト名</span>
        <button onClick={() => setOpen(!open)} className="space-y-1 p-1.5" aria-label="メニュー">
          <span className="block h-0.5 w-5 bg-slate-700" />
          <span className="block h-0.5 w-5 bg-slate-700" />
          <span className="block h-0.5 w-5 bg-slate-700" />
        </button>
      </div>
      <div
        className={`absolute right-0 top-10 h-full w-32 bg-slate-800 p-3 text-sm text-white transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <p className="py-1">ホーム</p>
        <p className="py-1">図鑑</p>
        <p className="py-1">問題集</p>
      </div>
      <p className="p-3 text-xs text-slate-400">← 右上の三本線をタップ</p>
    </div>
  );
}

function DrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative h-44 w-full max-w-xs overflow-hidden rounded-lg bg-slate-100 ring-1 ring-slate-200">
      <button
        onClick={() => setOpen(true)}
        className="m-3 rounded-lg bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
      >
        ドロワーを開く
      </button>
      {open && <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />}
      <div
        className={`absolute left-0 top-0 h-full w-36 bg-white p-3 shadow-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <p className="mb-2 text-sm font-bold">メニュー</p>
        <p className="py-1 text-sm text-slate-600">マイページ</p>
        <p className="py-1 text-sm text-slate-600">設定</p>
        <button onClick={() => setOpen(false)} className="mt-2 text-xs text-blue-600">閉じる</button>
      </div>
    </div>
  );
}

function ToggleDemo() {
  const [on, setOn] = useState(true);
  return (
    <div className="flex items-center gap-3 rounded-lg bg-white px-5 py-4 shadow-sm ring-1 ring-slate-200">
      <span className="text-sm">通知を受け取る</span>
      <button
        onClick={() => setOn(!on)}
        className={`relative h-6 w-11 rounded-full transition-colors ${on ? "bg-blue-600" : "bg-slate-300"}`}
        aria-pressed={on}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
            on ? "left-[22px]" : "left-0.5"
          }`}
        />
      </button>
      <span className="w-8 text-xs text-slate-500">{on ? "ON" : "OFF"}</span>
    </div>
  );
}

function ZIndexDemo() {
  return (
    <div className="relative h-32 w-40">
      <div className="absolute left-0 top-0 flex h-20 w-20 items-center justify-center rounded-lg bg-blue-200 text-xs">z: 1</div>
      <div className="absolute left-10 top-6 z-10 flex h-20 w-20 items-center justify-center rounded-lg bg-blue-400 text-xs text-white">z: 10</div>
      <div className="absolute left-20 top-12 z-20 flex h-20 w-20 items-center justify-center rounded-lg bg-blue-600 text-xs text-white shadow-lg">z: 20</div>
    </div>
  );
}

function BoxModelDemo({ highlight }: { highlight: "margin" | "padding" }) {
  return (
    <div className={`rounded-lg p-5 text-center text-xs ${highlight === "margin" ? "bg-amber-200" : "bg-slate-100"}`}>
      {highlight === "margin" && <p className="mb-1 font-bold">margin（外側の余白）</p>}
      <div className={`rounded border-2 border-slate-500 p-5 ${highlight === "padding" ? "bg-emerald-200" : "bg-white"}`}>
        {highlight === "padding" && <p className="mb-1 font-bold">padding（内側の余白）</p>}
        <div className="rounded bg-white px-4 py-2 ring-1 ring-slate-300">コンテンツ</div>
      </div>
    </div>
  );
}

function MiniBrowser({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-xs overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-300">
      <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-50 px-3 py-1.5">
        <span className="h-2 w-2 rounded-full bg-red-400" />
        <span className="h-2 w-2 rounded-full bg-amber-400" />
        <span className="h-2 w-2 rounded-full bg-green-400" />
      </div>
      {children}
    </div>
  );
}

const block = "rounded bg-slate-200 text-center text-[10px] leading-none text-slate-500";

function LayoutDemo({ highlight }: { highlight: string }) {
  const hl = "bg-blue-500 text-white font-bold";
  return (
    <MiniBrowser>
      <div className="space-y-1 p-2">
        <div className={`${block} py-2 ${highlight === "header" ? hl : ""}`}>ヘッダー</div>
        <div className={`${block} py-4 ${highlight === "hero" ? hl : ""}`}>ヒーロー</div>
        <div className="flex gap-1">
          <div className={`${block} flex-1 py-6 ${highlight === "main" ? hl : ""}`}>メイン</div>
          <div className={`${block} w-14 py-6 ${highlight === "sidebar" ? hl : ""}`}>サイド<br />バー</div>
        </div>
        <div className={`${block} py-2 ${highlight === "footer" ? hl : ""}`}>フッター</div>
      </div>
    </MiniBrowser>
  );
}

function StepperDemo() {
  const [n, setN] = useState(1);
  return (
    <div className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200">
      <span className="text-sm text-slate-600">数量</span>
      <div className="flex items-center overflow-hidden rounded-lg ring-1 ring-slate-300">
        <button onClick={() => setN((v) => Math.max(0, v - 1))} className="px-3 py-1.5 text-lg leading-none text-slate-600 hover:bg-slate-100">−</button>
        <span className="w-10 text-center text-sm font-bold">{n}</span>
        <button onClick={() => setN((v) => v + 1)} className="px-3 py-1.5 text-lg leading-none text-slate-600 hover:bg-slate-100">＋</button>
      </div>
    </div>
  );
}

function RatingDemo() {
  const [r, setR] = useState(3);
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <button key={i} onClick={() => setR(i)} aria-label={`${i}つ星`}>
            <svg viewBox="0 0 24 24" className={`h-8 w-8 transition-colors ${i <= r ? "text-amber-400" : "text-slate-200"}`} fill="currentColor">
              <path d="M12 2l2.9 6.3 6.9.6-5.2 4.5 1.6 6.7L12 17l-6.2 3.6 1.6-6.7L2.2 8.9l6.9-.6z" />
            </svg>
          </button>
        ))}
      </div>
      <p className="text-xs text-slate-500">星をクリックで評価（{r}/5）</p>
    </div>
  );
}

function SegmentedDemo() {
  const items = ["日", "週", "月"];
  const [i, setI] = useState(0);
  return (
    <div className="inline-flex rounded-xl bg-slate-100 p-1">
      {items.map((t, idx) => (
        <button
          key={t}
          onClick={() => setI(idx)}
          className={`rounded-lg px-6 py-1.5 text-sm font-medium transition ${idx === i ? "bg-white text-blue-600 shadow-sm" : "text-slate-500"}`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

function PopoverDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen((v) => !v)} className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
        詳細を見る
      </button>
      {open && (
        <div className="absolute left-1/2 top-full z-10 mt-2.5 w-52 -translate-x-1/2 rounded-xl bg-white p-3 text-xs leading-relaxed text-slate-600 shadow-lg ring-1 ring-slate-200">
          <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-slate-200 bg-white" />
          ボタンの近くにフワッと出る小さな吹き出し。もう一度押すと閉じます。
        </div>
      )}
    </div>
  );
}

function KebabMenuDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen((v) => !v)} className="flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-full hover:bg-slate-100" aria-label="メニュー">
        <span className="h-1 w-1 rounded-full bg-slate-600" />
        <span className="h-1 w-1 rounded-full bg-slate-600" />
        <span className="h-1 w-1 rounded-full bg-slate-600" />
      </button>
      {open && (
        <div className="absolute left-1/2 top-full z-10 mt-1 w-32 -translate-x-1/2 overflow-hidden rounded-lg bg-white py-1 text-sm shadow-lg ring-1 ring-slate-200">
          {["編集", "共有", "削除"].map((t) => (
            <p key={t} className="cursor-pointer px-3 py-1.5 hover:bg-slate-50">{t}</p>
          ))}
        </div>
      )}
    </div>
  );
}

function BannerDemo() {
  const [show, setShow] = useState(true);
  return (
    <div className="w-full max-w-xs">
      {show ? (
        <div className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs text-white">
          <Icon name="bell" className="h-4 w-4 shrink-0" />
          <span className="flex-1">新機能が公開されました！</span>
          <button onClick={() => setShow(false)} className="rounded p-0.5 hover:bg-white/20" aria-label="閉じる">
            <Icon name="x" className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : (
        <button onClick={() => setShow(true)} className="text-xs text-slate-400 underline">バナーをもう一度表示</button>
      )}
    </div>
  );
}

function BottomSheetDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative h-44 w-full max-w-xs overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-200">
      <button onClick={() => setOpen(true)} className="m-3 rounded-lg bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700">シートを開く</button>
      {open && <div className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />}
      <div className={`absolute inset-x-0 bottom-0 rounded-t-2xl bg-white p-4 shadow-xl transition-transform duration-300 ${open ? "translate-y-0" : "translate-y-full"}`}>
        <span className="mx-auto mb-3 block h-1 w-10 rounded-full bg-slate-300" />
        <p className="text-sm font-bold">下から出るシート</p>
        <p className="mt-1 text-xs text-slate-500">スマホでよく使う。背景タップで閉じる。</p>
      </div>
    </div>
  );
}

function LightboxDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative flex h-44 w-full max-w-xs items-center justify-center overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-200">
      <button onClick={() => setOpen(true)} className="flex h-16 w-24 items-center justify-center rounded-lg bg-gradient-to-br from-sky-300 to-blue-400 text-white shadow">
        <Icon name="image" className="h-6 w-6" />
      </button>
      <p className="absolute bottom-2 text-[10px] text-slate-400">サムネをクリックで拡大</p>
      {open && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/70" onClick={() => setOpen(false)}>
          <div className="flex h-28 w-40 items-center justify-center rounded-lg bg-gradient-to-br from-sky-300 to-blue-400 text-white shadow-2xl">
            <Icon name="image" className="h-10 w-10" />
          </div>
        </div>
      )}
    </div>
  );
}

function DatePickerDemo() {
  const [sel, setSel] = useState(17);
  return (
    <div className="w-56 rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200">
      <p className="mb-2 text-center text-sm font-bold text-slate-700">2026年 7月</p>
      <div className="grid grid-cols-7 gap-1 text-center text-[11px]">
        {["日", "月", "火", "水", "木", "金", "土"].map((d) => (
          <span key={d} className="py-1 text-slate-400">{d}</span>
        ))}
        {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
          <button key={day} onClick={() => setSel(day)} className={`rounded-md py-1 ${day === sel ? "bg-blue-600 font-bold text-white" : "hover:bg-slate-100"}`}>
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}

// ---- バックエンド（サイトの裏側）デモ ----
function ServerDemo() {
  const [phase, setPhase] = useState<"idle" | "req" | "res">("idle");
  const run = () => {
    setPhase("req");
    setTimeout(() => setPhase("res"), 750);
  };
  return (
    <div className="w-full max-w-xs">
      <div className="flex items-center justify-between gap-2">
        <div className="flex w-20 flex-col items-center gap-1 rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200">
          <Icon name="monitor" className="h-6 w-6 text-slate-500" />
          <span className="text-[10px] font-bold text-slate-500">ブラウザ</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className={`flex justify-center text-[10px] font-bold transition ${phase === "idle" ? "opacity-0" : "opacity-100"}`}>
            <span className="rounded bg-blue-50 px-1.5 py-0.5 text-blue-600">GET /page →</span>
          </div>
          <div className="my-1 h-px bg-slate-200" />
          <div className={`flex justify-center text-[10px] font-bold transition ${phase === "res" ? "opacity-100" : "opacity-0"}`}>
            <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-emerald-600">← 200 OK</span>
          </div>
        </div>
        <div className="flex w-20 flex-col items-center gap-1 rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200">
          <Icon name="database" className="h-6 w-6 text-indigo-500" />
          <span className="text-[10px] font-bold text-slate-500">サーバー</span>
        </div>
      </div>
      <button onClick={run} className="mt-3 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">
        {phase === "res" ? "もう一度リクエスト" : "ページをリクエスト"}
      </button>
      <p className="mt-1 text-center text-[10px] text-slate-400">
        {phase === "idle" ? "ボタンでサーバーにお願いを送る" : phase === "req" ? "サーバーが処理中…" : "サーバーがページを返した！"}
      </p>
    </div>
  );
}

function DatabaseDemo() {
  const names = ["さとし", "ゆい", "けん", "みき", "あおい"];
  const [rows, setRows] = useState([
    { id: 1, name: "たろう" },
    { id: 2, name: "はなこ" },
  ]);
  const add = () =>
    setRows((r) => (r.length >= 7 ? r : [...r, { id: r.length + 1, name: names[(r.length - 2) % names.length] }]));
  return (
    <div className="w-full max-w-[15rem]">
      <p className="mb-1 text-center text-[10px] font-bold text-slate-400">users テーブル</p>
      <div className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-200">
        <div className="flex bg-slate-50 text-[10px] font-bold text-slate-500">
          <span className="w-10 px-2 py-1.5">id</span>
          <span className="flex-1 px-2 py-1.5">name</span>
        </div>
        {rows.map((r) => (
          <div key={r.id} className="flex border-t border-slate-100 text-xs text-slate-600">
            <span className="w-10 px-2 py-1.5 font-mono text-slate-400">{r.id}</span>
            <span className="flex-1 px-2 py-1.5">{r.name}</span>
          </div>
        ))}
      </div>
      <button onClick={add} className="mt-2 w-full rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-blue-700">
        行を1つ追加（INSERT）
      </button>
    </div>
  );
}

function SqlDemo() {
  const data = [
    { name: "ボタン", level: 1 },
    { name: "モーダル", level: 1 },
    { name: "セッション", level: 2 },
    { name: "JWT", level: 3 },
  ];
  const [lv, setLv] = useState(0);
  const rows = data.filter((d) => lv === 0 || d.level === lv);
  const where = lv === 0 ? "" : ` WHERE level = ${lv}`;
  return (
    <div className="w-full max-w-xs">
      <code className="block rounded-lg bg-slate-800 px-3 py-2 font-mono text-[11px] text-emerald-300">
        SELECT * FROM terms{where};
      </code>
      <div className="mt-2 flex gap-1.5">
        {[0, 1, 2, 3].map((n) => (
          <button
            key={n}
            onClick={() => setLv(n)}
            className={`rounded-md px-2.5 py-1 text-[11px] font-bold ${
              lv === n ? "bg-blue-600 text-white" : "bg-white text-slate-500 ring-1 ring-slate-200"
            }`}
          >
            {n === 0 ? "すべて" : `Lv${n}`}
          </button>
        ))}
      </div>
      <div className="mt-2 overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-200">
        {rows.map((r) => (
          <div key={r.name} className="flex justify-between border-t border-slate-100 px-3 py-1.5 text-xs text-slate-600 first:border-t-0">
            <span>{r.name}</span>
            <span className="font-mono text-slate-400">level {r.level}</span>
          </div>
        ))}
      </div>
      <p className="mt-1 text-center text-[10px] text-slate-400">条件を変えると取り出す行が変わる</p>
    </div>
  );
}

function AuthDemo() {
  const [signedIn, setSignedIn] = useState(false);
  return (
    <div className="w-full max-w-[15rem] text-center">
      {!signedIn ? (
        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <div className="space-y-2 text-left">
            <div className="rounded-md bg-slate-50 px-3 py-2 text-xs text-slate-400 ring-1 ring-slate-200">you@example.com</div>
            <div className="rounded-md bg-slate-50 px-3 py-2 text-xs text-slate-400 ring-1 ring-slate-200">••••••</div>
          </div>
          <button onClick={() => setSignedIn(true)} className="mt-3 w-full rounded-lg bg-blue-600 py-2 text-sm font-bold text-white hover:bg-blue-700">
            ログイン
          </button>
        </div>
      ) : (
        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-emerald-200">
          <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <Icon name="check" className="h-6 w-6" strokeWidth={3} />
          </span>
          <p className="mt-2 text-sm font-bold text-slate-700">本人確認OK！</p>
          <p className="mt-0.5 font-mono text-[10px] text-slate-400">トークン発行 → ログイン中</p>
          <button onClick={() => setSignedIn(false)} className="mt-3 rounded-lg bg-slate-100 px-4 py-1.5 text-xs font-bold text-slate-500 hover:bg-slate-200">
            ログアウト
          </button>
        </div>
      )}
    </div>
  );
}

function RequestResponseDemo() {
  const [sent, setSent] = useState(false);
  return (
    <div className="w-full max-w-xs">
      <div className="rounded-lg bg-slate-800 p-3 text-left">
        <p className="text-[9px] font-bold text-slate-400">リクエスト（お願い）</p>
        <p className="mt-1 font-mono text-[11px] text-blue-200">GET /users/1</p>
      </div>
      <div className="my-1 text-center text-xs text-slate-300">↓ ↑</div>
      <div className={`rounded-lg p-3 text-left transition ${sent ? "bg-emerald-950 ring-1 ring-emerald-700" : "bg-slate-100"}`}>
        <p className="text-[9px] font-bold text-slate-400">レスポンス（返事）</p>
        {sent ? (
          <div className="mt-1 font-mono text-[11px] text-emerald-300">
            <p>200 OK</p>
            <p>{`{ "id": 1, "name": "たろう" }`}</p>
          </div>
        ) : (
          <p className="mt-1 font-mono text-[11px] text-slate-400">（まだ返事なし）</p>
        )}
      </div>
      <button onClick={() => setSent((s) => !s)} className="mt-2 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">
        {sent ? "リセット" : "リクエストを送信"}
      </button>
    </div>
  );
}

function CorsDemo() {
  const [other, setOther] = useState(false);
  const ok = !other;
  return (
    <div className="w-full max-w-xs text-center">
      <div className="flex justify-center gap-1.5">
        <button
          onClick={() => setOther(false)}
          className={`rounded-md px-2.5 py-1 text-[11px] font-bold ${!other ? "bg-blue-600 text-white" : "bg-white text-slate-500 ring-1 ring-slate-200"}`}
        >
          同じサイトから
        </button>
        <button
          onClick={() => setOther(true)}
          className={`rounded-md px-2.5 py-1 text-[11px] font-bold ${other ? "bg-blue-600 text-white" : "bg-white text-slate-500 ring-1 ring-slate-200"}`}
        >
          別サイトから
        </button>
      </div>
      <div className={`mt-3 rounded-xl p-4 ring-1 ${ok ? "bg-emerald-50 ring-emerald-200" : "bg-rose-50 ring-rose-200"}`}>
        <p className="font-mono text-[11px] text-slate-500">Origin: {ok ? "cocre.app" : "other.example"}</p>
        <p className={`mt-1 flex items-center justify-center gap-1 text-sm font-bold ${ok ? "text-emerald-600" : "text-rose-600"}`}>
          <Icon name={ok ? "check" : "x"} className="h-4 w-4" strokeWidth={3} />
          {ok ? "許可・データが返る" : "ブロック（CORSエラー）"}
        </p>
      </div>
      <p className="mt-1 text-[10px] text-slate-400">サーバーが「どのサイトならOK」を決める</p>
    </div>
  );
}

function ApiKeyDemo() {
  const [hasKey, setHasKey] = useState(true);
  return (
    <div className="w-full max-w-xs">
      <div className="rounded-lg bg-slate-800 p-3 font-mono text-[11px]">
        <p className="text-blue-200">GET /api/data</p>
        <p className={hasKey ? "text-emerald-300" : "text-slate-500 line-through"}>x-api-key: sk_live_••••</p>
      </div>
      <label className="mt-2 flex items-center justify-center gap-2 text-xs text-slate-500">
        <input type="checkbox" checked={hasKey} onChange={(e) => setHasKey(e.target.checked)} className="h-4 w-4" />
        APIキーを付ける
      </label>
      <div className={`mt-2 rounded-lg py-2 text-center text-xs font-bold ${hasKey ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
        {hasKey ? "200 OK・データ取得" : "401 Unauthorized・拒否"}
      </div>
    </div>
  );
}

function WebhookDemo() {
  const [fired, setFired] = useState(false);
  return (
    <div className="w-full max-w-xs text-center">
      <button onClick={() => setFired(true)} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700">
        「支払い完了」が発生
      </button>
      <div className="mt-3 flex items-center justify-center gap-2 text-[11px]">
        <span className="rounded bg-white px-2 py-1 shadow-sm ring-1 ring-slate-200">決済サービス</span>
        <span className={`font-bold transition ${fired ? "text-blue-500" : "text-slate-300"}`}>—POST→</span>
        <span className={`rounded px-2 py-1 shadow-sm ring-1 transition ${fired ? "bg-emerald-50 font-bold text-emerald-600 ring-emerald-200" : "bg-white ring-slate-200"}`}>
          あなたのサーバー
        </span>
      </div>
      <p className="mt-2 text-[10px] text-slate-400">
        {fired ? "通知が届いた！（向こうから知らせてくれる）" : "イベントが起きると、向こうから通知が飛んでくる"}
      </p>
    </div>
  );
}

// ---- フロント用語 追加デモ（バッチ2026-07-17b） ----
function ContextMenuDemo() {
  const [open, setOpen] = useState(false);
  const items: [string, IconName][] = [
    ["編集", "pencil"],
    ["共有", "link"],
    ["削除", "trash"],
  ];
  return (
    <div className="relative flex h-40 w-full max-w-xs items-center justify-center rounded-lg bg-white shadow-sm ring-1 ring-slate-200">
      <button onClick={() => setOpen((o) => !o)} className="text-xs text-slate-400">
        ここを押してメニューを出す
      </button>
      {open && (
        <div className="absolute left-1/2 top-1/2 w-36 -translate-x-1/2 rounded-lg bg-white py-1 text-sm shadow-lg ring-1 ring-slate-200">
          {items.map(([l, ic]) => (
            <button
              key={l}
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-slate-600 hover:bg-slate-50"
            >
              <Icon name={ic} className="h-3.5 w-3.5" /> {l}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function BreakpointDemo() {
  const [wide, setWide] = useState(false);
  return (
    <div className="w-full max-w-xs text-center">
      <div className="flex justify-center gap-1.5">
        <button
          onClick={() => setWide(false)}
          className={`rounded-md px-3 py-1 text-[11px] font-bold ${!wide ? "bg-blue-600 text-white" : "bg-white text-slate-500 ring-1 ring-slate-200"}`}
        >
          スマホ
        </button>
        <button
          onClick={() => setWide(true)}
          className={`rounded-md px-3 py-1 text-[11px] font-bold ${wide ? "bg-blue-600 text-white" : "bg-white text-slate-500 ring-1 ring-slate-200"}`}
        >
          PC
        </button>
      </div>
      <div className={`mx-auto mt-3 grid gap-1.5 rounded-lg bg-white p-2 shadow-sm ring-1 ring-slate-200 ${wide ? "w-full grid-cols-3" : "w-24 grid-cols-1"}`}>
        {[1, 2, 3].map((n) => (
          <div key={n} className="rounded bg-blue-100 py-3 text-[10px] font-bold text-blue-600">
            {n}
          </div>
        ))}
      </div>
      <p className="mt-2 text-[10px] text-slate-400">ある幅を境に並びが変わる、その境目がブレークポイント</p>
    </div>
  );
}

function ValidationDemo() {
  const [v, setV] = useState("");
  const ok = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v);
  const touched = v.length > 0;
  return (
    <div className="w-full max-w-xs">
      <label className="text-xs font-bold text-slate-500">メールアドレス</label>
      <input
        value={v}
        onChange={(e) => setV(e.target.value)}
        placeholder="you@example.com"
        className={`mt-1 w-full rounded-lg px-3 py-2 text-sm outline-none ring-1 ${
          !touched ? "bg-white ring-slate-200" : ok ? "bg-emerald-50 ring-emerald-400" : "bg-rose-50 ring-rose-300"
        }`}
      />
      <p className={`mt-1.5 flex items-center gap-1 text-xs ${!touched ? "text-slate-400" : ok ? "text-emerald-600" : "text-rose-500"}`}>
        {touched && <Icon name={ok ? "check" : "x"} className="h-3.5 w-3.5" strokeWidth={3} />}
        {!touched ? "入力するとチェックします" : ok ? "OK！正しい形式です" : "メールの形式が正しくありません"}
      </p>
    </div>
  );
}

function EventDemo() {
  const [n, setN] = useState(0);
  return (
    <div className="text-center">
      <button onClick={() => setN((v) => v + 1)} className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700">
        クリック
      </button>
      <p className="mt-3 text-sm text-slate-600">
        「クリック」イベントが <span className="font-display text-lg font-extrabold text-blue-600">{n}</span> 回発生
      </p>
      <p className="mt-1 text-[10px] text-slate-400">操作（クリック等）＝イベント。それに反応して処理を動かす</p>
    </div>
  );
}

function InfiniteScrollDemo() {
  const [n, setN] = useState(6);
  return (
    <div className="w-full max-w-[15rem]">
      <div
        onScroll={(e) => {
          const el = e.currentTarget;
          if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10 && n < 30) setN((v) => v + 6);
        }}
        className="h-40 space-y-1.5 overflow-y-auto rounded-lg bg-white p-2 shadow-sm ring-1 ring-slate-200"
      >
        {Array.from({ length: n }, (_, i) => (
          <div key={i} className="rounded bg-slate-100 px-3 py-2 text-xs text-slate-600">アイテム {i + 1}</div>
        ))}
        {n < 30 && <p className="py-1 text-center text-[10px] text-slate-400">↓ スクロールで自動読み込み</p>}
      </div>
      <p className="mt-1 text-center text-[10px] text-slate-400">下までスクロールすると次々増える</p>
    </div>
  );
}

function ChipDemo() {
  const [chips, setChips] = useState(["React", "CSS", "初心者"]);
  return (
    <div className="w-full max-w-xs text-center">
      <div className="flex flex-wrap justify-center gap-1.5">
        {chips.map((c) => (
          <span key={c} className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-100">
            {c}
            <button onClick={() => setChips(chips.filter((x) => x !== c))} className="text-blue-400 hover:text-blue-600">
              <Icon name="x" className="h-3 w-3" strokeWidth={3} />
            </button>
          </span>
        ))}
        {chips.length === 0 && <span className="text-xs text-slate-400">全部消したね</span>}
      </div>
      <p className="mt-2 text-[10px] text-slate-400">×で消せる小さなラベル＝チップ</p>
    </div>
  );
}

function FloatingLabelDemo() {
  const [v, setV] = useState("");
  const [focus, setFocus] = useState(false);
  const up = v.length > 0 || focus;
  return (
    <div className="w-full max-w-xs">
      <div className="relative">
        <input
          value={v}
          onChange={(e) => setV(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className="w-full rounded-lg bg-white px-3 pb-2 pt-5 text-sm outline-none ring-1 ring-slate-300 focus:ring-2 focus:ring-blue-500"
        />
        <label className={`pointer-events-none absolute left-3 transition-all ${up ? "top-1.5 text-[10px] font-bold text-blue-600" : "top-3.5 text-sm text-slate-400"}`}>
          お名前
        </label>
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">入力すると見出しが上に浮く＝フローティングラベル</p>
    </div>
  );
}

function SnackbarDemo() {
  const [show, setShow] = useState(false);
  return (
    <div className="w-full max-w-xs text-center">
      <button
        onClick={() => {
          setShow(true);
          setTimeout(() => setShow(false), 2500);
        }}
        className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-bold text-white"
      >
        削除する
      </button>
      <div className="mt-3 h-12">
        {show && (
          <div className="animate-pop-in mx-auto flex max-w-[15rem] items-center justify-between gap-3 rounded-lg bg-slate-800 px-3 py-2.5 text-xs text-white shadow-lg">
            <span>メッセージを削除しました</span>
            <button onClick={() => setShow(false)} className="font-bold text-emerald-300">取り消し</button>
          </div>
        )}
      </div>
      <p className="text-[10px] text-slate-400">下に出て自動で消える通知＝スナックバー</p>
    </div>
  );
}

function LikeButtonDemo() {
  const [liked, setLiked] = useState(false);
  const [n, setN] = useState(128);
  return (
    <div className="text-center">
      <button
        onClick={() => {
          setN(liked ? n - 1 : n + 1);
          setLiked(!liked);
        }}
        className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition ${
          liked ? "bg-rose-50 text-rose-500" : "bg-slate-100 text-slate-500"
        }`}
      >
        <Icon name="heart" className="h-4 w-4" strokeWidth={2.5} />
        {n}
      </button>
      <p className="mt-2 text-[10px] text-slate-400">押すと色が変わり数が増える＝いいねボタン</p>
    </div>
  );
}

function DropdownMenuDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="text-center">
      <div className="relative inline-block">
        <button
          onClick={() => setOpen(!open)}
          className="inline-flex items-center gap-1 rounded-lg bg-white px-4 py-2 text-sm font-bold text-slate-700 ring-1 ring-slate-300"
        >
          メニュー <span className="text-xs">▼</span>
        </button>
        {open && (
          <div className="absolute left-1/2 z-10 mt-1 w-32 -translate-x-1/2 rounded-lg bg-white py-1 text-left shadow-lg ring-1 ring-slate-200">
            {["編集", "複製", "削除"].map((o) => (
              <div key={o} onClick={() => setOpen(false)} className="cursor-pointer px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50">
                {o}
              </div>
            ))}
          </div>
        )}
      </div>
      <p className="mt-2 text-[10px] text-slate-400">押すと下に選択肢が開く＝ドロップダウン</p>
    </div>
  );
}

function ColorPickerDemo() {
  const cols = ["#1fc866", "#3b82f6", "#f43f5e", "#f59e0b", "#8b5cf6", "#0ea5e9"];
  const [c, setC] = useState(cols[0]);
  return (
    <div className="w-full max-w-xs text-center">
      <div className="mx-auto h-14 w-14 rounded-2xl shadow-inner ring-1 ring-black/10" style={{ background: c }} />
      <p className="mt-1 font-mono text-xs text-slate-500">{c}</p>
      <div className="mt-2 flex justify-center gap-1.5">
        {cols.map((x) => (
          <button key={x} onClick={() => setC(x)} className={`h-6 w-6 rounded-full ring-2 ${c === x ? "ring-slate-700" : "ring-transparent"}`} style={{ background: x }} />
        ))}
      </div>
      <p className="mt-2 text-[10px] text-slate-400">色をビジュアルに選ぶ＝カラーピッカー</p>
    </div>
  );
}

function CountdownDemo() {
  const [s, setS] = useState(2 * 3600 + 14 * 60 + 30);
  useEffect(() => {
    const t = setInterval(() => setS((v) => (v > 0 ? v - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const p = (n: number) => String(n).padStart(2, "0");
  return (
    <div className="text-center">
      <p className="text-xs text-slate-500">セール終了まで</p>
      <p className="font-display mt-1 text-3xl font-extrabold tabular-nums text-rose-500">
        {p(Math.floor(s / 3600))}:{p(Math.floor((s % 3600) / 60))}:{p(s % 60)}
      </p>
      <p className="mt-2 text-[10px] text-slate-400">残り時間を刻々と減らす＝カウントダウン</p>
    </div>
  );
}

const QR_MATRIX = ["11101111", "10100101", "11110111", "00011000", "01001011", "11101100", "10110011", "11101010"];

function TagInputDemo() {
  const [tags, setTags] = useState(["旅行", "カメラ"]);
  const [v, setV] = useState("");
  return (
    <div className="w-full max-w-xs">
      <div className="flex flex-wrap items-center gap-1.5 rounded-lg bg-white p-2 ring-1 ring-slate-300">
        {tags.map((t) => (
          <span key={t} className="inline-flex items-center gap-1 rounded bg-blue-50 px-2 py-0.5 text-xs text-blue-700">
            {t}
            <button onClick={() => setTags(tags.filter((x) => x !== t))} className="text-blue-400">×</button>
          </span>
        ))}
        <input
          value={v}
          onChange={(e) => setV(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && v.trim()) {
              setTags([...tags, v.trim()]);
              setV("");
            }
          }}
          placeholder="入力してEnter"
          className="min-w-[6rem] flex-1 bg-transparent text-xs outline-none"
        />
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">言葉がチップになる入力欄＝タグ入力</p>
    </div>
  );
}

function SortDemo() {
  const opts = ["新着順", "人気順", "価格が安い順"];
  const [sel, setSel] = useState(opts[0]);
  const [open, setOpen] = useState(false);
  return (
    <div className="text-center">
      <div className="relative inline-block">
        <button onClick={() => setOpen(!open)} className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-sm font-bold text-slate-600 ring-1 ring-slate-300">
          並び替え：{sel} <span className="text-xs">▼</span>
        </button>
        {open && (
          <div className="absolute left-0 z-10 mt-1 w-36 rounded-lg bg-white py-1 text-left shadow-lg ring-1 ring-slate-200">
            {opts.map((o) => (
              <div key={o} onClick={() => { setSel(o); setOpen(false); }} className={`cursor-pointer px-3 py-1.5 text-xs hover:bg-slate-50 ${o === sel ? "font-bold text-brand-600" : "text-slate-600"}`}>
                {o}
              </div>
            ))}
          </div>
        )}
      </div>
      <p className="mt-3 text-[10px] text-slate-400">順番を切り替える＝並び替え</p>
    </div>
  );
}

function BookmarkDemo() {
  const [on, setOn] = useState(false);
  return (
    <div className="text-center">
      <button onClick={() => setOn(!on)} className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition ${on ? "bg-amber-50 text-amber-600" : "bg-slate-100 text-slate-500"}`}>
        <Icon name={on ? "check" : "book"} className="h-4 w-4" strokeWidth={on ? 3 : 2} />
        {on ? "保存済み" : "あとで読む"}
      </button>
      <p className="mt-2 text-[10px] text-slate-400">押すと保存される＝ブックマークボタン</p>
    </div>
  );
}

function FollowDemo() {
  const [f, setF] = useState(false);
  return (
    <div className="text-center">
      <button onClick={() => setF(!f)} className={`rounded-full px-5 py-2 text-sm font-bold transition ${f ? "bg-slate-100 text-slate-500 ring-1 ring-slate-300" : "bg-blue-500 text-white"}`}>
        {f ? "フォロー中" : "フォローする"}
      </button>
      <p className="mt-2 text-[10px] text-slate-400">押すとフォロー中に変わる＝フォローボタン</p>
    </div>
  );
}

function CollapseDemo() {
  const [o, setO] = useState(false);
  return (
    <div className="w-full max-w-xs">
      <div className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-200">
        <button onClick={() => setO(!o)} className="flex w-full items-center justify-between px-3 py-2 text-sm font-bold text-slate-700">
          <span>くわしい説明</span>
          <span className="text-xs text-slate-400">{o ? "▲" : "▼"}</span>
        </button>
        {o && <div className="border-t border-slate-100 px-3 py-2 text-xs text-slate-500">押すと開いて中身が見える、たたむ表示です。</div>}
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">出したり隠したり＝折りたたみ</p>
    </div>
  );
}

function MultiSelectDemo() {
  const opts = ["React", "Vue", "CSS", "TS"];
  const [sel, setSel] = useState<string[]>(["React", "CSS"]);
  const toggle = (o: string) => setSel(sel.includes(o) ? sel.filter((x) => x !== o) : [...sel, o]);
  return (
    <div className="w-full max-w-xs">
      <div className="space-y-1 rounded-lg bg-white p-2 shadow-sm ring-1 ring-slate-200">
        {opts.map((o) => (
          <button key={o} onClick={() => toggle(o)} className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm hover:bg-slate-50">
            <span className={`flex h-4 w-4 items-center justify-center rounded border ${sel.includes(o) ? "border-brand-500 bg-brand-500 text-white" : "border-slate-300"}`}>
              {sel.includes(o) && <Icon name="check" className="h-3 w-3" strokeWidth={4} />}
            </span>
            <span className="text-slate-600">{o}</span>
          </button>
        ))}
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">複数を同時に選ぶ＝複数選択</p>
    </div>
  );
}

function PasswordToggleDemo() {
  const [show, setShow] = useState(false);
  return (
    <div className="w-full max-w-xs">
      <div className="flex items-center rounded-lg bg-white ring-1 ring-slate-300 focus-within:ring-2 focus-within:ring-blue-500">
        <input type={show ? "text" : "password"} defaultValue="himitsu123" className="w-full bg-transparent px-3 py-2 text-sm outline-none" />
        <button onClick={() => setShow(!show)} className="px-3 text-slate-400 hover:text-slate-600">
          <Icon name="eye" className="h-4 w-4" />
        </button>
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">目のアイコンで表示切替＝パスワード表示切替</p>
    </div>
  );
}

function ChipFilterDemo() {
  const opts = ["新着", "セール", "送料無料", "レビュー高"];
  const [sel, setSel] = useState<string[]>(["セール"]);
  const t = (o: string) => setSel(sel.includes(o) ? sel.filter((x) => x !== o) : [...sel, o]);
  return (
    <div className="w-full max-w-xs text-center">
      <div className="flex flex-wrap justify-center gap-1.5">
        {opts.map((o) => (
          <button key={o} onClick={() => t(o)} className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${sel.includes(o) ? "bg-brand-500 text-white" : "bg-white text-slate-500 ring-1 ring-slate-200"}`}>
            {o}
          </button>
        ))}
      </div>
      <p className="mt-2 text-[10px] text-slate-400">押して絞り込む＝フィルターチップ</p>
    </div>
  );
}

function RadioCardDemo() {
  const opts: [string, string][] = [
    ["無料", "¥0"],
    ["VIP", "¥480/月"],
  ];
  const [sel, setSel] = useState("VIP");
  return (
    <div className="w-full max-w-xs">
      <div className="flex gap-2">
        {opts.map(([n, p]) => (
          <button key={n} onClick={() => setSel(n)} className={`flex-1 rounded-xl border-2 p-3 text-center transition ${sel === n ? "border-brand-500 bg-brand-50" : "border-slate-200 bg-white"}`}>
            <span className={`mx-auto mb-1 flex h-4 w-4 items-center justify-center rounded-full border-2 ${sel === n ? "border-brand-500" : "border-slate-300"}`}>
              {sel === n && <span className="h-2 w-2 rounded-full bg-brand-500" />}
            </span>
            <p className="text-sm font-bold text-slate-700">{n}</p>
            <p className="text-[10px] text-slate-400">{p}</p>
          </button>
        ))}
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">カードで1つ選ぶ＝選択カード</p>
    </div>
  );
}

function ReadMoreDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full max-w-xs">
      <p className="text-xs leading-relaxed text-slate-600">
        この商品はとても使いやすく、毎日活躍しています。
        {open && "デザインもシンプルで置き場所を選びません。バッテリーの持ちも良く、充電の手間が減りました。買ってよかったです。"}
        {!open && (
          <button onClick={() => setOpen(true)} className="ml-1 font-bold text-brand-600">…続きを読む</button>
        )}
      </p>
      <p className="mt-2 text-center text-[10px] text-slate-400">途中で省略→展開＝もっと見る</p>
    </div>
  );
}

function CharCounterDemo() {
  const [v, setV] = useState("こんにちは");
  const max = 20;
  const over = v.length > max;
  return (
    <div className="w-full max-w-xs">
      <textarea value={v} onChange={(e) => setV(e.target.value)} rows={2} className={`w-full resize-none rounded-lg bg-white px-3 py-2 text-sm outline-none ring-1 ${over ? "ring-rose-400" : "ring-slate-300 focus:ring-2 focus:ring-blue-500"}`} />
      <p className={`mt-1 text-right text-[11px] ${over ? "font-bold text-rose-500" : "text-slate-400"}`}>{v.length} / {max}</p>
      <p className="mt-1 text-center text-[10px] text-slate-400">残り文字数を表示＝文字数カウンター</p>
    </div>
  );
}

function RatingInputDemo() {
  const [n, setN] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div className="text-center">
      <div className="flex justify-center gap-1 text-2xl">
        {[1, 2, 3, 4, 5].map((i) => (
          <button key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(0)} onClick={() => setN(i)} className={(hover || n) >= i ? "text-amber-400" : "text-slate-200"}>★</button>
        ))}
      </div>
      <p className="mt-1 text-xs text-slate-500">{n ? `${n} をつけました` : "星を押して評価"}</p>
      <p className="mt-2 text-[10px] text-slate-400">押して評価を入力＝星をつける</p>
    </div>
  );
}

function SwitchListDemo() {
  const [on, setOn] = useState<Record<string, boolean>>({ 通知: true, ダークモード: false, 効果音: true });
  return (
    <div className="w-full max-w-xs">
      <div className="divide-y divide-slate-100 rounded-lg bg-white shadow-sm ring-1 ring-slate-200">
        {Object.keys(on).map((k) => (
          <div key={k} className="flex items-center justify-between px-3 py-2.5">
            <span className="text-sm text-slate-600">{k}</span>
            <button onClick={() => setOn({ ...on, [k]: !on[k] })} className={`relative h-5 w-9 rounded-full transition ${on[k] ? "bg-brand-500" : "bg-slate-300"}`}>
              <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${on[k] ? "left-4" : "left-0.5"}`} />
            </button>
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">スイッチを並べた設定＝設定リスト</p>
    </div>
  );
}

function DarkModeToggleDemo() {
  const [dark, setDark] = useState(false);
  return (
    <div className="text-center">
      <div className={`mx-auto w-44 rounded-xl p-4 transition ${dark ? "bg-slate-800" : "bg-white ring-1 ring-slate-200"}`}>
        <div className="flex items-center justify-between">
          <span className={`text-sm font-bold ${dark ? "text-white" : "text-slate-700"}`}>{dark ? "ダーク" : "ライト"}</span>
          <button onClick={() => setDark(!dark)} className={`relative h-6 w-11 rounded-full transition ${dark ? "bg-brand-500" : "bg-slate-300"}`}>
            <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${dark ? "left-5" : "left-0.5"}`} />
          </button>
        </div>
        <div className={`mt-3 h-2 rounded ${dark ? "bg-slate-600" : "bg-slate-100"}`} />
        <div className={`mt-1.5 h-2 w-2/3 rounded ${dark ? "bg-slate-600" : "bg-slate-100"}`} />
      </div>
      <p className="mt-2 text-[10px] text-slate-400">明暗を切り替える＝ダークモード切替</p>
    </div>
  );
}

function QuantityDemo() {
  const [n, setN] = useState(1);
  return (
    <div className="text-center">
      <div className="inline-flex items-center rounded-lg bg-white shadow-sm ring-1 ring-slate-200">
        <button onClick={() => setN(Math.max(1, n - 1))} className="px-3 py-2 text-lg font-bold text-slate-500 hover:bg-slate-50">−</button>
        <span className="font-display w-10 text-center font-extrabold text-slate-800">{n}</span>
        <button onClick={() => setN(n + 1)} className="px-3 py-2 text-lg font-bold text-slate-500 hover:bg-slate-50">＋</button>
      </div>
      <p className="mt-2 text-[10px] text-slate-400">−と＋で個数を増減＝数量ステッパー</p>
    </div>
  );
}

function PasswordStrengthDemo() {
  const [v, setV] = useState("abc");
  const score = (v.length >= 8 ? 1 : 0) + (/[A-Z]/.test(v) ? 1 : 0) + (/[0-9]/.test(v) ? 1 : 0) + (/[^A-Za-z0-9]/.test(v) ? 1 : 0);
  const labels = ["弱い", "弱い", "普通", "強い", "最強"];
  const colors = ["bg-rose-400", "bg-rose-400", "bg-amber-400", "bg-emerald-400", "bg-emerald-500"];
  return (
    <div className="w-full max-w-xs">
      <input value={v} onChange={(e) => setV(e.target.value)} className="w-full rounded-lg bg-white px-3 py-2 text-sm outline-none ring-1 ring-slate-300 focus:ring-2 focus:ring-blue-500" />
      <div className="mt-2 flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full ${i < score ? colors[score] : "bg-slate-200"}`} />
        ))}
      </div>
      <p className="mt-1 text-right text-[11px] font-bold text-slate-500">{v ? labels[score] : ""}</p>
      <p className="mt-1 text-center text-[10px] text-slate-400">安全度を色バーで＝パスワード強度</p>
    </div>
  );
}

function CopyButtonDemo() {
  const [done, setDone] = useState(false);
  return (
    <div className="text-center">
      <div className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2">
        <span className="font-mono text-xs text-slate-600">COCRE-AB12CD</span>
        <button onClick={() => { setDone(true); setTimeout(() => setDone(false), 1200); }} className="rounded bg-white px-2 py-1 text-[10px] font-bold text-brand-600 ring-1 ring-slate-200">
          {done ? "コピー済" : "コピー"}
        </button>
      </div>
      <p className="mt-2 text-[10px] text-slate-400">押すとコピー＆通知＝コピーボタン</p>
    </div>
  );
}

function ColorSwatchDemo() {
  const cols = ["#0f172a", "#ef4444", "#3b82f6", "#22c55e", "#f59e0b"];
  const [c, setC] = useState(cols[2]);
  return (
    <div className="text-center">
      <div className="flex justify-center gap-2">
        {cols.map((x) => (
          <button key={x} onClick={() => setC(x)} className={`h-8 w-8 rounded-lg ring-2 ring-offset-2 ${c === x ? "ring-slate-400" : "ring-transparent"}`} style={{ background: x }} />
        ))}
      </div>
      <p className="mt-2 text-[10px] text-slate-400">色の候補を並べる＝色見本</p>
    </div>
  );
}

function ChecklistDemo() {
  const items = ["会員登録", "プロフィール入力", "最初のレッスン"];
  const [done, setDone] = useState<string[]>(["会員登録"]);
  const t = (x: string) => setDone(done.includes(x) ? done.filter((d) => d !== x) : [...done, x]);
  return (
    <div className="w-full max-w-xs">
      <div className="space-y-1 rounded-lg bg-white p-3 shadow-sm ring-1 ring-slate-200">
        {items.map((x) => {
          const on = done.includes(x);
          return (
            <button key={x} onClick={() => t(x)} className="flex w-full items-center gap-2 rounded px-1 py-1.5 text-left hover:bg-slate-50">
              <span className={`flex h-5 w-5 items-center justify-center rounded border-2 ${on ? "border-brand-500 bg-brand-500 text-white" : "border-slate-300"}`}>
                {on && <Icon name="check" className="h-3 w-3" strokeWidth={4} />}
              </span>
              <span className={`text-sm ${on ? "text-slate-400 line-through" : "text-slate-600"}`}>{x}</span>
            </button>
          );
        })}
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">チェックで済/未済＝チェックリスト</p>
    </div>
  );
}

function InlineEditDemo() {
  const [editing, setEditing] = useState(false);
  const [v, setV] = useState("あかぐろ");
  return (
    <div className="text-center">
      {editing ? (
        <input autoFocus value={v} onChange={(e) => setV(e.target.value)} onBlur={() => setEditing(false)} onKeyDown={(e) => e.key === "Enter" && setEditing(false)} className="rounded-lg bg-white px-3 py-1.5 text-sm outline-none ring-2 ring-blue-500" />
      ) : (
        <button onClick={() => setEditing(true)} className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-bold text-slate-700 hover:bg-slate-100">
          <span>{v}</span>
          <Icon name="pencil" className="h-3.5 w-3.5 text-slate-400" />
        </button>
      )}
      <p className="mt-2 text-[10px] text-slate-400">その場で書き換え＝その場編集（押してみて）</p>
    </div>
  );
}

function PollDemo() {
  const opts: [string, number][] = [
    ["きなこ", 62],
    ["あんこ", 38],
  ];
  const [voted, setVoted] = useState<string | null>(null);
  return (
    <div className="w-full max-w-xs">
      <p className="mb-2 text-center text-xs font-bold text-slate-700">どっち派？</p>
      <div className="space-y-2">
        {opts.map(([n, p]) => (
          <button key={n} onClick={() => setVoted(n)} className="relative w-full overflow-hidden rounded-lg bg-slate-100 px-3 py-2 text-left text-sm">
            {voted && <div className="absolute inset-y-0 left-0 bg-brand-200" style={{ width: `${p}%` }} />}
            <span className="relative flex justify-between font-bold text-slate-700">
              <span>{n}</span>
              {voted && <span>{p}%</span>}
            </span>
          </button>
        ))}
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">選ぶと割合が見える＝投票</p>
    </div>
  );
}

// ===== 概念用語の図解デモ（2026-07-19 追加バッチ：デモ未実装だった語を埋める）=====

function ConceptVariableDemo() {
  const vals = [0, 5, 42, 99];
  const [i, setI] = useState(0);
  return (
    <div className="w-full max-w-xs text-center">
      <div className="inline-flex items-stretch overflow-hidden rounded-xl shadow-sm ring-1 ring-slate-200">
        <span className="flex items-center bg-slate-100 px-3 text-sm font-bold text-slate-500">count</span>
        <span className="flex w-16 items-center justify-center bg-white py-3 font-display text-2xl font-extrabold text-slate-800">{vals[i]}</span>
      </div>
      <p className="mt-2 text-[10px] text-slate-400">名前つきの箱に値が入る。中身は入れ替えられる</p>
      <button onClick={() => setI((i + 1) % vals.length)} className="mt-2 rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-bold text-white hover:bg-blue-700">
        値を変える
      </button>
    </div>
  );
}

function ConceptStateDemo() {
  const [n, setN] = useState(0);
  return (
    <div className="w-full max-w-xs text-center">
      <div className="mx-auto flex w-32 flex-col items-center gap-1 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
        <span className="text-[10px] font-bold text-slate-400">state</span>
        <span className="font-display text-3xl font-extrabold text-slate-800">{n}</span>
      </div>
      <button onClick={() => setN((v) => v + 1)} className="mt-2 rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-bold text-white hover:bg-blue-700">
        +1
      </button>
      <p className="mt-1 text-[10px] text-slate-400">状態が変わると、画面が自動で描き直される</p>
    </div>
  );
}

function ConceptGitDemo() {
  const [commits, setCommits] = useState(["最初のページ", "色を変えた"]);
  return (
    <div className="w-full max-w-xs">
      <div className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-col gap-2">
          {commits.map((c, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="h-3 w-3 shrink-0 rounded-full bg-emerald-500 ring-2 ring-emerald-100" />
              <span className="truncate text-xs text-slate-600">{c}</span>
              {i === commits.length - 1 && <span className="ml-auto rounded bg-emerald-50 px-1.5 text-[9px] font-bold text-emerald-600">最新</span>}
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => setCommits((cs) => [...cs, `変更 ${cs.length + 1}`])}
        className="mt-2 w-full rounded-lg bg-slate-800 px-4 py-1.5 text-sm font-bold text-white hover:bg-slate-700"
      >
        コミット（セーブ）する
      </button>
      <p className="mt-1 text-center text-[10px] text-slate-400">変更を記録＝いつでも戻れるセーブ地点</p>
    </div>
  );
}

function ConceptHashDemo() {
  const [hashed, setHashed] = useState(false);
  return (
    <div className="w-full max-w-xs text-center">
      <div className="flex items-center justify-center gap-2">
        <span className="rounded-lg bg-white px-3 py-2 font-mono text-xs text-slate-700 shadow-sm ring-1 ring-slate-200">pass123</span>
        <Icon name="arrow-right" className="h-4 w-4 text-slate-400" />
        <span className={`rounded-lg px-3 py-2 font-mono text-xs shadow-sm ring-1 transition ${hashed ? "bg-slate-800 text-emerald-300 ring-slate-700" : "bg-slate-50 text-slate-300 ring-slate-200"}`}>
          {hashed ? "a9$Fk2!xQ" : "????????"}
        </span>
      </div>
      <button onClick={() => setHashed((h) => !h)} className="mt-3 rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-bold text-white hover:bg-blue-700">
        {hashed ? "もとに戻す" : "ハッシュ化する"}
      </button>
      <p className="mt-1 text-[10px] text-slate-400">元に戻せない形にして保存。漏れても安心</p>
    </div>
  );
}

function ConceptTypeScriptDemo() {
  const [wrong, setWrong] = useState(false);
  return (
    <div className="w-full max-w-xs text-center">
      <div className="rounded-lg bg-slate-900 p-3 text-left font-mono text-[11px] leading-relaxed text-slate-100">
        <div><span className="text-sky-300">let</span> age: <span className="text-emerald-300">number</span></div>
        <div>
          age = {wrong ? <span className="text-rose-300">&quot;二十&quot;</span> : <span className="text-amber-300">20</span>}
          {wrong && <span className="ml-1 text-rose-400">← 型エラー！</span>}
        </div>
      </div>
      <button onClick={() => setWrong((w) => !w)} className="mt-3 rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-bold text-white hover:bg-blue-700">
        {wrong ? "正しい値に直す" : "わざと文字を入れる"}
      </button>
      <p className="mt-1 text-[10px] text-slate-400">種類ちがいを、実行前に警告してくれる</p>
    </div>
  );
}

function ConceptFetchDemo() {
  const [phase, setPhase] = useState<"idle" | "loading" | "done">("idle");
  const run = () => {
    setPhase("loading");
    setTimeout(() => setPhase("done"), 900);
  };
  return (
    <div className="w-full max-w-xs text-center">
      <div className="min-h-[3.5rem] rounded-lg bg-white p-3 text-left font-mono text-[11px] shadow-sm ring-1 ring-slate-200">
        {phase === "idle" && <span className="text-slate-400">// ボタンで取ってくる</span>}
        {phase === "loading" && <span className="text-slate-500">読み込み中…</span>}
        {phase === "done" && (
          <span className="text-slate-700">{"{ "}<span className="text-blue-600">&quot;temp&quot;</span>: 24 {"}"}</span>
        )}
      </div>
      <button onClick={run} className="mt-3 rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-50" disabled={phase === "loading"}>
        {phase === "done" ? "もう一度 fetch" : "fetch でデータ取得"}
      </button>
      <p className="mt-1 text-[10px] text-slate-400">お願い→待つ→JSONが返ってくる（非同期）</p>
    </div>
  );
}

function ConceptDeployDemo() {
  const [live, setLive] = useState(false);
  return (
    <div className="w-full max-w-xs">
      <div className="flex items-center justify-between gap-2">
        <div className="flex w-16 flex-col items-center gap-1 rounded-xl bg-white p-2.5 shadow-sm ring-1 ring-slate-200">
          <Icon name="monitor" className="h-5 w-5 text-slate-500" />
          <span className="text-[9px] font-bold text-slate-500">自分のPC</span>
        </div>
        <div className="flex-1 text-center">
          <Icon name="arrow-right" className={`mx-auto h-4 w-4 transition ${live ? "text-emerald-500" : "text-slate-300"}`} />
          <span className="text-[9px] text-slate-400">デプロイ</span>
        </div>
        <div className={`flex w-16 flex-col items-center gap-1 rounded-xl p-2.5 shadow-sm ring-1 transition ${live ? "bg-emerald-50 ring-emerald-200" : "bg-white ring-slate-200"}`}>
          <Icon name="database" className={`h-5 w-5 ${live ? "text-emerald-500" : "text-slate-400"}`} />
          <span className="text-[9px] font-bold text-slate-500">ネット上</span>
        </div>
      </div>
      <div className={`mt-2 rounded-lg py-1.5 text-center font-mono text-[10px] transition ${live ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-300"}`}>
        {live ? "https://my-site.app 公開中！" : "まだ公開されていない"}
      </div>
      <button onClick={() => setLive((v) => !v)} className="mt-2 w-full rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-bold text-white hover:bg-blue-700">
        {live ? "取り下げる" : "本番に公開する"}
      </button>
    </div>
  );
}

function ConceptArrayDemo() {
  const pool = ["いちご", "ぶどう", "もも", "なし", "かき"];
  const [items, setItems] = useState(["りんご", "みかん", "ばなな"]);
  const add = () => setItems((xs) => (xs.length >= 6 ? xs : [...xs, pool[(xs.length - 3) % pool.length]]));
  return (
    <div className="w-full max-w-xs text-center">
      <div className="flex flex-wrap justify-center gap-1.5">
        {items.map((v, i) => (
          <div key={i} className="flex flex-col items-center">
            <span className="rounded-lg bg-white px-2 py-2 text-xs font-bold text-slate-700 shadow-sm ring-1 ring-slate-200">{v}</span>
            <span className="mt-1 font-mono text-[10px] text-slate-400">[{i}]</span>
          </div>
        ))}
      </div>
      <button onClick={add} className="mt-3 rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-50" disabled={items.length >= 6}>
        push で末尾に追加
      </button>
      <p className="mt-1 text-[10px] text-slate-400">同じ種類をならびで持つ。数え始めは0番から（全{items.length}件）</p>
    </div>
  );
}

function ConceptLoopDemo() {
  const [active, setActive] = useState(-1);
  const run = () => {
    setActive(0);
    [1, 2].forEach((n, k) => setTimeout(() => setActive(n), (k + 1) * 500));
    setTimeout(() => setActive(-1), 1800);
  };
  return (
    <div className="w-full max-w-xs text-center">
      <div className="flex items-center justify-center gap-2">
        {[0, 1, 2].map((n) => (
          <span
            key={n}
            className={`flex h-9 w-9 items-center justify-center rounded-full font-display text-sm font-extrabold ring-1 transition ${
              active === n ? "scale-110 bg-blue-600 text-white ring-blue-600" : "bg-blue-50 text-blue-600 ring-blue-100"
            }`}
          >
            {n + 1}
          </span>
        ))}
      </div>
      <button onClick={run} className="mt-3 rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-bold text-white hover:bg-blue-700">
        くり返し実行
      </button>
      <p className="mt-1 text-[10px] text-slate-400">全部に同じ処理を、1件ずつ自動でくり返す（for）</p>
    </div>
  );
}

function ConceptFunctionDemo() {
  const [a, setA] = useState(2);
  const [b, setB] = useState(3);
  const [result, setResult] = useState<number | null>(null);
  const clamp = (n: number) => Math.max(0, Math.min(9, n));
  const fields: [string, number, (n: number) => void][] = [
    ["a", a, setA],
    ["b", b, setB],
  ];
  return (
    <div className="w-full max-w-xs text-center">
      <div className="flex items-center justify-center gap-4">
        {fields.map(([label, value, set]) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <span className="font-mono text-[10px] text-slate-400">{label}</span>
            <div className="flex items-center gap-1">
              <button onClick={() => { set(clamp(value - 1)); setResult(null); }} className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-100 text-base font-bold text-slate-600 hover:bg-slate-200">−</button>
              <span className="w-7 rounded-md bg-white py-1 text-center font-mono text-xs font-bold text-slate-700 shadow-sm ring-1 ring-slate-200">{value}</span>
              <button onClick={() => { set(clamp(value + 1)); setResult(null); }} className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-100 text-base font-bold text-slate-600 hover:bg-slate-200">+</button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => setResult(a + b)} className="mt-3 rounded-lg bg-blue-600 px-4 py-1.5 font-mono text-xs font-bold text-white hover:bg-blue-700">
        add({a}, {b}) を実行
      </button>
      <div className="mt-3 flex items-center justify-center gap-2">
        <span className="font-mono text-[11px] text-slate-400">return</span>
        <Icon name="arrow-right" className="h-4 w-4 text-slate-400" />
        <span className={`rounded-lg px-3 py-1.5 font-mono text-sm font-bold ring-1 transition ${result === null ? "bg-slate-50 text-slate-300 ring-slate-200" : "bg-emerald-50 text-emerald-600 ring-emerald-100"}`}>
          {result === null ? "?" : result}
        </span>
      </div>
      <p className="mt-2 text-[10px] text-slate-400">材料（引数）を入れて実行すると、答え（戻り値）が返る</p>
    </div>
  );
}

function ConceptPropsDemo() {
  const labels = ["送信", "削除", "OK"];
  const variants = [
    { key: "blue", cls: "bg-blue-600", name: "primary" },
    { key: "rose", cls: "bg-rose-500", name: "danger" },
    { key: "slate", cls: "bg-slate-700", name: "neutral" },
  ];
  const [label, setLabel] = useState(labels[0]);
  const [variant, setVariant] = useState(variants[0]);
  return (
    <div className="w-full max-w-xs text-center">
      <div className="rounded-lg bg-slate-900 p-2 text-left font-mono text-[10px] text-slate-100">
        &lt;Button label=<span className="text-amber-300">&quot;{label}&quot;</span> variant=<span className="text-sky-300">&quot;{variant.name}&quot;</span> /&gt;
      </div>
      <div className="my-1 text-slate-300">↓</div>
      <button className={`mx-auto block rounded-lg px-5 py-2 text-sm font-bold text-white transition ${variant.cls}`}>{label}</button>
      <div className="mt-3 space-y-1.5">
        <div className="flex items-center justify-center gap-1">
          <span className="mr-1 w-12 text-right font-mono text-[10px] text-slate-400">label</span>
          {labels.map((l) => (
            <button key={l} onClick={() => setLabel(l)} className={`rounded-md px-2 py-1 text-[10px] font-bold ring-1 transition ${label === l ? "bg-blue-50 text-blue-600 ring-blue-200" : "bg-white text-slate-400 ring-slate-200"}`}>{l}</button>
          ))}
        </div>
        <div className="flex items-center justify-center gap-1">
          <span className="mr-1 w-12 text-right font-mono text-[10px] text-slate-400">variant</span>
          {variants.map((v) => (
            <button key={v.key} onClick={() => setVariant(v)} aria-label={v.name} className={`h-6 w-6 rounded-md transition ${v.cls} ${variant.key === v.key ? "ring-2 ring-slate-700 ring-offset-1" : "opacity-50"}`} />
          ))}
        </div>
      </div>
      <p className="mt-2 text-[10px] text-slate-400">外から渡す設定（props）で中身と見た目が変わる</p>
    </div>
  );
}

function ConceptSeoDemo() {
  const [optimized, setOptimized] = useState(false);
  const rows = optimized
    ? [
        { t: "Co-Cre | フロント用語図鑑", me: true },
        { t: "別の用語サイト", me: false },
        { t: "まとめ記事", me: false },
      ]
    : [
        { t: "別の用語サイト", me: false },
        { t: "まとめ記事", me: false },
        { t: "Co-Cre | フロント用語図鑑", me: true },
      ];
  return (
    <div className="w-full max-w-xs">
      <div className="rounded-lg bg-white p-3 shadow-sm ring-1 ring-slate-200">
        {rows.map((row, i) => (
          <div key={row.t} className="flex items-center gap-2 py-1">
            <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${i === 0 ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-400"}`}>{i + 1}</span>
            <span className={`truncate text-xs ${row.me ? "font-bold text-blue-600" : "text-slate-400"}`}>{row.t}</span>
            {row.me && <span className="ml-auto shrink-0 rounded bg-blue-50 px-1.5 text-[9px] font-bold text-blue-500">あなた</span>}
          </div>
        ))}
      </div>
      <button onClick={() => setOptimized((v) => !v)} className="mt-2 w-full rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-bold text-white hover:bg-blue-700">
        {optimized ? "対策をやめる" : "SEO対策する"}
      </button>
      <p className="mt-2 text-center text-[10px] text-slate-400">検索で上位に出る工夫＝SEO（対策で順位が上がる）</p>
    </div>
  );
}

function ConceptComponentDemo() {
  const [n, setN] = useState(3);
  return (
    <div className="w-full max-w-xs text-center">
      <div className="flex min-h-[4rem] flex-wrap items-center justify-center gap-2">
        {Array.from({ length: n }).map((_, i) => (
          <span key={i} className="animate-pop-in rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white">ボタン</span>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-center gap-2">
        <button onClick={() => setN((v) => Math.max(1, v - 1))} className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-base font-bold text-slate-600 hover:bg-slate-200">−</button>
        <span className="w-16 font-mono text-xs text-slate-500">×{n} 個</span>
        <button onClick={() => setN((v) => Math.min(6, v + 1))} className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-base font-bold text-white hover:bg-blue-700">+</button>
      </div>
      <p className="mt-2 text-[10px] text-slate-400">1回つくった部品（Button）を、何度でも置ける</p>
    </div>
  );
}

function ConceptHttpsDemo() {
  const [secure, setSecure] = useState(true);
  return (
    <div className="w-full max-w-xs text-center">
      <div className={`mx-auto flex w-fit items-center gap-2 rounded-full px-3 py-2 shadow-sm ring-1 transition ${secure ? "bg-white ring-slate-200" : "bg-rose-50 ring-rose-200"}`}>
        {secure ? (
          <Icon name="lock" className="h-4 w-4 text-emerald-500" />
        ) : (
          <Icon name="x" className="h-4 w-4 text-rose-500" strokeWidth={3} />
        )}
        <span className="font-mono text-xs text-slate-600">
          <span className={secure ? "text-emerald-600" : "text-rose-500"}>{secure ? "https" : "http"}</span>://co-cre.app
        </span>
      </div>
      <div className={`mt-2 rounded-lg py-1.5 text-[10px] font-bold transition ${secure ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
        {secure ? "通信は暗号化されていて安全" : "保護されていない通信（盗み見の危険）"}
      </div>
      <button onClick={() => setSecure((v) => !v)} className="mt-3 rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-bold text-white hover:bg-blue-700">
        {secure ? "http に切り替える" : "https に戻す"}
      </button>
      <p className="mt-2 text-[10px] text-slate-400">鍵マーク＝暗号化。http は保護なし</p>
    </div>
  );
}

function ConceptClassDemo() {
  const names = ["A", "B", "C", "D"];
  const [items, setItems] = useState<string[]>([]);
  const add = () => setItems((xs) => (xs.length >= names.length ? xs : [...xs, names[xs.length]]));
  return (
    <div className="w-full max-w-xs text-center">
      <div className="flex items-center justify-center gap-3">
        <div className="flex flex-col items-center gap-1">
          <span className="rounded-lg border-2 border-dashed border-slate-300 px-3 py-2 text-xs font-bold text-slate-500">設計図</span>
          <span className="font-mono text-[9px] text-slate-400">class</span>
        </div>
        <Icon name="arrow-right" className="h-4 w-4 text-slate-400" />
        <div className="flex min-h-[2rem] min-w-[6rem] flex-wrap items-center gap-1.5">
          {items.length === 0 ? (
            <span className="text-[10px] text-slate-300">まだ実体なし</span>
          ) : (
            items.map((c) => (
              <span key={c} className="animate-pop-in flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white">{c}</span>
            ))
          )}
        </div>
      </div>
      <button onClick={add} disabled={items.length >= names.length} className="mt-3 rounded-lg bg-blue-600 px-4 py-1.5 font-mono text-xs font-bold text-white hover:bg-blue-700 disabled:opacity-50">
        new で実体をつくる
      </button>
      <p className="mt-2 text-[10px] text-slate-400">1つの設計図から、実体（インスタンス）を何個も作る</p>
    </div>
  );
}

function ConceptXssDemo() {
  const [escaped, setEscaped] = useState(true);
  return (
    <div className="w-full max-w-xs text-center">
      <p className="text-[10px] text-slate-400">ユーザーが送ってきた入力：</p>
      <div className="mt-1 rounded-lg bg-slate-900 p-2 text-left font-mono text-[10px] text-rose-300">&lt;script&gt;悪いコード&lt;/script&gt;</div>
      <div className="my-1 text-[10px] text-slate-300">↓ 画面に出すと</div>
      <div className={`rounded-lg p-2.5 text-left text-[11px] ring-1 transition ${escaped ? "bg-emerald-50 ring-emerald-200" : "bg-rose-50 ring-rose-200"}`}>
        {escaped ? (
          <span className="font-mono text-emerald-700">&lt;script&gt;悪いコード&lt;/script&gt;</span>
        ) : (
          <span className="font-bold text-rose-600">⚠ スクリプトが実行されてしまう！</span>
        )}
      </div>
      <p className={`mt-2 text-[10px] font-bold ${escaped ? "text-emerald-600" : "text-rose-500"}`}>
        {escaped ? "エスケープON＝ただの文字として表示（安全）" : "エスケープOFF＝コードとして動く（危険）"}
      </p>
      <button onClick={() => setEscaped((v) => !v)} className="mt-2 rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-bold text-white hover:bg-blue-700">
        エスケープを{escaped ? "OFF" : "ON"}にする
      </button>
      <p className="mt-2 text-[10px] text-slate-400">入力をそのまま信用しない＝XSS対策</p>
    </div>
  );
}

function ConceptCiDemo() {
  const [stage, setStage] = useState(-1); // -1:待機 0:コミット 1:テスト 2:完了
  const run = () => {
    setStage(0);
    setTimeout(() => setStage(1), 500);
    setTimeout(() => setStage(2), 1200);
  };
  const steps: { label: string; icon: IconName }[] = [
    { label: "コミット", icon: "code" },
    { label: "自動テスト", icon: "search" },
    { label: "OK", icon: "check" },
  ];
  return (
    <div className="w-full max-w-xs text-center">
      <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold">
        {steps.map((s, i) => (
          <Fragment key={s.label}>
            {i > 0 && <Icon name="arrow-right" className="h-3.5 w-3.5 text-slate-300" />}
            <span className={`inline-flex items-center gap-0.5 rounded px-2 py-1 transition ${stage >= i ? (i === 2 ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600") : "bg-slate-100 text-slate-400"}`}>
              <Icon name={s.icon} className="h-3 w-3" strokeWidth={i === 2 ? 3 : 2} />
              {s.label}
            </span>
          </Fragment>
        ))}
      </div>
      <button onClick={run} className="mt-3 rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-bold text-white hover:bg-blue-700">
        コミットして実行
      </button>
      <p className="mt-2 text-[10px] text-slate-400">変更のたび自動でテスト＝壊れの見張り番（CI）</p>
    </div>
  );
}

function ConceptTailwindDemo() {
  const [p, setP] = useState(true);
  const [bg, setBg] = useState(true);
  const [round, setRound] = useState(true);
  const toggles: [string, boolean, (v: boolean) => void][] = [
    ["p-4", p, setP],
    ["bg-blue-600", bg, setBg],
    ["rounded-xl", round, setRound],
  ];
  return (
    <div className="w-full max-w-xs text-center">
      <div className="rounded bg-slate-900 p-2 text-left font-mono text-[10px] text-slate-100">
        class=&quot;
        <span className={p ? "text-sky-300" : "text-slate-600 line-through"}>p-4</span>{" "}
        <span className={bg ? "text-emerald-300" : "text-slate-600 line-through"}>bg-blue-600</span>{" "}
        <span className={round ? "text-amber-300" : "text-slate-600 line-through"}>rounded-xl</span> text-white&quot;
      </div>
      <div className="my-2 text-slate-300">↓</div>
      <div className={`mx-auto w-24 text-xs font-bold text-white ${p ? "p-4" : "p-1"} ${bg ? "bg-blue-600" : "bg-slate-300"} ${round ? "rounded-xl" : "rounded-none"}`}>箱</div>
      <div className="mt-3 flex flex-wrap justify-center gap-1.5">
        {toggles.map(([label, val, set]) => (
          <button key={label} onClick={() => set(!val)} className={`rounded-md px-2 py-1 font-mono text-[10px] font-bold ring-1 transition ${val ? "bg-blue-50 text-blue-600 ring-blue-200" : "bg-white text-slate-400 ring-slate-200"}`}>
            {label}
          </button>
        ))}
      </div>
      <p className="mt-2 text-[10px] text-slate-400">小さなクラスを足し引きして見た目を作る</p>
    </div>
  );
}

const demos: Record<string, () => ReactNode> = {
  // ---- 概念用語の図解（2026-07-19）----
  variable: () => <ConceptVariableDemo />,
  state: () => <ConceptStateDemo />,
  git: () => <ConceptGitDemo />,
  hash: () => <ConceptHashDemo />,
  typescript: () => <ConceptTypeScriptDemo />,
  fetch: () => <ConceptFetchDemo />,
  async: () => <ConceptFetchDemo />,
  deploy: () => <ConceptDeployDemo />,
  hosting: () => <ConceptDeployDemo />,
  array: () => <ConceptArrayDemo />,
  loop: () => <ConceptLoopDemo />,
  function: () => <ConceptFunctionDemo />,
  argument: () => (
    <div className="w-full max-w-xs text-center">
      <div className="rounded-lg bg-slate-900 p-3 text-left font-mono text-[11px] text-slate-100">
        greet(<span className="rounded bg-amber-400/20 px-1 text-amber-300">&quot;あやと&quot;</span>)
      </div>
      <p className="mt-2 text-[10px] text-slate-400">関数に渡す“材料”＝引数（ハイライト部分）</p>
    </div>
  ),
  "return-value": () => (
    <div className="w-full max-w-xs text-center">
      <div className="rounded-lg bg-slate-900 p-3 text-left font-mono text-[11px] text-slate-100">
        <span className="text-sky-300">return</span> <span className="rounded bg-emerald-400/20 px-1 text-emerald-300">a + b</span>
      </div>
      <p className="mt-2 text-[10px] text-slate-400">関数が外に返す“答え”＝戻り値（ハイライト部分）</p>
    </div>
  ),
  component: () => <ConceptComponentDemo />,
  props: () => <ConceptPropsDemo />,
  tailwind: () => <ConceptTailwindDemo />,
  https: () => <ConceptHttpsDemo />,
  xss: () => <ConceptXssDemo />,
  ci: () => <ConceptCiDemo />,
  seo: () => <ConceptSeoDemo />,
  ogp: () => (
    <div className="w-full max-w-[15rem]">
      <div className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-200">
        <div className="flex h-16 items-center justify-center bg-gradient-to-br from-emerald-400 to-emerald-600 text-sm font-extrabold text-white">Co-Cre</div>
        <div className="p-2">
          <p className="truncate text-xs font-bold text-slate-700">フロントエンド用語図鑑</p>
          <p className="truncate text-[10px] text-slate-400">co-cre.app</p>
        </div>
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">SNSでリンクを貼ると出るプレビュー＝OGP</p>
    </div>
  ),
  debug: () => (
    <div className="w-full max-w-xs text-center">
      <div className="rounded-lg bg-slate-900 p-3 text-left font-mono text-[11px] text-slate-100">
        <div className="text-slate-400">console.log(total)</div>
        <div className="mt-1 flex items-center gap-1"><Icon name="search" className="h-3 w-3 text-amber-300" /><span className="text-amber-300">total = 0 ← 期待とちがう！</span></div>
      </div>
      <p className="mt-2 text-[10px] text-slate-400">中身をのぞいて不具合の原因を探す＝デバッグ</p>
    </div>
  ),
  class: () => <ConceptClassDemo />,
  framework: () => (
    <div className="w-full max-w-xs text-center">
      <div className="mx-auto w-32 rounded-lg border-2 border-blue-200 bg-blue-50/50 p-2">
        <div className="rounded bg-white py-1 text-[9px] font-bold text-slate-400 ring-1 ring-slate-200">用意された土台</div>
        <div className="mt-1 grid grid-cols-2 gap-1">
          <div className="rounded bg-blue-600 py-1.5 text-[9px] text-white">部品</div>
          <div className="rounded bg-blue-600 py-1.5 text-[9px] text-white">部品</div>
        </div>
      </div>
      <p className="mt-2 text-[10px] text-slate-400">骨組みが最初からある道具＝フレームワーク</p>
    </div>
  ),
  library: () => (
    <div className="w-full max-w-xs text-center">
      <div className="flex items-center justify-center gap-2">
        <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-500">道具箱</span>
        <Icon name="arrow-right" className="h-4 w-4 text-slate-400" />
        <div className="flex gap-1">
          {["日付", "グラフ", "通信"].map((t) => (
            <span key={t} className="rounded bg-emerald-50 px-1.5 py-1 text-[9px] font-bold text-emerald-600 ring-1 ring-emerald-100">{t}</span>
          ))}
        </div>
      </div>
      <p className="mt-2 text-[10px] text-slate-400">便利な部品を取り出して使う＝ライブラリ</p>
    </div>
  ),
  ux: () => (
    <div className="w-full max-w-xs text-center">
      <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold text-slate-500">
        <span className="rounded bg-slate-100 px-2 py-1">見つける</span>
        <Icon name="arrow-right" className="h-3 w-3 text-slate-400" />
        <span className="rounded bg-slate-100 px-2 py-1">迷わない</span>
        <Icon name="arrow-right" className="h-3 w-3 text-slate-400" />
        <span className="inline-flex items-center gap-0.5 rounded bg-emerald-50 px-2 py-1 text-emerald-600"><Icon name="check" className="h-3 w-3" strokeWidth={3} />できた！</span>
      </div>
      <p className="mt-2 text-[10px] text-slate-400">使う人の“気持ちよさ”全体＝UX（体験）</p>
    </div>
  ),
  // ---- UI部品 追加（SNS・EC・ゲーム 2026-07-18n） ----
  poll: () => <PollDemo />,
  leaderboard: () => (
    <div className="w-full max-w-xs">
      <div className="divide-y divide-slate-100 rounded-lg bg-white shadow-sm ring-1 ring-slate-200">
        {[
          ["1", "たろう", "980", "bg-amber-400"],
          ["2", "はなこ", "840", "bg-slate-300"],
          ["3", "けん", "760", "bg-amber-600"],
        ].map(([r, n, s, c]) => (
          <div key={r} className="flex items-center gap-3 px-3 py-2">
            <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white ${c}`}>{r}</span>
            <span className="flex-1 text-sm text-slate-700">{n}</span>
            <span className="font-display text-sm font-extrabold text-slate-800">{s}</span>
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">順位・スコアを並べる＝ランキング表</p>
    </div>
  ),
  receipt: () => (
    <div className="w-full max-w-[13rem]">
      <div className="rounded-lg bg-white p-3 font-mono text-[11px] text-slate-600 shadow-sm ring-1 ring-slate-200">
        <p className="text-center font-bold">ご購入明細</p>
        <div className="my-1 border-t border-dashed border-slate-200" />
        {[
          ["コーヒー", "¥480"],
          ["ケーキ", "¥520"],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between">
            <span>{k}</span>
            <span>{v}</span>
          </div>
        ))}
        <div className="my-1 border-t border-dashed border-slate-200" />
        <div className="flex justify-between font-bold text-slate-800">
          <span>合計</span>
          <span>¥1,000</span>
        </div>
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">品目と合計の明細＝レシート</p>
    </div>
  ),
  ticket: () => (
    <div className="w-full max-w-xs">
      <div className="relative flex overflow-hidden rounded-xl bg-brand-500 text-white shadow-lg">
        <div className="flex-1 p-3">
          <p className="text-[10px] opacity-80">2026.08.01 18:00</p>
          <p className="font-display font-extrabold">Co-Cre LIVE</p>
          <p className="text-[10px] opacity-80">席 A-12</p>
        </div>
        <div className="flex w-16 items-center justify-center border-l-2 border-dashed border-white/40">
          <div className="h-10 w-10 rounded bg-white" />
        </div>
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">切り取り線つきの入場券＝チケット</p>
    </div>
  ),
  hashtag: () => (
    <div className="w-full max-w-xs text-center">
      <div className="flex flex-wrap justify-center gap-1.5">
        {["#初心者", "#CSS", "#毎日学習", "#フロントエンド"].map((t) => (
          <span key={t} className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-600">{t}</span>
        ))}
      </div>
      <p className="mt-2 text-[10px] text-slate-400">#で話題をまとめる＝ハッシュタグ</p>
    </div>
  ),
  wishlist: () => (
    <div className="w-full max-w-xs">
      <div className="grid grid-cols-2 gap-2">
        {["bg-rose-100", "bg-sky-100"].map((c, i) => (
          <div key={i} className="relative rounded-lg bg-white p-2 shadow-sm ring-1 ring-slate-200">
            <div className={`h-12 rounded ${c}`} />
            <p className="mt-1 truncate text-[10px] font-bold text-slate-600">商品名</p>
            <p className="text-[10px] text-slate-400">¥1,980</p>
            <Icon name="heart" className="absolute right-2 top-2 h-4 w-4 text-rose-500" />
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">保存した物のカード一覧＝お気に入り一覧</p>
    </div>
  ),
  "profile-header": () => (
    <div className="w-full max-w-xs">
      <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200">
        <div className="h-14 bg-gradient-to-r from-brand-400 to-sky-400" />
        <div className="px-3 pb-3">
          <span className="-mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-600 ring-4 ring-white">
            <Icon name="user" className="h-6 w-6" />
          </span>
          <p className="mt-1 font-display font-extrabold text-slate-800">あかぐろ</p>
          <div className="mt-1 flex gap-4 text-[10px] text-slate-400">
            <span><b className="text-slate-700">128</b> フォロー</span>
            <span><b className="text-slate-700">340</b> フォロワー</span>
          </div>
        </div>
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">カバー＋アイコン＋数値＝プロフィールヘッダー</p>
    </div>
  ),
  "points-badge": () => (
    <div className="text-center">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 ring-1 ring-amber-200">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-white">P</span>
        <span className="font-display font-extrabold text-amber-700">1,200<span className="ml-0.5 text-xs">pt</span></span>
      </span>
      <p className="mt-2 text-[10px] text-slate-400">コイン＋数字で残高＝ポイント表示</p>
    </div>
  ),
  "pull-quote": () => (
    <div className="w-full max-w-xs">
      <p className="text-[11px] leading-relaxed text-slate-500">…だからこそ、まず名前を知ることが大切です。</p>
      <blockquote className="my-2 border-y-2 border-brand-200 py-2 text-center font-display text-lg font-extrabold leading-snug text-brand-700">
        「名前がわかれば、
        <br />
        調べられる。」
      </blockquote>
      <p className="text-[11px] leading-relaxed text-slate-500">調べられれば、作れるようになります。…</p>
      <p className="mt-2 text-center text-[10px] text-slate-400">一文を大きく抜き出す＝引用（大）</p>
    </div>
  ),
  "order-tracking": () => (
    <div className="w-full max-w-xs">
      <div className="flex items-center">
        {["注文", "発送", "配達中", "完了"].map((s, i, arr) => (
          <div key={s} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${i <= 2 ? "bg-brand-500 text-white" : "bg-slate-200 text-slate-400"}`}>{i <= 2 ? "✓" : ""}</span>
              <span className="mt-1 text-[8px] text-slate-500">{s}</span>
            </div>
            {i < arr.length - 1 && <span className={`mx-0.5 h-0.5 flex-1 ${i < 2 ? "bg-brand-400" : "bg-slate-200"}`} />}
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">配送の進み具合＝配送状況</p>
    </div>
  ),
  // ---- UI部品 追加（ログイン・EC・通知 2026-07-18m） ----
  "social-login": () => (
    <div className="w-full max-w-xs space-y-2">
      {[
        ["Googleで続ける", "bg-white text-slate-700 ring-1 ring-slate-300"],
        ["LINEで続ける", "bg-[#06c755] text-white"],
        ["メールで続ける", "bg-slate-800 text-white"],
      ].map(([t, cls]) => (
        <button key={t} className={`w-full rounded-lg py-2.5 text-sm font-bold ${cls}`}>{t}</button>
      ))}
      <p className="text-center text-[10px] text-slate-400">SNSでサッとログイン＝SNSログイン</p>
    </div>
  ),
  "or-divider": () => (
    <div className="w-full max-w-xs">
      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-slate-200" />
        <span className="text-xs font-bold text-slate-400">または</span>
        <span className="h-px flex-1 bg-slate-200" />
      </div>
      <p className="mt-3 text-center text-[10px] text-slate-400">文字を挟んだ区切り＝区切りテキスト</p>
    </div>
  ),
  "newsletter-signup": () => (
    <div className="w-full max-w-xs text-center">
      <p className="text-xs font-bold text-slate-700">最新情報を受け取る</p>
      <div className="mt-2 flex gap-1">
        <input placeholder="you@example.com" className="w-full rounded-lg bg-white px-3 py-2 text-sm outline-none ring-1 ring-slate-300" />
        <button className="shrink-0 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white">登録</button>
      </div>
      <p className="mt-2 text-[10px] text-slate-400">メール登録の1行フォーム＝メール登録フォーム</p>
    </div>
  ),
  "logo-cloud": () => (
    <div className="w-full max-w-xs text-center">
      <p className="text-[10px] font-bold text-slate-400">導入企業</p>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-3 opacity-60">
        {["ACME", "Globex", "Umbrella", "Soylent"].map((n) => (
          <span key={n} className="font-display text-sm font-extrabold text-slate-500">{n}</span>
        ))}
      </div>
      <p className="mt-2 text-[10px] text-slate-400">ロゴを並べて信頼感＝ロゴ一覧</p>
    </div>
  ),
  "rating-summary": () => (
    <div className="w-full max-w-xs">
      <div className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm ring-1 ring-slate-200">
        <div className="text-center">
          <p className="font-display text-2xl font-extrabold text-slate-800">4.5</p>
          <p className="text-[10px] text-amber-400">★★★★☆</p>
        </div>
        <div className="flex-1 space-y-1">
          {[
            ["5", 70],
            ["4", 20],
            ["3", 6],
            ["2", 2],
            ["1", 2],
          ].map(([s, w]) => (
            <div key={s as string} className="flex items-center gap-1.5 text-[9px] text-slate-400">
              <span>{s}</span>
              <div className="h-1.5 flex-1 rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-amber-400" style={{ width: `${w}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">平均と星ごとの件数＝評価の内訳</p>
    </div>
  ),
  "cart-summary": () => (
    <div className="w-full max-w-xs">
      <div className="rounded-lg bg-white p-3 text-xs shadow-sm ring-1 ring-slate-200">
        {[
          ["小計", "¥1,800"],
          ["送料", "¥500"],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between py-1 text-slate-500">
            <span>{k}</span>
            <span>{v}</span>
          </div>
        ))}
        <div className="mt-1 flex justify-between border-t border-slate-100 pt-2 font-bold text-slate-800">
          <span>合計</span>
          <span className="text-brand-600">¥2,300</span>
        </div>
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">支払い前の金額まとめ＝カート小計</p>
    </div>
  ),
  "avatar-upload": () => (
    <div className="text-center">
      <div className="relative mx-auto h-16 w-16">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-600">
          <Icon name="user" className="h-8 w-8" />
        </span>
        <span className="absolute -bottom-0.5 -right-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-brand-500 text-white ring-2 ring-white">
          <Icon name="image" className="h-3.5 w-3.5" />
        </span>
      </div>
      <p className="mt-2 text-[10px] text-slate-400">押して画像を差し替え＝アバター変更</p>
    </div>
  ),
  "notification-panel": () => (
    <div className="w-full max-w-xs">
      <div className="rounded-xl bg-white p-1.5 shadow-lg ring-1 ring-slate-200">
        <p className="px-2 py-1 text-[10px] font-bold text-slate-400">通知</p>
        {[
          ["いいねが付きました", "3分前", true],
          ["新しいレッスンが追加", "1時間前", false],
        ].map(([t, time, unread]) => (
          <div key={t as string} className={`flex items-start gap-2 rounded-lg px-2 py-2 ${unread ? "bg-brand-50" : ""}`}>
            <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${unread ? "bg-brand-500" : "bg-transparent"}`} />
            <div className="min-w-0">
              <p className="text-xs text-slate-700">{t}</p>
              <p className="text-[9px] text-slate-400">{time}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">お知らせを一覧で＝通知パネル</p>
    </div>
  ),
  "metric-row": () => (
    <div className="w-full max-w-xs">
      <div className="flex gap-2">
        {[
          ["ユーザー", "1,240"],
          ["売上", "¥52k"],
          ["継続率", "82%"],
        ].map(([l, v]) => (
          <div key={l as string} className="flex-1 rounded-lg bg-white p-2.5 text-center shadow-sm ring-1 ring-slate-200">
            <p className="text-[9px] text-slate-400">{l}</p>
            <p className="font-display text-sm font-extrabold text-slate-800">{v}</p>
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">数値カードを横並び＝指標カード列</p>
    </div>
  ),
  "coupon-input": () => (
    <div className="w-full max-w-xs">
      <div className="flex gap-1">
        <input placeholder="クーポンコード" className="w-full rounded-lg bg-white px-3 py-2 text-sm uppercase tracking-wide outline-none ring-1 ring-slate-300" />
        <button className="shrink-0 rounded-lg bg-slate-800 px-4 text-sm font-bold text-white">適用</button>
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">割引コードを入れて適用＝クーポン入力</p>
    </div>
  ),
  // ---- UI部品 追加（グラフ・状態・編集 2026-07-18l） ----
  checklist: () => <ChecklistDemo />,
  "inline-edit": () => <InlineEditDemo />,
  "area-chart": () => (
    <div className="w-full max-w-xs">
      <svg viewBox="0 0 120 50" className="w-full">
        <polygon points="4,42 4,38 28,28 52,32 76,16 100,22 116,10 116,42" fill="#1fc866" fillOpacity="0.18" />
        <polyline points="4,38 28,28 52,32 76,16 100,22 116,10" fill="none" stroke="#1fc866" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <p className="mt-1 text-center text-[10px] text-slate-400">線の下を塗って量感＝エリアチャート</p>
    </div>
  ),
  heatmap: () => (
    <div className="w-full max-w-xs">
      <div className="grid grid-cols-10 gap-0.5">
        {Array.from({ length: 50 }).map((_, i) => {
          const l = [0, 1, 2, 3][Math.floor(Math.abs(Math.sin(i * 1.7)) * 4)];
          const c = ["bg-slate-100", "bg-brand-200", "bg-brand-400", "bg-brand-600"][l];
          return <span key={i} className={`aspect-square rounded-sm ${c}`} />;
        })}
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">色の濃さで大小＝ヒートマップ</p>
    </div>
  ),
  "map-pin": () => (
    <div className="w-full max-w-xs">
      <div className="relative h-28 overflow-hidden rounded-lg bg-emerald-50">
        <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(#d1fae5 1px,transparent 1px),linear-gradient(90deg,#d1fae5 1px,transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
          <div className="flex h-8 w-8 rotate-45 items-center justify-center rounded-full rounded-bl-none bg-rose-500 shadow-lg">
            <span className="h-2.5 w-2.5 -rotate-45 rounded-full bg-white" />
          </div>
        </div>
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">地図上で場所を指す＝地図ピン</p>
    </div>
  ),
  "skeleton-loader": () => (
    <div className="w-full max-w-xs">
      <div className="flex gap-3 rounded-lg bg-white p-3 shadow-sm ring-1 ring-slate-200">
        <div className="h-12 w-12 shrink-0 animate-pulse rounded-lg bg-slate-200" />
        <div className="flex-1 space-y-2 py-1">
          <div className="h-3 w-3/4 animate-pulse rounded bg-slate-200" />
          <div className="h-3 w-1/2 animate-pulse rounded bg-slate-200" />
        </div>
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">形だけ先に灰色で＝スケルトン</p>
    </div>
  ),
  "maintenance-page": () => (
    <div className="w-full max-w-xs rounded-lg bg-white p-5 text-center shadow-sm ring-1 ring-slate-200">
      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-500">
        <Icon name="settings" className="h-6 w-6" />
      </span>
      <p className="mt-2 font-display font-extrabold text-slate-800">メンテナンス中</p>
      <p className="mt-1 text-[11px] text-slate-500">
        ただいま更新作業中です。
        <br />
        15:00 頃に再開予定です。
      </p>
      <p className="mt-3 text-[10px] text-slate-400">一時停止のお知らせ＝メンテナンス画面</p>
    </div>
  ),
  "currency-input": () => (
    <div className="w-full max-w-xs">
      <label className="text-xs font-bold text-slate-500">予算</label>
      <div className="mt-1 flex items-center rounded-lg bg-white ring-1 ring-slate-300 focus-within:ring-2 focus-within:ring-blue-500">
        <span className="pl-3 text-slate-400">¥</span>
        <input defaultValue="10,000" className="w-full bg-transparent px-2 py-2 text-sm outline-none" />
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">¥付きで金額を入れる＝金額入力</p>
    </div>
  ),
  "onboarding-slides": () => (
    <div className="w-full max-w-[13rem] text-center">
      <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
          <Icon name="search" className="h-8 w-8" />
        </div>
        <p className="mt-2 text-sm font-bold text-slate-700">名前を調べよう</p>
        <p className="mt-1 text-[10px] text-slate-400">うろ覚えでも見つかります</p>
        <div className="mt-3 flex justify-center gap-1.5">
          {[true, false, false].map((a, i) => (
            <span key={i} className={`h-1.5 rounded-full ${a ? "w-4 bg-brand-500" : "w-1.5 bg-slate-200"}`} />
          ))}
        </div>
      </div>
      <p className="mt-2 text-[10px] text-slate-400">初回の紹介スライド＝オンボーディング</p>
    </div>
  ),
  "list-group": () => (
    <div className="w-full max-w-xs">
      <div className="divide-y divide-slate-100 rounded-lg bg-white shadow-sm ring-1 ring-slate-200">
        {["アカウント", "通知", "プライバシー", "ヘルプ"].map((x) => (
          <div key={x} className="flex items-center justify-between px-3 py-2.5 text-sm text-slate-600">
            <span>{x}</span>
            <Icon name="chevron-right" className="h-4 w-4 text-slate-300" />
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">枠でまとめた縦リスト＝リストグループ</p>
    </div>
  ),
  // ---- UI部品 追加（グラフ・LP・状態 2026-07-18k） ----
  "color-swatch": () => <ColorSwatchDemo />,
  "line-chart": () => (
    <div className="w-full max-w-xs">
      <svg viewBox="0 0 120 50" className="w-full">
        <polyline points="4,40 24,28 44,34 64,18 84,24 104,8 116,14" fill="none" stroke="#1fc866" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {[[4, 40], [24, 28], [44, 34], [64, 18], [84, 24], [104, 8], [116, 14]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2" fill="#1fc866" />
        ))}
      </svg>
      <p className="mt-1 text-center text-[10px] text-slate-400">推移を線で見せる＝折れ線グラフ</p>
    </div>
  ),
  sparkline: () => (
    <div className="w-full max-w-xs">
      <div className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm ring-1 ring-slate-200">
        <div>
          <p className="text-[10px] text-slate-400">アクセス</p>
          <p className="font-display text-lg font-extrabold text-slate-800">1,240</p>
        </div>
        <svg viewBox="0 0 80 24" className="h-6 flex-1">
          <polyline points="2,18 14,14 26,16 38,8 50,12 62,4 78,9" fill="none" stroke="#1fc866" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">数値の隣に置く極小グラフ＝スパークライン</p>
    </div>
  ),
  "comparison-table": () => (
    <div className="w-full max-w-xs">
      <div className="overflow-hidden rounded-lg bg-white text-xs shadow-sm ring-1 ring-slate-200">
        <div className="grid grid-cols-3 border-b border-slate-100 bg-slate-50 text-center font-bold text-slate-500">
          <span className="px-2 py-1.5 text-left">機能</span>
          <span className="px-2 py-1.5">無料</span>
          <span className="px-2 py-1.5 text-brand-600">VIP</span>
        </div>
        {[
          ["図鑑", true, true],
          ["AI無制限", false, true],
          ["広告なし", false, true],
        ].map(([f, a, b]) => (
          <div key={f as string} className="grid grid-cols-3 border-b border-slate-50 text-center last:border-0">
            <span className="px-2 py-1.5 text-left text-slate-600">{f}</span>
            <span className="px-2 py-1.5">{a ? <Icon name="check" className="mx-auto h-3.5 w-3.5 text-emerald-500" strokeWidth={3} /> : <span className="text-slate-300">−</span>}</span>
            <span className="px-2 py-1.5">{b ? <Icon name="check" className="mx-auto h-3.5 w-3.5 text-brand-600" strokeWidth={3} /> : <span className="text-slate-300">−</span>}</span>
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">機能ごとに○×で比べる＝比較表</p>
    </div>
  ),
  "feature-list": () => (
    <div className="w-full max-w-xs">
      <div className="space-y-1.5 rounded-lg bg-white p-3 shadow-sm ring-1 ring-slate-200">
        {["広告なしで快適", "AIでしらべる無制限", "全レッスンが開放", "弱点復習が使える"].map((f) => (
          <div key={f} className="flex items-center gap-2 text-sm text-slate-600">
            <Icon name="check" className="h-4 w-4 shrink-0 text-brand-500" strokeWidth={3} />
            {f}
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">チェックで特徴を列挙＝機能リスト</p>
    </div>
  ),
  "coach-mark": () => (
    <div className="w-full max-w-xs text-center">
      <div className="mx-auto inline-block">
        <div className="rounded-lg bg-slate-800 px-3 py-2 text-[11px] font-medium text-white shadow-lg">ここから探せます</div>
        <div className="mx-auto h-0 w-0 border-x-[6px] border-t-[6px] border-x-transparent border-t-slate-800" />
        <span className="mt-1 inline-block rounded-lg bg-brand-500 px-4 py-2 text-sm font-bold text-white ring-4 ring-brand-200">検索</span>
      </div>
      <p className="mt-3 text-[10px] text-slate-400">対象を指して使い方を案内＝コーチマーク</p>
    </div>
  ),
  "filter-panel": () => (
    <div className="w-full max-w-[13rem]">
      <div className="rounded-lg bg-white p-3 shadow-sm ring-1 ring-slate-200">
        <p className="text-[11px] font-bold text-slate-700">絞り込み</p>
        <div className="mt-2">
          <p className="text-[9px] font-bold text-slate-400">カテゴリ</p>
          {["UI部品", "レイアウト"].map((c) => (
            <label key={c} className="mt-1 flex items-center gap-1.5 text-xs text-slate-600">
              <span className="h-3.5 w-3.5 rounded border border-slate-300" />
              {c}
            </label>
          ))}
        </div>
        <div className="mt-2">
          <p className="text-[9px] font-bold text-slate-400">レベル</p>
          {["初級", "中級"].map((c) => (
            <label key={c} className="mt-1 flex items-center gap-1.5 text-xs text-slate-600">
              <span className={`h-3.5 w-3.5 rounded border ${c === "初級" ? "border-brand-500 bg-brand-500" : "border-slate-300"}`} />
              {c}
            </label>
          ))}
        </div>
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">条件で結果を絞る＝絞り込みパネル</p>
    </div>
  ),
  "back-button": () => (
    <div className="w-full max-w-xs">
      <div className="rounded-lg bg-white p-3 shadow-sm ring-1 ring-slate-200">
        <button className="inline-flex items-center gap-1 text-sm font-bold text-slate-500">
          <Icon name="chevron-left" className="h-4 w-4" />
          戻る
        </button>
        <div className="mt-2 h-2 w-1/2 rounded bg-slate-100" />
        <div className="mt-1.5 h-2 rounded bg-slate-100" />
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">前の画面へ戻る＝戻るボタン</p>
    </div>
  ),
  "offline-banner": () => (
    <div className="w-full max-w-xs">
      <div className="flex items-center justify-center gap-2 rounded-lg bg-slate-700 px-3 py-2 text-xs font-bold text-white">
        <span className="h-2 w-2 rounded-full bg-rose-400" />
        オフラインです。接続を確認してください
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">接続なしを知らせる帯＝オフライン表示</p>
    </div>
  ),
  "tag-cloud": () => (
    <div className="w-full max-w-xs text-center">
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
        {[["CSS", 22], ["React", 16], ["初心者", 14], ["flexbox", 18], ["UI", 12], ["デザイン", 15], ["JS", 20]].map(([t, s]) => (
          <span key={t as string} className="font-bold text-brand-600" style={{ fontSize: `${s}px`, opacity: 0.5 + (s as number) / 44 }}>{t}</span>
        ))}
      </div>
      <p className="mt-2 text-[10px] text-slate-400">人気ほど大きく＝タグクラウド</p>
    </div>
  ),
  // ---- UI部品 追加（LP・メディア 2026-07-18j） ----
  "quantity-stepper": () => <QuantityDemo />,
  "password-strength": () => <PasswordStrengthDemo />,
  "copy-button": () => <CopyButtonDemo />,
  "pricing-table": () => (
    <div className="w-full max-w-xs">
      <div className="flex gap-2">
        <div className="flex-1 rounded-xl border-2 border-slate-200 bg-white p-3 text-center">
          <p className="text-xs font-bold text-slate-500">無料</p>
          <p className="font-display text-xl font-extrabold text-slate-800">¥0</p>
          <p className="mt-1 text-[10px] text-slate-400">図鑑・問題集</p>
        </div>
        <div className="relative flex-1 rounded-xl border-2 border-brand-500 bg-brand-50 p-3 text-center">
          <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-2 py-0.5 text-[8px] font-bold text-white">人気</span>
          <p className="text-xs font-bold text-brand-600">VIP</p>
          <p className="font-display text-xl font-extrabold text-slate-800">¥480<span className="text-[10px]">/月</span></p>
          <p className="mt-1 text-[10px] text-slate-400">AI無制限・広告なし</p>
        </div>
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">プランを並べて比べる＝料金表</p>
    </div>
  ),
  testimonial: () => (
    <div className="w-full max-w-xs rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-center gap-0.5 text-sm text-amber-400">
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i}>★</span>
        ))}
      </div>
      <p className="mt-2 text-xs leading-relaxed text-slate-600">「名前がわからない部品もすぐ見つかって、勉強がはかどりました！」</p>
      <div className="mt-3 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-100 text-brand-600">
          <Icon name="user" className="h-4 w-4" />
        </span>
        <span className="text-[11px] font-bold text-slate-500">たろうさん</span>
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">利用者の声を紹介＝口コミカード</p>
    </div>
  ),
  "social-icons": () => (
    <div className="text-center">
      <div className="flex justify-center gap-2">
        {[
          ["X", "bg-slate-900"],
          ["L", "bg-[#06c755]"],
          ["I", "bg-gradient-to-br from-fuchsia-500 to-amber-400"],
          ["@", "bg-blue-500"],
        ].map(([t, c]) => (
          <span key={t as string} className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white ${c}`}>{t}</span>
        ))}
      </div>
      <p className="mt-2 text-[10px] text-slate-400">SNSへ飛ぶアイコン列＝SNSアイコン</p>
    </div>
  ),
  "loading-dots": () => (
    <div className="text-center">
      <div className="flex justify-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-3 w-3 animate-bounce rounded-full bg-brand-500" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
      <p className="mt-3 text-[10px] text-slate-400">点3つで処理中＝ローディングドット</p>
    </div>
  ),
  "audio-player": () => (
    <div className="w-full max-w-xs">
      <div className="flex items-center gap-3 rounded-full bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">▶</span>
        <div className="min-w-0 flex-1">
          <div className="h-1.5 rounded-full bg-slate-100">
            <div className="h-full w-1/3 rounded-full bg-brand-500" />
          </div>
          <div className="mt-1 flex justify-between text-[9px] text-slate-400">
            <span>0:42</span>
            <span>2:15</span>
          </div>
        </div>
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">再生バー付きで音声＝音声プレーヤー</p>
    </div>
  ),
  "table-of-contents": () => (
    <div className="w-full max-w-xs">
      <div className="rounded-lg bg-white p-3 shadow-sm ring-1 ring-slate-200">
        <p className="mb-1.5 text-[10px] font-bold text-slate-400">目次</p>
        {[
          ["1. はじめに", false],
          ["2. 使い方", true],
          ["3. よくある質問", false],
        ].map(([t, active]) => (
          <div key={t as string} className={`border-l-2 py-1 pl-2 text-xs ${active ? "border-brand-500 font-bold text-brand-600" : "border-slate-200 text-slate-500"}`}>{t}</div>
        ))}
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">見出し一覧で飛べる＝目次</p>
    </div>
  ),
  "reading-progress": () => (
    <div className="w-full max-w-xs">
      <div className="h-1 rounded-full bg-slate-100">
        <div className="h-full w-3/5 rounded-full bg-brand-500" />
      </div>
      <div className="mt-2 rounded-lg bg-white p-3 shadow-sm ring-1 ring-slate-200">
        {[100, 90, 95, 80, 60].map((w, i) => (
          <div key={i} className="mb-1.5 h-2 rounded bg-slate-100" style={{ width: `${w}%` }} />
        ))}
      </div>
      <p className="mt-1 text-center text-[10px] text-slate-400">上部バーで読了度＝読書進捗バー</p>
    </div>
  ),
  // ---- UI部品 追加（チャット・情報表示 2026-07-18i） ----
  "dark-mode-toggle": () => <DarkModeToggleDemo />,
  "chat-bubble": () => (
    <div className="w-full max-w-xs space-y-2">
      <div className="flex justify-start">
        <span className="max-w-[70%] rounded-2xl rounded-tl-sm bg-slate-100 px-3 py-2 text-xs text-slate-700">これ何て名前？</span>
      </div>
      <div className="flex justify-end">
        <span className="max-w-[70%] rounded-2xl rounded-tr-sm bg-brand-500 px-3 py-2 text-xs text-white">ハンバーガーメニューだよ</span>
      </div>
      <p className="pt-1 text-center text-[10px] text-slate-400">左右の吹き出しで会話＝チャット吹き出し</p>
    </div>
  ),
  "typing-indicator": () => (
    <div className="text-center">
      <span className="inline-flex items-center gap-1 rounded-2xl rounded-tl-sm bg-slate-100 px-3 py-2.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-2 w-2 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </span>
      <p className="mt-2 text-[10px] text-slate-400">相手が入力中＝入力中インジケーター</p>
    </div>
  ),
  "cookie-banner": () => (
    <div className="w-full max-w-xs">
      <div className="rounded-xl bg-slate-800 p-3 text-white shadow-lg">
        <p className="text-[11px] leading-relaxed">当サイトはCookieを使用します。同意いただけますか？</p>
        <div className="mt-2 flex gap-2">
          <button className="flex-1 rounded-lg bg-brand-500 py-1.5 text-[11px] font-bold">同意する</button>
          <button className="rounded-lg bg-white/10 px-3 py-1.5 text-[11px]">設定</button>
        </div>
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">Cookie同意を求める帯＝クッキー同意バー</p>
    </div>
  ),
  "announcement-bar": () => (
    <div className="w-full max-w-xs">
      <div className="flex items-center justify-between gap-2 rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 px-3 py-2 text-white">
        <span className="text-[11px] font-bold">送料無料キャンペーン中！</span>
        <Icon name="x" className="h-3.5 w-3.5 text-white/70" />
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">最上部の告知帯＝お知らせバー</p>
    </div>
  ),
  "relative-time": () => (
    <div className="w-full max-w-xs space-y-1.5">
      {[
        ["たった今", "たろう"],
        ["5分前", "はなこ"],
        ["3日前", "けん"],
      ].map(([t, n]) => (
        <div key={n as string} className="flex items-center justify-between rounded-lg bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200">
          <span className="text-xs text-slate-600">{n} さんの投稿</span>
          <span className="text-[10px] text-slate-400">{t}</span>
        </div>
      ))}
      <p className="pt-1 text-center text-[10px] text-slate-400">今からの近さで示す＝相対時刻</p>
    </div>
  ),
  "code-inline": () => (
    <div className="w-full max-w-xs text-center">
      <p className="text-sm leading-relaxed text-slate-600">
        ターミナルで <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[13px] text-rose-600">npm install</code> を実行します。
      </p>
      <p className="mt-3 text-[10px] text-slate-400">文中のコードを目立たせる＝インラインコード</p>
    </div>
  ),
  "highlight-mark": () => (
    <div className="w-full max-w-xs text-center">
      <p className="text-sm leading-relaxed text-slate-700">
        ここで大事なのは <mark className="rounded bg-amber-200 px-1">実際に触ること</mark> です。
      </p>
      <p className="mt-3 text-[10px] text-slate-400">背景色で強調＝ハイライト（マーカー）</p>
    </div>
  ),
  "key-value-list": () => (
    <div className="w-full max-w-xs">
      <div className="divide-y divide-slate-100 rounded-lg bg-white text-xs shadow-sm ring-1 ring-slate-200">
        {[
          ["サイズ", "M"],
          ["色", "ブラック"],
          ["重さ", "1.2 kg"],
          ["保証", "1年"],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between px-3 py-2">
            <span className="text-slate-400">{k}</span>
            <span className="font-bold text-slate-700">{v}</span>
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">項目名：値で整理＝項目リスト</p>
    </div>
  ),
  "view-count": () => (
    <div className="text-center">
      <div className="inline-flex items-center gap-4 rounded-lg bg-white px-4 py-2 text-xs text-slate-500 shadow-sm ring-1 ring-slate-200">
        <span className="flex items-center gap-1">
          <Icon name="eye" className="h-4 w-4" />
          1.2万
        </span>
        <span className="flex items-center gap-1">
          <Icon name="heart" className="h-4 w-4" />
          340
        </span>
      </div>
      <p className="mt-2 text-[10px] text-slate-400">見られた回数を表示＝閲覧数表示</p>
    </div>
  ),
  // ---- UI部品 追加（表示・入力の細部 2026-07-18h） ----
  "read-more": () => <ReadMoreDemo />,
  "char-counter": () => <CharCounterDemo />,
  "rating-input": () => <RatingInputDemo />,
  "switch-list": () => <SwitchListDemo />,
  "progress-ring": () => (
    <div className="text-center">
      <div className="relative mx-auto h-24 w-24">
        <svg viewBox="0 0 36 36" className="h-24 w-24 -rotate-90">
          <circle cx="18" cy="18" r="15.5" fill="none" stroke="#e5e7eb" strokeWidth="3.5" />
          <circle cx="18" cy="18" r="15.5" fill="none" stroke="#1fc866" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="97.4" strokeDashoffset="31.2" />
        </svg>
        <span className="font-display absolute inset-0 flex items-center justify-center text-lg font-extrabold text-slate-800">68%</span>
      </div>
      <p className="mt-2 text-[10px] text-slate-400">リングの埋まりで割合＝円形プログレス</p>
    </div>
  ),
  "avatar-stack": () => (
    <div className="text-center">
      <div className="flex justify-center -space-x-3">
        {["bg-rose-300", "bg-sky-300", "bg-amber-300", "bg-emerald-300"].map((c, i) => (
          <span key={i} className={`flex h-10 w-10 items-center justify-center rounded-full text-white ring-2 ring-white ${c}`}>
            <Icon name="user" className="h-5 w-5" />
          </span>
        ))}
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500 ring-2 ring-white">+5</span>
      </div>
      <p className="mt-2 text-[10px] text-slate-400">アイコンを重ねて人数＝重なりアバター</p>
    </div>
  ),
  "required-mark": () => (
    <div className="w-full max-w-xs space-y-2">
      <div>
        <label className="text-xs font-bold text-slate-600">
          メールアドレス <span className="rounded bg-rose-500 px-1.5 py-0.5 text-[9px] font-bold text-white">必須</span>
        </label>
        <div className="mt-1 h-8 rounded-lg bg-slate-50 ring-1 ring-slate-200" />
      </div>
      <div>
        <label className="text-xs font-bold text-slate-600">
          会社名 <span className="text-[10px] text-slate-400">任意</span>
        </label>
        <div className="mt-1 h-8 rounded-lg bg-slate-50 ring-1 ring-slate-200" />
      </div>
      <p className="text-center text-[10px] text-slate-400">必須の欄に付ける印＝必須マーク</p>
    </div>
  ),
  "error-message": () => (
    <div className="w-full max-w-xs">
      <label className="text-xs font-bold text-slate-600">メールアドレス</label>
      <input defaultValue="taro.example" className="mt-1 w-full rounded-lg bg-rose-50 px-3 py-2 text-sm outline-none ring-1 ring-rose-300" />
      <p className="mt-1 flex items-center gap-1 text-[11px] text-rose-500">
        <Icon name="x" className="h-3 w-3" strokeWidth={3} />
        メールの形式が正しくありません
      </p>
      <p className="mt-2 text-center text-[10px] text-slate-400">欄の下に赤字で知らせる＝エラーメッセージ</p>
    </div>
  ),
  "sticky-cta": () => (
    <div className="w-full max-w-[13rem]">
      <div className="relative h-32 overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-200">
        <div className="space-y-1.5 p-2.5">
          {[90, 70, 80, 60].map((w, i) => (
            <div key={i} className="h-2 rounded bg-slate-100" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 border-t border-slate-100 bg-white p-2">
          <div className="rounded-lg bg-brand-500 py-2 text-center text-xs font-bold text-white">購入する ¥1,980</div>
        </div>
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">下に貼り付く行動ボタン＝固定CTAバー</p>
    </div>
  ),
  "badge-dot": () => (
    <div className="text-center">
      <div className="flex justify-center gap-6">
        {[
          ["bell", "通知"],
          ["mail", "メッセージ"],
        ].map(([ic, label]) => (
          <span key={label as string} className="relative inline-flex flex-col items-center gap-1">
            <span className="relative">
              <Icon name={ic as IconName} className="h-7 w-7 text-slate-600" />
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-rose-500 ring-2 ring-white" />
            </span>
            <span className="text-[9px] text-slate-400">{label}</span>
          </span>
        ))}
      </div>
      <p className="mt-2 text-[10px] text-slate-400">数字なしの赤ポチ＝通知ドット</p>
    </div>
  ),
  // ---- UI部品 追加（フォーム・通知など 2026-07-18g） ----
  "password-toggle": () => <PasswordToggleDemo />,
  "chip-filter": () => <ChipFilterDemo />,
  "radio-card": () => <RadioCardDemo />,
  "otp-input": () => (
    <div className="text-center">
      <div className="flex justify-center gap-2">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={`flex h-11 w-9 items-center justify-center rounded-lg border-2 font-mono text-lg font-bold text-slate-700 ${i === 2 ? "border-blue-500" : "border-slate-200"}`}>
            {i === 0 ? "4" : i === 1 ? "2" : i === 2 ? <span className="h-5 w-px animate-pulse bg-blue-500" /> : ""}
          </span>
        ))}
      </div>
      <p className="mt-2 text-[10px] text-slate-400">届いたコードを1マスずつ＝認証コード入力</p>
    </div>
  ),
  "action-sheet": () => (
    <div className="w-full max-w-[13rem]">
      <div className="space-y-1 rounded-2xl bg-white p-1.5 shadow-lg ring-1 ring-slate-200">
        {["シェアする", "保存する", "削除する"].map((a) => (
          <div key={a} className={`rounded-xl py-2.5 text-center text-sm font-bold ${a === "削除する" ? "text-rose-500" : "text-blue-600"}`}>{a}</div>
        ))}
      </div>
      <div className="mt-1.5 rounded-2xl bg-white py-2.5 text-center text-sm font-bold text-slate-500 shadow-lg ring-1 ring-slate-200">キャンセル</div>
      <p className="mt-2 text-center text-[10px] text-slate-400">下から出る操作メニュー＝アクションシート</p>
    </div>
  ),
  "confirm-dialog": () => (
    <div className="w-full max-w-xs rounded-2xl bg-white p-5 text-center shadow-lg ring-1 ring-slate-200">
      <p className="font-display font-extrabold text-slate-800">本当に削除しますか？</p>
      <p className="mt-1 text-xs text-slate-500">この操作は取り消せません。</p>
      <div className="mt-4 flex gap-2">
        <button className="flex-1 rounded-lg bg-slate-100 py-2 text-sm font-bold text-slate-600">キャンセル</button>
        <button className="flex-1 rounded-lg bg-rose-500 py-2 text-sm font-bold text-white">削除する</button>
      </div>
      <p className="mt-3 text-[10px] text-slate-400">はい/いいえで確認＝確認ダイアログ</p>
    </div>
  ),
  "step-indicator": () => (
    <div className="w-full max-w-xs">
      <div className="flex items-center">
        {["カート", "入力", "確認", "完了"].map((s, i, arr) => (
          <div key={s} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${i <= 1 ? "bg-brand-500 text-white" : "bg-slate-200 text-slate-500"}`}>{i + 1}</span>
              <span className="mt-1 text-[9px] text-slate-500">{s}</span>
            </div>
            {i < arr.length - 1 && <span className={`mx-1 h-0.5 flex-1 ${i < 1 ? "bg-brand-400" : "bg-slate-200"}`} />}
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">今どの段階かを示す＝ステップインジケーター</p>
    </div>
  ),
  "toast-stack": () => (
    <div className="w-full max-w-xs space-y-1.5">
      {["コピーしました", "保存しました", "送信しました"].map((t, i) => (
        <div key={t} className="flex items-center gap-2 rounded-lg bg-slate-800 px-3 py-2 text-xs text-white shadow-lg" style={{ opacity: 1 - i * 0.22 }}>
          <Icon name="check" className="h-3.5 w-3.5 text-emerald-300" strokeWidth={3} />
          {t}
        </div>
      ))}
      <p className="pt-1 text-center text-[10px] text-slate-400">通知を重ねて並べる＝トースト積み重ね</p>
    </div>
  ),
  "search-history": () => (
    <div className="w-full max-w-xs">
      <div className="flex items-center gap-2 rounded-t-lg bg-white px-3 py-2 ring-1 ring-slate-300">
        <Icon name="search" className="h-4 w-4 text-slate-400" />
        <span className="text-sm text-slate-400">検索…</span>
      </div>
      <div className="rounded-b-lg bg-white py-1 shadow-md ring-1 ring-slate-200">
        <p className="px-3 py-1 text-[9px] font-bold text-slate-400">最近の検索</p>
        {["モーダル", "flexbox", "ハンバーガー"].map((s) => (
          <div key={s} className="flex items-center justify-between px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50">
            <span className="flex items-center gap-2">
              <Icon name="search" className="h-3 w-3 text-slate-300" />
              {s}
            </span>
            <Icon name="x" className="h-3 w-3 text-slate-300" />
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">前に調べた語の一覧＝検索履歴</p>
    </div>
  ),
  "loading-bar": () => (
    <div className="w-full max-w-xs">
      <div className="overflow-hidden rounded bg-slate-100">
        <div className="h-1 w-2/3 bg-gradient-to-r from-brand-400 to-brand-600" />
      </div>
      <div className="mt-2 rounded-lg bg-white p-3 shadow-sm ring-1 ring-slate-200">
        <div className="h-2 w-1/2 rounded bg-slate-100" />
        <div className="mt-1.5 h-2 rounded bg-slate-100" />
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">画面上端で読込中を示す＝ローディングバー</p>
    </div>
  ),
  // ---- UI部品 追加（入力・表示 2026-07-18f） ----
  collapse: () => <CollapseDemo />,
  "multi-select": () => <MultiSelectDemo />,
  "transition-effect": () => (
    <div className="text-center">
      <div className="mx-auto w-40 cursor-pointer overflow-hidden rounded-full bg-slate-100 p-1">
        <div className="h-6 w-1/3 rounded-full bg-brand-500 transition-all duration-500 hover:w-full" />
      </div>
      <p className="mt-3 text-[10px] text-slate-400">なめらかに変化させる＝トランジション（乗せてみて）</p>
    </div>
  ),
  watermark: () => (
    <div className="text-center">
      <div className="relative mx-auto h-24 w-40 overflow-hidden rounded-lg bg-gradient-to-br from-slate-200 to-slate-300">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="rotate-[-20deg] text-2xl font-extrabold text-white/40">SAMPLE</span>
        </div>
      </div>
      <p className="mt-2 text-[10px] text-slate-400">薄く重ねる印＝透かし</p>
    </div>
  ),
  "time-picker": () => (
    <div className="w-full max-w-[10rem] text-center">
      <div className="flex items-center justify-center gap-1 rounded-lg bg-white p-3 shadow-sm ring-1 ring-slate-200">
        <span className="rounded bg-slate-100 px-3 py-2 font-mono text-lg font-bold text-slate-700">10</span>
        <span className="text-lg font-bold text-slate-400">:</span>
        <span className="rounded bg-slate-100 px-3 py-2 font-mono text-lg font-bold text-slate-700">30</span>
      </div>
      <p className="mt-2 text-[10px] text-slate-400">時・分を選ぶ＝時刻ピッカー</p>
    </div>
  ),
  scrollbar: () => (
    <div className="w-full max-w-[12rem]">
      <div className="h-28 overflow-y-scroll rounded-lg bg-white p-2 shadow-sm ring-1 ring-slate-200">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="border-b border-slate-50 py-1.5 text-xs text-slate-500">項目 {i + 1}</div>
        ))}
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">動かして隠れた部分を見る帯＝スクロールバー</p>
    </div>
  ),
  "speed-dial": () => (
    <div className="text-center">
      <div className="flex flex-col items-center gap-2">
        {[
          ["写真", "image"],
          ["メモ", "pencil"],
          ["お気に入り", "heart"],
        ].map(([label, ic]) => (
          <span key={label as string} className="flex items-center gap-1.5">
            <span className="text-[10px] text-slate-400">{label}</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-600 shadow ring-1 ring-slate-200">
              <Icon name={ic as IconName} className="h-4 w-4" />
            </span>
          </span>
        ))}
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-500 text-xl text-white shadow-lg">＋</span>
      </div>
      <p className="mt-2 text-[10px] text-slate-400">押すと複数操作が開く＝スピードダイヤル</p>
    </div>
  ),
  paragraph: () => (
    <div className="w-full max-w-xs">
      <div className="space-y-2 rounded-lg bg-white p-3 text-[11px] leading-relaxed text-slate-600 shadow-sm ring-1 ring-slate-200">
        <p>これはひとつの段落です。意味のまとまりごとに区切ると、文章がぐっと読みやすくなります。</p>
        <p>段落の間に少しすき間をあけるのがコツ。ぎっしり詰めると読む気が失せてしまいます。</p>
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">読みやすく区切った本文＝段落</p>
    </div>
  ),
  // ---- UI部品 追加（オーバーレイ・ボタン類 2026-07-18e） ----
  "bookmark-button": () => <BookmarkDemo />,
  "follow-button": () => <FollowDemo />,
  overlay: () => (
    <div className="w-full max-w-[13rem]">
      <div className="relative h-32 overflow-hidden rounded-lg bg-white ring-1 ring-slate-200">
        <div className="space-y-1 p-2">
          {[80, 60, 90, 50].map((w, i) => (
            <div key={i} className="h-2 rounded bg-slate-100" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50">
          <div className="rounded-lg bg-white px-4 py-3 text-xs font-bold text-slate-700 shadow-lg">前面の窓</div>
        </div>
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">後ろを暗くする半透明の膜＝オーバーレイ</p>
    </div>
  ),
  "close-button": () => (
    <div className="text-center">
      <div className="relative mx-auto w-40 rounded-lg bg-white p-4 shadow-sm ring-1 ring-slate-200">
        <button className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100">
          <Icon name="x" className="h-4 w-4" strokeWidth={2.5} />
        </button>
        <p className="text-xs text-slate-500">お知らせの内容…</p>
      </div>
      <p className="mt-2 text-[10px] text-slate-400">×で閉じる＝閉じるボタン</p>
    </div>
  ),
  "share-button": () => (
    <div className="text-center">
      <button className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-600 shadow-sm ring-1 ring-slate-200">
        <Icon name="arrow-right" className="h-4 w-4 -rotate-45" />
        シェア
      </button>
      <div className="mt-1.5 flex justify-center gap-1.5">
        {["LINE", "X", "コピー"].map((s) => (
          <span key={s} className="rounded bg-slate-100 px-2 py-1 text-[10px] text-slate-500">{s}</span>
        ))}
      </div>
      <p className="mt-2 text-[10px] text-slate-400">SNS等に共有＝シェアボタン</p>
    </div>
  ),
  "tree-view": () => (
    <div className="w-full max-w-xs">
      <div className="rounded-lg bg-white p-3 font-mono text-xs text-slate-600 shadow-sm ring-1 ring-slate-200">
        <div>▼ src</div>
        <div className="ml-4">▼ components</div>
        <div className="ml-8 text-slate-400">Button.tsx</div>
        <div className="ml-8 text-slate-400">Card.tsx</div>
        <div className="ml-4">▶ lib</div>
        <div className="ml-4 text-slate-400">app.tsx</div>
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">入れ子を開閉して見せる＝ツリー表示</p>
    </div>
  ),
  callout: () => (
    <div className="w-full max-w-xs">
      <div className="flex gap-2 rounded-lg border-l-4 border-blue-400 bg-blue-50 p-3">
        <Icon name="lightbulb" className="h-4 w-4 shrink-0 text-blue-500" />
        <div>
          <p className="text-xs font-bold text-blue-700">ヒント</p>
          <p className="text-[11px] text-blue-600/80">迷ったら図鑑で実物を見てみよう。</p>
        </div>
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">補足を枠で強調＝コールアウト</p>
    </div>
  ),
  ribbon: () => (
    <div className="text-center">
      <div className="relative mx-auto h-24 w-32 overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-200">
        <div className="absolute -right-8 top-3 rotate-45 bg-rose-500 px-8 py-0.5 text-[10px] font-bold text-white shadow">NEW</div>
        <div className="flex h-full items-center justify-center text-xs text-slate-400">商品</div>
      </div>
      <p className="mt-2 text-[10px] text-slate-400">角の斜め帯＝リボン</p>
    </div>
  ),
  "text-shadow": () => (
    <div className="text-center">
      <div className="flex h-20 items-center justify-center rounded-lg bg-gradient-to-br from-sky-400 to-indigo-500">
        <span className="text-2xl font-extrabold text-white" style={{ textShadow: "0 2px 6px rgba(0,0,0,0.5)" }}>Co-Cre</span>
      </div>
      <p className="mt-2 text-[10px] text-slate-400">文字に影をつけて読みやすく＝テキストシャドウ</p>
    </div>
  ),
  heading: () => (
    <div className="w-full max-w-xs">
      <div className="space-y-1 rounded-lg bg-white p-3 shadow-sm ring-1 ring-slate-200">
        <p className="text-xl font-extrabold text-slate-800">大見出し（h1）</p>
        <p className="text-base font-bold text-slate-700">中見出し（h2）</p>
        <p className="text-sm font-bold text-slate-600">小見出し（h3）</p>
        <p className="text-xs text-slate-400">本文テキスト…</p>
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">大きさで階層を表すタイトル＝見出し</p>
    </div>
  ),
  // ---- UI部品 追加（視覚・操作 2026-07-18d） ----
  "tag-input": () => <TagInputDemo />,
  "sort-button": () => <SortDemo />,
  gallery: () => (
    <div className="w-full max-w-xs">
      <div className="grid grid-cols-3 gap-1">
        {["bg-rose-200", "bg-sky-200", "bg-amber-200", "bg-emerald-200", "bg-violet-200", "bg-blue-200"].map((c, i) => (
          <div key={i} className={`flex aspect-square items-center justify-center rounded ${c}`}>
            <Icon name="image" className="h-4 w-4 text-white/70" />
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">画像を格子で並べる＝ギャラリー</p>
    </div>
  ),
  thumbnail: () => (
    <div className="w-full max-w-[13rem]">
      <div className="flex gap-2 rounded-lg bg-white p-2 shadow-sm ring-1 ring-slate-200">
        <div className="flex h-12 w-16 shrink-0 items-center justify-center rounded bg-slate-800 text-white">▶</div>
        <div className="min-w-0">
          <p className="truncate text-xs font-bold text-slate-700">動画のタイトル</p>
          <p className="text-[10px] text-slate-400">3:40・1.2万回</p>
        </div>
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">中身を示す小さな画像＝サムネイル</p>
    </div>
  ),
  toolbar: () => (
    <div className="text-center">
      <div className="inline-flex items-center gap-1 rounded-lg bg-white p-1 shadow-sm ring-1 ring-slate-200">
        {[["B", "font-bold"], ["I", "italic"], ["U", "underline"]].map(([t, cls]) => (
          <button key={t} className={`h-7 w-7 rounded text-sm text-slate-600 hover:bg-slate-100 ${cls}`}>{t}</button>
        ))}
        <span className="mx-1 h-5 w-px bg-slate-200" />
        <button className="flex h-7 w-7 items-center justify-center rounded text-slate-600 hover:bg-slate-100"><Icon name="image" className="h-4 w-4" /></button>
        <button className="flex h-7 w-7 items-center justify-center rounded text-slate-600 hover:bg-slate-100"><Icon name="trash" className="h-4 w-4" /></button>
      </div>
      <p className="mt-2 text-[10px] text-slate-400">操作ボタンを並べた帯＝ツールバー</p>
    </div>
  ),
  "mega-menu": () => (
    <div className="w-full max-w-sm">
      <div className="rounded-t-lg bg-slate-800 px-3 py-2 text-center text-xs font-bold text-white">カテゴリ ▼</div>
      <div className="grid grid-cols-3 gap-2 rounded-b-lg bg-white p-3 shadow-lg ring-1 ring-slate-200">
        {[
          ["ファッション", ["メンズ", "レディース", "キッズ"]],
          ["家電", ["TV", "PC", "カメラ"]],
          ["食品", ["飲料", "お菓子", "冷凍"]],
        ].map(([h, items]) => (
          <div key={h as string}>
            <p className="mb-1 text-[10px] font-bold text-slate-700">{h}</p>
            {(items as string[]).map((it) => (
              <p key={it} className="text-[10px] text-slate-500 hover:text-brand-600">{it}</p>
            ))}
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">大きく開く多列メニュー＝メガメニュー</p>
    </div>
  ),
  animation: () => (
    <div className="text-center">
      <div className="flex items-center justify-center gap-3">
        <span className="h-8 w-8 animate-bounce rounded-full bg-brand-400" />
        <span className="h-8 w-8 animate-pulse rounded-full bg-sky-400" />
        <span className="relative flex h-8 w-8 items-center justify-center">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
          <span className="relative h-8 w-8 rounded-full bg-rose-400" />
        </span>
      </div>
      <p className="mt-3 text-[10px] text-slate-400">時間で動かす・変化させる演出＝アニメーション</p>
    </div>
  ),
  "hover-effect": () => (
    <div className="text-center">
      <div className="mx-auto w-40 cursor-pointer rounded-xl bg-white p-4 shadow-[0_2px_0_#e2e8f0] ring-1 ring-slate-200 transition hover:-translate-y-1 hover:bg-brand-50 hover:shadow-[0_6px_0_#a8f0c4]">
        <p className="text-sm font-bold text-slate-700">カーソルを乗せてみて</p>
      </div>
      <p className="mt-3 text-[10px] text-slate-400">乗せると変わる反応＝ホバーエフェクト</p>
    </div>
  ),
  "review-star": () => (
    <div className="text-center">
      <div className="flex items-center justify-center gap-0.5 text-lg text-amber-400">
        {[1, 2, 3, 4].map((i) => (
          <span key={i}>★</span>
        ))}
        <span className="relative">
          <span className="text-slate-200">★</span>
          <span className="absolute inset-0 w-1/2 overflow-hidden text-amber-400">★</span>
        </span>
      </div>
      <p className="mt-1 text-sm font-bold text-slate-700">
        4.5 <span className="text-xs font-normal text-slate-400">(238件)</span>
      </p>
      <p className="mt-2 text-[10px] text-slate-400">星の数で評価＝星レビュー</p>
    </div>
  ),
  "comment-box": () => (
    <div className="w-full max-w-xs">
      <div className="space-y-1.5">
        {[
          ["たろう", "わかりやすい！"],
          ["はなこ", "助かりました"],
        ].map(([n, c]) => (
          <div key={n as string} className="rounded-lg bg-white p-2 shadow-sm ring-1 ring-slate-200">
            <p className="text-[10px] font-bold text-slate-600">{n}</p>
            <p className="text-xs text-slate-500">{c}</p>
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex gap-1">
        <div className="flex-1 rounded-lg bg-slate-50 px-2 py-1.5 text-xs text-slate-400 ring-1 ring-slate-200">コメントを書く…</div>
        <button className="rounded-lg bg-brand-500 px-3 text-xs font-bold text-white">送信</button>
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">感想を書き込む場所＝コメント欄</p>
    </div>
  ),
  // ---- UI部品 追加（データ表示・操作など 2026-07-18c） ----
  // ---- UI部品 追加（データ表示・操作など 2026-07-18c） ----
  "qr-code": () => (
    <div className="text-center">
      <div className="mx-auto inline-block rounded-lg bg-white p-2 shadow-sm ring-1 ring-slate-200">
        {QR_MATRIX.map((row, r) => (
          <div key={r} className="flex">
            {row.split("").map((ch, c) => (
              <span key={c} className={`h-3 w-3 ${ch === "1" ? "bg-slate-800" : "bg-white"}`} />
            ))}
          </div>
        ))}
      </div>
      <p className="mt-2 text-[10px] text-slate-400">かざすとURL等に飛ぶ四角い模様＝QRコード</p>
    </div>
  ),
  kanban: () => (
    <div className="w-full max-w-xs">
      <div className="flex gap-1.5">
        {[
          ["未着手", ["調査", "設計"]],
          ["作業中", ["実装"]],
          ["完了", ["要件"]],
        ].map(([title, cards]) => (
          <div key={title as string} className="flex-1 rounded-lg bg-slate-100 p-1.5">
            <p className="mb-1 text-[9px] font-bold text-slate-500">{title}</p>
            <div className="space-y-1">
              {(cards as string[]).map((c) => (
                <div key={c} className="rounded bg-white px-2 py-1 text-[10px] text-slate-600 shadow-sm">{c}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">列にカードを並べて進捗管理＝カンバン</p>
    </div>
  ),
  "drag-and-drop": () => (
    <div className="w-full max-w-xs text-center">
      <div className="flex items-center justify-center gap-2">
        <div className="rounded-lg bg-blue-100 px-3 py-2 text-xs font-bold text-blue-600 shadow-md">アイテム</div>
        <Icon name="arrow-right" className="h-4 w-4 text-slate-300" />
        <div className="rounded-lg border-2 border-dashed border-emerald-300 px-3 py-2 text-xs text-emerald-500">ここに置く</div>
      </div>
      <p className="mt-3 text-[10px] text-slate-400">つかんで運んで離す＝ドラッグ＆ドロップ</p>
    </div>
  ),
  "back-to-top": () => (
    <div className="w-full max-w-[12rem]">
      <div className="relative h-28 overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-200">
        <div className="space-y-1.5 p-2.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-2 rounded bg-slate-100" style={{ width: `${90 - i * 8}%` }} />
          ))}
        </div>
        <button className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-white shadow-lg">↑</button>
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">押すと先頭へ戻る＝トップへ戻るボタン</p>
    </div>
  ),
  coupon: () => (
    <div className="text-center">
      <div className="mx-auto inline-flex items-center gap-3 rounded-xl border-2 border-dashed border-rose-300 bg-rose-50 px-5 py-3">
        <span className="font-display text-2xl font-extrabold text-rose-500">
          20%<span className="text-sm">OFF</span>
        </span>
        <span className="text-[10px] text-rose-400">初回限定クーポン</span>
      </div>
      <p className="mt-2 text-[10px] text-slate-400">割引・特典を表す券＝クーポン</p>
    </div>
  ),
  gauge: () => (
    <div className="text-center">
      <svg viewBox="0 0 100 55" className="mx-auto w-32">
        <path d="M10 50 A40 40 0 0 1 90 50" fill="none" stroke="#e5e7eb" strokeWidth="10" strokeLinecap="round" />
        <path d="M10 50 A40 40 0 0 1 78 22" fill="none" stroke="#1fc866" strokeWidth="10" strokeLinecap="round" />
      </svg>
      <p className="-mt-3 font-display text-xl font-extrabold text-slate-800">
        72<span className="text-xs text-slate-400">%</span>
      </p>
      <p className="mt-1 text-[10px] text-slate-400">半円の目盛りで量を示す＝ゲージ</p>
    </div>
  ),
  "donut-chart": () => (
    <div className="text-center">
      <svg viewBox="0 0 36 36" className="mx-auto w-28 -rotate-90">
        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" strokeWidth="4" />
        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1fc866" strokeWidth="4" strokeDasharray="50 100" />
        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#3b82f6" strokeWidth="4" strokeDasharray="30 100" strokeDashoffset="-50" />
        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f59e0b" strokeWidth="4" strokeDasharray="20 100" strokeDashoffset="-80" />
      </svg>
      <p className="mt-2 text-[10px] text-slate-400">割合を扇形で見せる＝ドーナツグラフ</p>
    </div>
  ),
  "video-player": () => (
    <div className="w-full max-w-[14rem]">
      <div className="relative aspect-video overflow-hidden rounded-lg bg-slate-800">
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-800">▶</span>
        </span>
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-black/40 px-2 py-1.5">
          <span className="text-[9px] text-white">1:12</span>
          <div className="h-1 flex-1 rounded-full bg-white/30">
            <div className="h-full w-1/3 rounded-full bg-rose-500" />
          </div>
          <span className="text-[9px] text-white">3:40</span>
        </div>
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">再生バー付きで動画を見せる＝動画プレーヤー</p>
    </div>
  ),
  "link-text": () => (
    <div className="w-full max-w-xs text-center">
      <p className="text-sm text-slate-600">
        くわしくは <span className="cursor-pointer text-blue-600 underline">こちらのページ</span> をご覧ください。
      </p>
      <p className="mt-3 text-[10px] text-slate-400">押すと別ページへ飛ぶ文字＝リンク</p>
    </div>
  ),
  // ---- UI部品 追加（フォーム・データ表示など 2026-07-18b） ----
  "color-picker": () => <ColorPickerDemo />,
  countdown: () => <CountdownDemo />,
  "text-field": () => (
    <div className="w-full max-w-xs">
      <label className="text-xs font-bold text-slate-500">お名前</label>
      <input placeholder="山田 太郎" className="mt-1 w-full rounded-lg bg-white px-3 py-2 text-sm outline-none ring-1 ring-slate-300 focus:ring-2 focus:ring-blue-500" />
      <p className="mt-1 text-[10px] text-slate-400">1行の文字を打つ基本の入力欄＝テキストフィールド</p>
    </div>
  ),
  select: () => (
    <div className="w-full max-w-xs">
      <label className="text-xs font-bold text-slate-500">都道府県</label>
      <select className="mt-1 w-full rounded-lg bg-white px-3 py-2 text-sm outline-none ring-1 ring-slate-300 focus:ring-2 focus:ring-blue-500">
        <option>東京都</option>
        <option>大阪府</option>
        <option>北海道</option>
      </select>
      <p className="mt-1 text-[10px] text-slate-400">候補から1つ選ぶ＝セレクトボックス</p>
    </div>
  ),
  autocomplete: () => (
    <div className="w-full max-w-xs">
      <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 ring-1 ring-slate-300">
        <Icon name="search" className="h-4 w-4 text-slate-400" />
        <span className="text-sm text-slate-700">とうきょう</span>
      </div>
      <div className="mt-1 rounded-lg bg-white py-1 shadow-md ring-1 ring-slate-200">
        {["東京都", "東京タワー", "東京駅"].map((s) => (
          <div key={s} className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50">{s}</div>
        ))}
      </div>
      <p className="mt-1 text-center text-[10px] text-slate-400">入力の途中で候補を先読み＝オートコンプリート</p>
    </div>
  ),
  calendar: () => (
    <div className="w-full max-w-[13rem] rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200">
      <p className="text-center text-xs font-bold text-slate-700">2026年 7月</p>
      <div className="mt-2 grid grid-cols-7 gap-1 text-center text-[10px]">
        {["日", "月", "火", "水", "木", "金", "土"].map((d) => (
          <span key={d} className="text-slate-400">{d}</span>
        ))}
        {Array.from({ length: 31 }, (_, i) => i + 1).map((n) => (
          <span key={n} className={`rounded py-0.5 ${n === 18 ? "bg-brand-500 text-white" : "text-slate-600"}`}>{n}</span>
        ))}
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">日付を格子で見せる＝カレンダー</p>
    </div>
  ),
  "notification-bell": () => (
    <div className="text-center">
      <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
        <Icon name="bell" className="h-6 w-6 text-slate-600" />
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">3</span>
      </span>
      <p className="mt-2 text-[10px] text-slate-400">未読数を知らせるベル＝通知ベル</p>
    </div>
  ),
  "status-dot": () => (
    <div className="w-full max-w-xs space-y-2">
      {[
        ["オンライン", "bg-emerald-500"],
        ["取り込み中", "bg-rose-500"],
        ["オフライン", "bg-slate-300"],
      ].map(([label, c]) => (
        <div key={label as string} className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
            <Icon name="user" className="h-4 w-4 text-slate-400" />
            <span className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full ring-2 ring-white ${c}`} />
          </span>
          <span className="text-xs text-slate-600">{label}</span>
        </div>
      ))}
    </div>
  ),
  "price-tag": () => (
    <div className="text-center">
      <div className="inline-flex items-end gap-2 rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200">
        <span className="text-xs text-slate-400 line-through">¥2,980</span>
        <span className="font-display text-2xl font-extrabold text-rose-500">¥1,980</span>
        <span className="text-[10px] text-slate-400">税込</span>
        <span className="rounded bg-rose-500 px-1.5 py-0.5 text-[10px] font-bold text-white">33%OFF</span>
      </div>
      <p className="mt-2 text-[10px] text-slate-400">値段を目立たせる＝価格表示</p>
    </div>
  ),
  "bar-chart": () => (
    <div className="w-full max-w-xs">
      <div className="flex h-28 items-end justify-around gap-2 rounded-lg bg-white p-3 shadow-sm ring-1 ring-slate-200">
        {[
          [40, "月"],
          [70, "火"],
          [55, "水"],
          [90, "木"],
          [65, "金"],
        ].map(([h, d]) => (
          <div key={d as string} className="flex flex-1 flex-col items-center gap-1">
            <div className="w-full rounded-t bg-brand-400" style={{ height: `${h}%` }} />
            <span className="text-[9px] text-slate-400">{d}</span>
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">棒の長さで大小を比べる＝棒グラフ</p>
    </div>
  ),
  // ---- UI部品 追加（新規用語 2026-07-18） ----
  snackbar: () => <SnackbarDemo />,
  "like-button": () => <LikeButtonDemo />,
  "dropdown-menu": () => <DropdownMenuDemo />,
  alert: () => (
    <div className="w-full max-w-xs space-y-2">
      {[
        ["成功", "保存しました", "border-emerald-200 bg-emerald-50 text-emerald-700", "check"],
        ["エラー", "入力に誤りがあります", "border-rose-200 bg-rose-50 text-rose-700", "x"],
        ["注意", "未保存の変更があります", "border-amber-200 bg-amber-50 text-amber-700", "lightbulb"],
      ].map(([t, msg, cls, icon]) => (
        <div key={t} className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs ${cls}`}>
          <Icon name={icon as IconName} className="h-4 w-4 shrink-0" strokeWidth={2.5} />
          <span>
            <b>{t}</b>：{msg}
          </span>
        </div>
      ))}
    </div>
  ),
  "bottom-navigation": () => (
    <div className="w-full max-w-[13rem]">
      <div className="rounded-b-2xl rounded-t-lg bg-white shadow-sm ring-1 ring-slate-200">
        <div className="flex h-24 items-center justify-center text-[10px] text-slate-300">アプリ画面</div>
        <div className="flex items-center justify-around border-t border-slate-100 py-1.5">
          {[
            ["book", "ホーム", true],
            ["search", "さがす", false],
            ["heart", "保存", false],
            ["user", "マイ", false],
          ].map(([ic, label, active]) => (
            <div key={label as string} className={`flex flex-col items-center gap-0.5 text-[9px] ${active ? "text-brand-600" : "text-slate-400"}`}>
              <Icon name={ic as IconName} className="h-4 w-4" />
              {label}
            </div>
          ))}
        </div>
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">画面下の固定メニュー＝ボトムナビ</p>
    </div>
  ),
  "split-button": () => (
    <div className="w-full max-w-xs text-center">
      <div className="inline-flex overflow-hidden rounded-lg shadow-sm">
        <button className="bg-brand-500 px-5 py-2 text-sm font-bold text-white">保存</button>
        <span className="flex items-center border-l border-white/30 bg-brand-500 px-2.5 text-xs text-white">▼</span>
      </div>
      <div className="mx-auto mt-1 w-32 rounded-lg bg-white py-1 text-left shadow-md ring-1 ring-slate-200">
        {["別名で保存", "コピーを保存"].map((o) => (
          <div key={o} className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50">{o}</div>
        ))}
      </div>
      <p className="mt-2 text-[10px] text-slate-400">主操作＋▼で追加操作＝分割ボタン</p>
    </div>
  ),
  "file-upload": () => (
    <div className="w-full max-w-xs">
      <div className="flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 py-6 text-center">
        <Icon name="image" className="h-7 w-7 text-slate-400" />
        <span className="text-xs font-bold text-slate-500">ファイルをドラッグ＆ドロップ</span>
        <span className="rounded-lg bg-white px-3 py-1 text-[11px] text-slate-600 ring-1 ring-slate-300">ファイルを選択</span>
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">選ぶ or ドラッグで送信＝ファイルアップロード</p>
    </div>
  ),
  // ---- UI部品 追加（新規用語 2026-07-17e） ----
  chip: () => <ChipDemo />,
  "floating-label": () => <FloatingLabelDemo />,
  timeline: () => (
    <div className="w-full max-w-[15rem]">
      {[
        ["注文完了", "done"],
        ["発送済み", "done"],
        ["配達中", "now"],
        ["お届け", "todo"],
      ].map(([label, st], i, arr) => (
        <div key={label} className="flex gap-3">
          <div className="flex flex-col items-center">
            <span className={`flex h-4 w-4 items-center justify-center rounded-full ${st === "todo" ? "bg-slate-200" : "bg-brand-500"}`}>
              {st === "now" && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
            </span>
            {i < arr.length - 1 && <span className={`w-0.5 flex-1 ${st === "todo" ? "bg-slate-200" : "bg-brand-300"}`} style={{ minHeight: 18 }} />}
          </div>
          <span className={`pb-4 text-xs font-bold ${st === "todo" ? "text-slate-400" : st === "now" ? "text-brand-600" : "text-slate-700"}`}>{label}</span>
        </div>
      ))}
    </div>
  ),
  "data-table": () => (
    <div className="w-full max-w-xs overflow-hidden rounded-lg bg-white text-xs shadow-sm ring-1 ring-slate-200">
      <div className="flex bg-slate-50 font-bold text-slate-500">
        <span className="flex-1 px-3 py-1.5">名前</span>
        <span className="w-16 px-3 py-1.5">得点</span>
      </div>
      {[
        ["たろう", "92"],
        ["はなこ", "88"],
        ["けん", "75"],
      ].map(([n, s]) => (
        <div key={n} className="flex border-t border-slate-100 text-slate-600">
          <span className="flex-1 px-3 py-1.5">{n}</span>
          <span className="w-16 px-3 py-1.5 font-mono">{s}</span>
        </div>
      ))}
      <p className="border-t border-slate-100 px-3 py-1.5 text-center text-[10px] text-slate-400">行と列で整理＝データテーブル</p>
    </div>
  ),
  blockquote: () => (
    <div className="w-full max-w-xs">
      <blockquote className="border-l-4 border-brand-400 bg-brand-50/50 py-2 pl-4 pr-2 text-sm italic text-slate-600">
        「名前がわかれば、調べられる。」
        <footer className="mt-1 text-[10px] not-italic text-slate-400">— Co-Cre</footer>
      </blockquote>
      <p className="mt-2 text-center text-[10px] text-slate-400">縦線＋字下げで引用を示す＝blockquote</p>
    </div>
  ),
  "stat-card": () => (
    <div className="flex w-full max-w-xs gap-2">
      {[
        ["登録者", "1,240", "人"],
        ["今日の売上", "¥52,000", ""],
      ].map(([label, val, unit]) => (
        <div key={label} className="flex-1 rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200">
          <p className="text-[10px] font-bold text-slate-400">{label}</p>
          <p className="font-display text-xl font-extrabold text-slate-800">
            {val}
            <span className="text-xs text-slate-400">{unit}</span>
          </p>
        </div>
      ))}
    </div>
  ),
  "command-palette": () => (
    <div className="w-full max-w-xs">
      <div className="rounded-xl bg-white p-2 shadow-lg ring-1 ring-slate-200">
        <div className="flex items-center gap-2 border-b border-slate-100 px-2 pb-2">
          <Icon name="search" className="h-4 w-4 text-slate-400" />
          <span className="text-sm text-slate-400">コマンドを入力…</span>
          <span className="ml-auto rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[9px] text-slate-500">⌘K</span>
        </div>
        <div className="mt-1 space-y-0.5">
          {["図鑑を開く", "問題集を始める", "マイページ"].map((c) => (
            <div key={c} className="flex items-center gap-2 rounded px-2 py-1.5 text-xs text-slate-600 hover:bg-slate-50">
              <Icon name="arrow-right" className="h-3 w-3 text-slate-300" />
              {c}
            </div>
          ))}
        </div>
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">キーで開く検索実行メニュー＝コマンドパレット</p>
    </div>
  ),
  kbd: () => (
    <div className="w-full max-w-xs text-center">
      <p className="text-sm text-slate-600">
        コピーは
        <kbd className="mx-1 inline-block rounded-md border border-b-2 border-slate-300 bg-white px-2 py-0.5 font-mono text-xs font-bold text-slate-700 shadow-sm">Ctrl</kbd>
        ＋
        <kbd className="mx-1 inline-block rounded-md border border-b-2 border-slate-300 bg-white px-2 py-0.5 font-mono text-xs font-bold text-slate-700 shadow-sm">C</kbd>
      </p>
      <p className="mt-2 text-[10px] text-slate-400">押すキーをキーっぽく囲う＝kbd</p>
    </div>
  ),
  // ---- フロント用語 追加バッチ3（残りのデモ化・2026-07-17d） ----
  "media-query": () => (
    <div className="w-full max-w-xs text-center text-[10px]">
      <code className="block rounded-lg bg-slate-800 px-3 py-2 text-left font-mono text-sky-200">
        @media (max-width: 600px) {"{ … }"}
      </code>
      <div className="mt-2 flex gap-2">
        <div className="flex-1 rounded-lg bg-blue-100 py-3 font-bold text-blue-600">広い画面<br />横ならび</div>
        <div className="w-16 rounded-lg bg-emerald-100 py-3 font-bold text-emerald-600">せまい<br />縦</div>
      </div>
      <p className="mt-1 text-slate-400">画面幅の条件で見た目を変えるCSS</p>
    </div>
  ),
  position: () => (
    <div className="w-full max-w-xs">
      <div className="relative h-28 rounded-lg bg-white p-2 shadow-sm ring-1 ring-slate-200">
        <span className="inline-block rounded bg-slate-100 px-2 py-1 text-[10px]">static（ふつう）</span>
        <span className="absolute right-2 top-2 rounded bg-rose-100 px-2 py-1 text-[10px] font-bold text-rose-600">absolute（右上）</span>
        <span className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded bg-blue-100 px-2 py-1 text-[10px] font-bold text-blue-600">中央下</span>
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">要素の置き方を決める＝position</p>
    </div>
  ),
  "infinite-scroll": () => <InfiniteScrollDemo />,
  "lazy-loading": () => (
    <div className="w-full max-w-xs">
      <div className="flex items-center gap-2">
        <div className="flex-1 text-center">
          <div className="flex h-20 items-center justify-center rounded-lg bg-slate-100 text-[10px] text-slate-400">読込前<br />（軽い）</div>
          <p className="mt-1 text-[10px] text-slate-400">画面外</p>
        </div>
        <span className="text-slate-300">→</span>
        <div className="flex-1 text-center">
          <div className="flex h-20 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
            <Icon name="image" className="h-6 w-6" />
          </div>
          <p className="mt-1 text-[10px] text-slate-400">見えたら読込</p>
        </div>
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">必要になってから読み込む＝遅延読み込み</p>
    </div>
  ),
  "not-found-page": () => (
    <div className="w-full max-w-xs rounded-lg bg-white p-5 text-center shadow-sm ring-1 ring-slate-200">
      <p className="font-display text-4xl font-extrabold text-slate-300">404</p>
      <p className="mt-1 text-sm font-bold text-slate-600">ページが見つかりません</p>
      <p className="mt-1 text-[11px] text-slate-400">URLが違うか、削除された可能性があります</p>
      <span className="mt-3 inline-block rounded-lg bg-blue-600 px-3 py-1.5 text-xs text-white">ホームへ戻る</span>
    </div>
  ),
  wireframe: () => (
    <div className="w-full max-w-[14rem] space-y-1.5 rounded-lg border-2 border-dashed border-slate-300 bg-white p-2">
      <div className="h-6 rounded bg-slate-200" />
      <div className="flex gap-1.5">
        <div className="h-16 w-1/3 rounded bg-slate-100" />
        <div className="flex-1 space-y-1">
          <div className="h-2 rounded bg-slate-200" />
          <div className="h-2 w-2/3 rounded bg-slate-200" />
          <div className="h-2 rounded bg-slate-200" />
        </div>
      </div>
      <div className="h-6 w-1/3 rounded bg-slate-300" />
      <p className="pt-1 text-center text-[9px] text-slate-400">配置だけ決めた設計図＝ワイヤーフレーム</p>
    </div>
  ),
  mockup: () => (
    <div className="w-full max-w-[10rem] text-center">
      <div className="rounded-[1.2rem] bg-slate-800 p-2 shadow-lg">
        <div className="space-y-1 rounded-[0.7rem] bg-white p-2">
          <div className="h-3 rounded bg-blue-500" />
          <div className="h-10 rounded bg-slate-100" />
          <div className="h-2 rounded bg-slate-200" />
          <div className="h-2 w-2/3 rounded bg-slate-200" />
          <div className="h-4 rounded bg-emerald-400" />
        </div>
      </div>
      <p className="mt-2 text-[10px] text-slate-400">色や中身まで作った完成イメージ＝モックアップ</p>
    </div>
  ),
  lp: () => (
    <div className="w-full max-w-[12rem] space-y-1 rounded-lg bg-white p-2 shadow-sm ring-1 ring-slate-200">
      <div className="rounded bg-gradient-to-r from-blue-500 to-violet-500 py-4 text-center text-[10px] font-bold text-white">大きな見出し＋CTA</div>
      <div className="flex gap-1">
        <div className="h-8 flex-1 rounded bg-slate-100" />
        <div className="h-8 flex-1 rounded bg-slate-100" />
        <div className="h-8 flex-1 rounded bg-slate-100" />
      </div>
      <div className="rounded bg-emerald-400 py-2 text-center text-[10px] font-bold text-white">申し込む</div>
      <p className="pt-0.5 text-center text-[9px] text-slate-400">1つの目的に絞った縦長ページ＝LP</p>
    </div>
  ),
  accessibility: () => (
    <div className="w-full max-w-xs space-y-2">
      <div className="flex gap-2 text-center">
        <div className="flex-1 rounded-lg bg-slate-800 p-2 text-xs font-bold text-white">
          読みやすい
          <br />
          <span className="text-[9px] font-normal text-slate-300">コントラスト◎</span>
        </div>
        <div className="flex-1 rounded-lg bg-slate-300 p-2 text-xs font-bold text-slate-400">
          読みにくい
          <br />
          <span className="text-[9px] font-normal">コントラスト不足</span>
        </div>
      </div>
      <button className="w-full rounded-lg bg-white py-2 text-xs font-bold text-slate-700 ring-2 ring-blue-500 ring-offset-2">
        フォーカスの枠（キーボード操作）
      </button>
      <p className="text-center text-[10px] text-slate-400">誰でも使える工夫＝アクセシビリティ</p>
    </div>
  ),
  "css-variable": () => (
    <div className="w-full max-w-xs">
      <code className="block rounded-lg bg-slate-800 p-3 font-mono text-[11px] leading-relaxed">
        <span className="text-slate-400">:root {"{"}</span>
        <br />
        <span className="ml-3 text-sky-300">--main</span>
        <span className="text-slate-400">: </span>
        <span className="text-emerald-300">#1fc866</span>
        <span className="text-slate-400">;</span>
        <br />
        <span className="text-slate-400">{"}"}</span>
        <br />
        <span className="text-rose-300">color</span>
        <span className="text-slate-400">: </span>
        <span className="text-amber-300">var(--main)</span>
        <span className="text-slate-400">;</span>
      </code>
      <p className="mt-2 flex items-center justify-center gap-2 text-[10px] text-slate-400">
        <span className="h-4 w-4 rounded" style={{ background: "#1fc866" }} />
        1か所直すと全部変わる＝CSS変数
      </p>
    </div>
  ),
  specificity: () => (
    <div className="w-full max-w-xs space-y-1.5 font-mono text-[11px]">
      {[
        ["#id", "強い", "bg-rose-50 text-rose-600", "100点"],
        [".class", "中", "bg-amber-50 text-amber-600", "10点"],
        ["p（タグ）", "弱い", "bg-emerald-50 text-emerald-600", "1点"],
      ].map(([sel, s, cls, pt]) => (
        <div key={sel} className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200">
          <span className={`rounded px-2 py-0.5 font-bold ${cls}`}>{sel}</span>
          <span className="font-sans text-slate-500">{s}</span>
          <span className="ml-auto font-sans text-[10px] text-slate-400">{pt}</span>
        </div>
      ))}
      <p className="text-center font-sans text-[10px] text-slate-400">強い指定が勝つ＝詳細度</p>
    </div>
  ),
  "rest-api": () => (
    <div className="w-full max-w-xs space-y-1.5 font-mono text-[11px]">
      {[
        ["GET", "取得", "bg-emerald-50 text-emerald-600"],
        ["POST", "追加", "bg-blue-50 text-blue-600"],
        ["PUT", "更新", "bg-amber-50 text-amber-600"],
        ["DELETE", "削除", "bg-rose-50 text-rose-600"],
      ].map(([m, d, cls]) => (
        <div key={m} className="flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 shadow-sm ring-1 ring-slate-200">
          <span className={`w-16 rounded px-2 py-0.5 text-center font-bold ${cls}`}>{m}</span>
          <span className="text-slate-500">/posts</span>
          <span className="ml-auto font-sans text-[10px] text-slate-400">{d}</span>
        </div>
      ))}
      <p className="text-center font-sans text-[10px] text-slate-400">操作を動詞で分けるAPIの作法＝REST</p>
    </div>
  ),
  "vendor-prefix": () => (
    <div className="w-full max-w-xs">
      <code className="block rounded-lg bg-slate-800 p-3 font-mono text-[11px] leading-relaxed text-slate-300">
        <span className="text-rose-300">-webkit-</span>appearance: none;
        <br />
        <span className="text-amber-300">-moz-</span>appearance: none;
        <br />
        appearance: none;
      </code>
      <p className="mt-2 text-center text-[10px] text-slate-400">ブラウザごとの頭文字＝ベンダープレフィックス</p>
    </div>
  ),
  "ssr-csr": () => (
    <div className="flex w-full max-w-xs gap-2 text-center text-[10px]">
      <div className="flex-1 rounded-lg bg-white p-2 shadow-sm ring-1 ring-slate-200">
        <p className="font-bold text-slate-700">SSR</p>
        <p className="mt-1 text-slate-500">サーバーが完成HTMLを渡す</p>
        <p className="mt-1 font-bold text-emerald-600">表示が速い / SEO◎</p>
      </div>
      <div className="flex-1 rounded-lg bg-white p-2 shadow-sm ring-1 ring-slate-200">
        <p className="font-bold text-slate-700">CSR</p>
        <p className="mt-1 text-slate-500">ブラウザのJSが組み立てる</p>
        <p className="mt-1 font-bold text-blue-600">操作が軽快</p>
      </div>
    </div>
  ),
  "local-storage": () => (
    <div className="w-full max-w-xs">
      <div className="rounded-lg bg-white p-3 shadow-sm ring-1 ring-slate-200">
        <p className="mb-1.5 text-[10px] font-bold text-slate-400">ブラウザに保存（閉じても消えない）</p>
        {[
          ["theme", "dark"],
          ["name", "たろう"],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between border-t border-slate-100 py-1 font-mono text-[11px] first:border-t-0">
            <span className="text-sky-600">{k}</span>
            <span className="text-slate-600">{v}</span>
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">名前と値で手元に保存＝ローカルストレージ</p>
    </div>
  ),
  "environment-variable": () => (
    <div className="w-full max-w-xs">
      <code className="block rounded-lg bg-slate-800 p-3 font-mono text-[11px] leading-relaxed text-slate-300">
        <span className="text-slate-500"># .env（秘密の設定）</span>
        <br />
        <span className="text-sky-300">API_KEY</span>=<span className="text-emerald-300">••••••••</span>
        <br />
        <span className="text-sky-300">DB_URL</span>=<span className="text-emerald-300">••••••••</span>
      </code>
      <p className="mt-2 text-center text-[10px] text-slate-400">鍵や接続先をコード外に隠す＝環境変数</p>
    </div>
  ),
  cdn: () => (
    <div className="w-full max-w-xs text-center">
      <div className="flex items-center justify-center gap-1.5 text-[10px]">
        <span className="rounded-lg bg-white px-2 py-3 shadow-sm ring-1 ring-slate-200">あなた</span>
        <span className="font-bold text-emerald-500">←近い→</span>
        <span className="rounded-lg bg-emerald-50 px-2 py-3 font-bold text-emerald-600 ring-1 ring-emerald-200">近くの配信拠点</span>
        <span className="text-slate-300">…</span>
        <span className="rounded-lg bg-white px-2 py-3 text-slate-400 shadow-sm ring-1 ring-slate-200">本サーバー（遠い）</span>
      </div>
      <p className="mt-2 text-[10px] text-slate-400">近い拠点から配って速くする＝CDN</p>
    </div>
  ),
  bundler: () => (
    <div className="w-full max-w-xs text-center text-[10px]">
      <div className="flex items-center justify-center gap-2">
        <div className="space-y-1">
          {["a.js", "b.js", "c.css"].map((f) => (
            <div key={f} className="rounded bg-slate-100 px-2 py-1 font-mono text-slate-500">{f}</div>
          ))}
        </div>
        <span className="font-bold text-blue-500">→束ねる→</span>
        <div className="rounded bg-blue-100 px-3 py-3 font-mono font-bold text-blue-600">bundle.js</div>
      </div>
      <p className="mt-2 text-slate-400">たくさんのファイルを1つに束ねる＝バンドラー</p>
    </div>
  ),
  npm: () => (
    <div className="w-full max-w-xs">
      <code className="block rounded-lg bg-slate-900 px-3 py-2 font-mono text-[11px] text-slate-300">
        $ npm install <span className="text-emerald-300">react</span>
      </code>
      <div className="mt-1.5 rounded-lg bg-slate-800 px-3 py-2 font-mono text-[10px] text-slate-400">
        + react added
        <br />
        node_modules/ に部品が入った
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">公開部品を取り寄せる道具＝npm</p>
    </div>
  ),
  "reset-css": () => (
    <div className="w-full max-w-xs">
      <div className="flex gap-2 text-center">
        <div className="flex-1 rounded-lg bg-white p-2 shadow-sm ring-1 ring-slate-200">
          <p className="mb-1 text-[9px] font-bold text-slate-400">リセット前</p>
          <div className="rounded bg-slate-100 p-1 text-[10px] text-slate-500">ブラウザ差の初期余白がバラバラ</div>
        </div>
        <div className="flex-1 rounded-lg bg-white p-2 shadow-sm ring-1 ring-slate-200">
          <p className="mb-1 text-[9px] font-bold text-slate-400">リセット後</p>
          <div className="rounded bg-emerald-50 p-1 text-[10px] font-bold text-emerald-600">全ブラウザで揃う</div>
        </div>
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">初期スタイルを揃える下ごしらえ＝リセットCSS</p>
    </div>
  ),
  // ---- フロント用語 追加バッチ2（http/フォーム/タブ等） ----
  validation: () => <ValidationDemo />,
  event: () => <EventDemo />,
  "http-status": () => (
    <div className="w-full max-w-xs space-y-1.5 font-mono text-[11px]">
      {[
        ["200", "OK 成功", "bg-emerald-50 text-emerald-600"],
        ["404", "Not Found 見つからない", "bg-amber-50 text-amber-600"],
        ["500", "Server Error サーバー側の失敗", "bg-rose-50 text-rose-600"],
      ].map(([code, label, cls]) => (
        <div key={code} className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200">
          <span className={`rounded px-2 py-0.5 font-bold ${cls}`}>{code}</span>
          <span className="font-sans text-slate-600">{label}</span>
        </div>
      ))}
    </div>
  ),
  favicon: () => (
    <div className="w-full max-w-xs">
      <div className="flex items-end gap-1">
        <div className="flex items-center gap-1.5 rounded-t-lg bg-white px-3 py-1.5 shadow-sm ring-1 ring-slate-200">
          <span className="flex h-4 w-4 items-center justify-center rounded bg-brand-500 text-[8px] font-bold text-white">C</span>
          <span className="text-[11px] text-slate-600">Co-Cre</span>
          <Icon name="x" className="h-3 w-3 text-slate-300" />
        </div>
        <div className="flex items-center gap-1.5 rounded-t-lg bg-slate-100 px-3 py-1.5">
          <span className="h-4 w-4 rounded bg-slate-300" />
          <span className="text-[11px] text-slate-400">別サイト</span>
        </div>
      </div>
      <div className="h-12 rounded-b-lg rounded-tr-lg bg-white shadow-sm ring-1 ring-slate-200" />
      <p className="mt-2 text-center text-[10px] text-slate-400">タブに出る小さいアイコン＝ファビコン</p>
    </div>
  ),
  markup: () => (
    <div className="w-full max-w-xs">
      <code className="block rounded-lg bg-slate-800 px-3 py-2 font-mono text-[11px] text-sky-200">
        &lt;h1&gt;大見出し&lt;/h1&gt;
      </code>
      <p className="my-1 text-center text-[10px] text-slate-400">↓ タグで“意味”をつけると</p>
      <div className="rounded-lg bg-white p-3 shadow-sm ring-1 ring-slate-200">
        <p className="text-lg font-extrabold text-slate-800">大見出し</p>
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">文章にタグで印をつける＝マークアップ</p>
    </div>
  ),
  json: () => (
    <div className="w-full max-w-xs">
      <div className="rounded-lg bg-slate-800 p-3 font-mono text-[11px] leading-relaxed">
        <span className="text-slate-400">{"{"}</span>
        <br />
        <span className="ml-3 text-sky-300">&quot;name&quot;</span>
        <span className="text-slate-400">: </span>
        <span className="text-emerald-300">&quot;たろう&quot;</span>
        <span className="text-slate-400">,</span>
        <br />
        <span className="ml-3 text-sky-300">&quot;age&quot;</span>
        <span className="text-slate-400">: </span>
        <span className="text-amber-300">20</span>
        <span className="text-slate-400">,</span>
        <br />
        <span className="ml-3 text-sky-300">&quot;vip&quot;</span>
        <span className="text-slate-400">: </span>
        <span className="text-rose-300">true</span>
        <br />
        <span className="text-slate-400">{"}"}</span>
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">データを“名前：値”で表す軽い形式＝JSON</p>
    </div>
  ),
  console: () => (
    <div className="w-full max-w-xs">
      <code className="block rounded-t-lg bg-slate-900 px-3 py-2 font-mono text-[11px] text-slate-300">
        console.log(<span className="text-emerald-300">&quot;Hello!&quot;</span>)
      </code>
      <div className="rounded-b-lg bg-slate-800 px-3 py-2 font-mono text-[11px] text-white ring-1 ring-slate-700">
        &gt; Hello!
      </div>
      <p className="mt-2 text-center text-[10px] text-slate-400">開発者が中身を確認する“出力窓”＝コンソール</p>
    </div>
  ),
  cache: () => (
    <div className="w-full max-w-xs space-y-2">
      <div className="flex items-center gap-2 rounded-lg bg-white p-2.5 shadow-sm ring-1 ring-slate-200">
        <span className="rounded bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-500">1回目</span>
        <span className="text-xs text-slate-600">サーバーから取得</span>
        <span className="ml-auto text-[10px] font-bold text-rose-500">おそい</span>
      </div>
      <div className="flex items-center gap-2 rounded-lg bg-white p-2.5 shadow-sm ring-1 ring-slate-200">
        <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">2回目</span>
        <span className="text-xs text-slate-600">キャッシュから取得</span>
        <span className="ml-auto text-[10px] font-bold text-emerald-600">はやい</span>
      </div>
      <p className="text-center text-[10px] text-slate-400">一度使ったものを手元に保存して再利用＝キャッシュ</p>
    </div>
  ),
  cookie: () => (
    <div className="w-full max-w-xs text-center">
      <div className="mx-auto inline-flex items-center gap-2 rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200">
        <Icon name="monitor" className="h-5 w-5 text-slate-500" />
        <span className="text-[11px] text-slate-500">ブラウザ</span>
        <span className="rounded bg-amber-50 px-2 py-1 font-mono text-[10px] text-amber-700">user=たろう</span>
      </div>
      <p className="mt-2 text-[10px] text-slate-400">ブラウザに小さく保存される“メモ”＝クッキー（ログイン維持などに使う）</p>
    </div>
  ),
  // ---- フロント用語 追加バッチ（2026-07-17b） ----
  "context-menu": () => <ContextMenuDemo />,
  breakpoint: () => <BreakpointDemo />,
  "box-model": () => (
    <div className="text-center text-[9px] font-bold">
      <div className="rounded-lg bg-amber-100 p-3 text-amber-700">
        margin（外の余白）
        <div className="mt-1 rounded-lg bg-emerald-100 p-3 text-emerald-700">
          border（枠）
          <div className="mt-1 rounded bg-sky-100 p-3 text-sky-700">
            padding（内の余白）
            <div className="mt-1 rounded bg-white px-4 py-2 text-slate-600 shadow-sm">content（中身）</div>
          </div>
        </div>
      </div>
    </div>
  ),
  "sticky-header": () => (
    <div className="w-full max-w-[15rem]">
      <p className="mb-1 text-center text-[10px] text-slate-400">スクロールしても上に残る↓</p>
      <div className="h-40 overflow-y-auto rounded-lg bg-white shadow-sm ring-1 ring-slate-200">
        <div className="sticky top-0 bg-blue-600 px-3 py-2 text-xs font-bold text-white">固定ヘッダー</div>
        <div className="space-y-1.5 p-2">
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} className="rounded bg-slate-100 px-3 py-2 text-xs text-slate-500">項目 {i + 1}</div>
          ))}
        </div>
      </div>
    </div>
  ),
  viewport: () => (
    <div className="text-center">
      <div className="mx-auto w-28 rounded-[1.2rem] bg-slate-800 p-1.5 shadow-lg">
        <div className="rounded-[0.8rem] bg-white p-2">
          <div className="h-3 rounded bg-blue-500" />
          <div className="mt-1 space-y-1">
            <div className="h-2 rounded bg-slate-200" />
            <div className="h-2 w-2/3 rounded bg-slate-200" />
          </div>
          <div className="mt-2 rounded bg-blue-50 py-1 text-[8px] font-bold text-blue-500">見えている範囲</div>
        </div>
      </div>
      <p className="mt-2 text-[10px] text-slate-400">画面に“いま見えている”表示領域＝ビューポート</p>
    </div>
  ),
  "rem-em": () => (
    <div className="w-full max-w-xs space-y-1.5 text-slate-700">
      <p className="text-[10px] text-slate-400">基準（ルート）= 16px のとき</p>
      <p style={{ fontSize: 16 }}>1rem = 16px</p>
      <p style={{ fontSize: 24 }}>1.5rem = 24px</p>
      <p style={{ fontSize: 32 }}>2rem = 32px</p>
      <p className="text-[10px] text-slate-400">基準の“何倍か”で大きさを決める単位</p>
    </div>
  ),
  "font-family": () => (
    <div className="w-full max-w-xs space-y-2 text-slate-700">
      {[
        ["ゴシック体 Aa 亜", "font-sans"],
        ["明朝体 Aa 亜", "font-serif"],
        ["等幅 Aa 0123", "font-mono"],
      ].map(([t, f]) => (
        <div key={f} className="flex items-center justify-between rounded-lg bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200">
          <span className={f}>{t}</span>
          <span className="font-mono text-[10px] text-slate-400">{f}</span>
        </div>
      ))}
    </div>
  ),
  whitespace: () => (
    <div className="flex w-full max-w-xs gap-3 text-[11px] text-slate-600">
      <div className="flex-1 rounded-lg bg-white p-1 shadow-sm ring-1 ring-slate-200">
        <p className="mb-1 text-center text-[9px] font-bold text-slate-400">つめつめ</p>
        <div className="space-y-0.5">
          {["見出し", "本文本文", "ボタン"].map((t) => (
            <div key={t} className="bg-slate-100 px-1 py-0.5 text-center">{t}</div>
          ))}
        </div>
      </div>
      <div className="flex-1 rounded-lg bg-white p-3 shadow-sm ring-1 ring-slate-200">
        <p className="mb-2 text-center text-[9px] font-bold text-slate-400">ゆったり</p>
        <div className="space-y-2">
          {["見出し", "本文本文", "ボタン"].map((t) => (
            <div key={t} className="bg-slate-100 px-2 py-1 text-center">{t}</div>
          ))}
        </div>
      </div>
    </div>
  ),
  gutter: () => (
    <div className="w-full max-w-xs text-center">
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="rounded bg-blue-100 py-4 text-[10px] font-bold text-blue-500">{n}</div>
        ))}
      </div>
      <p className="mt-2 text-[10px] text-slate-400">カードとカードの“みぞ（すき間）”＝ガター</p>
    </div>
  ),
  "semantic-html": () => (
    <div className="w-full max-w-[15rem] space-y-1 text-center text-[10px] font-bold">
      <div className="rounded bg-violet-100 py-2 text-violet-600">&lt;header&gt; ヘッダー</div>
      <div className="flex gap-1">
        <div className="w-1/3 rounded bg-sky-100 py-4 text-sky-600">&lt;nav&gt;</div>
        <div className="flex-1 rounded bg-emerald-100 py-4 text-emerald-600">&lt;main&gt; 本文</div>
      </div>
      <div className="rounded bg-amber-100 py-2 text-amber-600">&lt;footer&gt; フッター</div>
      <p className="pt-1 text-[9px] font-normal text-slate-400">タグ名で「意味」が伝わるHTML</p>
    </div>
  ),
  "z-pattern": () => (
    <div className="relative w-full max-w-[15rem] rounded-lg bg-white p-4 shadow-sm ring-1 ring-slate-200">
      <div className="grid grid-cols-2 gap-y-8 text-[10px] font-bold text-slate-500">
        <span className="justify-self-start">① ロゴ</span>
        <span className="justify-self-end">② メニュー</span>
        <span className="justify-self-start">③ 画像</span>
        <span className="justify-self-end">④ ボタン</span>
      </div>
      <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 60" preserveAspectRatio="none" aria-hidden>
        <path d="M14 16 H86 L14 44 H86" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 2" />
      </svg>
      <p className="mt-2 text-center text-[9px] text-slate-400">目線がZ字に動く配置</p>
    </div>
  ),
  "pseudo-class": () => (
    <div className="text-center">
      <button className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-500">
        hoverで色が変わる
      </button>
      <p className="mt-2 text-[10px] text-slate-400">:hover や :focus など「状態」で見た目を変える指定</p>
    </div>
  ),
  "pseudo-element": () => (
    <div className="text-center">
      <p className="text-sm font-bold text-slate-700 before:mr-1.5 before:rounded before:bg-rose-500 before:px-1.5 before:py-0.5 before:align-middle before:text-[9px] before:text-white before:content-['NEW']">
        新商品のお知らせ
      </p>
      <p className="mt-3 text-[10px] text-slate-400">::before / ::after で本文の前後に“飾り”を自動で足せる</p>
    </div>
  ),
  masonry: () => (
    <div className="w-full max-w-[15rem]">
      <div className="columns-3 gap-1.5 [&>div]:mb-1.5">
        {[10, 16, 8, 14, 9, 12, 7, 13, 10].map((h, i) => (
          <div key={i} className="rounded bg-blue-100" style={{ height: h * 4 }} />
        ))}
      </div>
      <p className="mt-1 text-center text-[10px] text-slate-400">高さバラバラでも隙間なく詰める並べ方</p>
    </div>
  ),
  "bento-grid": () => (
    <div className="w-full max-w-[15rem]">
      <div className="grid grid-cols-3 grid-rows-3 gap-1.5 text-[9px] font-bold">
        <div className="col-span-2 row-span-2 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600">主役</div>
        <div className="flex items-center justify-center rounded-lg bg-sky-100 py-3 text-sky-600">A</div>
        <div className="flex items-center justify-center rounded-lg bg-sky-100 py-3 text-sky-600">B</div>
        <div className="flex items-center justify-center rounded-lg bg-emerald-100 py-3 text-emerald-600">C</div>
        <div className="col-span-2 flex items-center justify-center rounded-lg bg-violet-100 py-3 text-violet-600">横長</div>
      </div>
      <p className="mt-1 text-center text-[10px] text-slate-400">大小の箱を弁当箱のように詰めるレイアウト</p>
    </div>
  ),
  // ---- バックエンド（サイトの裏側） ----
  server: () => <ServerDemo />,
  database: () => <DatabaseDemo />,
  sql: () => <SqlDemo />,
  authentication: () => <AuthDemo />,
  "request-response": () => <RequestResponseDemo />,
  cors: () => <CorsDemo />,
  "api-key": () => <ApiKeyDemo />,
  webhook: () => <WebhookDemo />,
  authorization: () => (
    <div className="flex w-full max-w-xs gap-2 text-[11px]">
      {[
        { role: "管理者", items: [["記事を書く", true], ["記事を消す", true], ["設定を変える", true]] },
        { role: "一般ユーザー", items: [["記事を読む", true], ["記事を消す", false], ["設定を変える", false]] },
      ].map((r) => (
        <div key={r.role} className="flex-1 rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200">
          <p className="font-bold text-slate-700">{r.role}</p>
          <ul className="mt-1.5 space-y-1">
            {r.items.map(([label, allow]) => (
              <li key={label as string} className={`flex items-center gap-1 ${allow ? "text-slate-600" : "text-slate-400"}`}>
                <Icon name={allow ? "check" : "x"} className={`h-3 w-3 shrink-0 ${allow ? "text-emerald-500" : "text-rose-400"}`} strokeWidth={3} />
                {label}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  ),
  environment: () => (
    <div className="flex w-full max-w-xs gap-2 text-center text-[11px]">
      {[
        ["開発", "手元で試す", "bg-sky-50 text-sky-600 ring-sky-200"],
        ["テスト", "本番前の確認", "bg-amber-50 text-amber-600 ring-amber-200"],
        ["本番", "お客さんが使う", "bg-emerald-50 text-emerald-600 ring-emerald-200"],
      ].map(([n, d, c]) => (
        <div key={n} className={`flex-1 rounded-xl p-3 ring-1 ${c}`}>
          <p className="font-bold">{n}</p>
          <p className="mt-1 text-[10px] text-slate-500">{d}</p>
        </div>
      ))}
    </div>
  ),
  orm: () => (
    <div className="w-full max-w-xs space-y-1.5 font-mono text-[11px]">
      <div className="rounded-lg bg-white p-2.5 shadow-sm ring-1 ring-slate-200">
        <p className="font-sans text-[9px] font-bold text-slate-400">コードで書く（ORM）</p>
        <p className="mt-1 text-indigo-600">User.find(1)</p>
      </div>
      <p className="text-center text-[10px] text-slate-400">≒ 同じ意味 ≒</p>
      <div className="rounded-lg bg-slate-800 p-2.5">
        <p className="font-sans text-[9px] font-bold text-slate-400">実際のSQL</p>
        <p className="mt-1 text-emerald-300">SELECT * FROM users WHERE id = 1;</p>
      </div>
    </div>
  ),
  jwt: () => (
    <div className="w-full max-w-xs text-center">
      <p className="mb-2 text-[10px] text-slate-400">3つの部分を「.」でつないだ文字列</p>
      <div className="break-all rounded-lg bg-slate-800 p-3 font-mono text-[11px] leading-relaxed">
        <span className="text-rose-300">eyJhbGci</span>
        <span className="text-slate-500">.</span>
        <span className="text-sky-300">eyJ1c2Vy</span>
        <span className="text-slate-500">.</span>
        <span className="text-emerald-300">SflKxwRJ</span>
      </div>
      <div className="mt-2 flex justify-between text-[9px] font-bold">
        <span className="text-rose-500">ヘッダー</span>
        <span className="text-sky-500">中身(payload)</span>
        <span className="text-emerald-600">署名</span>
      </div>
    </div>
  ),
  endpoint: () => (
    <div className="w-full max-w-xs space-y-1.5 font-mono text-[11px]">
      {[
        ["GET", "/users", "一覧をもらう", "bg-emerald-50 text-emerald-600"],
        ["POST", "/users", "1件ふやす", "bg-blue-50 text-blue-600"],
        ["GET", "/users/1", "1件だけもらう", "bg-emerald-50 text-emerald-600"],
      ].map(([m, path, desc, cls]) => (
        <div key={m + path} className="flex items-center gap-2 rounded-lg bg-white px-2.5 py-2 shadow-sm ring-1 ring-slate-200">
          <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${cls}`}>{m}</span>
          <span className="text-slate-700">{path}</span>
          <span className="ml-auto font-sans text-[10px] text-slate-400">{desc}</span>
        </div>
      ))}
    </div>
  ),
  session: () => (
    <div className="flex w-full max-w-xs items-center gap-2 text-center">
      <div className="flex-1 rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200">
        <Icon name="monitor" className="mx-auto h-5 w-5 text-slate-500" />
        <p className="mt-1 text-[10px] font-bold text-slate-500">ブラウザ</p>
        <p className="mt-1 rounded bg-amber-50 px-1 py-0.5 font-mono text-[9px] text-amber-700">sid=abc123</p>
      </div>
      <div className="shrink-0 text-[9px] leading-tight text-slate-400">照合<br />→ ←</div>
      <div className="flex-1 rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200">
        <Icon name="database" className="mx-auto h-5 w-5 text-indigo-500" />
        <p className="mt-1 text-[10px] font-bold text-slate-500">サーバーの名簿</p>
        <p className="mt-1 rounded bg-emerald-50 px-1 py-0.5 font-mono text-[9px] text-emerald-700">abc123→たろう</p>
      </div>
    </div>
  ),
  // ---- 追加デモ（「表現できる」用語をちゃんと作る） ----
  stepper: () => <StepperDemo />,
  rating: () => <RatingDemo />,
  "segmented-control": () => <SegmentedDemo />,
  popover: () => <PopoverDemo />,
  "kebab-menu": () => <KebabMenuDemo />,
  banner: () => <BannerDemo />,
  "bottom-sheet": () => <BottomSheetDemo />,
  lightbox: () => <LightboxDemo />,
  "date-picker": () => <DatePickerDemo />,
  "range-slider": () => (
    <div className="w-60">
      <input type="range" defaultValue={60} className="w-full accent-blue-600" aria-label="スライダー" />
      <p className="mt-1 text-center text-xs text-slate-500">つまみを左右にドラッグして数値を選ぶ</p>
    </div>
  ),
  divider: () => (
    <div className="w-full max-w-xs">
      <p className="rounded-lg bg-white px-4 py-2 text-center text-sm text-slate-600 shadow-sm ring-1 ring-slate-200">上のグループ</p>
      <div className="my-3 flex items-center gap-3 text-xs text-slate-400">
        <span className="h-px flex-1 bg-slate-200" />
        または
        <span className="h-px flex-1 bg-slate-200" />
      </div>
      <p className="rounded-lg bg-white px-4 py-2 text-center text-sm text-slate-600 shadow-sm ring-1 ring-slate-200">下のグループ</p>
    </div>
  ),
  gradient: () => (
    <div className="flex items-center gap-3">
      {[
        ["from-sky-400 to-blue-600", "青"],
        ["from-violet-400 to-fuchsia-500", "紫"],
        ["from-amber-300 to-rose-400", "夕焼け"],
      ].map(([g, label]) => (
        <div key={label} className="text-center">
          <div className={`h-16 w-16 rounded-xl bg-gradient-to-br ${g} shadow`} />
          <p className="mt-1 text-[10px] text-slate-500">{label}</p>
        </div>
      ))}
    </div>
  ),
  opacity: () => (
    <div className="flex items-center gap-4 rounded-xl bg-[linear-gradient(45deg,#e2e8f0_25%,transparent_25%,transparent_75%,#e2e8f0_75%),linear-gradient(45deg,#e2e8f0_25%,#fff_25%,#fff_75%,#e2e8f0_75%)] bg-[length:16px_16px] bg-[position:0_0,8px_8px] p-5">
      {[100, 60, 30].map((o) => (
        <div key={o} className="text-center">
          <div className="h-14 w-14 rounded-xl bg-blue-600" style={{ opacity: o / 100 }} />
          <p className="mt-1 text-[10px] font-bold text-slate-500">{o}%</p>
        </div>
      ))}
    </div>
  ),
  "aspect-ratio": () => (
    <div className="flex items-end gap-3 text-center text-[10px] text-white">
      <div>
        <div className="flex aspect-square w-16 items-center justify-center rounded-lg bg-blue-500">1:1</div>
        <p className="mt-1 text-slate-500">正方形</p>
      </div>
      <div>
        <div className="flex aspect-[4/3] w-20 items-center justify-center rounded-lg bg-violet-500">4:3</div>
        <p className="mt-1 text-slate-500">写真</p>
      </div>
      <div>
        <div className="flex aspect-video w-24 items-center justify-center rounded-lg bg-rose-500">16:9</div>
        <p className="mt-1 text-slate-500">動画</p>
      </div>
    </div>
  ),
  display: () => (
    <div className="w-full max-w-xs space-y-2 text-[10px] text-white">
      <div>
        <p className="mb-1 text-slate-500">block（縦に積む）</p>
        <div className="space-y-1">
          <div className="rounded bg-blue-500 px-2 py-1.5">A</div>
          <div className="rounded bg-blue-500 px-2 py-1.5">B</div>
        </div>
      </div>
      <div>
        <p className="mb-1 text-slate-500">flex（横に並ぶ）</p>
        <div className="flex gap-1">
          <div className="flex-1 rounded bg-emerald-500 px-2 py-1.5 text-center">A</div>
          <div className="flex-1 rounded bg-emerald-500 px-2 py-1.5 text-center">B</div>
        </div>
      </div>
    </div>
  ),
  transform: () => (
    <div className="flex items-center gap-6">
      <div className="text-center">
        <div className="h-14 w-14 rounded-xl bg-blue-500 transition-transform duration-300 hover:rotate-45" />
        <p className="mt-2 text-[10px] text-slate-500">回転（hover）</p>
      </div>
      <div className="text-center">
        <div className="h-14 w-14 rounded-xl bg-violet-500 transition-transform duration-300 hover:scale-125" />
        <p className="mt-2 text-[10px] text-slate-500">拡大（hover）</p>
      </div>
    </div>
  ),
  "color-code": () => (
    <div className="flex gap-3">
      {[
        ["#2563eb", "青"],
        ["#16a34a", "緑"],
        ["#f59e0b", "黄"],
        ["#ef4444", "赤"],
      ].map(([hex, label]) => (
        <div key={hex} className="text-center">
          <div className="h-12 w-12 rounded-lg shadow ring-1 ring-black/5" style={{ background: hex }} />
          <p className="mt-1 font-mono text-[9px] text-slate-500">{hex}</p>
          <p className="text-[9px] text-slate-400">{label}</p>
        </div>
      ))}
    </div>
  ),
  "line-height": () => (
    <div className="flex w-full max-w-xs gap-3 text-[11px] text-slate-600">
      <div className="flex-1 rounded-lg bg-white p-2 shadow-sm ring-1 ring-slate-200">
        <p className="mb-1 text-[9px] font-bold text-slate-400">せまい</p>
        <p className="leading-none">行と行の<br />すきまが<br />せまい</p>
      </div>
      <div className="flex-1 rounded-lg bg-white p-2 shadow-sm ring-1 ring-slate-200">
        <p className="mb-1 text-[9px] font-bold text-slate-400">ひろい</p>
        <p className="leading-loose">行と行の<br />すきまが<br />ひろい</p>
      </div>
    </div>
  ),
  "empty-state": () => (
    <div className="flex w-full max-w-xs flex-col items-center rounded-xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-200">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-300">
        <Icon name="search" className="h-6 w-6" />
      </span>
      <p className="mt-3 text-sm font-bold text-slate-600">まだ何もありません</p>
      <p className="mt-1 text-xs text-slate-400">最初のアイテムを追加しましょう</p>
      <button className="mt-3 rounded-lg bg-blue-600 px-4 py-1.5 text-xs text-white">追加する</button>
    </div>
  ),
  notification: () => (
    <div className="w-full max-w-xs rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-500">
          <Icon name="bell" className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-slate-700">お知らせ</p>
          <p className="text-xs text-slate-500">コメントが1件つきました</p>
        </div>
        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-rose-500" />
      </div>
    </div>
  ),
  overflow: () => (
    <div className="w-full max-w-xs">
      <p className="mb-1 text-xs text-slate-400">枠からはみ出す分はスクロール↓</p>
      <div className="h-24 space-y-1.5 overflow-y-auto rounded-lg bg-white p-2 shadow-sm ring-1 ring-slate-200">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="rounded bg-slate-100 px-3 py-1.5 text-xs text-slate-600">項目 {i + 1}</div>
        ))}
      </div>
    </div>
  ),
  "css-animation": () => (
    <div className="flex items-center gap-5">
      <div className="text-center">
        <span className="mx-auto block h-10 w-10 animate-bounce rounded-full bg-blue-500" />
        <p className="mt-2 text-[10px] text-slate-500">bounce</p>
      </div>
      <div className="text-center">
        <span className="mx-auto block h-10 w-10 animate-pulse rounded-xl bg-violet-500" />
        <p className="mt-2 text-[10px] text-slate-500">pulse</p>
      </div>
      <div className="text-center">
        <span className="mx-auto block h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-500" />
        <p className="mt-2 text-[10px] text-slate-500">spin</p>
      </div>
    </div>
  ),
  // ---- UI部品 ----
  button: () => (
    <div className="flex gap-3">
      <button className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-blue-700">購入する</button>
      <button className="rounded-lg bg-white px-5 py-2.5 text-sm ring-1 ring-slate-300 hover:bg-slate-50">キャンセル</button>
    </div>
  ),
  modal: () => <ModalDemo />,
  toast: () => <ToastDemo />,
  accordion: () => (
    <div className="w-full max-w-xs space-y-2">
      {["送料はいくらですか？", "返品はできますか？"].map((q) => (
        <details key={q} className="group rounded-lg bg-white shadow-sm ring-1 ring-slate-200">
          <summary className="cursor-pointer list-none px-4 py-3 text-sm font-medium">
            {q} <span className="float-right text-slate-400 group-open:rotate-180">▼</span>
          </summary>
          <p className="border-t border-slate-100 px-4 py-3 text-sm text-slate-600">クリックで開閉できます。これがアコーディオンです。</p>
        </details>
      ))}
    </div>
  ),
  carousel: () => <CarouselDemo />,
  "hamburger-menu": () => <HamburgerDemo />,
  breadcrumb: () => (
    <nav className="rounded-lg bg-white px-4 py-3 text-sm shadow-sm ring-1 ring-slate-200">
      <span className="text-blue-600">ホーム</span>
      <span className="mx-2 text-slate-400">&gt;</span>
      <span className="text-blue-600">図鑑</span>
      <span className="mx-2 text-slate-400">&gt;</span>
      <span className="text-slate-600">パンくずリスト</span>
    </nav>
  ),
  tab: () => <TabDemo />,
  dropdown: () => (
    <label className="flex flex-col gap-1 text-sm">
      並び替え
      <select className="rounded-lg border border-slate-300 bg-white px-3 py-2">
        <option>新しい順</option>
        <option>人気順</option>
        <option>価格が安い順</option>
      </select>
    </label>
  ),
  pagination: () => (
    <div className="flex items-center gap-1.5">
      <button className="rounded-md px-2.5 py-1.5 text-sm text-slate-500 hover:bg-slate-100">←</button>
      {[1, 2, 3].map((n) => (
        <button key={n} className={`rounded-md px-3 py-1.5 text-sm ${n === 2 ? "bg-blue-600 text-white" : "hover:bg-slate-100"}`}>{n}</button>
      ))}
      <span className="px-1 text-slate-400">…</span>
      <button className="rounded-md px-3 py-1.5 text-sm hover:bg-slate-100">12</button>
      <button className="rounded-md px-2.5 py-1.5 text-sm text-slate-500 hover:bg-slate-100">→</button>
    </div>
  ),
  tooltip: () => (
    <div className="group relative">
      <button className="rounded-lg bg-white p-3 text-slate-500 shadow-sm ring-1 ring-slate-200">
        <Icon name="sliders" className="h-5 w-5" />
      </button>
      <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-800 px-2.5 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
        設定を開く
      </span>
      <p className="mt-2 text-xs text-slate-400">↑ マウスを乗せてみて</p>
    </div>
  ),
  checkbox: () => (
    <div className="space-y-2 rounded-lg bg-white px-5 py-4 text-sm shadow-sm ring-1 ring-slate-200">
      <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="h-4 w-4" /> HTML/CSS</label>
      <label className="flex items-center gap-2"><input type="checkbox" defaultChecked className="h-4 w-4" /> JavaScript</label>
      <label className="flex items-center gap-2"><input type="checkbox" className="h-4 w-4" /> デザイン</label>
    </div>
  ),
  "radio-button": () => (
    <div className="space-y-2 rounded-lg bg-white px-5 py-4 text-sm shadow-sm ring-1 ring-slate-200">
      <label className="flex items-center gap-2"><input type="radio" name="pay" defaultChecked className="h-4 w-4" /> クレジットカード</label>
      <label className="flex items-center gap-2"><input type="radio" name="pay" className="h-4 w-4" /> コンビニ払い</label>
    </div>
  ),
  "toggle-switch": () => <ToggleDemo />,
  badge: () => (
    <div className="flex gap-8 text-slate-600">
      <div className="relative">
        <Icon name="bell" className="h-8 w-8" />
        <span className="absolute -right-2 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">3</span>
      </div>
      <div className="relative">
        <Icon name="cart" className="h-8 w-8" />
        <span className="absolute -right-2 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">12</span>
      </div>
    </div>
  ),
  spinner: () => (
    <div className="flex flex-col items-center gap-2">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
      <p className="text-xs text-slate-500">読み込み中…</p>
    </div>
  ),
  "skeleton-screen": () => (
    <div className="w-full max-w-xs animate-pulse space-y-3 rounded-lg bg-white p-4 shadow-sm ring-1 ring-slate-200">
      <div className="h-24 rounded-lg bg-slate-200" />
      <div className="h-3 w-3/4 rounded bg-slate-200" />
      <div className="h-3 w-1/2 rounded bg-slate-200" />
    </div>
  ),
  placeholder: () => (
    <input
      type="email"
      placeholder="例: yamada@example.com"
      className="w-64 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
    />
  ),
  fab: () => (
    <div className="relative h-40 w-full max-w-xs rounded-lg bg-slate-100 ring-1 ring-slate-200">
      <p className="p-3 text-xs text-slate-400">コンテンツ…</p>
      <button className="absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-2xl text-white shadow-lg hover:bg-blue-700">＋</button>
    </div>
  ),
  avatar: () => (
    <div className="flex items-center gap-3">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 font-bold text-white">彩</span>
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 font-bold text-white">T</span>
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 text-slate-400">
        <Icon name="user" className="h-6 w-6" />
      </span>
    </div>
  ),
  tag: () => (
    <div className="flex flex-wrap gap-2">
      {["#HTML", "#CSS", "初級", "人気"].map((t) => (
        <span key={t} className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-200">{t}</span>
      ))}
    </div>
  ),
  "progress-bar": () => (
    <div className="w-full max-w-xs">
      <div className="mb-1 flex justify-between text-xs text-slate-500"><span>アップロード中</span><span>70%</span></div>
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
        <div className="h-full w-[70%] rounded-full bg-blue-600" />
      </div>
    </div>
  ),
  "search-bar": () => (
    <div className="flex w-64 items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-sm ring-1 ring-slate-300">
      <Icon name="search" className="h-4 w-4 text-slate-400" />
      <input placeholder="キーワードで検索" className="w-full bg-transparent text-sm outline-none" />
    </div>
  ),
  drawer: () => <DrawerDemo />,

  // ---- レイアウト ----
  header: () => <LayoutDemo highlight="header" />,
  footer: () => <LayoutDemo highlight="footer" />,
  sidebar: () => <LayoutDemo highlight="sidebar" />,
  "hero-section": () => (
    <MiniBrowser>
      <div className="flex h-36 flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
        <p className="text-sm font-bold">キャッチコピーがここに</p>
        <button className="mt-2 rounded-full bg-white px-4 py-1 text-xs font-bold text-blue-600">無料で始める</button>
      </div>
      <div className="space-y-1 p-2">
        <div className={`${block} py-2`}>コンテンツ</div>
      </div>
    </MiniBrowser>
  ),
  card: () => (
    <div className="w-44 overflow-hidden rounded-xl bg-white shadow-md ring-1 ring-slate-200">
      <div className="flex h-20 items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-400">
        <Icon name="image" className="h-7 w-7" />
      </div>
      <div className="p-3">
        <p className="text-sm font-bold">カードのタイトル</p>
        <p className="mt-1 text-xs text-slate-500">説明文がここに入ります</p>
      </div>
    </div>
  ),
  "grid-layout": () => (
    <div className="grid w-full max-w-xs grid-cols-3 gap-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex h-14 items-center justify-center rounded-lg bg-blue-100 text-xs text-blue-700">{i + 1}</div>
      ))}
    </div>
  ),
  "global-navigation": () => (
    <MiniBrowser>
      <div className="flex items-center justify-between px-3 py-2">
        <span className="text-xs font-bold">LOGO</span>
        <div className="flex gap-2 rounded bg-blue-500 px-2 py-1 text-[10px] font-bold text-white">
          <span>ホーム</span><span>料金</span><span>会社概要</span>
        </div>
      </div>
      <div className="space-y-1 p-2">
        <div className={`${block} py-6`}>コンテンツ</div>
      </div>
    </MiniBrowser>
  ),
  "first-view": () => (
    <div className="w-full max-w-xs">
      <MiniBrowser>
        <div className="flex h-24 items-center justify-center bg-blue-500 text-xs font-bold text-white">スクロールせずに見える範囲 = FV</div>
        <div className="border-t-2 border-dashed border-red-400 p-2">
          <div className={`${block} py-4`}>ここから下はスクロールが必要</div>
        </div>
      </MiniBrowser>
    </div>
  ),
  cta: () => (
    <div className="flex flex-col items-center gap-2 rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <p className="text-sm font-bold">まずは無料で試してみませんか？</p>
      <button className="rounded-full bg-orange-500 px-6 py-2.5 text-sm font-bold text-white shadow hover:bg-orange-600">今すぐ無料登録 →</button>
    </div>
  ),
  form: () => (
    <div className="w-64 space-y-2 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
      <label className="block text-xs text-slate-600">メールアドレス
        <input type="email" placeholder="you@example.com" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-1.5 text-sm" />
      </label>
      <label className="block text-xs text-slate-600">パスワード
        <input type="password" placeholder="••••••••" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-1.5 text-sm" />
      </label>
      <button className="w-full rounded-lg bg-blue-600 py-2 text-sm font-bold text-white">登録する</button>
    </div>
  ),
  section: () => (
    <MiniBrowser>
      <div className="space-y-1 p-2">
        <div className={`${block} py-2`}>ヘッダー</div>
        <div className="rounded bg-blue-100 py-3 text-center text-[10px] text-blue-700">セクション: サービス紹介</div>
        <div className="rounded bg-emerald-100 py-3 text-center text-[10px] text-emerald-700">セクション: 料金</div>
        <div className="rounded bg-amber-100 py-3 text-center text-[10px] text-amber-700">セクション: お客様の声</div>
      </div>
    </MiniBrowser>
  ),
  wrapper: () => (
    <MiniBrowser>
      <div className="bg-slate-100 py-2">
        <div className="mx-auto w-3/4 rounded bg-blue-100 py-8 text-center text-[10px] text-blue-700">
          ラッパー（max-width + 中央寄せ）
        </div>
      </div>
    </MiniBrowser>
  ),

  // ---- HTML/CSS ----
  flexbox: () => (
    <div className="flex w-full max-w-xs items-center gap-2 rounded-lg bg-slate-100 p-3 ring-1 ring-slate-200">
      {["A", "B", "C"].map((c) => (
        <div key={c} className="flex h-12 flex-1 items-center justify-center rounded-lg bg-blue-500 text-sm font-bold text-white">{c}</div>
      ))}
    </div>
  ),
  margin: () => <BoxModelDemo highlight="margin" />,
  padding: () => <BoxModelDemo highlight="padding" />,
  hover: () => (
    <div className="flex flex-col items-center gap-2">
      <button className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-600 hover:shadow-lg">
        マウスを乗せてみて
      </button>
    </div>
  ),
  "z-index": () => <ZIndexDemo />,
  "border-radius": () => (
    <div className="flex items-center gap-4">
      {[
        ["0", "rounded-none"],
        ["8px", "rounded-lg"],
        ["16px", "rounded-2xl"],
        ["50%", "rounded-full"],
      ].map(([label, cls]) => (
        <div key={label} className="text-center">
          <div className={`h-14 w-14 bg-blue-500 ${cls}`} />
          <p className="mt-1 text-[10px] text-slate-500">{label}</p>
        </div>
      ))}
    </div>
  ),
  "box-shadow": () => (
    <div className="flex items-center gap-6 rounded-lg bg-slate-50 p-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white text-[10px] text-slate-400 ring-1 ring-slate-200">影なし</div>
      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white text-[10px] text-slate-400 shadow-md">ふつう</div>
      <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white text-[10px] text-slate-400 shadow-2xl">強い影</div>
    </div>
  ),
  transition: () => (
    <div className="flex gap-4">
      <button className="rounded-lg bg-slate-200 px-4 py-2 text-xs hover:bg-blue-500 hover:text-white">変化が一瞬（なし）</button>
      <button className="rounded-lg bg-slate-200 px-4 py-2 text-xs transition-all duration-500 hover:bg-blue-500 hover:text-white">ふわっと変化（あり）</button>
    </div>
  ),
  responsive: () => (
    <div className="flex items-end gap-4">
      <div className="w-40 rounded-lg bg-white p-1.5 shadow-sm ring-1 ring-slate-300">
        <div className="space-y-1">
          <div className={`${block} py-1`}>ヘッダー</div>
          <div className="flex gap-1">
            <div className={`${block} flex-1 py-4`}>メイン</div>
            <div className={`${block} w-10 py-4`}>サイド</div>
          </div>
        </div>
        <p className="pt-1 text-center text-[10px] text-slate-400">PC: 2カラム</p>
      </div>
      <div className="w-20 rounded-xl bg-white p-1.5 shadow-sm ring-1 ring-slate-300">
        <div className="space-y-1">
          <div className={`${block} py-1`}>ヘッダー</div>
          <div className={`${block} py-4`}>メイン</div>
          <div className={`${block} py-2`}>サイド</div>
        </div>
        <p className="pt-1 text-center text-[10px] text-slate-400">スマホ: 1カラム</p>
      </div>
    </div>
  ),

  // ---- 開発用語（図解） ----
  api: () => (
    <div className="flex items-center gap-3 text-center text-xs">
      <div className="flex flex-col items-center gap-1 rounded-xl bg-blue-100 px-4 py-3 text-blue-700">
        <Icon name="monitor" className="h-5 w-5" />
        フロント<br />エンド
      </div>
      <div className="flex flex-col text-slate-400">
        <span>─ リクエスト →</span>
        <span>← データ ─</span>
      </div>
      <div className="flex flex-col items-center gap-1 rounded-xl bg-emerald-100 px-4 py-3 text-emerald-700">
        <Icon name="zap" className="h-5 w-5" />
        API<br />（窓口）
      </div>
      <span className="text-slate-400">⇄</span>
      <div className="flex flex-col items-center gap-1 rounded-xl bg-slate-200 px-4 py-3 text-slate-600">
        <Icon name="database" className="h-5 w-5" />
        サーバー<br />/ DB
      </div>
    </div>
  ),
  dom: () => (
    <div className="text-center text-xs">
      <div className="mx-auto w-fit rounded-lg bg-blue-500 px-4 py-1.5 text-white">html</div>
      <div className="mx-auto h-3 w-px bg-slate-300" />
      <div className="flex justify-center gap-6">
        <div>
          <div className="rounded-lg bg-blue-100 px-3 py-1.5">head</div>
        </div>
        <div>
          <div className="rounded-lg bg-blue-100 px-3 py-1.5">body</div>
          <div className="mx-auto h-3 w-px bg-slate-300" />
          <div className="flex gap-2">
            <div className="rounded-lg bg-slate-100 px-2 py-1 ring-1 ring-slate-200">h1</div>
            <div className="rounded-lg bg-slate-100 px-2 py-1 ring-1 ring-slate-200">button</div>
          </div>
        </div>
      </div>
      <p className="mt-2 text-[10px] text-slate-400">HTMLが木構造のデータになる</p>
    </div>
  ),
  frontend: () => (
    <div className="flex items-center gap-4 text-center text-xs">
      <div className="flex flex-col items-center gap-1 rounded-xl bg-blue-100 px-4 py-3 text-blue-700 ring-2 ring-blue-500">
        <Icon name="monitor" className="h-5 w-5" />
        <b>フロントエンド</b>見える部分
      </div>
      <div className="flex flex-col items-center gap-1 rounded-xl bg-slate-100 px-4 py-3 text-slate-500">
        <Icon name="database" className="h-5 w-5" />
        バックエンド<br />裏側の仕組み
      </div>
    </div>
  ),
  backend: () => (
    <div className="flex items-center gap-4 text-center text-xs">
      <div className="flex flex-col items-center gap-1 rounded-xl bg-slate-100 px-4 py-3 text-slate-500">
        <Icon name="monitor" className="h-5 w-5" />
        フロントエンド<br />見える部分
      </div>
      <div className="flex flex-col items-center gap-1 rounded-xl bg-emerald-100 px-4 py-3 text-emerald-700 ring-2 ring-emerald-500">
        <Icon name="database" className="h-5 w-5" />
        <b>バックエンド</b>サーバー・DB・認証
      </div>
    </div>
  ),
};

// ── コマンド用の共通ターミナルデモ ──
// 「実行する」を押すと、コマンドの出力が下に現れる（触れるゾーンとして体感できる）。
function TerminalDemo({ cmd, out, prompt = "$" }: { cmd: string; out: string[]; prompt?: string }) {
  const [ran, setRan] = useState(false);
  const lineColor = (l: string) =>
    l.startsWith("+")
      ? "text-emerald-400"
      : l.startsWith("-")
        ? "text-rose-400"
        : "text-slate-300";
  return (
    <div className="w-full max-w-sm">
      <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-[0_6px_0_#0f172a]">
        <div className="flex items-center gap-1.5 border-b border-slate-700/70 bg-slate-800 px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span className="ml-2 font-mono text-[10px] text-slate-400">ターミナル</span>
        </div>
        <div className="min-h-[7.5rem] space-y-1 p-3 font-mono text-[12px] leading-relaxed">
          <div className="flex gap-2">
            <span className="shrink-0 text-emerald-400">{prompt}</span>
            <span className="text-slate-100">{cmd}</span>
            {!ran && <span className="ml-0.5 inline-block h-4 w-1.5 animate-pulse bg-slate-300" />}
          </div>
          {ran && (
            <>
              {out.map((line, i) => (
                <div
                  key={i}
                  className={`animate-pop-in whitespace-pre-wrap ${lineColor(line)}`}
                  style={{ animationDelay: `${i * 0.07}s` }}
                >
                  {line}
                </div>
              ))}
              <div className="flex gap-2">
                <span className="shrink-0 text-emerald-400">{prompt}</span>
                <span className="inline-block h-4 w-1.5 animate-pulse bg-slate-300" />
              </div>
            </>
          )}
        </div>
      </div>
      <div className="mt-3 flex justify-center gap-2">
        <button
          onClick={() => setRan(true)}
          disabled={ran}
          className="rounded-full bg-slate-800 px-4 py-1.5 text-xs font-bold text-white shadow-sm transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          実行する
        </button>
        <button
          onClick={() => setRan(false)}
          className="rounded-full bg-white px-4 py-1.5 text-xs font-bold text-slate-500 ring-1 ring-slate-200 transition hover:ring-slate-300"
        >
          リセット
        </button>
      </div>
    </div>
  );
}

// slug → { コマンド, 出力 }。ここに足すだけで図鑑のコマンドdemoが増える。
const COMMAND_DEMOS: Record<string, { cmd: string; out: string[] }> = {
  cd: { cmd: "cd my-project", out: [] },
  ls: { cmd: "ls", out: ["index.html  src/  package.json  README.md"] },
  pwd: { cmd: "pwd", out: ["/Users/you/my-project"] },
  mkdir: { cmd: "mkdir components", out: [] },
  rm: { cmd: "rm old.txt", out: [] },
  cp: { cmd: "cp .env.example .env", out: [] },
  mv: { cmd: "mv memo.txt docs/", out: [] },
  cat: { cmd: "cat package.json", out: ["{", '  "name": "my-app",', '  "version": "1.0.0"', "}"] },
  touch: { cmd: "touch index.html", out: [] },
  echo: { cmd: 'echo "Hello"', out: ["Hello"] },
  clear: { cmd: "clear", out: [] },
  grep: { cmd: 'grep "TODO" app.js', out: ["12:  // TODO: あとで直す", "48:  // TODO: 入力チェック"] },
  find: { cmd: 'find . -name "*.tsx"', out: ["./src/App.tsx", "./src/Button.tsx"] },
  head: { cmd: "head -n 3 log.txt", out: ["1 起動", "2 接続OK", "3 リクエスト受信"] },
  tail: { cmd: "tail -n 2 log.txt", out: ["98 処理完了", "99 サーバー終了"] },
  less: { cmd: "less huge.log", out: ["（スペースで次ページ / q で終了）"] },
  chmod: { cmd: "chmod +x deploy.sh", out: [] },
  curl: { cmd: "curl https://api.example.com/ping", out: ['{"status":"ok"}'] },
  "code-cmd": { cmd: "code .", out: ["VS Code でフォルダを開きました"] },
  exit: { cmd: "exit", out: ["セッションを終了しました"] },
  "git-init": { cmd: "git init", out: ["Initialized empty Git repository in .git/"] },
  "git-clone": { cmd: "git clone https://github.com/you/repo.git", out: ["Cloning into 'repo'...", "done."] },
  "git-status": { cmd: "git status", out: ["On branch main", "Changes not staged:", "  modified: index.html"] },
  "git-add": { cmd: "git add .", out: [] },
  "git-commit": { cmd: 'git commit -m "add login"', out: ["[main a1b2c3d] add login", " 2 files changed"] },
  "git-push": { cmd: "git push", out: ["To github.com:you/repo.git", "   a1b2c3d..e4f5g6h  main -> main"] },
  "git-pull": { cmd: "git pull", out: ["Updating a1b2c3d..e4f5g6h", "Fast-forward"] },
  "git-branch": { cmd: "git branch", out: ["* main", "  feature-login"] },
  "git-checkout": { cmd: "git switch feature-x", out: ["Switched to branch 'feature-x'"] },
  "git-merge": { cmd: "git merge feature-login", out: ["Merge made by the 'ort' strategy.", " 1 file changed"] },
  "git-log": { cmd: "git log --oneline", out: ["e4f5g6h add login", "a1b2c3d first commit"] },
  "git-diff": { cmd: "git diff", out: ["- <h1>Hello</h1>", "+ <h1>Hello World</h1>"] },
  "git-stash": { cmd: "git stash", out: ["Saved working directory and index state"] },
  "git-remote": { cmd: "git remote -v", out: ["origin  https://github.com/you/repo.git (fetch)", "origin  https://github.com/you/repo.git (push)"] },
  "git-fetch": { cmd: "git fetch", out: ["From github.com:you/repo", "   a1b2c3d..e4f5g6h  main -> origin/main"] },
  "git-reset": { cmd: "git reset index.html", out: ["Unstaged changes after reset:", "M  index.html"] },
  "npm-install": { cmd: "npm install", out: ["added 312 packages in 8s"] },
  "npm-init": { cmd: "npm init -y", out: ["Wrote to package.json"] },
  "npm-run": { cmd: "npm run dev", out: ["> dev", "ready on http://localhost:3000"] },
  "npm-start": { cmd: "npm start", out: ["Starting...", "ready on http://localhost:3000"] },
  "npm-build": { cmd: "npm run build", out: ["Compiled successfully", "Route /  ...  200"] },
  npx: { cmd: "npx create-next-app my-app", out: ["Creating a new Next.js app...", "Success!"] },
  "node-run": { cmd: "node script.js", out: ["Hello from Node"] },
  "npm-uninstall": { cmd: "npm uninstall lodash", out: ["removed 1 package"] },
  "npm-update": { cmd: "npm update", out: ["changed 4 packages in 3s"] },
  // バッチ2
  ssh: { cmd: "ssh user@server.com", out: ["Welcome to Ubuntu 22.04", "user@server:~$"] },
  ping: { cmd: "ping example.com", out: ["64 bytes from example.com: time=12ms", "64 bytes from example.com: time=11ms"] },
  scp: { cmd: "scp build.zip user@server:/var/www", out: ["build.zip                 100%  2MB   1.2MB/s"] },
  wget: { cmd: "wget https://example.com/data.zip", out: ["data.zip            100%[===>]   2.00M", "'data.zip' saved"] },
  yarn: { cmd: "yarn add react", out: ["success Saved lockfile.", "Done in 6.2s"] },
  pnpm: { cmd: "pnpm install", out: ["Packages: +312", "Progress: done", "Done in 4.1s"] },
  "pip-install": { cmd: "pip install requests", out: ["Successfully installed requests-2.31.0"] },
  "python-run": { cmd: "python app.py", out: ["Hello from Python"] },
  "docker-run": { cmd: "docker run -p 3000:3000 my-app", out: ["Server listening on :3000"] },
  "docker-ps": { cmd: "docker ps", out: ["CONTAINER ID   IMAGE    STATUS", "a1b2c3d4e5f6   my-app   Up 2 minutes"] },
  "docker-build": { cmd: "docker build -t my-app .", out: ["Successfully built a1b2c3d4", "Successfully tagged my-app:latest"] },
  "docker-compose": { cmd: "docker compose up", out: ["Starting db  ... done", "Starting web ... done"] },
  ps: { cmd: "ps aux | grep node", out: ["PID    COMMAND", "4821   node", "5093   npm"] },
  kill: { cmd: "kill 4821", out: [] },
  top: { cmd: "top", out: ["PID   %CPU  COMMAND", "4821  12.0  node", "（q で終了）"] },
  whoami: { cmd: "whoami", out: ["you"] },
  history: { cmd: "history", out: ["1  cd my-project", "2  npm install", "3  git status"] },
  sudo: { cmd: "sudo npm install -g vercel", out: ["Password:", "added 1 package"] },
  which: { cmd: "which node", out: ["/usr/local/bin/node"] },
  "export-cmd": { cmd: 'export API_KEY="abc123"', out: [] },
  alias: { cmd: 'alias gs="git status"', out: [] },
  source: { cmd: "source ~/.bashrc", out: [] },
  wc: { cmd: "grep error log.txt | wc -l", out: ["7"] },
  sort: { cmd: "sort names.txt", out: ["Alice", "Bob", "Carol"] },
  uniq: { cmd: "sort log.txt | uniq -c", out: ["  3 error", " 12 info", "  1 warn"] },
  diff: { cmd: "diff old.txt new.txt", out: ["3c3", "- 古い行", "+ 新しい行"] },
  tar: { cmd: "tar -czf backup.tar.gz src", out: [] },
  "zip-cmd": { cmd: "zip -r assets.zip images", out: ["  adding: images/ (stored 0%)", "  adding: images/logo.png (deflated 8%)"] },
  unzip: { cmd: "unzip assets.zip", out: ["  inflating: logo.png", "  inflating: hero.jpg"] },
  ln: { cmd: "ln -s /shared/config.json config.json", out: [] },
  tree: { cmd: "tree -L 1", out: [".", "├── index.html", "├── src", "└── package.json"] },
  "open-cmd": { cmd: "open index.html", out: ["（既定のアプリで開きました）"] },
  "git-rebase": { cmd: "git rebase main", out: ["Successfully rebased and updated refs/heads/feature."] },
  "git-cherry-pick": { cmd: "git cherry-pick a1b2c3d", out: ["[main e4f5g6h] 対象のコミットを適用", " 1 file changed"] },
  "git-tag": { cmd: "git tag v1.0.0", out: [] },
  "git-config": { cmd: 'git config --global user.name "You"', out: [] },
  "git-revert": { cmd: "git revert a1b2c3d", out: ['[main f0e9d8c] Revert "add login"', " 1 file changed"] },
  "git-restore": { cmd: "git restore index.html", out: [] },
  pipe: { cmd: "cat log.txt | grep error", out: ["12: error: 接続失敗", "88: error: タイムアウト"] },
  redirect: { cmd: "npm run build > build.log", out: [] },
  "env-cmd": { cmd: "env | grep NODE", out: ["NODE_ENV=development"] },
  cron: { cmd: "crontab -e", out: ["0 9 * * *  /backup.sh", "（毎朝9時に実行）"] },
  // バッチ3
  vercel: { cmd: "vercel --prod", out: ["Deploying...", "Production: https://my-app.vercel.app"] },
  gh: { cmd: "gh repo create my-app --public", out: ["Created repository you/my-app"] },
  eslint: { cmd: "npx eslint src", out: ["src/App.js", "  12:5  warning  'x' is unused", "1 problem (0 errors, 1 warning)"] },
  prettier: { cmd: "npx prettier --write .", out: ["src/App.js 42ms", "src/index.js 18ms"] },
  "tsc-cmd": { cmd: "npx tsc --noEmit", out: ["（型エラーなし）"] },
  vite: { cmd: "npm create vite@latest my-app", out: ["Scaffolding project in ./my-app...", "Done."] },
  jest: { cmd: "npx jest", out: ["PASS  src/sum.test.js", "Tests: 3 passed, 3 total"] },
  vitest: { cmd: "npx vitest run", out: ["✓ src/sum.test.ts (3)", "Test Files  1 passed"] },
  "playwright-cmd": { cmd: "npx playwright test", out: ["Running 3 tests", "3 passed (4.1s)"] },
  make: { cmd: "make build", out: ["gcc -o app main.c", "Done."] },
  brew: { cmd: "brew install node", out: ["Pouring node...", "node installed"] },
  apt: { cmd: "sudo apt install git", out: ["Setting up git ...", "done."] },
  choco: { cmd: "choco install nodejs", out: ["Chocolatey installed 1/1 packages."] },
  winget: { cmd: "winget install Git.Git", out: ["Found Git", "Successfully installed"] },
  nvm: { cmd: "nvm use 20", out: ["Now using node v20.11.0"] },
  "npm-list": { cmd: "npm list --depth=0", out: ["my-app@1.0.0", "├── next@15.0.0", "└── react@18.2.0"] },
  "npm-audit": { cmd: "npm audit", out: ["found 0 vulnerabilities"] },
  "git-clean": { cmd: "git clean -fd", out: ["Removing tmp/", "Removing debug.log"] },
  "git-blame": { cmd: "git blame app.js", out: ["a1b2c3d (You 2026-07-01) function main() {"] },
  "git-show": { cmd: "git show a1b2c3d", out: ["commit a1b2c3d", "Author: You", "+ 追加した行"] },
  "git-bisect": { cmd: "git bisect start", out: ["（good と bad の間を二分探索して原因コミットを特定）"] },
  netstat: { cmd: "netstat -ano | grep 3000", out: ["TCP  0.0.0.0:3000  LISTENING  4821"] },
  lsof: { cmd: "lsof -i :3000", out: ["COMMAND  PID   NAME", "node     4821  *:3000 (LISTEN)"] },
  df: { cmd: "df -h", out: ["Filesystem  Size  Used  Avail", "/dev/disk1  466G  210G  256G"] },
  du: { cmd: "du -sh node_modules", out: ["312M  node_modules"] },
  man: { cmd: "man ls", out: ["LS(1)  ls - list directory contents", "（q で終了）"] },
  "help-cmd": { cmd: "git --help", out: ["usage: git [--version] [--help] <command>"] },
  traceroute: { cmd: "traceroute example.com", out: ["1  router.local   2ms", "2  isp.gateway   12ms", "3  example.com   24ms"] },
};

// COMMAND_DEMOS を demos レジストリに流し込む（コマンドは全部この共通デモを使う）
for (const [slug, d] of Object.entries(COMMAND_DEMOS)) {
  demos[slug] = () => <TerminalDemo cmd={d.cmd} out={d.out} />;
}

export default function LiveExample({
  slug,
  nameJa,
  nameEn,
  category,
}: {
  slug: string;
  nameJa: string;
  nameEn: string;
  category: Category;
}) {
  const demo = demos[slug];
  const code = codeSnippets[slug];
  const [showCode, setShowCode] = useState(false);
  return (
    // 静的カードと混同しないよう、緑の枠で「触れるゾーン」だと一目でわかるようにする
    <div className="relative overflow-hidden rounded-[1.6rem] border-2 border-brand-300 bg-white shadow-[0_4px_0_#a8f0c4]">
      {/* ブラウザ風のクローム（グリーン強調） */}
      <div className="flex items-center gap-2 border-b border-brand-100 bg-brand-50/70 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="ml-2 flex-1 truncate rounded-md bg-white px-3 py-1 text-[10px] text-slate-400 ring-1 ring-brand-100">
          example.com — {nameEn}
        </span>
        <span className="flex items-center gap-1.5 rounded-full bg-brand-500 px-2.5 py-1 text-[10px] font-bold text-white">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/80" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
          </span>
          LIVE
        </span>
      </div>
      <div className="bg-dots flex min-h-52 items-center justify-center bg-brand-50/25 p-8">
        {demo ? (
          demo()
        ) : (
          <div className="text-center">
            <span
              className={`animate-float inline-flex h-16 w-16 items-center justify-center rounded-3xl ${categoryTheme[category].tile} ${categoryTheme[category].tileText}`}
            >
              <Icon name={categoryTheme[category].icon} className="h-7 w-7" />
            </span>
            <p className="font-display mt-3 font-extrabold">{nameJa}</p>
            <p className="text-xs uppercase tracking-wide text-slate-400">{nameEn}</p>
          </div>
        )}
      </div>
      <p className="flex items-center justify-center gap-1.5 border-t border-brand-100 bg-brand-50/50 py-2.5 text-center text-[11px] font-bold text-brand-700">
        <Icon name="pointer" className="h-3 w-3" />
        実物のミニ例 — 実際に押して動きを確かめよう
      </p>

      {/* この見た目のコード（用意がある用語のみ）＝“調べる”から“作れる”への橋渡し */}
      {code && (
        <div className="border-t border-slate-100">
          <button
            onClick={() => setShowCode((s) => !s)}
            aria-expanded={showCode}
            className="flex w-full items-center justify-center gap-1.5 bg-slate-50/60 py-2.5 text-[11px] font-bold text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <Icon name="book-open" className="h-3.5 w-3.5" />
            {showCode ? "コードを隠す" : "この見た目のコードを見る"}
          </button>
          {showCode && (
            <div className="animate-pop-in p-3">
              <CodeBlock code={code} />
              <p className="mt-2 text-center text-[10px] text-slate-400">
                このコードをHTMLファイルに貼ると、同じ見た目が作れます。
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
