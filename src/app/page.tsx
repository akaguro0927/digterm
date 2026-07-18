import Link from "next/link";
import { terms, getTerm, type Category } from "@/data/terms";
import { hasVisual } from "@/data/visualTerms";
import { categoryTheme } from "@/lib/categoryTheme";
import Reveal from "@/components/Reveal";
import LiveExample from "@/components/LiveExample";
import HeroMascot from "@/components/HeroMascot";
import WordOfTheDay from "@/components/WordOfTheDay";
import { Icon } from "@/components/icons";

export default function Home() {
  // 図鑑に表示するのは「実物デモがある用語」だけ。件数もそれに合わせる。
  const visualTerms = terms.filter((t) => hasVisual(t.slug));
  const visualCount = visualTerms.length;
  const categories = (Object.keys(categoryTheme) as Category[]).map((key) => ({
    key,
    ...categoryTheme[key],
    count: visualTerms.filter((t) => t.category === key).length,
  }));

  const features = [
    {
      icon: "eye" as const,
      title: "実物を見て覚える",
      body: "全用語に「触れる実例」つき。モーダルは実際に開き、トーストは実際に飛び出す。目で覚えるのが最短ルート。",
      tile: "bg-violet-50 text-violet-600",
    },
    {
      icon: "search" as const,
      title: "うろ覚えでも見つかる",
      body: "「もーだる」「modal」「三本線」——ひらがなでも英語でも見た目の記憶でもヒットする、初心者のための検索。",
      tile: "bg-sky-50 text-sky-600",
    },
    {
      icon: "pencil" as const,
      title: "問題集と試験で定着",
      body: "初心者〜上級者モードのクイズと20問の実力試験。間違えた用語はワンタップで図鑑に戻って復習できる。",
      tile: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <div>
      {/* ヒーロー: 紙の図鑑カバー（主役はアニメ標本プレート） */}
      <section className="relative overflow-hidden bg-[#faf8f2]">
        <div className="bg-dots pointer-events-none absolute inset-0 opacity-60" aria-hidden />
        <div className="pointer-events-none absolute -right-24 -top-10 h-72 w-72 rounded-full bg-brand-200/25 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-sky-200/20 blur-3xl" aria-hidden />

        <div className="relative mx-auto max-w-3xl px-4 py-8 sm:py-10">
          {/* 図鑑カバーの枠 */}
          <div className="animate-fade-up relative rounded-[2.5rem] border-2 border-[#e7ddc8] bg-[#fdfbf5]/80 p-6 shadow-[0_5px_0_#e7ddc8] sm:p-8">
            {/* 内側の細枠（図版らしさ） */}
            <div className="pointer-events-none absolute inset-3 rounded-[2rem] border border-[#e7ddc8]/70" aria-hidden />

            {/* 背表紙ラベル風のトップ行 */}
            <div className="relative flex items-center justify-between font-mono text-[10px] font-bold tracking-[0.2em] text-slate-400 sm:text-[11px]">
              <span className="inline-flex items-center gap-1.5">
                <Icon name="book" className="h-3.5 w-3.5 text-brand-500" />
                FRONTEND UI ZUKAN
              </span>
              <span>No.001–{String(visualCount).padStart(3, "0")}</span>
            </div>

            {/* アニメ標本プレート（言語に依存しない主役ビジュアル） */}
            <div className="relative mt-2">
              <HeroMascot />
            </div>

            {/* コピー（視覚が主役／テキストは簡潔に） */}
            <div className="relative text-center">
              <span className="font-display inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1 text-[11px] font-bold text-brand-700 ring-1 ring-[#e7ddc8]">
                {visualCount}語 収録・登録不要・無料
              </span>
              <h1
                className="font-display mx-auto mt-4 max-w-lg text-3xl font-extrabold leading-[1.3] tracking-tight text-slate-800 sm:text-4xl"
              >
                あの部品の名前、
                <span className="relative mx-0.5 inline-block whitespace-nowrap">
                  <span className="relative z-10 text-brand-600">3秒で見つかる。</span>
                  <span className="absolute inset-x-0 bottom-1 z-0 h-3 rounded-sm bg-brand-200/70 sm:h-3.5" />
                </span>
              </h1>

              {/* CTA */}
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/zukan"
                  data-tour="hero-cta"
                  className="btn-3d btn-shine font-display inline-flex items-center gap-2 rounded-full bg-brand-500 px-8 py-3.5 text-sm font-extrabold text-white"
                  style={{ ["--edge" as string]: "#12a854" }}
                >
                  <Icon name="search" className="h-4 w-4" strokeWidth={2.5} />
                  図鑑で探す
                </Link>
                <Link
                  href="/quiz"
                  className="btn-3d font-display inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-extrabold text-brand-700 ring-2 ring-[#e7ddc8]"
                  style={{ ["--edge" as string]: "#e7ddc8" }}
                >
                  <Icon name="pencil" className="h-4 w-4" strokeWidth={2.5} />
                  問題集にいどむ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 体験セクション: さわって覚える（ヒーロー直後に配置） */}
      <section className="border-y border-slate-200/70 bg-white py-14">
        <div className="mx-auto max-w-5xl px-4">
          <Reveal>
            <div className="text-center">
              <p className="font-display text-xs font-bold tracking-widest text-brand-600">TRY IT</p>
              <h2 className="font-display mt-2 text-2xl font-extrabold sm:text-3xl">読むだけじゃない。さわって覚える。</h2>
              <p className="mt-2 text-sm text-slate-500">
                下のUIは説明画像ではなく、本物です。実際に押して動きを確かめてみてください。
              </p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {["modal", "toast", "accordion"].map((slug, i) => {
              const t = getTerm(slug)!;
              return (
                <Reveal key={slug} delay={i * 110}>
                  <div className="flex h-full flex-col">
                    <LiveExample slug={t.slug} nameJa={t.nameJa} nameEn={t.nameEn} category={t.category} />
                    <Link
                      href={`/zukan/${t.slug}`}
                      className="group mt-3 flex items-center justify-between rounded-2xl bg-[#faf8f2] px-4 py-3 ring-1 ring-slate-200/70 transition hover:bg-brand-50"
                    >
                      <span>
                        <span className="font-display text-sm font-extrabold">{t.nameJa}</span>
                        <span className="ml-2 text-[11px] uppercase tracking-wide text-slate-400">{t.nameEn}</span>
                      </span>
                      <span className="flex items-center gap-1 text-xs font-bold text-brand-600">
                        解説を読む
                        <Icon name="arrow-right" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
                      </span>
                    </Link>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Co-Cre のつかいかた（体験の直後に配置） */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4">
          <Reveal>
            <h2 className="font-display text-center text-2xl font-extrabold sm:text-3xl">Co-Cre のつかいかた</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 120}>
                <div className="card-pop h-full p-6">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${f.tile}`}>
                    <Icon name={f.icon} className="h-5.5 w-5.5" />
                  </span>
                  <h3 className="font-display mt-4 font-extrabold">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VIP会員の案内 */}
      <section className="mx-auto max-w-5xl px-4 pb-4">
        <Reveal>
          <Link
            href="/vip"
            className="group relative block overflow-hidden rounded-[2rem] bg-gradient-to-br from-amber-400 to-amber-600 p-7 text-white shadow-lg shadow-amber-500/25 transition duration-200 hover:-translate-y-0.5 sm:p-9"
          >
            <div className="bg-dots pointer-events-none absolute inset-0 opacity-10" aria-hidden />
            <div className="relative flex flex-wrap items-center justify-between gap-5">
              <div className="min-w-0">
                <span className="font-display inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold ring-1 ring-white/30">
                  <Icon name="trophy" className="h-3 w-3" />
                  Co-Cre VIP
                </span>
                <h2 className="font-display mt-3 text-2xl font-extrabold">もっと本気で覚えるなら</h2>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-amber-50">
                  弱点復習・全レッスン・AIでしらべる無制限・広告なし。無料でも「調べる」はずっと使えます。
                </p>
              </div>
              <span
                className="btn-3d font-display inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-6 py-3 text-sm font-extrabold text-amber-700"
                style={{ ["--edge" as string]: "rgba(0,0,0,0.18)" }}
              >
                VIPを見る
                <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
              </span>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* はじめての人向け: 学習の道のり */}
      <section className="mx-auto max-w-5xl px-4 pt-14">
        <Reveal>
          <Link
            href="/learn"
            className="group relative block overflow-hidden rounded-[2rem] border-2 border-[#e7ddc8] bg-gradient-to-br from-brand-50 to-white p-7 shadow-[0_5px_0_#e7ddc8] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_7px_0_#e7ddc8] sm:p-9"
          >
            <div className="bg-dots pointer-events-none absolute inset-0 opacity-40" aria-hidden />
            <div className="relative flex flex-wrap items-center justify-between gap-5">
              <div className="min-w-0">
                <span className="font-display inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-3 py-1 text-[11px] font-bold text-white">
                  <Icon name="flag" className="h-3 w-3" />
                  はじめての人はここから
                </span>
                <h2 className="font-display mt-3 text-2xl font-extrabold">学習の道のりを歩こう</h2>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-500">
                  キャラのコクリが物語で案内。AI・プログラミングの基礎から、
                  「読んで→テストで8割」ずつ進むと、かんたんなサイトが作れるようになるよ。
                </p>
              </div>
              <span
                className="btn-3d font-display inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand-500 px-6 py-3 text-sm font-extrabold text-white"
                style={{ ["--edge" as string]: "#12a854" }}
              >
                道のりをはじめる
                <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
              </span>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* 今日の1語 */}
      <section className="mx-auto max-w-5xl px-4 pt-6">
        <Reveal>
          <WordOfTheDay />
        </Reveal>
      </section>

      {/* 収録カテゴリ（辞書の索引風） */}
      <section className="mx-auto max-w-3xl px-4 py-16">
        <Reveal>
          <p className="font-display text-center text-xs font-bold tracking-widest text-brand-500">INDEX ・ 索引</p>
          <h2 className="font-display mt-1 text-center text-2xl font-extrabold sm:text-3xl">
            ぜんぶで <span className="text-brand-600">{visualCount}</span> 語
          </h2>
          <p className="mt-2 text-center text-sm text-slate-500">調べたいカテゴリから引いてみよう</p>
        </Reveal>
        <div className="mt-8 overflow-hidden rounded-3xl border-2 border-[#e7ddc8] bg-[#fdfbf5] shadow-[0_4px_0_#e7ddc8]">
          {categories.map((c, i) => (
            <Reveal key={c.key} delay={i * 70}>
              <Link
                href={`/zukan?category=${c.key}`}
                className="group flex items-center gap-4 border-b border-[#eee5d3] px-5 py-4 transition last:border-b-0 hover:bg-white"
              >
                <span className="font-mono text-[11px] font-bold text-slate-300">{String(i + 1).padStart(2, "0")}</span>
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${c.tile} ${c.tileText}`}>
                  <Icon name={c.icon} className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="font-display block font-extrabold text-slate-800">{c.label}</span>
                  <span className="text-xs text-slate-400">{c.count} 語収録</span>
                </span>
                <span className="font-display hidden text-sm font-bold text-brand-600 sm:inline">引く</span>
                <Icon name="chevron-right" className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-brand-500" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 最後のCTA */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-500 to-brand-700 p-10 text-center text-white shadow-xl shadow-brand-500/25 sm:p-14">
            <div className="bg-dots pointer-events-none absolute inset-0 opacity-10" aria-hidden />
            <h2 className="font-display relative text-2xl font-extrabold sm:text-3xl">
              さっそく「名前」を見つけにいこう
            </h2>
            <p className="relative mt-3 text-sm text-brand-100">{visualCount}語すべて、いまは無料で読めます</p>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/zukan"
                className="btn-3d btn-shine font-display inline-flex items-center gap-2 rounded-full bg-white px-9 py-3.5 font-extrabold text-brand-700"
                style={{ ["--edge" as string]: "rgba(15, 23, 42, 0.35)" }}
              >
                図鑑をひらく
                <Icon name="arrow-right" className="h-4 w-4" strokeWidth={2.5} />
              </Link>
              <Link
                href="/quiz/exam"
                className="font-display inline-flex items-center gap-2 rounded-full px-9 py-3.5 font-extrabold text-white ring-1 ring-white/40 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
              >
                実力試験にいどむ
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
