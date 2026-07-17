import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { terms, getTerm, termNo } from "@/data/terms";
import { categoryTheme, levelTheme } from "@/lib/categoryTheme";
import LiveExample from "@/components/LiveExample";
import CodeBlock from "@/components/CodeBlock";
import FavoriteButton from "@/components/FavoriteButton";
import SeenTracker from "@/components/SeenTracker";
import Reveal from "@/components/Reveal";
import { Icon, type IconName } from "@/components/icons";

export function generateStaticParams() {
  return terms.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const term = getTerm(slug);
  if (!term) return {};
  return {
    title: `${term.nameJa}とは`,
    description: term.summary,
  };
}

function SectionHeading({ icon, children }: { icon: IconName; children: React.ReactNode }) {
  return (
    <h2 className="font-display flex items-center gap-2.5 text-lg font-extrabold">
      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
        <Icon name={icon} className="h-4 w-4" />
      </span>
      {children}
    </h2>
  );
}

export default async function TermPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const term = getTerm(slug);
  if (!term) notFound();

  const th = categoryTheme[term.category];
  const lv = levelTheme[term.level];
  const index = terms.findIndex((t) => t.slug === term.slug);
  const prev = terms[(index + terms.length - 1) % terms.length];
  const next = terms[(index + 1) % terms.length];
  const related = (term.related ?? [])
    .map((s) => getTerm(s))
    .filter((t) => t !== undefined);

  return (
    <div>
      <SeenTracker slug={term.slug} />
      {/* カテゴリ色のヒーロー帯 */}
      <div className={`bg-gradient-to-r ${th.gradient}`}>
        <div className="mx-auto max-w-3xl px-4 pb-16 pt-8 text-white">
          <nav className="animate-fade-up flex items-center gap-1.5 text-xs text-white/70">
            <Link href="/" className="hover:text-white">ホーム</Link>
            <Icon name="chevron-right" className="h-3 w-3" />
            <Link href="/zukan" className="hover:text-white">図鑑</Link>
            <Icon name="chevron-right" className="h-3 w-3" />
            <span className="text-white">{term.nameJa}</span>
          </nav>
          <div className="animate-fade-up mt-6 flex items-center gap-4" style={{ animationDelay: "0.05s" }}>
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-white/20 shadow-lg backdrop-blur-sm">
              <Icon name={th.icon} className="h-7 w-7" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-bold">
                <span className="font-mono rounded-full bg-slate-900/30 px-2.5 py-1 tracking-wider backdrop-blur-sm">
                  {termNo(term.slug)}
                </span>
                <span className="rounded-full bg-white/20 px-2.5 py-1 backdrop-blur-sm">{th.label}</span>
                <span className="rounded-full bg-white/20 px-2.5 py-1 backdrop-blur-sm">
                  {lv.label} {lv.dots}
                </span>
                {term.isPremium && (
                  <span className="flex items-center gap-1 rounded-full bg-slate-900/50 px-2.5 py-1 backdrop-blur-sm">
                    <Icon name="lock" className="h-3 w-3" />
                    プレミアム（本番では有料会員限定）
                  </span>
                )}
              </div>
              <h1 className="font-display mt-2 text-3xl font-extrabold sm:text-4xl">{term.nameJa}</h1>
              <p className="mt-1 text-sm text-white/80">
                {term.nameEn} ／ {term.reading}
                {term.aliases && term.aliases.length > 0 && (
                  <span className="ml-2 text-white/60">別名: {term.aliases.join("、")}</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      <article className="mx-auto max-w-3xl px-4 pb-12">
        {/* 実例ステージ（帯に重ねる） */}
        <div className="animate-pop-in -mt-8" style={{ animationDelay: "0.12s" }}>
          <LiveExample
            slug={term.slug}
            nameJa={term.nameJa}
            nameEn={term.nameEn}
            category={term.category}
          />
        </div>

        {/* お気に入り登録 */}
        <div className="mt-5 flex justify-end">
          <FavoriteButton slug={term.slug} variant="pill" />
        </div>

        {/* 解説（転載防止のため protected） */}
        <div className="protected mt-10 space-y-8">
          <Reveal>
            <section>
              <SectionHeading icon="lightbulb">一言でいうと</SectionHeading>
              <p className="card-pop mt-3 p-5 font-medium leading-relaxed">
                {term.summary}
              </p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <SectionHeading icon="book-open">詳しい説明</SectionHeading>
              <p className="mt-3 leading-loose text-slate-600">{term.description}</p>
            </section>
          </Reveal>

          <Reveal>
            <section>
              <SectionHeading icon="wrench">どんな時に使う？</SectionHeading>
              <p className="mt-3 leading-loose text-slate-600">{term.useCase}</p>
            </section>
          </Reveal>

          {term.sampleCode && (
            <Reveal>
              <section>
                <SectionHeading icon="code">サンプルコード</SectionHeading>
                <div className="mt-3">
                  <CodeBlock code={term.sampleCode} />
                </div>
              </section>
            </Reveal>
          )}
        </div>

        {/* 関連用語 */}
        {related.length > 0 && (
          <Reveal>
            <section className="mt-10">
              <SectionHeading icon="link">あわせて覚えたい</SectionHeading>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {related.map((r) => {
                  const rt = categoryTheme[r.category];
                  return (
                    <Link
                      key={r.slug}
                      href={`/zukan/${r.slug}`}
                      className="group card-pop flex items-center gap-3 p-3.5"
                    >
                      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${rt.tile} ${rt.tileText}`}>
                        <Icon name={rt.icon} className="h-4.5 w-4.5" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold group-hover:text-brand-600">{r.nameJa}</p>
                        <p className="truncate text-[10px] uppercase tracking-wide text-slate-400">{r.nameEn}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          </Reveal>
        )}

        {/* 前後の用語ナビ */}
        <div className="mt-12 grid grid-cols-2 gap-3 border-t border-slate-200 pt-6">
          <Link
            href={`/zukan/${prev.slug}`}
            className="group card-pop flex items-center gap-2 p-4"
          >
            <Icon name="chevron-left" className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:text-brand-500" />
            <span className="min-w-0">
              <span className="block text-[10px] font-bold text-slate-400">まえの用語</span>
              <span className="mt-0.5 block truncate text-sm font-bold group-hover:text-brand-600">{prev.nameJa}</span>
            </span>
          </Link>
          <Link
            href={`/zukan/${next.slug}`}
            className="group card-pop flex items-center justify-end gap-2 p-4 text-right"
          >
            <span className="min-w-0">
              <span className="block text-[10px] font-bold text-slate-400">つぎの用語</span>
              <span className="mt-0.5 block truncate text-sm font-bold group-hover:text-brand-600">{next.nameJa}</span>
            </span>
            <Icon name="chevron-right" className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:text-brand-500" />
          </Link>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/zukan"
            className="btn-3d inline-block rounded-full bg-white px-6 py-2.5 text-sm font-bold text-brand-600 ring-2 ring-[#ebe4d5]"
            style={{ ["--edge" as string]: "#ebe4d5" }}
          >
            図鑑の一覧にもどる
          </Link>
        </div>
      </article>
    </div>
  );
}
