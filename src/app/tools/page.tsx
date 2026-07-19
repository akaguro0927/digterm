import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";
import AdSlot from "@/components/AdSlot";
import {
  TOOL_GROUPS,
  TOOLS_LAST_UPDATED,
  COST_LABEL,
  STARTER_PICK,
  type CostTag,
} from "@/data/tools";

export const metadata: Metadata = {
  title: "道具とAIガイド",
  description: "コードを書く道具（VS Codeなど）と、いま使えるAIの選び方・おすすめを初心者向けにまとめたガイド。",
};

const COST_STYLE: Record<CostTag, string> = {
  free: "bg-brand-50 text-brand-700 ring-brand-100",
  freemium: "bg-sky-50 text-sky-700 ring-sky-100",
  paid: "bg-amber-50 text-amber-700 ring-amber-200",
};

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/learn" className="flex items-center gap-1 text-xs font-bold text-slate-400 transition hover:text-brand-600">
        <Icon name="chevron-left" className="h-3.5 w-3.5" />
        学習にもどる
      </Link>

      <p className="font-display mt-4 text-xs font-bold tracking-widest text-brand-500">TOOLS &amp; AI</p>
      <h1 className="font-display mt-1 text-3xl font-extrabold">道具とAIガイド</h1>
      <p className="mt-2 text-sm text-slate-500">
        コードを書く道具と、いま使えるAI。初心者がまず何を入れればいいかを、選ぶ基準つきでまとめました。
      </p>

      {/* 更新日＆開示（時点依存・ステマ規制対応） */}
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-400">
        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 font-bold">
          <Icon name="info" className="h-3 w-3" />
          最終更新: {TOOLS_LAST_UPDATED}
        </span>
        <span>おすすめは時期で変わります。最新は各公式サイトでご確認ください。</span>
      </div>
      <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
        ※ 本ページは各サービスの公式サイトへのリンクを掲載しています。一部にアフィリエイト（広告）リンクを含む場合があります。
      </p>

      {/* まずこの組み合わせ */}
      <div className="card-pop mt-6 flex items-start gap-3 p-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
          <Icon name="lightbulb" className="h-5 w-5" />
        </span>
        <div>
          <p className="font-display text-sm font-extrabold text-slate-800">{STARTER_PICK.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-600">{STARTER_PICK.body}</p>
        </div>
      </div>

      {/* グループごと */}
      {TOOL_GROUPS.map((group) => (
        <section key={group.key} className="mt-10">
          <h2 className="font-display text-xl font-extrabold text-slate-800">{group.title}</h2>
          <p className="mt-1 text-xs text-slate-400">{group.lead}</p>
          <div className="mt-4 space-y-3">
            {group.tools.map((tool) => {
              const url = tool.affiliateUrl ?? tool.officialUrl;
              const isAffiliate = !!tool.affiliateUrl;
              return (
                <div key={tool.name} className="card-pop p-4">
                  <div className="flex items-start gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                      <Icon name={tool.icon} className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="font-display text-base font-extrabold text-slate-800">{tool.name}</span>
                        {tool.recommended && (
                          <span className="rounded-full bg-brand-500 px-2 py-0.5 text-[10px] font-extrabold text-white">まずはこれ</span>
                        )}
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ring-1 ${COST_STYLE[tool.cost]}`}>
                          {COST_LABEL[tool.cost]}
                        </span>
                        {tool.ja && (
                          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500">日本語OK</span>
                        )}
                      </div>
                      <p className="mt-0.5 text-sm text-slate-500">{tool.tagline}</p>
                      <ul className="mt-2 flex flex-wrap gap-1.5">
                        {tool.strengths.map((s) => (
                          <li key={s} className="rounded-lg bg-slate-50 px-2 py-1 text-[11px] font-medium text-slate-500 ring-1 ring-slate-100">
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <a
                    href={url}
                    target="_blank"
                    rel={isAffiliate ? "sponsored noopener noreferrer nofollow" : "noopener noreferrer"}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-slate-800 px-4 py-2 text-xs font-bold text-white transition hover:bg-slate-700"
                  >
                    {isAffiliate ? "公式サイトを見る（PR）" : "公式サイトを見る"}
                    <Icon name="arrow-right" className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </a>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {/* 下部：アフィリエイト／広告枠（オーナーが差し替え） */}
      <section className="mt-12">
        <p className="font-display mb-2 text-[11px] font-bold tracking-widest text-slate-400">PR</p>
        <AdSlot />
      </section>
    </div>
  );
}
