"use client";

import { useEffect, useState, type ReactNode } from "react";
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

const demos: Record<string, () => ReactNode> = {
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
