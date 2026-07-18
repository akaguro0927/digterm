"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons";
import { useSeen, useClearedNodes, useQuizAttempts, useFavorites, useStreak } from "@/lib/userStore";
import { computeXp, levelInfo } from "@/lib/level";

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// コクリ（マスコット）の顔を描く
function drawMascot(ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number) {
  ctx.save();
  ctx.fillStyle = "#ffffff";
  roundRect(ctx, cx - s / 2, cy - s / 2, s, s, s * 0.18);
  ctx.fill();
  // ブラウザ風のバー
  ctx.fillStyle = "#eef4ef";
  roundRect(ctx, cx - s / 2, cy - s / 2, s, s * 0.16, s * 0.08);
  ctx.fill();
  const dot = (dx: number, c: string) => {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(cx - s / 2 + dx, cy - s / 2 + s * 0.08, s * 0.022, 0, Math.PI * 2);
    ctx.fill();
  };
  dot(s * 0.1, "#ff9aa8");
  dot(s * 0.16, "#ffd36b");
  dot(s * 0.22, "#7fe0a5");
  // 目
  ctx.fillStyle = "#334155";
  ctx.beginPath();
  ctx.arc(cx - s * 0.14, cy + s * 0.02, s * 0.05, 0, Math.PI * 2);
  ctx.arc(cx + s * 0.14, cy + s * 0.02, s * 0.05, 0, Math.PI * 2);
  ctx.fill();
  // 口（笑顔）
  ctx.strokeStyle = "#12a854";
  ctx.lineWidth = s * 0.03;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.arc(cx, cy + s * 0.08, s * 0.13, 0.15 * Math.PI, 0.85 * Math.PI);
  ctx.stroke();
  ctx.restore();
}

export default function ShareButton() {
  const seen = useSeen();
  const cleared = useClearedNodes();
  const attempts = useQuizAttempts();
  const favs = useFavorites();
  const streak = useStreak();

  const quizCorrect = attempts.reduce((s, a) => s + a.score, 0);
  const xp = computeXp(seen.length, cleared.length, quizCorrect, favs.length);
  const info = levelInfo(xp);
  const terms = seen.length;

  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!open || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const W = 1200;
    const H = 630;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, "#2fd47f");
    g.addColorStop(1, "#0f9a4d");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#ffffff";
    ctx.font = "800 46px sans-serif";
    ctx.fillText("Co-Cre", 72, 96);
    ctx.font = "500 26px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.82)";
    ctx.fillText("フロントエンド用語図鑑", 74, 134);

    ctx.fillStyle = "#ffffff";
    ctx.font = "900 110px sans-serif";
    ctx.fillText(`Lv.${info.level}`, 68, 320);
    ctx.font = "800 66px sans-serif";
    ctx.fillText(info.title, 70, 402);

    ctx.font = "600 34px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.94)";
    ctx.fillText(`図鑑 ${terms}語を読破 ・ ${streak.streak}日連続 ・ ${xp} XP`, 72, 484);

    ctx.font = "600 28px sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.fillText("名前がわかれば、調べられる。", 72, 566);

    drawMascot(ctx, 980, 250, 260);

    setUrl(canvas.toDataURL("image/png"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const shareText = `Co-Cre で Lv.${info.level}「${info.title}」に到達！フロントエンド用語を${terms}語マスター`;
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(siteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* 無視 */
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="btn-3d font-display flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-3 text-sm font-extrabold text-brand-700 ring-2 ring-[#ebe4d5]"
        style={{ ["--edge" as string]: "#ebe4d5" }}
      >
        <Icon name="arrow-right" className="h-4 w-4 -rotate-45" />
        成果をシェアする
      </button>

      {open && (
        <div className="animate-fade-up fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="animate-pop-in card-pop w-full max-w-md p-5" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-lg font-extrabold">成果をシェア</h2>
              <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-600">
                <Icon name="x" className="h-5 w-5" strokeWidth={2.5} />
              </button>
            </div>
            {/* プレビュー */}
            {url && <img src={url} alt="シェア画像" className="w-full rounded-xl shadow ring-1 ring-slate-200" />}
            <canvas ref={canvasRef} className="hidden" />

            <div className="mt-4 grid grid-cols-2 gap-2">
              <a
                href={url}
                download="co-cre.png"
                className="btn-3d font-display flex items-center justify-center gap-1.5 rounded-full bg-brand-500 py-2.5 text-sm font-extrabold text-white"
                style={{ ["--edge" as string]: "#12a854" }}
              >
                <Icon name="image" className="h-4 w-4" />
                画像を保存
              </a>
              <button onClick={copyLink} className="btn-3d rounded-full bg-white py-2.5 text-sm font-bold text-slate-600 ring-2 ring-[#ebe4d5]" style={{ ["--edge" as string]: "#ebe4d5" }}>
                {copied ? "コピーしました" : "リンクをコピー"}
              </button>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(siteUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-slate-900 py-2.5 text-center text-sm font-bold text-white transition hover:brightness-110"
              >
                X でシェア
              </a>
              <a
                href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(siteUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[#06c755] py-2.5 text-center text-sm font-bold text-white transition hover:brightness-110"
              >
                LINE でシェア
              </a>
            </div>
            <p className="mt-3 text-center text-[11px] text-slate-400">画像を保存して、SNSに添えて投稿できます。</p>
          </div>
        </div>
      )}
    </>
  );
}
