import JourneyBoard from "@/components/JourneyBoard";
import AwardShelf from "@/components/AwardShelf";
import LearningMap from "@/components/LearningMap";
import StreakBar from "@/components/StreakBar";
import { MascotFace } from "@/components/MascotTeacher";

export default function LearnPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-6">
        <StreakBar />
      </div>
      <div className="animate-fade-up flex flex-col items-center text-center">
        <MascotFace />
        <p className="font-display mt-4 text-xs font-bold tracking-widest text-brand-500">LEARN</p>
        <h1 className="font-display mt-1 text-3xl font-extrabold">学習の道のり</h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
          コクリといっしょに、上から順にすすもう。読んで→テストで8割クリアを繰り返すと、
          用語が身について「かんたんなサイト」が作れるようになるよ。
        </p>
      </div>
      <div className="mt-8">
        <JourneyBoard />
      </div>
      <AwardShelf />

      {/* 旧「マップ」を吸収：授業のあとは図鑑の実物を順に読む必修ロード */}
      <div className="mt-14 border-t border-dashed border-[#e0d6bf] pt-10">
        <div className="text-center">
          <p className="font-display text-xs font-bold tracking-widest text-brand-500">ZUKAN ROAD</p>
          <h2 className="font-display mt-1 text-2xl font-extrabold">図鑑の必修コース</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
            レッスンで学んだら、図鑑の“実物”も見てみよう。必修の用語を順にひらいて「既読」を集めると、ここも進むよ。
          </p>
        </div>
        <div className="mt-6">
          <LearningMap hideWelcome />
        </div>
      </div>
    </div>
  );
}
