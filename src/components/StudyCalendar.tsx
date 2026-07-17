"use client";

import { useActivityLog } from "@/lib/userStore";
import { Icon } from "@/components/icons";

// 学習した日をマス目で見せる“草”（GitHubのcontribution風）。ストリークと相乗で継続を後押し。
const WEEKS = 13; // 直近13週間ぶん表示

function ymd(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function level(n: number): number {
  if (!n) return 0;
  if (n <= 1) return 1;
  if (n <= 3) return 2;
  if (n <= 5) return 3;
  return 4;
}

const CELL = ["bg-slate-100", "bg-brand-200", "bg-brand-300", "bg-brand-500", "bg-brand-600"];

export default function StudyCalendar() {
  const log = useActivityLog();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayKey = ymd(today);

  // 週の始まり（日曜）に揃えた開始日を求める
  const start = new Date(today);
  start.setDate(start.getDate() - (WEEKS * 7 - 1));
  start.setDate(start.getDate() - start.getDay()); // 日曜に戻す

  // 列（週）× 行（曜日）の2次元
  const columns: { key: string; count: number; future: boolean; isToday: boolean }[][] = [];
  const cursor = new Date(start);
  for (let w = 0; w < WEEKS + 1; w++) {
    const col: { key: string; count: number; future: boolean; isToday: boolean }[] = [];
    for (let d = 0; d < 7; d++) {
      const key = ymd(cursor);
      col.push({
        key,
        count: log[key] ?? 0,
        future: cursor.getTime() > today.getTime(),
        isToday: key === todayKey,
      });
      cursor.setDate(cursor.getDate() + 1);
    }
    columns.push(col);
  }

  const studiedDays = Object.keys(log).filter((k) => log[k] > 0).length;

  return (
    <div className="card-pop p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-display flex items-center gap-2 text-sm font-extrabold text-slate-800">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <Icon name="flame" className="h-4 w-4" />
          </span>
          学習カレンダー
        </h3>
        <span className="text-xs font-bold text-slate-400">
          のべ <span className="text-brand-600">{studiedDays}</span> 日
        </span>
      </div>

      <div className="overflow-x-auto">
        <div className="flex gap-1">
          {columns.map((col, ci) => (
            <div key={ci} className="flex flex-col gap-1">
              {col.map((cell) =>
                cell.future ? (
                  <span key={cell.key} className="h-3 w-3" />
                ) : (
                  <span
                    key={cell.key}
                    title={`${cell.key}：${cell.count}回`}
                    className={`h-3 w-3 rounded-sm ${CELL[level(cell.count)]} ${
                      cell.isToday ? "ring-2 ring-brand-400 ring-offset-1" : ""
                    }`}
                  />
                )
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-end gap-1.5 text-[10px] text-slate-400">
        少
        {CELL.map((c, i) => (
          <span key={i} className={`h-2.5 w-2.5 rounded-sm ${c}`} />
        ))}
        多
      </div>
    </div>
  );
}
