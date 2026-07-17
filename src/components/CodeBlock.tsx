"use client";

import { useState } from "react";

// サンプルコードは学習に必要なためコピー可（転載防止方針の例外・docs/02参照）
export default function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative" data-copy-ok>
      <pre className="overflow-x-auto rounded-xl bg-slate-900 p-4 text-sm leading-relaxed text-slate-100">
        <code>{code}</code>
      </pre>
      <button
        onClick={copy}
        className="absolute right-2 top-2 rounded-md bg-slate-700 px-2.5 py-1 text-xs text-slate-200 transition hover:bg-slate-600"
      >
        {copied ? "✓ コピーしました" : "コピー"}
      </button>
    </div>
  );
}
