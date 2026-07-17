import { NextResponse } from "next/server";
import { mockAsk, findTermInQuestion, geminiKey, type AskResult } from "@/lib/ai/core";
import { getTerm } from "@/data/terms";

// 用語の質問に回答。有効な GEMINI_API_KEY があれば Gemini で、無ければモック。
// 回答は「図鑑データを根拠にする」（RAG）。
export const runtime = "nodejs";

async function askWithGemini(question: string, key: string): Promise<AskResult> {
  const hit = findTermInQuestion(question);
  const context = hit
    ? `参考（図鑑）: ${hit.nameJa}(${hit.nameEn}) = ${hit.summary} / ${hit.description} / 使う場面: ${hit.useCase}`
    : "参考: 該当しそうな図鑑エントリは見つかりませんでした。";
  const prompt =
    "あなたはフロントエンド用語をやさしく教える先生です。次の質問に、初心者にもわかる言葉で簡潔に答えてください。" +
    "参考情報があれば、それを根拠にしてください。\n\n" +
    `${context}\n\n質問: ${question}`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    }
  );
  if (!res.ok) throw new Error(`gemini ${res.status}`);
  const data = await res.json();
  const answer: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  return { answer: answer || mockAsk(question).answer, refs: hit ? [hit.slug] : [] };
}

export async function POST(req: Request) {
  let q = "";
  try {
    const body = (await req.json()) as { question?: string };
    q = (body.question ?? "").trim();
    if (!q) return NextResponse.json({ error: "empty" }, { status: 400 });

    const key = geminiKey();
    const result = key ? await askWithGemini(q, key) : mockAsk(q);
    result.refs = result.refs.filter((s) => getTerm(s));
    return NextResponse.json(result);
  } catch {
    // 失敗時はモックにフォールバック（体験を止めない）。捕捉済みの q を使う。
    return NextResponse.json({ ...mockAsk(q), fallback: true });
  }
}
