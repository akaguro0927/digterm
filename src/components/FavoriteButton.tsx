"use client";

import { useFavorite } from "@/lib/userStore";
import { Icon } from "@/components/icons";

type Variant = "icon" | "pill";

export default function FavoriteButton({
  slug,
  variant = "icon",
  className = "",
}: {
  slug: string;
  variant?: Variant;
  className?: string;
}) {
  const [isFav, toggle] = useFavorite(slug);

  // カード（<Link>）の中に置くことがあるので、クリックで遷移しないよう抑止する
  const handle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle();
  };

  const label = isFav ? "お気に入りから外す" : "お気に入りに追加";

  if (variant === "pill") {
    return (
      <button
        type="button"
        onClick={handle}
        aria-pressed={isFav}
        aria-label={label}
        className={`btn-3d font-display inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-extrabold transition-colors ${
          isFav
            ? "bg-rose-500 text-white"
            : "bg-white text-slate-600 ring-2 ring-[#ebe4d5]"
        } ${className}`}
        style={{ ["--edge" as string]: isFav ? "#be123c" : "#ebe4d5" }}
      >
        <Icon
          name="heart"
          className="h-4 w-4"
          fill={isFav ? "currentColor" : "none"}
          strokeWidth={2.5}
        />
        {isFav ? "お気に入り済み" : "お気に入り"}
      </button>
    );
  }

  // icon variant: カードの隅に置く小さな丸ボタン
  return (
    <button
      type="button"
      onClick={handle}
      aria-pressed={isFav}
      aria-label={label}
      title={label}
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 active:scale-90 ${
        isFav
          ? "bg-rose-50 text-rose-500 ring-1 ring-rose-200"
          : "bg-white/70 text-slate-300 ring-1 ring-slate-200 hover:text-rose-400"
      } ${className}`}
    >
      <Icon
        name="heart"
        className="h-4 w-4"
        fill={isFav ? "currentColor" : "none"}
        strokeWidth={2.5}
      />
    </button>
  );
}
