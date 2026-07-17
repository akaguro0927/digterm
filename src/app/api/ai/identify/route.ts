import { NextResponse } from "next/server";
import { mockIdentify, visualCatalog, geminiKey, type IdentifyCandidate } from "@/lib/ai/core";
import { hasVisual } from "@/data/visualTerms";

// スクショ → 図鑑の用語候補。
// 有効な GEMINI_API_KEY があれば Gemini(vision) で判定、無ければモックを返す。
export const runtime = "nodejs";

async function identifyWithGemini(base64: string, mime: string, key: string): Promise<IdentifyCandidate[]> {
  const catalog = visualCatalog()
    .map((c) => `${c.slug}:${c.name}`)
    .join(", ");
  const prompt =
    "これはWebサイトのUI（画面）のスクリーンショットです。写っている主要なUI部品を、次のリストの中から近い順に最大3つ選び、slugだけをJSON配列で返してください（説明不要）。" +
    `\nリスト: ${catalog}\n出力例: ["button","modal"]`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          { parts: [{ text: prompt }, { inline_data: { mime_type: mime, data: base64 } }] },
        ],
      }),
    }
  );
  if (!res.ok) throw new Error(`gemini ${res.status}`);
  const data = await res.json();
  const text: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "[]";
  const slugs: string[] = JSON.parse(text.replace(/```json|```/g, "").trim());
  return slugs
    .filter((s) => hasVisual(s))
    .slice(0, 3)
    .map((slug, i) => ({ slug, confidence: 0.9 - i * 0.2 }));
}

export async function POST(req: Request) {
  try {
    const key = geminiKey();
    let candidates: IdentifyCandidate[];
    if (key) {
      const form = await req.formData();
      const file = form.get("image");
      if (!(file instanceof File)) return NextResponse.json({ error: "no image" }, { status: 400 });
      const buf = Buffer.from(await file.arrayBuffer());
      candidates = await identifyWithGemini(buf.toString("base64"), file.type || "image/png", key);
      if (candidates.length === 0) candidates = mockIdentify();
    } else {
      candidates = mockIdentify(); // 有効キー無し＝お試し（モック）
    }
    return NextResponse.json({ candidates });
  } catch {
    // 失敗時はモックにフォールバック（体験を止めない）
    return NextResponse.json({ candidates: mockIdentify(), fallback: true });
  }
}
