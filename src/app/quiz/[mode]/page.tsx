import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import QuizRunner from "@/components/QuizRunner";
import { MODE_CONFIGS, type QuizMode } from "@/lib/quiz";
import { Icon } from "@/components/icons";

const MODES = Object.keys(MODE_CONFIGS) as QuizMode[];

export function generateStaticParams() {
  return MODES.map((mode) => ({ mode }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ mode: string }>;
}): Promise<Metadata> {
  const { mode } = await params;
  const config = MODE_CONFIGS[mode as QuizMode];
  if (!config) return {};
  return { title: `${config.title} | 問題集` };
}

export default async function QuizModePage({
  params,
}: {
  params: Promise<{ mode: string }>;
}) {
  const { mode } = await params;
  if (!MODES.includes(mode as QuizMode)) notFound();
  const config = MODE_CONFIGS[mode as QuizMode];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="animate-fade-up mb-6 flex items-center justify-between">
        <div>
          <Link href="/quiz" className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-brand-600">
            <Icon name="chevron-left" className="h-3.5 w-3.5" />
            モード選択にもどる
          </Link>
          <h1 className="font-display mt-1 text-2xl font-extrabold">{config.title}</h1>
        </div>
      </div>
      <QuizRunner mode={mode as QuizMode} />
    </div>
  );
}
