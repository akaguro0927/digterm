import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";

export const metadata: Metadata = { title: "プライバシーポリシー" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <Link href="/mypage" className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-brand-600">
        <Icon name="chevron-left" className="h-3.5 w-3.5" />
        もどる
      </Link>
      <h1 className="font-display mt-2 text-2xl font-extrabold">プライバシーポリシー</h1>
      <p className="mt-1 text-xs text-slate-400">※プロトタイプ版のドラフトです。公開前に正式版へ差し替えます。</p>
      <div className="prose-sm mt-6 space-y-5 text-sm leading-relaxed text-slate-600">
        <section>
          <h2 className="font-display text-base font-extrabold text-slate-800">1. 取得する情報</h2>
          <p className="mt-1">学習の記録（お気に入り・成績・進捗）、アカウント情報（メールアドレス）、お問い合わせ内容、AI機能に送信された画像・テキストなど。</p>
        </section>
        <section>
          <h2 className="font-display text-base font-extrabold text-slate-800">2. 利用目的</h2>
          <p className="mt-1">サービスの提供・改善、学習記録の同期、お問い合わせ対応、不正利用の防止のために利用します。</p>
        </section>
        <section>
          <h2 className="font-display text-base font-extrabold text-slate-800">3. AI機能について</h2>
          <p className="mt-1">スクリーンショット判定やAI質問では、入力内容を解析のため外部AIサービスに送信する場合があります。個人情報を含む画像の送信はお控えください。送信データは判定後に保存しない方針です。</p>
        </section>
        <section>
          <h2 className="font-display text-base font-extrabold text-slate-800">4. 第三者提供・広告</h2>
          <p className="mt-1">法令に基づく場合を除き、本人の同意なく第三者へ提供しません。無料プランでは広告を表示する場合があります。</p>
        </section>
        <section>
          <h2 className="font-display text-base font-extrabold text-slate-800">5. お問い合わせ</h2>
          <p className="mt-1">本ポリシーに関するお問い合わせは<Link href="/contact" className="font-bold text-brand-600 hover:underline">お問い合わせフォーム</Link>まで。</p>
        </section>
      </div>
    </div>
  );
}
