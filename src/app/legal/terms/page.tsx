import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";

export const metadata: Metadata = { title: "利用規約" };

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <Link href="/mypage" className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-brand-600">
        <Icon name="chevron-left" className="h-3.5 w-3.5" />
        もどる
      </Link>
      <h1 className="font-display mt-2 text-2xl font-extrabold">利用規約</h1>
      <p className="mt-1 text-xs text-slate-400">※プロトタイプ版のドラフトです。公開前に正式版へ差し替えます。</p>
      <div className="mt-6 space-y-5 text-sm leading-relaxed text-slate-600">
        <section>
          <h2 className="font-display text-base font-extrabold text-slate-800">第1条（適用）</h2>
          <p className="mt-1">本規約は、Co-Cre（以下「本サービス」）の利用に関する条件を定めるものです。</p>
        </section>
        <section>
          <h2 className="font-display text-base font-extrabold text-slate-800">第2条（禁止事項）</h2>
          <p className="mt-1">コンテンツの無断転載・再配布、リバースエンジニアリング、不正アクセス、その他運営を妨げる行為を禁止します。</p>
        </section>
        <section>
          <h2 className="font-display text-base font-extrabold text-slate-800">第3条（有料プラン）</h2>
          <p className="mt-1">VIP会員は月額課金の対象です。解約はいつでも可能で、契約期間の残りは表示に従います（決済実装後）。</p>
        </section>
        <section>
          <h2 className="font-display text-base font-extrabold text-slate-800">第4条（免責）</h2>
          <p className="mt-1">本サービスは学習目的の情報提供であり、内容の正確性・完全性を保証しません。AI回答は誤りを含む場合があります。</p>
        </section>
        <section>
          <h2 className="font-display text-base font-extrabold text-slate-800">第5条（規約の変更）</h2>
          <p className="mt-1">必要に応じて本規約を変更することがあります。変更後の利用をもって同意したものとみなします。</p>
        </section>
      </div>
    </div>
  );
}
