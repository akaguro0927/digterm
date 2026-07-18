import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { terms } from "@/data/terms";

// slug → 表記候補（長い順）。日本語名(nameJa)と別名(aliases)だけを使う。
// 英名(nameEn)・読み(reading)は本文中で別の語に紛れて誤検出しやすいので除外する。
const surfacesBySlug = new Map<string, string[]>(
  terms.map((t) => [
    t.slug,
    [t.nameJa, ...(t.aliases ?? [])]
      .filter((s) => s.length >= 2) // 1文字語（例:「色」）は誤検出源なので対象外
      .sort((a, b) => b.length - a.length),
  ]),
);

/**
 * レッスン本文（story）に出てくる用語を図鑑へ自動リンクする。
 *
 * 誤検出（無関係な語まで拾う）を抑えるため、リンク対象は
 * 「そのレッスンが宣言した relatedSlugs」に限定する。全用語をスキャンすると
 * 「ボタン」「カード」等の汎用語が本文のあちこちに引っかかるため採らない。
 * 各用語は story 全体で最初の1回だけリンクし、過剰リンクを避ける。
 */
export function linkifyStory(lines: string[], allowedSlugs: string[] = []): ReactNode[] {
  // relatedSlugs のうち図鑑に存在する語だけ、(表記, slug) を集める
  const candidates: { surface: string; slug: string }[] = [];
  for (const slug of allowedSlugs) {
    for (const surface of surfacesBySlug.get(slug) ?? []) {
      candidates.push({ surface, slug });
    }
  }
  // 長い表記を優先（「検索バー」を「検索」より先に一致させる）
  candidates.sort((a, b) => b.surface.length - a.surface.length);

  const linked = new Set<string>(); // すでにリンク済みの slug（全体で1回だけ）
  return lines.map((line, li) => linkifyLine(line, candidates, linked, li));
}

function linkifyLine(
  text: string,
  candidates: { surface: string; slug: string }[],
  linked: Set<string>,
  lineIndex: number,
): ReactNode {
  const out: ReactNode[] = [];
  let buf = "";
  let i = 0;
  let key = 0;
  const flush = () => {
    if (buf) {
      out.push(<Fragment key={`t${lineIndex}-${key++}`}>{buf}</Fragment>);
      buf = "";
    }
  };
  while (i < text.length) {
    let hit: { surface: string; slug: string } | null = null;
    for (const c of candidates) {
      if (linked.has(c.slug)) continue;
      if (text.startsWith(c.surface, i)) {
        hit = c;
        break;
      }
    }
    if (hit) {
      flush();
      linked.add(hit.slug);
      out.push(
        <Link
          key={`l${lineIndex}-${key++}`}
          href={`/zukan/${hit.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-brand-600 underline decoration-dotted decoration-brand-300 underline-offset-2 transition hover:decoration-brand-500"
        >
          {hit.surface}
        </Link>,
      );
      i += hit.surface.length;
    } else {
      buf += text[i];
      i += 1;
    }
  }
  flush();
  // リンクが無ければ素の文字列を返す（不要な要素で囲まない）
  return out.length === 0 ? text : <>{out}</>;
}
