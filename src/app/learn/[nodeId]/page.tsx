import Link from "next/link";
import { notFound } from "next/navigation";
import LearnNodeContent from "@/components/LearnNodeContent";
import { chapterPositionInLevel, flatNodes, getFlatNode, isChapterAccessible } from "@/data/journey";
import { Icon } from "@/components/icons";
import { getServerEntitlement } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

function VipLocked({ chapterTitle, needsLogin }: { chapterTitle: string; needsLogin: boolean }) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <Link href="/learn" className="flex items-center gap-1 text-xs font-bold text-slate-400 transition hover:text-brand-600">
        <Icon name="chevron-left" className="h-3.5 w-3.5" />
        道のりにもどる
      </Link>
      <div className="card-pop animate-pop-in mt-6 p-8 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-500 ring-1 ring-amber-200">
          <Icon name="lock" className="h-7 w-7" />
        </span>
        <p className="font-display mt-3 text-[11px] font-bold tracking-widest text-amber-600">{chapterTitle}</p>
        <h1 className="font-display mt-1 text-2xl font-extrabold">このレッスンはVIP限定です</h1>
        <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">
          {needsLogin
            ? "購入済みの内容を確認するため、まずログインしてください。"
            : "中級・上級コースはVIPで開放されます。初級コースと中級の入口は無料のままです。"}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href={needsLogin ? "/login" : "/vip"}
            className="btn-3d font-display inline-flex items-center gap-2 rounded-full bg-amber-500 px-7 py-3 text-sm font-extrabold text-white"
            style={{ ["--edge" as string]: "#b45309" }}
          >
            <Icon name={needsLogin ? "user" : "trophy"} className="h-4 w-4" />
            {needsLogin ? "ログインする" : "VIPを見る"}
          </Link>
          <Link href="/learn" className="btn-3d rounded-full bg-white px-7 py-3 text-sm font-bold text-slate-600 ring-2 ring-[#ebe4d5]" style={{ ["--edge" as string]: "#ebe4d5" }}>
            道のりにもどる
          </Link>
        </div>
      </div>
    </div>
  );
}

export default async function LearnNodePage({ params }: { params: Promise<{ nodeId: string }> }) {
  const { nodeId } = await params;
  const found = getFlatNode(nodeId);

  if (!found) {
    notFound();
  }

  const { node, chapter } = found;
  const pos = chapterPositionInLevel(chapter.id);
  const nodeIndex = flatNodes.findIndex((item) => item.node.id === node.id);
  const next = flatNodes[nodeIndex + 1];
  const nextHref = next ? `/learn/${next.node.id}` : "/learn";
  const entitlement = await getServerEntitlement();

  if (!isChapterAccessible(chapter, entitlement.hasPaidAccess)) {
    return <VipLocked chapterTitle={chapter.title} needsLogin={!entitlement.user} />;
  }

  return <LearnNodeContent node={node} chapter={chapter} position={pos} nextHref={nextHref} />;
}
