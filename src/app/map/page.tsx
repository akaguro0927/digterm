import { redirect } from "next/navigation";

// 旧「学習マップ」はレッスンページへ吸収済み。既存リンク・ブックマークはレッスンへ。
export default function MapPage() {
  redirect("/learn");
}
