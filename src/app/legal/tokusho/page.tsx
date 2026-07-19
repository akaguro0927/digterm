import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";

export const metadata: Metadata = { title: "特定商取引法に基づく表記" };

// 各行の値。空欄（TODO）はオーナーが公開前に必ず埋める。
// 有料課金があるページを公開する場合、特商法の表記は必須。
const ROWS: { label: string; value: React.ReactNode; todo?: boolean }[] = [
  { label: "販売事業者", value: "（氏名または屋号）", todo: true },
  { label: "運営統括責任者", value: "（氏名）", todo: true },
  {
    label: "所在地",
    value: "（住所。請求があったら遅滞なく開示する旨の記載でも可）",
    todo: true,
  },
  {
    label: "電話番号",
    value: "（電話番号。請求があったら遅滞なく開示する旨の記載でも可）",
    todo: true,
  },
  {
    label: "メールアドレス",
    value: (
      <>
        お問い合わせは
        <Link href="/contact" className="font-bold text-brand-600 hover:underline">
          お問い合わせフォーム
        </Link>
        より受け付けます（返信先メールアドレスをご記入ください）。
      </>
    ),
  },
  {
    label: "販売価格",
    value: (
      <>
        VIP会員：月額 680円／年額 5,980円（いずれも税込）。
        <br />
        買い切り（ライフタイム）：9,800円（税込）。
        <br />
        <span className="text-slate-400">
          最新の価格は
          <Link href="/vip" className="font-bold text-brand-600 hover:underline">
            会員プランのページ
          </Link>
          に表示されます。
        </span>
      </>
    ),
  },
  {
    label: "商品代金以外の必要料金",
    value: "インターネット接続にかかる通信料はお客様のご負担となります。",
  },
  {
    label: "支払方法",
    value: "クレジットカード決済（決済代行：Stripe）。",
  },
  {
    label: "支払時期",
    value:
      "サブスクリプションは申込時に初回課金され、以降は各期間の更新日に自動課金されます。買い切りは申込時に一括で課金されます。",
  },
  {
    label: "サービス提供時期",
    value: "決済完了後、ただちにご利用いただけます。",
  },
  {
    label: "解約・返品について",
    value: (
      <>
        デジタルコンテンツの性質上、決済後の返品・返金は原則お受けできません。
        <br />
        サブスクリプションはマイページからいつでも解約でき、解約後は現在の契約期間の満了まで有料機能をご利用いただけます（日割り返金はありません）。
      </>
    ),
  },
  {
    label: "動作環境",
    value:
      "最新版の主要ブラウザ（Chrome / Safari / Edge など）を推奨します。JavaScript を有効にしてご利用ください。",
  },
];

export default function TokushoPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <Link href="/mypage" className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-brand-600">
        <Icon name="chevron-left" className="h-3.5 w-3.5" />
        もどる
      </Link>
      <h1 className="font-display mt-2 text-2xl font-extrabold">特定商取引法に基づく表記</h1>
      <p className="mt-1 text-xs text-slate-400">
        ※（　）内はオーナーが公開前に確定します。有料課金を有効化する前に必ず記入してください。
      </p>
      <dl className="card-pop mt-6 divide-y divide-slate-100 p-0 text-sm leading-relaxed">
        {ROWS.map((row) => (
          <div key={row.label} className="grid grid-cols-1 gap-1 px-4 py-3.5 sm:grid-cols-[10rem_1fr] sm:gap-4">
            <dt className="font-display font-extrabold text-slate-800">{row.label}</dt>
            <dd className={row.todo ? "text-amber-600" : "text-slate-600"}>{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
